import fs from 'fs';
import path from 'path';
import { ModlistSlug } from '@/types/modlist';
import { modlistBySlug } from './modlists';
import { loadManualDownloads, normalizeModName, ManualDownloadEntry } from './manualDownloads';
import { manualDownloadAliases } from './kodexAliases';

export type KodexModRow = {
  name: string;
  version: string;
  enabled: string;
  priority: string;
  nexusUrl?: string;
};

export type KodexSection = {
  id: string;
  title: string;
  kind: 'section';
  mods: KodexModRow[];
};

export type KodexGroup = {
  id: string;
  title: string;
  kind: 'group';
  children: KodexSection[];
};

export type KodexNode = KodexGroup | KodexSection;

const SEPARATOR_SUFFIX = ' - Separator';

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, '').trim();
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseNameCell(cell: string): { name: string; nexusUrl?: string } {
  const anchor = cell.match(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
  if (anchor) {
    return {
      name: decodeEntities(stripTags(anchor[2])),
      nexusUrl: anchor[1],
    };
  }
  return { name: decodeEntities(stripTags(cell)) };
}

export function buildKodexHierarchy(flat: KodexSection[]): KodexNode[] {
  const nodes: KodexNode[] = [];
  let currentGroup: KodexGroup | null = null;
  for (const s of flat) {
    if (s.mods.length === 0) {
      currentGroup = { id: s.id, title: s.title, kind: 'group', children: [] };
      nodes.push(currentGroup);
    } else if (currentGroup) {
      currentGroup.children.push(s);
    } else {
      nodes.push(s);
    }
  }
  return nodes;
}

export function parseKodexHtml(html: string): KodexSection[] {
  const tableStart = html.indexOf('<table id="modTable"');
  if (tableStart === -1) return [];
  const tbodyStart = html.indexOf('<tbody>', tableStart);
  const tbodyEnd = html.indexOf('</tbody>', tbodyStart);
  if (tbodyStart === -1 || tbodyEnd === -1) return [];
  const body = html.slice(tbodyStart + '<tbody>'.length, tbodyEnd);

  const rowRe =
    /<tr(?:\s+class="([^"]*)")?>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>/g;

  const sections: KodexSection[] = [];
  const seenIds = new Map<string, number>();
  let current: KodexSection | null = null;
  let orphanIdx = 0;

  let m: RegExpExecArray | null;
  while ((m = rowRe.exec(body)) !== null) {
    const [, cls, nameCell, verCell, enabledCell, prioCell] = m;
    const isSeparator = (cls || '').includes('separator-row');
    const parsed = parseNameCell(nameCell);
    const rawName = parsed.name;

    if (isSeparator || rawName.endsWith(SEPARATOR_SUFFIX)) {
      const title = rawName.endsWith(SEPARATOR_SUFFIX)
        ? rawName.slice(0, -SEPARATOR_SUFFIX.length)
        : rawName;
      let id = slugifyTitle(title) || `section-${sections.length + 1}`;
      const n = seenIds.get(id) || 0;
      seenIds.set(id, n + 1);
      if (n > 0) id = `${id}-${n + 1}`;
      current = { id, title, kind: 'section', mods: [] };
      sections.push(current);
      continue;
    }

    const row: KodexModRow = {
      name: rawName,
      version: decodeEntities(stripTags(verCell)),
      enabled: decodeEntities(stripTags(enabledCell)),
      priority: decodeEntities(stripTags(prioCell)),
      nexusUrl: parsed.nexusUrl,
    };

    if (!current) {
      orphanIdx++;
      current = {
        id: 'base-game-official-files',
        title: 'Base Game & Official Files',
        kind: 'section',
        mods: [],
      };
      sections.push(current);
    }
    current.mods.push(row);
  }

  return sections;
}

export function getKodexFilePath(slug: ModlistSlug): string {
  const abbr = modlistBySlug[slug].abbreviation;
  return path.join('content', 'kodex-outputs', `${abbr}_kodex.html`);
}

function collectSexLabSections(nodes: KodexNode[]): KodexSection[] {
  const isSexLab = (title: string) => title.trim().toLowerCase() === 'sexlab';
  const out: KodexSection[] = [];
  for (const n of nodes) {
    if (n.kind === 'group') {
      if (isSexLab(n.title)) {
        out.push(...n.children);
      } else {
        for (const c of n.children) {
          if (isSexLab(c.title)) out.push(c);
        }
      }
    } else if (isSexLab(n.title)) {
      out.push(n);
    }
  }
  return out;
}

function applyManualDownloadOverrides(
  slug: ModlistSlug,
  nodes: KodexNode[],
  downloads: ManualDownloadEntry[]
) {
  const byName = new Map<string, ManualDownloadEntry>();
  for (const d of downloads) byName.set(normalizeModName(d.title), d);

  const aliases = manualDownloadAliases[slug] || {};
  const aliasByKodexName = new Map<string, string>();
  for (const [kodexName, manualTitle] of Object.entries(aliases)) {
    aliasByKodexName.set(normalizeModName(kodexName), normalizeModName(manualTitle));
  }

  for (const section of collectSexLabSections(nodes)) {
    for (const mod of section.mods) {
      if (mod.nexusUrl) continue;
      const norm = normalizeModName(mod.name);
      let entry = byName.get(norm);
      if (!entry) {
        const aliased = aliasByKodexName.get(norm);
        if (aliased) entry = byName.get(aliased);
      }
      if (entry && entry.landingUrl) mod.nexusUrl = entry.landingUrl;
    }
  }
}

export function loadKodex(slug: ModlistSlug): KodexNode[] {
  const rel = getKodexFilePath(slug);
  const full = path.join(process.cwd(), rel);
  if (!fs.existsSync(full)) return [];
  const html = fs.readFileSync(full, 'utf-8');
  const nodes = buildKodexHierarchy(parseKodexHtml(html));
  if (slug === 'mom' || slug === 'dod') {
    applyManualDownloadOverrides(slug, nodes, loadManualDownloads(slug));
  }
  return nodes;
}
