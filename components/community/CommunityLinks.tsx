'use client';

import { useState } from 'react';
import { communityLinks, loadOrderEntries } from '@/lib/community';

export function CommunityLinks() {
  const [discordExpanded, setDiscordExpanded] = useState(false);
  const [lolExpanded, setLolExpanded] = useState(false);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Discord — Accordion */}
      <div
        className={`rounded-xl border border-bordello-border bg-bordello-surface/80 shadow-sm transition-all duration-200 ${
          discordExpanded ? 'sm:col-span-2 lg:col-span-3' : ''
        }`}
      >
        <button
          onClick={() => setDiscordExpanded(!discordExpanded)}
          className="group w-full flex flex-col gap-2 p-5 text-left hover:bg-bordello-surface hover:brightness-110 transition-all duration-200 rounded-xl"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium text-white group-hover:brightness-125 transition-all">
              Discord
            </span>
            <svg
              className={`w-5 h-5 text-bordello-muted transition-transform duration-200 ${discordExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="text-sm text-bordello-muted">Join the community for support, updates, and discussion.</p>
        </button>

        {discordExpanded && (
          <div className="px-5 pb-5 grid gap-2 sm:grid-cols-2">
            <a
              href="https://discord.com/invite/themoddingbordello"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 px-4 py-3 rounded-lg border border-bordello-border bg-bordello-bg/50 hover:bg-bordello-bg hover:border-bordello-muted/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:brightness-125 transition-all">
                  The Modding Bordello
                </span>
                <svg className="w-3.5 h-3.5 text-bordello-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <span className="text-xs text-bordello-muted">The official server for the modlists and resources featured on this site.</span>
            </a>
            <a
              href="https://discord.com/invite/bungalo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 px-4 py-3 rounded-lg border border-bordello-border bg-bordello-bg/50 hover:bg-bordello-bg hover:border-bordello-muted/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:brightness-125 transition-all">
                  The Modding Bungalo
                </span>
                <svg className="w-3.5 h-3.5 text-bordello-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <span className="text-xs text-bordello-muted">Our SFW sister server and affiliated community.</span>
            </a>
          </div>
        )}
      </div>

      {communityLinks.filter((link) => link.platform !== 'discord').map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-2 p-5 rounded-xl border border-bordello-border bg-bordello-surface/80 hover:bg-bordello-surface hover:border-bordello-muted/30 hover:-translate-y-0.5 hover:brightness-110 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-white group-hover:brightness-125 transition-all">
              {link.label}
            </span>
            <svg className="w-4 h-4 text-bordello-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p className="text-sm text-bordello-muted">{link.description}</p>
        </a>
      ))}

      {/* Load Order Library — Accordion */}
      <div
        className={`rounded-xl border border-bordello-border bg-bordello-surface/80 shadow-sm transition-all duration-200 ${
          lolExpanded ? 'sm:col-span-2 lg:col-span-3' : ''
        }`}
      >
        <button
          onClick={() => setLolExpanded(!lolExpanded)}
          className="group w-full flex flex-col gap-2 p-5 text-left hover:bg-bordello-surface hover:brightness-110 transition-all duration-200 rounded-xl"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium text-white group-hover:brightness-125 transition-all">
              Load Order Library
            </span>
            <svg
              className={`w-5 h-5 text-bordello-muted transition-transform duration-200 ${lolExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="text-sm text-bordello-muted">Browse full load orders for each modlist.</p>
        </button>

        {lolExpanded && (
          <div className="px-5 pb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {loadOrderEntries.map((entry) => (
              <a
                key={entry.abbreviation}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-bordello-border bg-bordello-bg/50 hover:bg-bordello-bg hover:border-bordello-muted/30 transition-all group"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: entry.accentColor }}
                />
                <span className="text-sm font-medium text-white group-hover:brightness-125 transition-all">
                  {entry.name}
                </span>
                <span className="text-xs text-bordello-muted">({entry.abbreviation})</span>
                <svg className="w-3.5 h-3.5 text-bordello-muted ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
