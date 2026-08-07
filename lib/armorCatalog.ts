import fs from 'fs';
import path from 'path';
import { ArmorSet } from '@/types/armorCatalog';

// The CSV is Cirus's Google Sheet export, copied into the repo verbatim.
// Its column schema must stay exactly as his sheet exports it — the parser
// absorbs the quirks (embedded JSON column, boolean columns) so the file
// itself remains drop-in replaceable on every update.
const CSV_PATH = path.join(process.cwd(), 'content', 'armor-catalog', 'armor-catalog-master.csv');

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

// Known typo/near-duplicate tag values in the sheet, folded into their
// canonical form so filters never fragment. The sheet export may reintroduce
// them at any time, so this lives here rather than in the CSV.
const TAG_ALIASES: Record<string, string> = {
  Lingere: 'Lingerie',
  Assasssin: 'Assassin',
  Khajiti: 'Khajiit',
  Pirates: 'Pirate',
  'Volkihar Vampier Clan': 'Volkihar Vampire Clan',
};

const splitList = (value: string): string[] =>
  value
    .split(/[;,/]/)
    .map((v) => v.trim())
    .map((v) => TAG_ALIASES[v] ?? v)
    .filter(Boolean);

const isTrue = (value: string): boolean => value.trim().toUpperCase() === 'TRUE';

function parseSupport(value: string): Record<string, string> {
  if (!value.trim()) return {};
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return Object.fromEntries(
        Object.entries(parsed).map(([k, v]) => [k, String(v ?? '')]),
      );
    }
  } catch {
    // Malformed support JSON in a row should not break the whole catalog.
  }
  return {};
}

let cache: ArmorSet[] | null = null;

export function getAllArmorSets(): ArmorSet[] {
  if (cache) return cache;
  const text = fs.readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, '');
  const rows = parseCsv(text);
  const header = rows.shift() ?? [];
  const index = Object.fromEntries(header.map((name, i) => [name.trim(), i]));
  const get = (row: string[], name: string): string => row[index[name]] ?? '';

  cache = rows
    .map((row, i): ArmorSet => {
      const themes = splitList(get(row, 'Themes'));
      if (isTrue(get(row, 'Modular'))) themes.push('Modular');
      if (isTrue(get(row, 'Multi-colored'))) themes.push('Multi-colored');

      const categories = splitList(get(row, 'Categories'));
      if (isTrue(get(row, 'Clothing'))) categories.push('Cloth');
      if (isTrue(get(row, 'Light'))) categories.push('Light');
      if (isTrue(get(row, 'Heavy'))) categories.push('Heavy');

      const content = get(row, 'Content').trim();

      return {
        id: Number(get(row, 'ID')) || i + 1,
        name: get(row, 'Name').trim(),
        originalName: get(row, 'Original Name').trim(),
        author: get(row, 'Author').trim(),
        authorUrl: get(row, 'Author URL').trim(),
        modUrl: get(row, 'Mod URL').trim(),
        style: get(row, 'Style').trim(),
        categories: Array.from(new Set(categories)),
        gender: splitList(get(row, 'Gender')),
        themes: Array.from(new Set(themes)),
        armorTier: get(row, 'Armor Tier').trim(),
        support: parseSupport(get(row, 'Body & Physics Support (JSON)')),
        imageUrl: get(row, 'Image URL').trim(),
        thumbnailUrl: get(row, 'Thumbnail URL').trim() || get(row, 'Image URL').trim(),
        nsfw: content.toUpperCase() === 'NSFW',
        sfw: content.toUpperCase() === 'STANDARD',
        included: get(row, 'Site Status').trim().toUpperCase() === 'INCLUDE',
      };
    })
    .filter((item) => item.included && item.name && item.modUrl);
  return cache;
}

// Shared catalog (JOJ · MOM · HOH · DOD): every included set.
export function getSharedArmorSets(): ArmorSet[] {
  return getAllArmorSets();
}

// TOT catalog: explicit allowlist — only sets marked Standard. A row with a
// blank or new Content value stays out of the SFW catalog rather than leaking in.
export function getTotArmorSets(): ArmorSet[] {
  return getAllArmorSets().filter((item) => item.sfw);
}
