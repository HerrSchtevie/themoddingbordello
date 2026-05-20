'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { ShowcaseVideo } from '@/lib/showcase-videos';

interface ShowcaseVideosProps {
  videos: ShowcaseVideo[];
  accentColor: string;
}

export function ShowcaseVideos({ videos, accentColor }: ShowcaseVideosProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % videos.length));
  }, [videos.length]);
  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + videos.length) % videos.length));
  }, [videos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, next, prev]);

  if (videos.length === 0) {
    return (
      <div className="border border-bordello-border bg-bordello-surface rounded-xl px-6 py-16 text-center">
        <p className="text-bordello-muted">Showcase videos coming soon.</p>
      </div>
    );
  }

  const active = activeIndex !== null ? videos[activeIndex] : null;

  return (
    <>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative block text-left overflow-hidden rounded-lg border border-bordello-border bg-bordello-surface transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2"
            style={{ ['--tw-ring-color' as string]: accentColor }}
            aria-label={video.title ? `Play ${video.title}` : `Play video ${i + 1} of ${videos.length}`}
          >
            <div className="relative aspect-video overflow-hidden bg-bordello-bg">
              <Image
                src={video.thumbnail}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-black/70 group-hover:bg-black/85 transition-colors"
                  style={{ boxShadow: `0 0 0 2px ${accentColor}66` }}
                >
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:brightness-125 transition-all">
                {video.title ?? 'YouTube video'}
              </h3>
              {video.author && (
                <p className="mt-1 text-xs text-bordello-muted truncate">{video.author}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {videos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 sm:left-6 text-white/80 hover:text-white p-2 z-10"
                aria-label="Previous video"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 sm:right-6 text-white/80 hover:text-white p-2 z-10"
                aria-label="Next video"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl px-4 sm:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                key={active.id}
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                title={active.title ?? 'YouTube video player'}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {(active.title || videos.length > 1) && (
              <div className="mt-3 flex items-center justify-between gap-4 text-xs text-white/70">
                <div className="min-w-0">
                  {active.title && <p className="text-sm text-white truncate">{active.title}</p>}
                  {active.author && <p className="truncate">{active.author}</p>}
                </div>
                {videos.length > 1 && (
                  <span className="shrink-0">{(activeIndex ?? 0) + 1} / {videos.length}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
