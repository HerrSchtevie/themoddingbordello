import { ArmorCatalogClient } from '@/components/armor/ArmorCatalogClient';
import { ArmorCredits } from '@/components/armor/ArmorCredits';
import { OutfitToolGuide } from '@/components/armor/OutfitToolGuide';
import { getTotArmorSets } from '@/lib/armorCatalog';

export const metadata = {
  title: 'TOT Armor Catalog (SFW) | The Modding Bordello',
  description:
    'Browse the Tomes of Talos armor wardrobe — search and filter every curated set, then open the mod page for full galleries, credits, and permissions.',
  openGraph: {
    title: 'TOT Armor Catalog (SFW) | The Modding Bordello',
    description: 'Browse the Tomes of Talos armor wardrobe — search, filter, and find the exact set you want.',
    siteName: 'The Modding Bordello',
    type: 'website',
    images: [{ url: 'https://www.themoddingbordello.com/bordello-masque.png' }],
  },
};

export default function TotArmorCatalogPage() {
  const items = getTotArmorSets();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-bordello-muted">
          Tomes of Talos · Armor Archive
        </p>
        <h1 className="text-3xl font-bold text-white mt-2 mb-3">TOT Armor Catalog (SFW)</h1>
        <p className="text-bordello-muted max-w-3xl">
          Browse the Tomes of Talos wardrobe — search and filter every curated set, inspect its tags and body support,
          then open the mod page for the full gallery, credits, and permissions.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-bordello-border bg-bordello-surface/80 text-sm text-bordello-text">
            <span className="w-2 h-2 rounded-full bg-tot" aria-hidden="true" />
            Tomes of Talos
          </span>
          <span className="text-sm text-bordello-muted">
            <span className="text-white font-semibold">{items.length}</span> curated sets
          </span>
        </div>
        <p className="text-xs text-bordello-muted/80 mt-4 max-w-3xl">
          This is a community resource for an ever-changing modlist — sets may be added or removed as the list evolves.
        </p>
      </div>

      <ArmorCredits />
      <ArmorCatalogClient items={items} variant="tot" />
      <OutfitToolGuide />
    </div>
  );
}
