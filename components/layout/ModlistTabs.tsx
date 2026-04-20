import Link from 'next/link';
import { ModlistMeta, ModlistPage } from '@/types/modlist';

interface ModlistTabsProps {
  list: ModlistMeta;
  activePage: ModlistPage;
}

interface TabDef {
  page: ModlistPage;
  label: string;
}

const allTabs: TabDef[] = [
  { page: 'overview', label: 'Overview' },
  { page: 'readme', label: 'ReadMe' },
  { page: 'gameplay-guide', label: 'Gameplay Guide' },
  { page: 'changelog', label: 'Changelog' },
  { page: 'manual-downloads', label: 'Manual Downloads' },
  { page: 'load-order', label: 'Load Order' },
];

export function ModlistTabs({ list, activePage }: ModlistTabsProps) {
  const tabs = allTabs.filter((tab) => {
    if (tab.page === 'gameplay-guide') return list.pages.gameplayGuide;
    if (tab.page === 'manual-downloads') return list.pages.manualDownloads;
    if (tab.page === 'load-order') return list.pages.kodex;
    return true;
  });

  return (
    <div className="flex gap-1 border-b border-bordello-border mb-8 overflow-x-auto overflow-y-hidden">
      {tabs.map((tab) => {
        const isActive = tab.page === activePage;
        return (
          <Link
            key={tab.page}
            href={`/modlists/${list.slug}/${tab.page}`}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              isActive
                ? 'text-white'
                : 'text-bordello-muted hover:text-white border-transparent'
            }`}
            style={isActive ? { borderBottomColor: list.accentColor } : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
