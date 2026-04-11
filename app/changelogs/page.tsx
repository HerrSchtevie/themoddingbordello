import Image from 'next/image';
import { modlists } from '@/lib/modlists';
import { ChangelogIndex } from '@/components/changelogs/ChangelogIndex';
import { arrConfig } from '@/lib/arr';

export default function ChangelogsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Changelogs</h1>
      <p className="text-bordello-muted mb-8">Version history for all Bordello modlists.</p>
      <ChangelogIndex lists={modlists} />

      <h2 className="text-2xl font-bold text-white mt-16 mb-8">Affiliated Modlists</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href={arrConfig.links.changelog}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl border border-bordello-border bg-bordello-surface hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-lg"
        >
          <div className="relative h-56 overflow-hidden">
            <Image
              src="/assets/books/ARR_Book.png"
              alt={`${arrConfig.name} changelog`}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bordello-surface via-bordello-surface/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: arrConfig.accentColor }}
              />
              <span className="text-xs font-semibold text-bordello-muted">{arrConfig.abbreviation}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-bordello-bg text-bordello-muted border border-bordello-border ml-auto">
                {arrConfig.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white group-hover:brightness-125 transition-all">
                {arrConfig.name}
              </h3>
              <svg className="w-4 h-4 text-bordello-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
