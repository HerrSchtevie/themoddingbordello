'use client';

import { useMemo, useRef, useState } from 'react';
import { VersionBlock as VersionBlockType } from '@/types/changelog';
import { VersionBlock } from './VersionBlock';
import { HighlightedText, SearchBar, useSearchHighlights } from './searchUtils';

interface ChangelogRendererProps {
  preambleHtml: string;
  versions: VersionBlockType[];
  accentColor?: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
}

export function ChangelogRenderer({ preambleHtml, versions, accentColor }: ChangelogRendererProps) {
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.trim();
  const lowerQuery = query.toLowerCase();
  const isSearching = lowerQuery.length > 0;

  const [manuallyExpanded, setManuallyExpanded] = useState<Set<string>>(
    new Set(versions.length > 0 ? [versions[0].version] : [])
  );

  const searchableTexts = useMemo(
    () => versions.map((v) => `${v.label} ${stripHtml(v.html)}`.toLowerCase()),
    [versions]
  );

  const matchedVersions = useMemo(() => {
    if (!isSearching) return new Set<string>();
    const matched = new Set<string>();
    versions.forEach((v, i) => {
      if (searchableTexts[i].includes(lowerQuery)) matched.add(v.version);
    });
    return matched;
  }, [versions, searchableTexts, lowerQuery, isSearching]);

  const matchedVersionCount = matchedVersions.size;

  function isExpanded(version: string): boolean {
    if (isSearching) return matchedVersions.has(version);
    return manuallyExpanded.has(version);
  }

  function toggleVersion(version: string) {
    if (isSearching) {
      setManuallyExpanded((prev) => {
        const next = new Set(prev);
        if (matchedVersions.has(version)) {
          if (next.has(version)) next.delete(version);
          else next.add(version);
        } else {
          next.add(version);
        }
        return next;
      });
      return;
    }
    setManuallyExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(version)) next.delete(version);
      else next.add(version);
      return next;
    });
  }

  function expandAll() {
    setManuallyExpanded(new Set(versions.map((v) => v.version)));
    setRawQuery('');
  }

  function collapseAll() {
    setManuallyExpanded(new Set());
    setRawQuery('');
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const { matches, currentIndex, next, prev, onInputKeyDown } = useSearchHighlights(
    containerRef,
    lowerQuery,
    matchedVersions
  );

  const trailingControls = (
    <>
      <button
        type="button"
        onClick={expandAll}
        className="px-3 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-sm text-white hover:bg-bordello-surface transition-colors"
      >
        Expand All
      </button>
      <button
        type="button"
        onClick={collapseAll}
        className="px-3 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-sm text-white hover:bg-bordello-surface transition-colors"
      >
        Collapse All
      </button>
    </>
  );

  return (
    <div>
      <SearchBar
        query={rawQuery}
        onQueryChange={setRawQuery}
        matches={matches}
        currentIndex={currentIndex}
        onNext={next}
        onPrev={prev}
        onInputKeyDown={onInputKeyDown}
        accentColor={accentColor}
        placeholder="Search changelog…"
        trailingControls={trailingControls}
        resultSummary={
          matchedVersionCount === 0
            ? 'No matching versions found.'
            : `${matchedVersionCount} matching ${matchedVersionCount === 1 ? 'version' : 'versions'}`
        }
      />

      {preambleHtml && (
        <div className="mb-8 p-5 bg-bordello-surface border border-bordello-border rounded-lg">
          <article className="prose" dangerouslySetInnerHTML={{ __html: preambleHtml }} />
        </div>
      )}

      <div className="space-y-0" ref={containerRef}>
        {versions.map((block) => (
          <VersionBlock
            key={block.version}
            version={block.version}
            label={block.label}
            labelNode={<HighlightedText text={block.label} query={lowerQuery} />}
            html={block.html}
            isExpanded={isExpanded(block.version)}
            onToggle={() => toggleVersion(block.version)}
            query={lowerQuery}
          />
        ))}
      </div>
    </div>
  );
}
