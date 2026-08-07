'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Same key Cirus's Workers build used, so the convention carries forward.
const ACCEPTANCE_KEY = 'moddingBordelloNsfwAccepted';

export function NsfwGate({ children }: { children: React.ReactNode }) {
  // 'pending' until we can read localStorage after mount; the gate stays up
  // for that first paint so non-accepted visitors never glimpse the content.
  const [state, setState] = useState<'pending' | 'gated' | 'accepted'>('pending');

  useEffect(() => {
    try {
      setState(localStorage.getItem(ACCEPTANCE_KEY) === 'true' ? 'accepted' : 'gated');
    } catch {
      setState('gated');
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(ACCEPTANCE_KEY, 'true');
    } catch {
      // Continue anyway — the acceptance just won't persist.
    }
    setState('accepted');
  };

  return (
    <>
      {state !== 'accepted' && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Mature-content notice"
        >
          {state === 'gated' && (
            <article className="w-full max-w-md rounded-xl border border-bordello-border bg-bordello-surface p-8 text-center shadow-2xl">
              <p className="inline-block px-3 py-1 rounded-full border border-bordello-border text-sm font-bold text-white tracking-widest">
                18+
              </p>
              <p className="text-xs uppercase tracking-widest text-bordello-muted mt-4">Mature-content notice</p>
              <h1 className="text-2xl font-bold text-white mt-2">Before you enter the archive</h1>
              <p className="text-sm text-bordello-muted mt-4">
                This catalog contains armor and imagery that may be considered NSFW or intended for mature audiences.
              </p>
              <p className="text-sm text-bordello-muted mt-2">
                By continuing, you confirm that you are 18 or older and comfortable viewing mature content.
              </p>
              <div className="flex flex-col gap-2 mt-6">
                <button
                  type="button"
                  onClick={accept}
                  autoFocus
                  className="px-4 py-2.5 rounded-lg bg-white/10 border border-bordello-muted/40 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                >
                  Enter the archive
                </button>
                <Link
                  href="/"
                  className="px-4 py-2.5 rounded-lg border border-bordello-border text-sm text-bordello-muted hover:text-white transition-colors"
                >
                  Take me back
                </Link>
              </div>
            </article>
          )}
        </div>
      )}
      <div aria-hidden={state !== 'accepted'} className={state !== 'accepted' ? 'invisible' : undefined}>
        {children}
      </div>
    </>
  );
}
