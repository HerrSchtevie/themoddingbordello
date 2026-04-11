import { redirect } from 'next/navigation';
import { allModlistSlugs, modlistBySlug } from '@/lib/modlists';
import { notFound } from 'next/navigation';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return allModlistSlugs.map((slug) => ({ list: slug }));
}

export default function ModlistRedirectPage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  if (!modlistBySlug[slug]) notFound();
  redirect(`/modlists/${slug}/overview`);
}
