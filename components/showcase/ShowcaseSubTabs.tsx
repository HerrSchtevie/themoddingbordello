import Link from 'next/link';
import { ModlistMeta } from '@/types/modlist';

type ShowcaseView = 'screenshots' | 'videos';

interface ShowcaseSubTabsProps {
  list: ModlistMeta;
  active: ShowcaseView;
}

const views: { view: ShowcaseView; label: string; href: (slug: string) => string }[] = [
  { view: 'screenshots', label: 'Screenshots', href: (s) => `/modlists/${s}/showcase` },
  { view: 'videos', label: 'Videos', href: (s) => `/modlists/${s}/showcase/videos` },
];

export function ShowcaseSubTabs({ list, active }: ShowcaseSubTabsProps) {
  return (
    <div className="inline-flex items-center gap-1 mb-6 p-1 rounded-lg border border-bordello-border bg-bordello-surface">
      {views.map((v) => {
        const isActive = v.view === active;
        return (
          <Link
            key={v.view}
            href={v.href(list.slug)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isActive ? 'text-white' : 'text-bordello-muted hover:text-white'
            }`}
            style={isActive ? { backgroundColor: list.accentColor } : undefined}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
