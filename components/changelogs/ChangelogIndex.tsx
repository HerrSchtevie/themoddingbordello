import Image from 'next/image';
import Link from 'next/link';
import { ModlistMeta } from '@/types/modlist';

interface ChangelogIndexProps {
  lists: ModlistMeta[];
}

export function ChangelogIndex({ lists }: ChangelogIndexProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lists.map((list) => (
        <Link
          key={list.slug}
          href={`/modlists/${list.slug}/changelog`}
          className="group relative block overflow-hidden rounded-xl border border-bordello-border bg-bordello-surface hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-lg"
        >
          <div className="relative h-56 overflow-hidden">
            <Image
              src={list.bookImage}
              alt={`${list.name} changelog`}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bordello-surface via-bordello-surface/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: list.accentColor }}
              />
              <span className="text-xs font-semibold text-bordello-muted">{list.abbreviation}</span>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:brightness-125 transition-all">
              {list.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
