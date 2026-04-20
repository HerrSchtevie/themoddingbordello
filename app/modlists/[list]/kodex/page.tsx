import { redirect } from 'next/navigation';
import { modlists } from '@/lib/modlists';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return modlists
    .filter((m) => m.pages.kodex)
    .map((m) => ({ list: m.slug }));
}

export default function KodexRedirectPage({ params }: { params: { list: string } }) {
  redirect(`/modlists/${params.list as ModlistSlug}/load-order`);
}
