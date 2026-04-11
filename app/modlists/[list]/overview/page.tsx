import { notFound } from 'next/navigation';
import { allModlistSlugs, modlistBySlug, getModlistContentPath } from '@/lib/modlists';
import { loadMarkdown } from '@/lib/markdown';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return allModlistSlugs.map((slug) => ({ list: slug }));
}

export default async function OverviewPage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list) notFound();

  const html = await loadMarkdown(getModlistContentPath(slug, 'overview'));

  return (
    <ModlistLayout list={list} activePage="overview">
      <MarkdownRenderer html={html} />
    </ModlistLayout>
  );
}
