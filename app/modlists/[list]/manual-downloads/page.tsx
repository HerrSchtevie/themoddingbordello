import { notFound } from 'next/navigation';
import { modlists, modlistBySlug, getModlistContentPath } from '@/lib/modlists';
import { loadMarkdown } from '@/lib/markdown';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return modlists
    .filter((m) => m.pages.manualDownloads)
    .map((m) => ({ list: m.slug }));
}

export default async function ManualDownloadsPage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list || !list.pages.manualDownloads) notFound();

  const html = await loadMarkdown(getModlistContentPath(slug, 'manual-downloads'));

  return (
    <ModlistLayout list={list} activePage="manual-downloads">
      <MarkdownRenderer html={html} />
    </ModlistLayout>
  );
}
