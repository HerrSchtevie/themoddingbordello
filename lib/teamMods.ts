import fs from 'fs';
import path from 'path';
import { TeamMod } from '@/types/teamMods';

// Same philosophy as the armor catalog: the CSV is the drop-in source of
// truth (mastered in the project context folder, copied here verbatim).
// The parser absorbs the quirks so the file stays replaceable on update.
// Cover images are pre-resolved staticdelivery.nexusmods.com URLs; refresh
// blank ones with scripts/refresh-team-mod-images.mjs.
const CSV_PATH = path.join(process.cwd(), 'content', 'team-mods', 'team-mods-master.csv');

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (ch === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (ch === ',' && !quoted) {
      row.push(cell);
      cell = '';
    } else if ((ch === '\n' || ch === '\r') && !quoted) {
      if (ch === '\r' && next === '\n') i += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }
  row.push(cell);
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

let cache: TeamMod[] | null = null;

export function getAllTeamMods(): TeamMod[] {
  if (cache) return cache;
  // On dynamic routes this runs per-request inside the deployed function,
  // whose bundle only holds files Next's output tracing captured. If the
  // CSV is ever missing there (the 2026-08-07 pre-install-checker outage),
  // degrade to an empty roster instead of 500ing the whole route.
  let text: string;
  try {
    text = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
  } catch (err) {
    console.error('team-mods CSV unreadable, rendering empty roster:', err);
    cache = [];
    return cache;
  }
  const rows = parseCsv(text);
  const header = rows.shift() ?? [];
  const index = Object.fromEntries(header.map((name, i) => [name.trim(), i]));
  const get = (row: string[], name: string): string => (row[index[name]] ?? '').trim();

  cache = rows
    .filter((row) => get(row, 'Site Status').toUpperCase() === 'INCLUDE')
    .map(
      (row, i): TeamMod => ({
        index: Number(get(row, 'index')) || i + 1,
        sort: Number(get(row, 'Sort')) || i + 1,
        name: get(row, 'Name'),
        blurb: get(row, 'Blurb'),
        author: get(row, 'Author'),
        authorUrl: get(row, 'Author URL'),
        modUrl: get(row, 'Mod URL'),
        accent: get(row, 'Accent'),
        nsfw: get(row, 'Content').toUpperCase() === 'NSFW',
        imageUrl: get(row, 'Image URL'),
        thumbnailUrl: get(row, 'Thumbnail URL') || get(row, 'Image URL'),
      }),
    )
    .filter((item) => item.name.length > 0 && item.modUrl.length > 0)
    .sort((a, b) => a.sort - b.sort);

  return cache;
}
