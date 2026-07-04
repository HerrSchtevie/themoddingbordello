'use client';

import { useState } from 'react';
import { KodexClient } from '@/components/kodex/KodexClient';
import { PluginCountsTable } from '@/components/kodex/PluginCountsTable';
import { KodexProfile } from '@/lib/kodex';
import { PluginCounts } from '@/types/modlist';

interface KodexProfileTabsProps {
  profiles: KodexProfile[];
  pluginCounts?: Partial<Record<KodexProfile['key'], PluginCounts>>;
  accentColor: string;
  stickyTopClassName?: string;
}

export function KodexProfileTabs({
  profiles,
  pluginCounts,
  accentColor,
  stickyTopClassName,
}: KodexProfileTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (profiles.length === 0) {
    return <p className="text-bordello-muted">No Kodex data available for this modlist.</p>;
  }

  if (profiles.length === 1) {
    const profile = profiles[0];
    const counts = pluginCounts?.[profile.key];
    return (
      <>
        {counts && <PluginCountsTable counts={counts} accentColor={accentColor} />}
        <KodexClient
          nodes={profile.nodes}
          accentColor={accentColor}
          stickyTopClassName={stickyTopClassName}
        />
      </>
    );
  }

  const active = profiles[activeIndex] ?? profiles[0];
  const activeCounts = pluginCounts?.[active.key];

  return (
    <div>
      <div className="mb-6 flex gap-2 border-b border-bordello-border">
        {profiles.map((profile, i) => (
          <button
            key={profile.key}
            type="button"
            onClick={() => setActiveIndex(i)}
            style={i === activeIndex ? { borderColor: accentColor, color: accentColor } : undefined}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              i === activeIndex
                ? ''
                : 'border-transparent text-bordello-muted hover:text-bordello-text'
            }`}
          >
            {profile.label}
          </button>
        ))}
      </div>

      {activeCounts && <PluginCountsTable counts={activeCounts} accentColor={accentColor} />}
      <KodexClient
        key={active.key}
        nodes={active.nodes}
        accentColor={accentColor}
        stickyTopClassName={stickyTopClassName}
      />
    </div>
  );
}
