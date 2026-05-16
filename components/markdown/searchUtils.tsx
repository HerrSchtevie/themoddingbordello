'use client';

import {
  RefObject,
  useEffect,
  useState,
} from 'react';

export const BASE_MARK_CLASS = 'bg-yellow-400/25 text-inherit rounded-[2px] px-0.5';
export const ACTIVE_MARK_CLASS =
  'bg-yellow-300 text-bordello-bg rounded-[2px] px-0.5 ring-2 ring-yellow-200 ring-offset-1 ring-offset-bordello-bg';

export function clearHighlights(container: HTMLElement) {
  container.querySelectorAll('mark[data-search-highlight]').forEach((m) => {
    const parent = m.parentNode;
    if (!parent) return;
    while (m.firstChild) parent.insertBefore(m.firstChild, m);
    parent.removeChild(m);
  });
  container.normalize();
}

export function walkAndHighlight(container: HTMLElement, query: string) {
  const lower = query.toLowerCase();
  if (!lower) return;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-search-bar]')) return NodeFilter.FILTER_REJECT;
      if ((node.textContent || '').toLowerCase().includes(lower)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    },
  });
  const targets: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) targets.push(n as Text);

  for (const textNode of targets) {
    const text = textNode.textContent || '';
    const lowerText = text.toLowerCase();
    const frag = document.createDocumentFragment();
    let i = 0;
    while (i < text.length) {
      const idx = lowerText.indexOf(lower, i);
      if (idx === -1) {
        frag.appendChild(document.createTextNode(text.slice(i)));
        break;
      }
      if (idx > i) frag.appendChild(document.createTextNode(text.slice(i, idx)));
      const mark = document.createElement('mark');
      mark.setAttribute('data-search-highlight', '');
      mark.className = BASE_MARK_CLASS;
      mark.textContent = text.slice(idx, idx + query.length);
      frag.appendChild(mark);
      i = idx + query.length;
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  }
}

export function HighlightedText({ text, query }: { text: string; query: string }) {
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

export interface SearchHighlightsApi {
  matches: HTMLElement[];
  currentIndex: number;
  next: () => void;
  prev: () => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Collects mark[data-search-highlight] elements from the container, manages the
 * active match index, scrolls on navigation, and exposes keyboard handlers.
 *
 * The caller is responsible for ensuring the marks exist in the DOM (either via
 * DOM mutation with walkAndHighlight, or via JSX with HighlightedText). Pass a
 * `rescanKey` whose identity changes whenever the container's content may have
 * been updated (query change, expanded-section changes, etc.).
 */
export function useSearchHighlights(
  containerRef: RefObject<HTMLElement>,
  query: string,
  rescanKey: unknown
): SearchHighlightsApi {
  const [matches, setMatches] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollKey, setScrollKey] = useState(0);

  useEffect(() => {
    if (!query || !containerRef.current) {
      setMatches((prev) => (prev.length === 0 ? prev : []));
      setCurrentIndex((prev) => (prev === 0 ? prev : 0));
      return;
    }
    const found = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('mark[data-search-highlight]')
    );
    setMatches(found);
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, rescanKey]);

  useEffect(() => {
    matches.forEach((m, i) => {
      m.className = i === currentIndex ? ACTIVE_MARK_CLASS : BASE_MARK_CLASS;
    });
  }, [matches, currentIndex]);

  useEffect(() => {
    if (scrollKey === 0) return;
    matches[currentIndex]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollKey]);

  function next() {
    if (!matches.length) return;
    setCurrentIndex((i) => (i + 1) % matches.length);
    setScrollKey((k) => k + 1);
  }

  function prev() {
    if (!matches.length) return;
    setCurrentIndex((i) => (i - 1 + matches.length) % matches.length);
    setScrollKey((k) => k + 1);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) prev();
      else next();
    }
  }

  return { matches, currentIndex, next, prev, onInputKeyDown };
}

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  matches: HTMLElement[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  accentColor?: string;
  placeholder?: string;
  resultSummary?: React.ReactNode;
  trailingControls?: React.ReactNode;
  stickyTopClassName?: string;
}

export function SearchBar({
  query,
  onQueryChange,
  matches,
  currentIndex,
  onNext,
  onPrev,
  onInputKeyDown,
  accentColor,
  placeholder = 'Search…',
  resultSummary,
  trailingControls,
  stickyTopClassName = 'top-16',
}: SearchBarProps) {
  const isSearching = query.length > 0;
  const hasMatches = matches.length > 0;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      onQueryChange('');
      return;
    }
    onInputKeyDown?.(e);
  }

  const ringStyle = accentColor
    ? ({ '--tw-ring-color': accentColor } as React.CSSProperties)
    : undefined;

  return (
    <div
      data-search-bar=""
      className={`sticky ${stickyTopClassName} z-30 -mx-4 px-4 py-3 mb-6 bg-bordello-bg/95 backdrop-blur border-b border-bordello-border`}
    >
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
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
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
                onClick={onPrev}
                disabled={!hasMatches}
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
                onClick={onNext}
                disabled={!hasMatches}
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
                onClick={() => onQueryChange('')}
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
        {trailingControls && <div className="flex gap-2">{trailingControls}</div>}
      </div>
      {isSearching && resultSummary && (
        <p className="text-xs text-bordello-muted mt-2">{resultSummary}</p>
      )}
    </div>
  );
}
