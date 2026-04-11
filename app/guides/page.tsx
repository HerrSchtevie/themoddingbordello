import { guides } from '@/lib/guides';
import { GuideCard } from '@/components/cards/GuideCard';

export default function GuidesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Shared Guides</h1>
      <p className="text-bordello-muted mb-8">SOS configuration guides applicable to all Bordello modlists.</p>
      <div className="grid gap-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
