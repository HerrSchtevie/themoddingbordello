import { notFound } from 'next/navigation';
import { modlists, modlistBySlug, getModlistContentPath } from '@/lib/modlists';
import { loadMarkdown } from '@/lib/markdown';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { MarkdownSearchView } from '@/components/markdown/MarkdownSearchView';
import { GuideTOCSidebar, GuideTOCMobile } from '@/components/guides/GuideTOC';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return modlists
    .filter((m) => m.pages.gameplayGuide)
    .map((m) => ({ list: m.slug }));
}

export default async function GameplayGuidePage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list || !list.pages.gameplayGuide) notFound();

  const html = await loadMarkdown(getModlistContentPath(slug, 'gameplay-guide'));

  return (
    <ModlistLayout list={list} activePage="gameplay-guide">
      <GuideTOCMobile contentId="gameplay-guide-content" hideDetailsControls />
      <div className="flex gap-8">
        <div className="min-w-0 flex-1" id="gameplay-guide-content">
          <MarkdownSearchView html={html} accentColor={list.accentColor} placeholder="Search gameplay guide…" stickyTopClassName="top-32 xl:top-16" />
        </div>
        <GuideTOCSidebar contentId="gameplay-guide-content" hideDetailsControls />
      </div>
    </ModlistLayout>
  );
}
