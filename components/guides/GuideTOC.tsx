'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface GuideTOCProps {
  contentId: string;
}

/**
 * Open all ancestor &lt;details&gt; elements (for headings nested inside cards)
 * and, if the element is a sibling before a &lt;details&gt;, open that too
 * (for visually-hidden headings that sit just before their card).
 */
function revealElement(el: Element) {
  // 1. Open any ancestor <details> (for headings nested inside cards)
  let parent: Element | null = el.parentElement;
  while (parent) {
    if (parent.tagName === 'DETAILS') {
      (parent as HTMLDetailsElement).open = true;
    }
    parent = parent.parentElement;
  }
  // 2. Walk forward looking for an adjacent <details> card to open.
  //    If the element is wrapped (e.g. <a> inside <p>), walk up through
  //    wrapper elements until we find one with forward siblings.
  let start: Element | null = el;
  while (start && !start.nextElementSibling && start.parentElement) {
    start = start.parentElement;
  }
  if (!start) return;
  let sibling: Element | null = start.nextElementSibling;
  while (
    sibling &&
    sibling.tagName !== 'DETAILS' &&
    sibling.tagName !== 'HR' &&
    (!/^H[1-6]$/.test(sibling.tagName) || sibling.classList.contains('visually-hidden'))
  ) {
    sibling = sibling.nextElementSibling;
  }
  if (sibling?.tagName === 'DETAILS') {
    (sibling as HTMLDetailsElement).open = true;
  }
}

/** Patterns for headings that are status labels / notes, not navigational sections */
const EXCLUDED_PATTERNS = [
  /^not available in /i,
  /^table of contents$/i,
  /^only available in /i,
  /^requires /i,
  /^notes?$/i,
  /^story & custom followers$/i,
  /^magical companions$/i,
  /^warriors & combat allies$/i,
  /^vanilla expansion mods$/i,
  /^follower banter (& commentary )?guide$/i,
  /^conclusion$/i,
];

function isExcludedHeading(text: string): boolean {
  return EXCLUDED_PATTERNS.some((re) => re.test(text));
}

/**
 * Check if a heading lives inside an authored "Table of Contents" block.
 * These blocks start with an h2 containing "Table of Contents" and end at
 * the next <hr> element. Category headings inside (e.g. h3 groupings in
 * the Player Home Guide) are not real content sections.
 */
function isInsideTOCBlock(el: Element): boolean {
  let sibling: Element | null = el.previousElementSibling;
  while (sibling) {
    if (sibling.tagName === 'HR') return false; // hit an hr before any TOC heading — outside
    if (/^H[12]$/.test(sibling.tagName) && /table of contents/i.test(sibling.textContent || '')) {
      return true;
    }
    sibling = sibling.previousElementSibling;
  }
  return false;
}

function parseTOCItems(container: HTMLElement): TOCItem[] {
  const headings = container.querySelectorAll('h2[id], h3[id]');
  const items: TOCItem[] = [];
  headings.forEach((el) => {
    const id = el.getAttribute('id');
    if (!id) return;
    const text = el.textContent?.replace(/^[^\w]*/, '').trim() || '';
    if (!text) return;
    if (isExcludedHeading(text)) return;
    if (isInsideTOCBlock(el)) return;
    const level = el.tagName === 'H2' ? 2 : 3;
    items.push({ id, text, level });
  });
  return items;
}

