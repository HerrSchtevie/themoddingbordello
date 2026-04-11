import { notFound } from 'next/navigation';
import { allGuideSlugs, guideBySlug } from '@/lib/guides';
import { loadMarkdown } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">{guide.title}</h1>
      <MarkdownRenderer html={html} />
    </div>
  );
}
