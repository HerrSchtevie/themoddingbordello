import { notFound } from 'next/navigation';
import { allModlistSlugs, modlistBySlug } from '@/lib/modlists';
import { getShowcaseImages } from '@/lib/showcase';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { ShowcaseGallery } from '@/components/showcase/ShowcaseGallery';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return allModlistSlugs.map((slug) => ({ list: slug }));
}

export default function ShowcasePage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list) notFound();

  const images = getShowcaseImages(slug);

  return (
    <ModlistLayout list={list} activePage="showcase">
      <ShowcaseGallery images={images} accentColor={list.accentColor} />
    </ModlistLayout>
  );
}
