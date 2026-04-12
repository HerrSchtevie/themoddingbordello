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

function parseTOCItems(container: HTMLElement): TOCItem[] {
  const headings = container.querySelectorAll('h2[id], h3[id]');
  const items: TOCItem[] = [];
  headings.forEach((el) => {
    const id = el.getAttribute('id');
    if (!id) return;
    const text = el.textContent?.replace(/^[^\w]*/, '').trim() || '';
    if (!text) return;
    const level = el.tagName === 'H2' ? 2 : 3;
    items.push({ id, text, level });
  });
  return items;
}

export function GuideTOCSidebar({ contentId }: GuideTOCProps) {
  const { items, activeId, scrollTo, scrollToTop } = useTOC(contentId);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 shrink-0" aria-label="Table of contents">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain pr-2 pb-8 toc-scrollbar">
        <p className="text-xs font-semibold uppercase tracking-wider text-bordello-muted mb-3 px-2">
          On this page
        </p>
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
  const { items, activeId, scrollTo } = useTOC(contentId);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScrollTo = useCallback((id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  }, [scrollTo]);

  if (items.length === 0) return null;

  return (
    <>
      <div className="xl:hidden sticky top-16 z-40 py-2 bg-bordello-bg/95 backdrop-blur border-b border-bordello-border">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg border border-bordello-border bg-bordello-surface/50 text-sm"
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

  // Parse headings on mount
  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;

    const timer = setTimeout(() => {
      const parsed = parseTOCItems(container);
      setItems(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    }, 100);
    return () => clearTimeout(timer);
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
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { items, activeId, scrollTo, scrollToTop };
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
