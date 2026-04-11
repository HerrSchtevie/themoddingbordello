import Image from 'next/image';
import Link from 'next/link';
import { ModlistMeta } from '@/types/modlist';

interface ModlistCardProps {
  list: ModlistMeta;
}

export function ModlistCard({ list }: ModlistCardProps) {
  return (
    <Link
      href={`/modlists/${list.slug}/readme`}
      className="group relative block overflow-hidden rounded-xl border border-bordello-border bg-bordello-surface hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1"
      style={{ '--card-accent': list.accentColor } as React.CSSProperties}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={list.wallpaper}
          alt={list.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bordello-surface via-bordello-surface/60 to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: list.accentColor }}
          />
          <span className="text-xs font-semibold text-bordello-muted">{list.abbreviation}</span>
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:brightness-125 transition-all">
          {list.name}
        </h3>
        <p className="text-sm text-bordello-muted mt-1 italic truncate">{list.tagline}</p>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: list.accentColor }}
      />
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{ boxShadow: `inset 0 0 30px ${list.accentColor}, 0 0 20px ${list.accentColor}` }}
      />
    </Link>
  );
}
