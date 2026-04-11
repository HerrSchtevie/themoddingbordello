import Link from 'next/link';
import { modlists } from '@/lib/modlists';

export function ModlistDropdown() {
  return (
    <div className="absolute top-full left-0 mt-0 pt-2 w-64 z-50">
      <div className="bg-bordello-surface border border-bordello-border rounded-lg shadow-xl overflow-hidden">
        {modlists.map((list) => (
          <Link
            key={list.slug}
            href={`/modlists/${list.slug}/readme`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-bordello-bg/50 transition-colors"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: list.accentColor }}
            />
            <div>
              <span className="text-sm font-medium text-white">{list.name}</span>
              <span className="text-xs text-bordello-muted ml-2">({list.abbreviation})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
