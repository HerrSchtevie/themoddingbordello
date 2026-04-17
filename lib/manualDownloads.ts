import fs from 'fs';
import path from 'path';
import { ModlistSlug } from '@/types/modlist';
import { modlistBySlug } from './modlists';

export interface ManualDownloadEntry {
  title: string;
  url: string;
  landingUrl?: string;
}

export function toLoversLabLanding(url: string): string | undefined {
  const m = url.match(
    /^(https?:\/\/(?:www\.)?loverslab\.com\/files\/file\/[^/?#]+\/)/i
  );
  return m ? m[1] : undefined;
}

function parseManualDownloadsMarkdown(md: string): ManualDownloadEntry[] {
  const entries: ManualDownloadEntry[] = [];
  for (const line of md.split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    if (/^\|\s*:?-+/.test(line)) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((s) => s.trim());
    if (cells.length < 2) continue;
    const title = cells[0];
    const url = cells[1];
    if (!title || !url) continue;
    if (/^title$/i.test(title)) continue;
    if (!/^https?:\/\//i.test(url)) continue;
    entries.push({ title, url, landingUrl: toLoversLabLanding(url) });
  }
  return entries;
}

export function loadManualDownloads(slug: ModlistSlug): ManualDownloadEntry[] {
  const abbr = modlistBySlug[slug].abbreviation;
  const full = path.join(
    process.cwd(),
    'content',
    'manual-downloads',
    `${abbr}_Manual_Downloads.md`
  );
  if (!fs.existsSync(full)) return [];
  return parseManualDownloadsMarkdown(fs.readFileSync(full, 'utf-8'));
}

export function normalizeModName(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019\u2032`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
