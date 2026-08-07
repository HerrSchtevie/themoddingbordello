import { ArmorCatalogClient } from '@/components/armor/ArmorCatalogClient';
import { ArmorCredits } from '@/components/armor/ArmorCredits';
import { NsfwGate } from '@/components/armor/NsfwGate';
import { OutfitToolGuide } from '@/components/armor/OutfitToolGuide';
import { getSharedArmorSets } from '@/lib/armorCatalog';

export const metadata = {
  title: 'Shared Armor Catalog (NSFW) | The Modding Bordello',
  description:
    'The shared armor archive for Journals of Jyggalag, Mantras of Mara, Hymns of Hircine, and Diaries of Dibella. Mature imagery — 18+ only.',
  // Scopes any adult-content classification by crawlers to this route.
  other: { rating: 'adult' },
  openGraph: {
    title: 'Shared Armor Catalog (NSFW) | The Modding Bordello',
    description:
      'The shared armor archive for Journals of Jyggalag, Mantras of Mara, Hymns of Hircine, and Diaries of Dibella. Mature imagery — 18+ only.',
    siteName: 'The Modding Bordello',
    type: 'website',
    images: [{ url: 'https://www.themoddingbordello.com/bordello-masque.png' }],
  },
};

const LISTS = [
  { acronym: 'JOJ', name: 'Journals of Jyggalag', dot: 'bg-joj' },
  { acronym: 'MOM', name: 'Mantras of Mara', dot: 'bg-mom' },
  { acronym: 'HOH', name: 'Hymns of Hircine', dot: 'bg-hoh' },
  { acronym: 'DOD', name: 'Diaries of Dibella', dot: 'bg-dod' },
];

export default function SharedArmorCatalogPage() {
  const items = getSharedArmorSets();

  return (
    <NsfwGate>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-bordello-muted">
            The Modding Bordello · Shared Armor Archive
          </p>
          <h1 className="text-3xl font-bold text-white mt-2 mb-3">Armor for every path.</h1>
          <p className="text-bordello-muted max-w-3xl">
            Browse the shared wardrobe of Journals of Jyggalag, Mantras of Mara, Hymns of Hircine, and Diaries of
            Dibella — search and filter every set, inspect its tags and body support, then open the mod page for the
            full gallery, credits, and permissions.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {LISTS.map((list) => (
              <span
                key={list.acronym}
                title={list.name}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-bordello-border bg-bordello-surface/80 text-sm text-bordello-text"
              >
                <span className={`w-2 h-2 rounded-full ${list.dot}`} aria-hidden="true" />
                {list.acronym}
              </span>
            ))}
            <span className="text-sm text-bordello-muted ml-1">
              <span className="text-white font-semibold">{items.length}</span> shared sets
            </span>
          </div>
          <p className="text-xs text-bordello-muted/80 mt-4 max-w-3xl">
            This is a community resource for ever-changing modlists — sets may be added or removed as the lists evolve.
            Preview imagery is hot-linked from each mod&apos;s Nexus page and may include mature content.
          </p>
        </div>

        <ArmorCredits />
        <ArmorCatalogClient items={items} variant="shared" />
        <OutfitToolGuide />
      </div>
    </NsfwGate>
  );
}
