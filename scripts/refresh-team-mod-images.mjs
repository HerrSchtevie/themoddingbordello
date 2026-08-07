// Fills the Image URL / Thumbnail URL columns of the team mods CSV from
// Nexus's public (keyless) v2 GraphQL API, resolving each row's Mod URL.
//
// Usage:
//   node scripts/refresh-team-mod-images.mjs          fill blank image cells only
//   node scripts/refresh-team-mod-images.mjs --all    re-resolve every row (covers change
//                                                     when an author updates their header image)
//
// The CSV is mastered in the project context folder; after running this
// against content/team-mods/team-mods-master.csv, copy the result back to
// the master so the two stay identical.

import fs from 'node:fs';
import path from 'node:path';

const CSV_PATH = path.join(process.cwd(), 'content', 'team-mods', 'team-mods-master.csv');
const GRAPHQL_ENDPOINT = 'https://api.nexusmods.com/v2/graphql';
const refreshAll = process.argv.includes('--all');

function parseCsv(text) {
  const rows = [];
  let row = [];
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

function toCsvCell(value) {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function serializeCsv(rows) {
  return rows.map((row) => row.map(toCsvCell).join(',')).join('\n') + '\n';
}

async function fetchImageUrls(modId) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query{ mod(modId:"${modId}", gameId:"1704"){ pictureUrl thumbnailUrl } }`,
    }),
  });
  if (!res.ok) throw new Error(`Nexus GraphQL responded ${res.status}`);
  const json = await res.json();
  return json?.data?.mod ?? null;
}

const text = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
const rows = parseCsv(text);
const header = rows[0];
const col = Object.fromEntries(header.map((name, i) => [name.trim(), i]));

for (const required of ['Mod URL', 'Image URL', 'Thumbnail URL']) {
  if (col[required] === undefined) {
    console.error(`CSV is missing the "${required}" column — aborting, nothing written.`);
    process.exit(1);
  }
}

let updated = 0;
let skipped = 0;
let failed = 0;

for (let i = 1; i < rows.length; i += 1) {
  const row = rows[i];
  const modUrl = (row[col['Mod URL']] ?? '').trim();
  const modId = modUrl.match(/\/mods\/(\d+)/)?.[1];
  if (!modId) {
    skipped += 1;
    continue;
  }
  const hasImages = (row[col['Image URL']] ?? '').trim() && (row[col['Thumbnail URL']] ?? '').trim();
  if (hasImages && !refreshAll) {
    skipped += 1;
    continue;
  }
  try {
    const mod = await fetchImageUrls(modId);
    if (mod?.pictureUrl) {
      row[col['Image URL']] = mod.pictureUrl;
      row[col['Thumbnail URL']] = mod.thumbnailUrl || mod.pictureUrl;
      updated += 1;
      console.log(`updated  mod ${modId}: ${mod.pictureUrl}`);
    } else {
      failed += 1;
      console.warn(`no image mod ${modId} (row left unchanged)`);
    }
  } catch (err) {
    failed += 1;
    console.warn(`failed   mod ${modId}: ${err.message} (row left unchanged)`);
  }
}

if (updated > 0) {
  fs.writeFileSync(CSV_PATH, serializeCsv(rows), 'utf8');
}
console.log(`\n${updated} updated, ${skipped} skipped, ${failed} failed.`);
console.log(updated > 0 ? 'CSV written. Copy it back over the master in the context folder.' : 'Nothing written.');
