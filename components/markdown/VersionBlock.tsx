'use client';

import { useEffect, useRef } from 'react';

interface VersionBlockProps {
  version: string;
  label: string;
  html: string;
  isExpanded: boolean;
  onToggle?: () => void;
  query?: string;
  labelNode?: React.ReactNode;
}

function applyHighlights(el: HTMLElement, query: string) {
  const lower = query.toLowerCase();
  if (!lower) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
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
      mark.className = 'bg-yellow-400/25 text-inherit rounded-[2px] px-0.5';
      mark.textContent = text.slice(idx, idx + query.length);
      frag.appendChild(mark);
      i = idx + query.length;
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  }
}

export function VersionBlock({
  version,
  label,
  html,
  isExpanded,
  onToggle,
  query,
  labelNode,
}: VersionBlockProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isExpanded || !articleRef.current) return;
    const el = articleRef.current;
    el.innerHTML = html;
    if (query && query.trim()) applyHighlights(el, query.trim());
  }, [query, isExpanded, html]);

  return (
    <div id={`version-${version}`} className="border border-bordello-border rounded-lg mb-3 overflow-hidden">
      <button
        onClick={onToggle}
        disabled={!onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
          onToggle ? 'hover:bg-bordello-surface/50 cursor-pointer' : 'cursor-default'
        } ${isExpanded ? 'bg-bordello-surface' : 'bg-bordello-bg'}`}
      >
        <span className="text-lg font-semibold text-white">{labelNode ?? label}</span>
        {onToggle && (
          <svg
            className={`w-5 h-5 text-bordello-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {isExpanded && (
        <div className="px-5 py-4">
          <article ref={articleRef} className="prose" />
        </div>
      )}
    </div>
  );
}
