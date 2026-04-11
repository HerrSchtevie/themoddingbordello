import { ModlistMeta, ModlistPage } from '@/types/modlist';
import { PageHeader } from './PageHeader';
import { ModlistTabs } from './ModlistTabs';

interface ModlistLayoutProps {
  list: ModlistMeta;
  activePage: ModlistPage;
  children: React.ReactNode;
}

export function ModlistLayout({ list, activePage, children }: ModlistLayoutProps) {
  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      style={{ '--accent-color': list.accentColor } as React.CSSProperties}
    >
      <PageHeader list={list} />
      <ModlistTabs list={list} activePage={activePage} />
      {children}
    </div>
  );
}
