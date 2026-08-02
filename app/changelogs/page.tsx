import { modlists } from '@/lib/modlists';
import { ChangelogIndex } from '@/components/changelogs/ChangelogIndex';

export default function ChangelogsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Changelogs</h1>
      <p className="text-bordello-muted mb-8">Version history for all Bordello modlists.</p>
      <ChangelogIndex lists={modlists} />
    </div>
  );
}
