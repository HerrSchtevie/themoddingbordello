import { notFound } from 'next/navigation';
import { allGuideSlugs, guideBySlug } from '@/lib/guides';
import { loadMarkdown } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { GuideTOCSidebar, GuideTOCMobile } from '@/components/guides/GuideTOC';
import { GuideSlug } from '@/types/guide';

export function generateStaticParams() {
  return allGuideSlugs.map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const slug = params.slug as GuideSlug;
  const guide = guideBySlug[slug];
  if (!guide) notFound();

  const html = await loadMarkdown(guide.filePath);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">{guide.title}</h1>

      {/* Mobile: sticky "Jump to Section" dropdown above content */}
      <GuideTOCMobile contentId="guide-content" />

      <div className="flex gap-8">
        {/* Main content */}
        <div className="min-w-0 flex-1 max-w-4xl" id="guide-content">
          <MarkdownRenderer html={html} />
        </div>

        {/* Desktop: sticky sidebar TOC */}
        <GuideTOCSidebar contentId="guide-content" />
      </div>
    </div>
  );
}
