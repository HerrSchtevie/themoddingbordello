import Link from 'next/link';
import { guides } from '@/lib/guides';

export function GuideDropdown() {
  return (
    <div className="absolute top-full left-0 mt-0 pt-2 w-72 z-50">
      <div className="bg-bordello-surface border border-bordello-border rounded-lg shadow-xl overflow-hidden">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={guide.customHref ?? `/guides/${guide.slug}`}
            className="block px-4 py-3 text-sm text-bordello-text hover:text-white hover:bg-bordello-bg/50 transition-colors"
          >
            {guide.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
