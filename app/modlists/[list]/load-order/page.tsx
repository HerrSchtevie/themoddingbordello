import { notFound } from 'next/navigation';
import { modlists, modlistBySlug } from '@/lib/modlists';
import { loadKodexProfiles } from '@/lib/kodex';
import { ModlistLayout } from '@/components/layout/ModlistLayout';
import { KodexProfileTabs } from '@/components/kodex/KodexProfileTabs';
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

  const profiles = loadKodexProfiles(slug);

  return (
    <ModlistLayout list={list} activePage="load-order">
      <GuideTOCMobile contentId="kodex-content" hideDetailsControls />
      <div className="flex gap-8">
        <div className="min-w-0 flex-1" id="kodex-content">
          <KodexProfileTabs
            profiles={profiles}
            pluginCounts={list.pluginCounts}
            accentColor={list.accentColor}
            stickyTopClassName="top-[170px] xl:top-[110px]"
          />
        </div>
        <GuideTOCSidebar contentId="kodex-content" hideDetailsControls />
      </div>
    </ModlistLayout>
  );
}
