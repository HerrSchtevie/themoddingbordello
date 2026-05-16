import { notFound } from 'next/navigation';
import { allModlistSlugs, modlistBySlug, getModlistContentPath } from '@/lib/modlists';
import { loadMarkdown } from '@/lib/markdown';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { MarkdownSearchView } from '@/components/markdown/MarkdownSearchView';
import { GuideTOCSidebar, GuideTOCMobile } from '@/components/guides/GuideTOC';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return allModlistSlugs.map((slug) => ({ list: slug }));
}

export default async function ReadmePage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list) notFound();

  const html = await loadMarkdown(getModlistContentPath(slug, 'readme'));

  return (
    <ModlistLayout list={list} activePage="readme">
      <GuideTOCMobile contentId="readme-content" hideDetailsControls />
      <div className="flex gap-8">
        <div className="min-w-0 flex-1" id="readme-content">
          <MarkdownSearchView html={html} accentColor={list.accentColor} placeholder="Search ReadMe…" stickyTopClassName="top-32 xl:top-16" />
        </div>
        <GuideTOCSidebar contentId="readme-content" hideDetailsControls />
      </div>
    </ModlistLayout>
  );
}
