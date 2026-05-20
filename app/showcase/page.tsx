import { modlists } from '@/lib/modlists';
import { ShowcaseIndex } from '@/components/showcase/ShowcaseIndex';

export default function ShowcasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Showcase</h1>
      <p className="text-bordello-muted mb-8">Visual previews for all Bordello modlists.</p>
      <ShowcaseIndex lists={modlists} />
    </div>
  );
}
