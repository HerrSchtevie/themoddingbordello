'use client';

import { useMemo, useState } from 'react';
import { KodexNode, KodexSection, KodexModRow } from '@/lib/kodex';

interface KodexClientProps {
  nodes: KodexNode[];
  accentColor: string;
}

function matchMod(mod: KodexModRow, q: string): boolean {
  if (!q) return true;
  const hay = `${mod.name} ${mod.version || ''}`.toLowerCase();
  return hay.includes(q);
}

function filterNodes(nodes: KodexNode[], q: string): { nodes: KodexNode[]; count: number } {
  if (!q) return { nodes, count: 0 };
  const out: KodexNode[] = [];
  let count = 0;
  for (const node of nodes) {
    if (node.kind === 'group') {
      const children: KodexSection[] = [];
      for (const c of node.children) {
        const mods = c.mods.filter((m) => matchMod(m, q));
        if (mods.length) {
          children.push({ ...c, mods });
          count += mods.length;
        }
      }
      if (children.length) out.push({ ...node, children });
    } else {
      const mods = node.mods.filter((m) => matchMod(m, q));
      if (mods.length) {
        out.push({ ...node, mods });
        count += mods.length;
      }
    }
  }
  return { nodes: out, count };
}

function HighlightedText({ text, query }: { text: string; query: string }) {
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
      <mark
        key={key++}
        className="bg-yellow-400/25 text-inherit rounded-[2px] px-0.5"
      >
        {text.slice(idx, idx + query.length)}
      </mark>
    );
    i = idx + query.length;
  }
  return <>{parts}</>;
}

function SectionCard({
  section,
  accentColor,
  headingLevel,
  query,
  forceOpen,
}: {
  section: KodexSection;
  accentColor: string;
  headingLevel: 'h2' | 'h3';
  query: string;
  forceOpen: boolean;
}) {
  const Heading = headingLevel;
  return (
    <section>
      <Heading id={section.id} className="visually-hidden">
        {section.title}
      </Heading>
      <details
        className="group rounded-lg border border-bordello-border bg-bordello-surface/50 overflow-hidden"
        {...(forceOpen ? { open: true } : {})}
      >
        <summary
          className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 hover:bg-bordello-surface transition-colors select-none"
          style={{ borderLeft: `3px solid ${accentColor}` }}
        >
          <span className="text-base font-semibold text-white">
            {section.title}
          </span>
          <span className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-bordello-muted">
              {section.mods.length} {section.mods.length === 1 ? 'mod' : 'mods'}
            </span>
            <svg
              className="w-4 h-4 text-bordello-muted transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </summary>
        <div className="overflow-x-auto border-t border-bordello-border">
          <table className="w-full text-sm">
            <thead className="bg-bordello-bg/50 text-bordello-muted">
              <tr>
                <th className="text-left font-medium px-4 py-2">Mod Name</th>
                <th className="text-left font-medium px-4 py-2 whitespace-nowrap">
                  Mod Version
                </th>
                <th className="text-left font-medium px-4 py-2 whitespace-nowrap">
                  Is Enabled
                </th>
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
                    {mod.version ? (
                      <HighlightedText text={mod.version} query={query} />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-2 text-bordello-muted">{mod.enabled}</td>
                  <td className="px-4 py-2 text-bordello-muted">{mod.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

export function KodexClient({ nodes, accentColor }: KodexClientProps) {
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  const { nodes: visibleNodes, count } = useMemo(
    () => filterNodes(nodes, query),
    [nodes, query]
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
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
            placeholder="Search mods…"
            aria-label="Search mods"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-sm text-white placeholder:text-bordello-muted focus:outline-none focus:ring-1"
            style={{
              // @ts-expect-error CSS variable
              '--tw-ring-color': accentColor,
            }}
          />
          {isSearching && (
            <button
              type="button"
              onClick={() => setRawQuery('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded text-bordello-muted hover:text-white hover:bg-bordello-bg/50 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {isSearching && (
          <p className="text-xs text-bordello-muted mt-2">
            {count === 0
              ? 'No matching mods found.'
              : `${count} matching ${count === 1 ? 'mod' : 'mods'}`}
          </p>
        )}
        <p className="text-sm text-bordello-text mt-3 mb-2">
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
      </div>

      <div key={isSearching ? 'search' : 'default'} className="space-y-6">
        {visibleNodes.length === 0 && !isSearching && (
          <p className="text-bordello-muted">
            No Kodex data available for this modlist.
          </p>
        )}
        {visibleNodes.map((node) => {
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
                        forceOpen={isSearching}
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
              forceOpen={isSearching}
            />
          );
        })}
      </div>
    </div>
  );
}
