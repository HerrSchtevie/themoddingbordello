import { notFound } from 'next/navigation';
import { modlists, modlistBySlug } from '@/lib/modlists';
import { loadKodex } from '@/lib/kodex';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { KodexClient } from '@/components/kodex/KodexClient';
import { GuideTOCSidebar, GuideTOCMobile } from '@/components/guides/GuideTOC';
import { ModlistSlug } from '@/types/modlist';

export function generateStaticParams() {
  return modlists
    .filter((m) => m.pages.kodex)
    .map((m) => ({ list: m.slug }));
}

export default function LoadOrderPage({ params }: { params: { list: string } }) {
  const slug = params.list as ModlistSlug;
  const list = modlistBySlug[slug];
  if (!list || !list.pages.kodex) notFound();

  const nodes = loadKodex(slug);

  return (
    <ModlistLayout list={list} activePage="load-order">
      <GuideTOCMobile contentId="kodex-content" />
      <div className="flex gap-8">
        <div className="min-w-0 flex-1" id="kodex-content">
          <KodexClient nodes={nodes} accentColor={list.accentColor} />
        </div>
        <GuideTOCSidebar contentId="kodex-content" />
      </div>
    </ModlistLayout>
  );
}
