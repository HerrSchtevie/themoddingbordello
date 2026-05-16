'use client';

import { useEffect, useRef, useState } from 'react';
import { SearchBar, clearHighlights, useSearchHighlights, walkAndHighlight } from './searchUtils';

interface MarkdownSearchViewProps {
  html: string;
  accentColor?: string;
  placeholder?: string;
  stickyTopClassName?: string;
}

export function MarkdownSearchView({
  html,
  accentColor,
  placeholder = 'Search…',
  stickyTopClassName,
}: MarkdownSearchViewProps) {
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.trim().toLowerCase();

  const containerRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [hasDetails, setHasDetails] = useState(false);

  useEffect(() => {
    if (!articleRef.current) return;
    articleRef.current.innerHTML = html;
    setHasDetails(articleRef.current.querySelectorAll('details').length > 0);
  }, [html]);

  useEffect(() => {
    if (!articleRef.current) return;
    const el = articleRef.current;
    clearHighlights(el);
    if (!query) return;
    walkAndHighlight(el, query);
    // Open every <details> that contains a match so the marks are visible
    // and scroll-into-view targets land on something that's actually rendered.
    el.querySelectorAll('mark[data-search-highlight]').forEach((mark) => {
      let parent: HTMLElement | null = mark.parentElement;
      while (parent && parent !== el) {
        if (parent.tagName === 'DETAILS') {
          (parent as HTMLDetailsElement).open = true;
        }
        parent = parent.parentElement;
      }
    });
  }, [query, html]);

  const { matches, currentIndex, next, prev, onInputKeyDown } = useSearchHighlights(
    containerRef,
    query,
    `${html.length}::${query}`
  );

  function expandAll() {
    if (!articleRef.current) return;
    articleRef.current.querySelectorAll('details').forEach((d) => {
      (d as HTMLDetailsElement).open = true;
    });
  }

  function collapseAll() {
    if (!articleRef.current) return;
    articleRef.current.querySelectorAll('details').forEach((d) => {
      (d as HTMLDetailsElement).open = false;
    });
  }

  const isSearching = query.length > 0;
  const resultSummary = isSearching
    ? matches.length === 0
      ? 'No matches found.'
      : `${matches.length} ${matches.length === 1 ? 'match' : 'matches'}`
    : undefined;

  const trailingControls = hasDetails ? (
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
  ) : undefined;

  return (
    <div ref={containerRef}>
      <SearchBar
        query={rawQuery}
        onQueryChange={setRawQuery}
        matches={matches}
        currentIndex={currentIndex}
        onNext={next}
        onPrev={prev}
        onInputKeyDown={onInputKeyDown}
        accentColor={accentColor}
        placeholder={placeholder}
        resultSummary={resultSummary}
        stickyTopClassName={stickyTopClassName}
        trailingControls={trailingControls}
      />
      <article ref={articleRef} className="prose" />
    </div>
  );
}
