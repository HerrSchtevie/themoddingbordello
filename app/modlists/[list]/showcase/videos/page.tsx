import { notFound } from 'next/navigation';
import { allModlistSlugs, modlistBySlug } from '@/lib/modlists';
import { getShowcaseVideos } from '@/lib/showcase-videos';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { ShowcaseSubTabs } from '@/components/showcase/ShowcaseSubTabs';
import { ShowcaseVideos } from '@/components/showcase/ShowcaseVideos';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return allModlistSlugs.map((slug) => ({ list: slug }));
}

export default async function ShowcaseVideosPage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list) notFound();

  const videos = await getShowcaseVideos(slug);

  return (
    <ModlistLayout list={list} activePage="showcase">
      <ShowcaseSubTabs list={list} active="videos" />
      <ShowcaseVideos videos={videos} accentColor={list.accentColor} />
    </ModlistLayout>
  );
}
