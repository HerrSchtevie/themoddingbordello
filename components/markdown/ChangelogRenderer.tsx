'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { VersionBlock as VersionBlockType } from '@/types/changelog';
import { VersionBlock } from './VersionBlock';

interface ChangelogRendererProps {
  preambleHtml: string;
  versions: VersionBlockType[];
  accentColor?: string;
}

const BASE_MARK_CLASS = 'bg-yellow-400/25 text-inherit rounded-[2px] px-0.5';
const ACTIVE_MARK_CLASS = 'bg-yellow-300 text-bordello-bg rounded-[2px] px-0.5 ring-2 ring-yellow-200 ring-offset-1 ring-offset-bordello-bg';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
}

function HighlightedLabel({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const lower = text.toLowerCase();
  const ql = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const idx = lower.indexOf(ql, i);
    if (idx === -1) {
      parts.push(text.slice(i));
      break;
    }
    if (idx > i) parts.push(text.slice(i, idx));
    parts.push(
      <mark key={key++} data-search-highlight="" className={BASE_MARK_CLASS}>
        {text.slice(idx, idx + query.length)}
      </mark>
    );
    i = idx + query.length;
  }
  return <>{parts}</>;
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
  const [matches, setMatches] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollKey, setScrollKey] = useState(0);

  // Collect highlight marks after VersionBlock effects have applied them.
  useEffect(() => {
    if (!isSearching || !containerRef.current) {
      setMatches([]);
      setCurrentIndex(0);
      return;
    }
    const found = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('mark[data-search-highlight]')
    );
    setMatches(found);
    setCurrentIndex(0);
  }, [lowerQuery, matchedVersions, isSearching]);

  // Apply active styling to the current match.
  useEffect(() => {
    matches.forEach((m, i) => {
      m.className = i === currentIndex ? ACTIVE_MARK_CLASS : BASE_MARK_CLASS;
    });
  }, [matches, currentIndex]);

  // Scroll only on explicit navigation (arrows / Enter), not on every keystroke.
  useEffect(() => {
    if (scrollKey === 0) return;
    matches[currentIndex]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [scrollKey]); // eslint-disable-line react-hooks/exhaustive-deps

  function gotoNext() {
    if (!matches.length) return;
    setCurrentIndex((i) => (i + 1) % matches.length);
    setScrollKey((k) => k + 1);
  }

  function gotoPrev() {
    if (!matches.length) return;
    setCurrentIndex((i) => (i - 1 + matches.length) % matches.length);
    setScrollKey((k) => k + 1);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) gotoPrev();
      else gotoNext();
    } else if (e.key === 'Escape') {
      setRawQuery('');
    }
  }

  const ringStyle = accentColor
    ? ({ '--tw-ring-color': accentColor } as React.CSSProperties)
    : undefined;

  const hasMatches = matches.length > 0;
  const navDisabled = !hasMatches;

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 px-4 py-3 mb-6 bg-bordello-bg/95 backdrop-blur border-b border-bordello-border">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-stretch">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bordello-muted pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              value={rawQuery}
              onChange={(e) => setRawQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search changelog…"
              aria-label="Search changelog"
              className="w-full pl-10 pr-44 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-sm text-white placeholder:text-bordello-muted focus:outline-none focus:ring-1"
              style={ringStyle}
            />
            {isSearching && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span
                  className="text-xs text-bordello-muted tabular-nums px-1 select-none"
                  aria-live="polite"
                >
                  {hasMatches ? `${currentIndex + 1} of ${matches.length}` : '0 of 0'}
                </span>
                <button
                  type="button"
                  onClick={gotoPrev}
                  disabled={navDisabled}
                  aria-label="Previous match"
                  title="Previous match (Shift+Enter)"
                  className="w-6 h-6 flex items-center justify-center rounded text-bordello-muted hover:text-white hover:bg-bordello-bg/50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-bordello-muted"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={gotoNext}
                  disabled={navDisabled}
                  aria-label="Next match"
                  title="Next match (Enter)"
                  className="w-6 h-6 flex items-center justify-center rounded text-bordello-muted hover:text-white hover:bg-bordello-bg/50 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-bordello-muted"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setRawQuery('')}
                  aria-label="Clear search"
                  className="w-6 h-6 flex items-center justify-center rounded text-bordello-muted hover:text-white hover:bg-bordello-bg/50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
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
          </div>
        </div>
        {isSearching && (
          <p className="text-xs text-bordello-muted mt-2">
            {matchedVersionCount === 0
              ? 'No matching versions found.'
              : `${matchedVersionCount} matching ${matchedVersionCount === 1 ? 'version' : 'versions'}`}
          </p>
        )}
      </div>

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
            labelNode={<HighlightedLabel text={block.label} query={lowerQuery} />}
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
