'use client';

import { useMemo, useRef, useState } from 'react';
import { KodexNode, KodexSection, KodexModRow } from '@/lib/kodex';
import {
  HighlightedText,
  SearchBar,
  useSearchHighlights,
} from '@/components/markdown/searchUtils';

interface KodexClientProps {
  nodes: KodexNode[];
  accentColor: string;
  stickyTopClassName?: string;
}

function modMatches(mod: KodexModRow, q: string): boolean {
  if (!q) return false;
  const hay = `${mod.name} ${mod.version || ''}`.toLowerCase();
  return hay.includes(q);
}

function sectionMatches(section: KodexSection, q: string): boolean {
  return section.mods.some((m) => modMatches(m, q));
}

function collectSections(nodes: KodexNode[]): KodexSection[] {
  const out: KodexSection[] = [];
  for (const node of nodes) {
    if (node.kind === 'group') out.push(...node.children);
    else out.push(node);
  }
  return out;
}

function SectionCard({
  section,
  accentColor,
  headingLevel,
  query,
  isOpen,
  onToggle,
}: {
  section: KodexSection;
  accentColor: string;
  headingLevel: 'h2' | 'h3';
  query: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Heading = headingLevel;
  const matchCount = query ? section.mods.filter((m) => modMatches(m, query)).length : 0;
  return (
    <section>
      <Heading id={section.id} className="visually-hidden">
        {section.title}
      </Heading>
      <div
        className="rounded-lg border border-bordello-border bg-bordello-surface/50 overflow-hidden"
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full cursor-pointer px-4 py-3 flex items-center justify-between gap-3 hover:bg-bordello-surface transition-colors select-none text-left"
          style={{ borderLeft: `3px solid ${accentColor}` }}
        >
          <span className="text-base font-semibold text-white">{section.title}</span>
          <span className="flex items-center gap-3 shrink-0">
            {matchCount > 0 && (
              <span
                className="text-[11px] font-semibold tabular-nums px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-200"
                aria-label={`${matchCount} matching ${matchCount === 1 ? 'mod' : 'mods'} in this section`}
              >
                {matchCount}
              </span>
            )}
            <span className="text-xs text-bordello-muted">
              {section.mods.length} {section.mods.length === 1 ? 'mod' : 'mods'}
            </span>
            <svg
              className={`w-4 h-4 text-bordello-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        {isOpen && (
          <div className="overflow-x-auto border-t border-bordello-border">
            <table className="w-full text-sm">
              <thead className="bg-bordello-bg/50 text-bordello-muted">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Mod Name</th>
                  <th className="text-left font-medium px-4 py-2 whitespace-nowrap">Mod Version</th>
                  <th className="text-left font-medium px-4 py-2 whitespace-nowrap">Is Enabled</th>
                  <th className="text-left font-medium px-4 py-2">Priority</th>
                </tr>
              </thead>
              <tbody>
                {section.mods.map((mod, i) => (
                  <tr
                    key={`${section.id}-${i}`}
                    className="border-t border-bordello-border/50 hover:bg-bordello-bg/40"
                  >
                    <td className="px-4 py-2">
                      {mod.nexusUrl ? (
                        <a
                          href={mod.nexusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          style={{ color: accentColor }}
                        >
                          <HighlightedText text={mod.name} query={query} />
                        </a>
                      ) : (
                        <span className="text-bordello-text">
                          <HighlightedText text={mod.name} query={query} />
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-bordello-muted whitespace-nowrap">
                      {mod.version ? <HighlightedText text={mod.version} query={query} /> : '—'}
                    </td>
                    <td className="px-4 py-2 text-bordello-muted">{mod.enabled}</td>
                    <td className="px-4 py-2 text-bordello-muted">{mod.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export function KodexClient({ nodes, accentColor, stickyTopClassName }: KodexClientProps) {
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  const allSections = useMemo(() => collectSections(nodes), [nodes]);
  const allSectionIds = useMemo(() => allSections.map((s) => s.id), [allSections]);

  const matchedSectionIds = useMemo(() => {
    if (!isSearching) return new Set<string>();
    const ids = new Set<string>();
    for (const s of allSections) {
      if (sectionMatches(s, query)) ids.add(s.id);
    }
    return ids;
  }, [allSections, query, isSearching]);

  const matchedModCount = useMemo(() => {
    if (!isSearching) return 0;
    let count = 0;
    for (const s of allSections) {
      for (const m of s.mods) if (modMatches(m, query)) count++;
    }
    return count;
  }, [allSections, query, isSearching]);

  const [manuallyExpanded, setManuallyExpanded] = useState<Set<string>>(new Set());

  function isOpen(id: string): boolean {
    if (isSearching) return matchedSectionIds.has(id) || manuallyExpanded.has(id);
    return manuallyExpanded.has(id);
  }

  function toggle(id: string) {
    setManuallyExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandAll() {
    setManuallyExpanded(new Set(allSectionIds));
    setRawQuery('');
  }

  function collapseAll() {
    setManuallyExpanded(new Set());
    setRawQuery('');
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const openSectionsKey = useMemo(() => {
    const open = allSectionIds.filter((id) => isOpen(id));
    return open.join('|');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSectionIds, manuallyExpanded, matchedSectionIds, isSearching]);

  const { matches, currentIndex, next, prev, onInputKeyDown } = useSearchHighlights(
    containerRef,
    query,
    `${openSectionsKey}::${query}`
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

  const matchedSectionCount = matchedSectionIds.size;
  const resultSummary =
    matchedModCount === 0
      ? 'No matching mods found.'
      : `${matchedModCount} matching ${matchedModCount === 1 ? 'mod' : 'mods'} in ${matchedSectionCount} ${matchedSectionCount === 1 ? 'section' : 'sections'}`;

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
        placeholder="Search mods…"
        trailingControls={trailingControls}
        resultSummary={resultSummary}
        stickyTopClassName={stickyTopClassName}
      />

      <p className="text-sm text-bordello-text mb-4">
        Powered by{' '}
        <a
          href="https://www.nexusmods.com/skyrimspecialedition/mods/157869"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: accentColor }}
        >
          Kodex
        </a>{' '}
        by{' '}
        <a
          href="https://www.nexusmods.com/profile/Kyler45"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: accentColor }}
        >
          Kyler
        </a>
      </p>

      <div ref={containerRef} className="space-y-6">
        {nodes.length === 0 && (
          <p className="text-bordello-muted">No Kodex data available for this modlist.</p>
        )}
        {nodes.map((node) => {
          if (node.kind === 'group') {
            return (
              <div key={node.id} className="space-y-3">
                <h2
                  id={node.id}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-bordello-muted pb-2 border-b"
                  style={{ borderColor: accentColor }}
                >
                  {node.title}
                </h2>
                {node.children.length > 0 && (
                  <div className="space-y-3">
                    {node.children.map((child) => (
                      <SectionCard
                        key={child.id}
                        section={child}
                        accentColor={accentColor}
                        headingLevel="h3"
                        query={query}
                        isOpen={isOpen(child.id)}
                        onToggle={() => toggle(child.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <SectionCard
              key={node.id}
              section={node}
              accentColor={accentColor}
              headingLevel="h2"
              query={query}
              isOpen={isOpen(node.id)}
              onToggle={() => toggle(node.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
