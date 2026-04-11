'use client';

import { useState } from 'react';
import { VersionBlock as VersionBlockType } from '@/types/changelog';
import { VersionBlock } from './VersionBlock';

interface ChangelogRendererProps {
  preambleHtml: string;
  versions: VersionBlockType[];
}

export function ChangelogRenderer({ preambleHtml, versions }: ChangelogRendererProps) {
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(
    new Set(versions.length > 0 ? [versions[0].version] : [])
  );

  function toggleVersion(version: string) {
    setExpandedVersions((prev) => {
      const next = new Set(prev);
      if (next.has(version)) {
        next.delete(version);
      } else {
        next.add(version);
      }
      return next;
    });
  }

  return (
    <div>
      {preambleHtml && (
        <div className="mb-8 p-5 bg-bordello-surface border border-bordello-border rounded-lg">
          <article className="prose" dangerouslySetInnerHTML={{ __html: preambleHtml }} />
        </div>
      )}

      <div className="space-y-0">
        {versions.map((block, index) => (
          <VersionBlock
            key={block.version}
            version={block.version}
            label={block.label}
            html={block.html}
            isExpanded={expandedVersions.has(block.version)}
            onToggle={index === 0 ? undefined : () => toggleVersion(block.version)}
          />
        ))}
      </div>
    </div>
  );
}
