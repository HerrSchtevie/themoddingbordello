import Link from 'next/link';
import { modlists } from '@/lib/modlists';
import { arrConfig } from '@/lib/arr';

export function ChangelogDropdown() {
  return (
    <div className="absolute top-full left-0 mt-0 pt-2 w-64 z-50">
      <div className="bg-bordello-surface border border-bordello-border rounded-lg shadow-xl overflow-hidden">
        {modlists.map((list) => (
          <Link
            key={list.slug}
            href={`/modlists/${list.slug}/changelog`}
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

        {/* Affiliated Modlists */}
        <div className="border-t border-bordello-border mt-1 pt-1">
          <span className="block px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-bordello-muted">
            Affiliated Modlists
          </span>
          <a
            href={arrConfig.links.changelog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-bordello-bg/50 transition-colors"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: arrConfig.accentColor }}
            />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-white">{arrConfig.name}</span>
              <span className="text-xs text-bordello-muted ml-2">({arrConfig.abbreviation})</span>
            </div>
            <svg className="w-3.5 h-3.5 text-bordello-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
