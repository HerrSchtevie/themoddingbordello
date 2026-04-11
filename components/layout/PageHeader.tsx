import Image from 'next/image';
import { ModlistMeta } from '@/types/modlist';

interface PageHeaderProps {
  list: ModlistMeta;
}

export function PageHeader({ list }: PageHeaderProps) {
  return (
    <div className="relative h-48 sm:h-64 overflow-hidden rounded-lg mb-8">
      <Image
        src={list.wallpaper}
        alt={`${list.name} wallpaper`}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bordello-bg via-bordello-bg/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
          {list.name}
        </h1>
        <span
          className="inline-block mt-2 text-sm font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: list.accentColor, color: '#fff' }}
        >
          {list.abbreviation}
        </span>
      </div>
    </div>
  );
}
