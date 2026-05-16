'use client';

import { useEffect, useRef } from 'react';
import { walkAndHighlight } from './searchUtils';

interface VersionBlockProps {
  version: string;
  label: string;
  html: string;
  isExpanded: boolean;
  onToggle?: () => void;
  query?: string;
  labelNode?: React.ReactNode;
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
    const q = query?.trim();
    if (q) walkAndHighlight(el, q);
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
