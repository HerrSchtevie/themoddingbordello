'use client';

import Link from 'next/link';
import { QuizResult as QuizResultType } from '@/lib/quiz';
import { modlistBySlug } from '@/lib/modlists';
import { arrConfig } from '@/lib/arr';

interface QuizResultProps {
  result: QuizResultType;
  onReset: () => void;
}

export function QuizResult({ result, onReset }: QuizResultProps) {
  const isArr = result.list === 'arr';

  if (isArr) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Your Path Awaits</h2>
        <p className="text-bordello-muted mb-10">Based on your preferences, we recommend:</p>

        <div
          className="p-8 rounded-xl border-2 mb-8"
          style={{ borderColor: arrConfig.accentColor }}
        >
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-bordello-bg text-bordello-muted border border-bordello-border mb-3 inline-block">
            {arrConfig.label}
          </span>
          <span
            className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4 ml-2"
            style={{ backgroundColor: arrConfig.accentColor, color: '#fff' }}
          >
            {arrConfig.abbreviation}
          </span>
          <h3 className="text-3xl font-bold text-white mb-2">{arrConfig.name}</h3>
          <p className="text-sm text-bordello-muted italic mb-4">{arrConfig.tagline}</p>
          <p className="text-sm text-bordello-text mb-4">{arrConfig.description}</p>

          <ul className="text-left space-y-2 mb-8 max-w-md mx-auto">
            {result.reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-bordello-text">
                <span className="text-white mt-0.5">-</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          <a
            href={arrConfig.links.readme}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-white transition-colors hover:brightness-125"
            style={{ backgroundColor: arrConfig.accentColor }}
          >
            View ARR Overview
          </a>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { label: 'Gameplay Guide', url: arrConfig.links.gameplayGuide },
              { label: 'Nexus Page', url: arrConfig.links.nexus },
              { label: 'Load Order Library', url: arrConfig.links.loadOrder },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bordello-muted hover:text-white transition-colors underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <button
          onClick={onReset}
          className="text-sm text-bordello-muted hover:text-white transition-colors"
        >
          Take the quiz again
        </button>
      </div>
    );
  }

  // Standard core modlist result
  const list = modlistBySlug[result.list];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Your Path Awaits</h2>
      <p className="text-bordello-muted mb-10">Based on your preferences, we recommend:</p>

      <div
        className="p-8 rounded-xl border-2 mb-8"
        style={{ borderColor: list.accentColor }}
      >
        <span
          className="inline-block text-sm font-semibold px-3 py-1 rounded-full mb-4"
          style={{ backgroundColor: list.accentColor, color: '#fff' }}
        >
          {list.abbreviation}
        </span>
        <h3 className="text-3xl font-bold text-white mb-2">{list.name}</h3>
        <p className="text-sm text-bordello-muted italic mb-4">{list.tagline}</p>
        {result.profile && (
          <p className="text-lg text-bordello-text mb-4">
            {result.profile === 'lords-vision' ? "Lord's Vision" : 'Performance'} Profile
          </p>
        )}

        <ul className="text-left space-y-2 mb-8 max-w-md mx-auto">
          {result.reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-bordello-text">
              <span className="text-white mt-0.5">-</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`/modlists/${list.slug}/overview`}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-white transition-colors hover:brightness-125"
            style={{ backgroundColor: list.accentColor }}
          >
            View {list.abbreviation} Overview
          </Link>
          <Link
            href={`/sos-pre-install-checker?list=${list.slug}${result.profile ? `&profile=${result.profile}` : ''}`}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-bordello-text bg-bordello-surface border border-bordello-border hover:text-white hover:border-bordello-muted/50 transition-colors"
          >
            Step 2: Validate Your Setup
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            ...(list.pages.gameplayGuide
              ? [{ label: 'Gameplay Guide', url: `/modlists/${list.slug}/gameplay-guide`, external: false }]
              : []),
            { label: 'Nexus Page', url: list.links.nexus, external: true },
            { label: 'Load Order Library', url: list.links.loadOrder, external: true },
          ].map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bordello-muted hover:text-white transition-colors underline underline-offset-2"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.url}
                className="text-sm text-bordello-muted hover:text-white transition-colors underline underline-offset-2"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="text-sm text-bordello-muted hover:text-white transition-colors"
      >
        Take the quiz again
      </button>
    </div>
  );
}
