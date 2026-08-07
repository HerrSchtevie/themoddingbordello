import Link from 'next/link';
import { TeamModNavItem } from '@/types/teamMods';

// Unlike the other nav dropdowns, entries open the mod's Nexus page in a
// new tab. The data comes from the team mods CSV, read server-side in the
// root layout and passed down (this stays a presentational component).
export function TeamModsDropdown({ items }: { items: TeamModNavItem[] }) {
  return (
    <div className="absolute top-full left-0 mt-0 pt-2 w-80 z-50">
      <div className="bg-bordello-surface border border-bordello-border rounded-lg shadow-xl overflow-hidden">
        {items.map((mod) => (
          <a
            key={mod.modUrl}
            href={mod.modUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-bordello-bg/50 transition-colors"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: mod.accent || '#9a9a9a' }}
            />
            <span className="text-sm font-medium text-white leading-snug">
              {mod.name}
              {mod.nsfw && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-red-300/80 ml-2">
                  NSFW
                </span>
              )}
            </span>
          </a>
        ))}
        <Link
          href="/team-mods"
          className="block px-4 py-2.5 text-sm text-bordello-muted hover:text-white hover:bg-bordello-bg/50 border-t border-bordello-border transition-colors"
        >
          Browse all team mods
        </Link>
      </div>
    </div>
  );
}
