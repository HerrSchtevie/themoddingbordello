import { notFound } from 'next/navigation';
import { allModlistSlugs, modlistBySlug, getModlistContentPath } from '@/lib/modlists';
import { loadChangelog } from '@/lib/changelog';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { ChangelogRenderer } from '@/components/markdown/ChangelogRenderer';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return allModlistSlugs.map((slug) => ({ list: slug }));
}

export default async function ChangelogPage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list) notFound();

  const { preambleHtml, versions } = await loadChangelog(getModlistContentPath(slug, 'changelog'));

  return (
    <ModlistLayout list={list} activePage="changelog">
      <ChangelogRenderer preambleHtml={preambleHtml} versions={versions} />
    </ModlistLayout>
  );
}