export function GuideTOCSidebar({ contentId }: GuideTOCProps) {
  const { items, activeId, scrollTo, scrollToTop, expandAll, collapseAll, hasDetails } = useTOC(contentId);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 shrink-0" aria-label="Table of contents">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain pr-2 pb-8 toc-scrollbar">
        <p className="text-xs font-semibold uppercase tracking-wider text-bordello-muted mb-3 px-2">
          On this page
        </p>
        {hasDetails && (
          <div className="flex gap-2 px-2 mb-3">
            <button
              onClick={expandAll}
              className="text-xs text-bordello-muted hover:text-white transition-colors"
            >
              Expand All
            </button>
            <span className="text-bordello-border">|</span>
            <button
              onClick={collapseAll}
              className="text-xs text-bordello-muted hover:text-white transition-colors"
            >
              Collapse All
            </button>
          </div>
        )}
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left text-sm leading-snug py-1.5 rounded transition-colors duration-150 ${
                  item.level === 3 ? 'pl-6 pr-2' : 'pl-2 pr-2'
                } ${
                  activeId === item.id
                    ? 'text-white bg-bordello-surface/60 font-medium'
                    : 'text-bordello-muted hover:text-bordello-text hover:bg-bordello-surface/30'
                }`}
              >
                <span className="line-clamp-2">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-bordello-border">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-bordello-muted hover:text-white transition-colors px-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </nav>
  );
}

export function GuideTOCMobile({ contentId }: GuideTOCProps) {
  const { items, activeId, scrollTo, expandAll, collapseAll, hasDetails } = useTOC(contentId);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScrollTo = useCallback((id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  }, [scrollTo]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="xl:hidden sticky top-16 z-40 py-2 bg-bordello-bg/95 backdrop-blur border-b border-bordello-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-between flex-1 px-3 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-sm"
          >
            <span className="text-bordello-muted">Jump to Section</span>
          <svg
            className={`w-4 h-4 text-bordello-muted transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          </button>
          {hasDetails && (
            <div className="flex gap-1 shrink-0">
              <button
                onClick={expandAll}
                className="px-2 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-bordello-muted hover:text-white transition-colors"
                aria-label="Expand all sections"
                title="Expand All"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
              <button
                onClick={collapseAll}
                className="px-2 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-bordello-muted hover:text-white transition-colors"
                aria-label="Collapse all sections"
                title="Collapse All"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4H4v5m0-5l5 5m6-5h5v5m0-5l-5 5M9 20H4v-5m0 5l5-5m6 5h5v-5m0 5l-5-5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {mobileOpen && (
          <div className="mt-1 max-h-64 overflow-y-auto overscroll-contain rounded-lg border border-bordello-border bg-bordello-surface shadow-xl">
            <ul className="py-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScrollTo(item.id)}
                    className={`block w-full text-left text-sm py-2 transition-colors ${
                      item.level === 3 ? 'pl-7 pr-3' : 'pl-3 pr-3'
                    } ${
                      activeId === item.id
                        ? 'text-white bg-bordello-bg/50 font-medium'
                        : 'text-bordello-muted hover:text-white hover:bg-bordello-bg/30'
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <BackToTopButton />
    </>
  );
}

/* Shared hook for TOC state + scrollspy */
function useTOC(contentId: string) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElements = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  // Parse headings on mount and re-parse when the content DOM changes
  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;

    let rafId = 0;
    const reparse = () => {
      const parsed = parseTOCItems(container);
      setItems((prev) => {
        if (
          prev.length === parsed.length &&
          prev.every((p, i) => p.id === parsed[i].id && p.text === parsed[i].text)
        ) {
          return prev;
        }
        return parsed;
      });
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(reparse);
    };

    const timer = setTimeout(() => {
      reparse();
    }, 100);

    const observer = new MutationObserver(() => schedule());
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [contentId]);

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    if (items.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        headingElements.current.set(entry.target.id, entry);
      });

      const visibleHeadings: IntersectionObserverEntry[] = [];
      headingElements.current.forEach((entry) => {
        if (entry.isIntersecting) visibleHeadings.push(entry);
      });

      if (visibleHeadings.length > 0) {
        visibleHeadings.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveId(visibleHeadings[0].target.id);
      } else {
        const allEntries = Array.from(headingElements.current.values());
        const aboveViewport = allEntries.filter(
          (e) => e.boundingClientRect.top < 80
        );
        if (aboveViewport.length > 0) {
          aboveViewport.sort(
            (a, b) => b.boundingClientRect.top - a.boundingClientRect.top
          );
          setActiveId(aboveViewport[0].target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: [0, 1],
    });

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current!.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      headingElements.current.clear();
    };
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    revealElement(el);
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Expand / Collapse all <details> in the content container
  const [hasDetails, setHasDetails] = useState(false);

  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;
    setHasDetails(container.querySelectorAll('details').length > 0);
  }, [contentId, items]);

  const expandAll = useCallback(() => {
    const container = document.getElementById(contentId);
    if (!container) return;
    container.querySelectorAll('details').forEach((d) => {
      (d as HTMLDetailsElement).open = true;
    });
  }, [contentId]);

  const collapseAll = useCallback(() => {
    const container = document.getElementById(contentId);
    if (!container) return;
    container.querySelectorAll('details').forEach((d) => {
      (d as HTMLDetailsElement).open = false;
    });
  }, [contentId]);

  // Handle hash on page load and hash changes (back/forward, authored TOC clicks)
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const el = document.getElementById(decodeURIComponent(hash));
      if (!el) return;
      revealElement(el);
      requestAnimationFrame(() => {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    }

    const timer = setTimeout(handleHash, 200);
    window.addEventListener('hashchange', handleHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  return { items, activeId, scrollTo, scrollToTop, expandAll, collapseAll, hasDetails };
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="xl:hidden fixed bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-bordello-surface border border-bordello-border text-bordello-muted hover:text-white hover:bg-bordello-bg transition-colors shadow-lg"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
