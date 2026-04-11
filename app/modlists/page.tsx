import { modlists } from '@/lib/modlists';
import { ModlistCard } from '@/components/cards/ModlistCard';
import { ArrCard } from '@/components/cards/ArrCard';

export default function ModlistsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Modlists</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modlists.map((list) => (
          <ModlistCard key={list.slug} list={list} />
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mt-16 mb-8">Affiliated Modlists</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ArrCard />
      </div>
    </div>
  );
}
