'use client';

import { useState } from 'react';
import Image from 'next/image';
import { arrConfig } from '@/lib/arr';

export function ArrCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative block overflow-hidden rounded-xl border border-bordello-border bg-bordello-surface transition-all duration-300"
      style={{ '--card-accent': arrConfig.accentColor } as React.CSSProperties}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={arrConfig.wallpaper}
            alt={arrConfig.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bordello-surface via-bordello-surface/60 to-transparent" />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: arrConfig.accentColor }}
            />
            <span className="text-xs font-semibold text-bordello-muted">{arrConfig.abbreviation}</span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-bordello-bg text-bordello-muted border border-bordello-border ml-auto">
              {arrConfig.label}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">
            {arrConfig.name}
          </h3>
          <p className="text-sm text-bordello-muted mt-1 italic truncate">{arrConfig.tagline}</p>
          <p className="text-sm text-bordello-muted mt-1">{arrConfig.description}</p>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 grid gap-2 sm:grid-cols-2">
          {[
            { label: 'ReadMe', url: arrConfig.links.readme },
            { label: 'Changelog', url: arrConfig.links.changelog },
            { label: 'Gameplay Guide', url: arrConfig.links.gameplayGuide },
            { label: 'Tool Running Guide', url: arrConfig.links.toolRunningGuide },
            { label: 'Nexus Page', url: arrConfig.links.nexus },
            { label: 'Load Order Library', url: arrConfig.links.loadOrder },
            { label: 'A.R.S.E. (NSFW) Guide', url: arrConfig.links.arse },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg border border-bordello-border bg-bordello-bg/50 hover:bg-bordello-bg hover:border-bordello-muted/30 transition-all text-sm text-bordello-text hover:text-white"
            >
              {link.label}
              <svg className="w-3.5 h-3.5 text-bordello-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: arrConfig.accentColor }}
      />
    </div>
  );
}
