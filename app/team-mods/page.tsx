import Link from 'next/link';
import { getAllTeamMods } from '@/lib/teamMods';
import { TeamMod } from '@/types/teamMods';

export const metadata = {
  title: 'Bordello Team Mods | The Modding Bordello',
  description:
    'Mods and patches released by the Modding Bordello team — player homes, followers, engine fixes, and tools, each linking to its Nexus page.',
  openGraph: {
    title: 'Bordello Team Mods | The Modding Bordello',
    description: 'Mods and patches released by the Modding Bordello team, on Nexus.',
    siteName: 'The Modding Bordello',
    type: 'website',
    images: [{ url: 'https://www.themoddingbordello.com/bordello-masque.png' }],
  },
};

function TeamModCard({ mod }: { mod: TeamMod }) {
  return (
    <div className="group relative rounded-xl border border-bordello-border bg-bordello-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-bordello-border/80">
      <a
        href={mod.modUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0"
        aria-label={`${mod.name} on Nexus Mods`}
      />
      <div className="relative aspect-video bg-bordello-bg overflow-hidden pointer-events-none">
        {mod.imageUrl ? (
          // Cover art is hotlinked from Nexus's CDN, same as the armor
          // catalog — never stored on or proxied through this site's host.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mod.imageUrl}
            alt={`${mod.name} cover`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-bordello-muted/40">
              Image unavailable
            </span>
          </div>
        )}
        {mod.nsfw && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-black/70 text-red-300 border border-red-900/60">
            NSFW
          </span>
        )}
      </div>
      <div className="p-5">
        <span
          className="block h-0.5 w-10 rounded mb-3"
          style={{ backgroundColor: mod.accent || '#9a9a9a' }}
          aria-hidden="true"
        />
        <h2 className="text-base font-semibold text-white leading-snug group-hover:text-bordello-text transition-colors">
          {mod.name}
        </h2>
        <p className="text-sm text-bordello-muted mt-1">
          by{' '}
          {mod.authorUrl ? (
            <a
              href={mod.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 hover:text-white underline decoration-bordello-border underline-offset-2 transition-colors"
            >
              {mod.author}
            </a>
          ) : (
            mod.author
          )}
        </p>
        <p className="text-sm text-bordello-muted mt-3">{mod.blurb}</p>
      </div>
    </div>
  );
}

export default function TeamModsPage() {
  const mods = getAllTeamMods();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-bordello-muted">
          The Modding Bordello · Team Releases
        </p>
        <h1 className="text-3xl font-bold text-white mt-2 mb-3">Bordello Team Mods</h1>
        <p className="text-bordello-muted max-w-3xl">
          Mods and patches released by the Bordello team — player homes, followers, engine fixes, and
          tools. Every card opens the mod&apos;s Nexus page for the full description, gallery, and
          downloads.
        </p>
        <p className="text-sm text-bordello-muted mt-4">
          Looking for the modlists themselves?{' '}
          <Link href="/modlists" className="text-white underline decoration-bordello-border underline-offset-2 hover:decoration-white transition-colors">
            Browse the Bordello modlists
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mods.map((mod) => (
          <TeamModCard key={mod.index} mod={mod} />
        ))}
      </div>
    </div>
  );
}
