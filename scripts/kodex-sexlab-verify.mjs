import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');

function stripTags(s) { return s.replace(/<[^>]*>/g, '').trim(); }
function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}
function normalize(s) {
  return s.toLowerCase()
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019\u2032`]/g, "'")
    .replace(/\s+/g, ' ').trim();
}

function parseKodex(html) {
  const tableStart = html.indexOf('<table id="modTable"');
  const tbodyStart = html.indexOf('<tbody>', tableStart);
  const tbodyEnd = html.indexOf('</tbody>', tbodyStart);
  const body = html.slice(tbodyStart + 7, tbodyEnd);
  const rowRe = /<tr(?:\s+class="([^"]*)")?>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>/g;
  const sections = []; let m; let cur = null;
  while ((m = rowRe.exec(body)) !== null) {
    const [, cls, nameCell] = m;
    const isSep = (cls || '').includes('separator-row');
    const anchor = nameCell.match(/<a[^>]*>([\s\S]*?)<\/a>/i);
    const name = decode(stripTags(anchor ? anchor[1] : nameCell));
    if (isSep || name.endsWith(' - Separator')) {
      const title = name.endsWith(' - Separator') ? name.slice(0, -12) : name;
      cur = { title, mods: [] }; sections.push(cur);
    } else {
      if (!cur) { cur = { title: 'Base Game & Official Files', mods: [] }; sections.push(cur); }
      cur.mods.push(name);
    }
  }
  return sections;
}

function groupHierarchy(flat) {
  const nodes = []; let g = null;
  for (const s of flat) {
    if (s.mods.length === 0) { g = { kind: 'group', title: s.title, children: [] }; nodes.push(g); }
    else if (g) g.children.push(s);
    else nodes.push({ kind: 'section', title: s.title, mods: s.mods });
  }
  return nodes;
}

function collectSexLab(nodes) {
  const out = [];
  for (const n of nodes) {
    if (n.kind === 'group') {
      if (n.title.toLowerCase() === 'sexlab') out.push(...n.children);
      else for (const c of n.children) if (c.title.toLowerCase() === 'sexlab') out.push(c);
    } else if (n.title.toLowerCase() === 'sexlab') out.push(n);
  }
  return out;
}

function parseManual(md) {
  const entries = [];
  for (const line of md.split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    if (/^\|\s*:?-+/.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((s) => s.trim());
    if (cells.length < 2) continue;
    const [title, url] = cells;
    if (!title || !url) continue;
    if (/^title$/i.test(title)) continue;
    if (!/^https?:\/\//i.test(url)) continue;
    const m = url.match(/^(https?:\/\/(?:www\.)?loverslab\.com\/files\/file\/[^/?#]+\/)/i);
    entries.push({ title, url, landing: m ? m[1] : null });
  }
  return entries;
}

// Extract alias map from TS source
function loadAliases() {
  const src = fs.readFileSync(path.join(siteRoot, 'lib', 'kodexAliases.ts'), 'utf-8');
  // Parse sharedSexLabAliases block
  function extractBlock(startMarker) {
    const i = src.indexOf(startMarker);
    if (i < 0) return {};
    const open = src.indexOf('{', i);
    let depth = 0, end = -1;
    for (let j = open; j < src.length; j++) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') { depth--; if (depth === 0) { end = j; break; } }
    }
    const block = src.slice(open + 1, end);
    const out = {};
    const re = /(['"])((?:\\.|(?!\1).)*?)\1\s*:\s*(['"])((?:\\.|(?!\3).)*?)\3/g;
    let m;
    while ((m = re.exec(block)) !== null) out[m[2].replace(/\\'/g, "'")] = m[4].replace(/\\'/g, "'");
    return out;
  }
  const shared = extractBlock('const sharedSexLabAliases');
  // For per-slug, we'll only pick entries that look slug-scoped from the exported object — simpler: read whole exported map regions
  const momIdx = src.indexOf('mom: {');
  const dodIdx = src.indexOf('dod: {');
  function extractAfter(idx) {
    const open = src.indexOf('{', idx);
    let depth = 0, end = -1;
    for (let j = open; j < src.length; j++) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}') { depth--; if (depth === 0) { end = j; break; } }
    }
    const block = src.slice(open + 1, end);
    const out = {};
    const re = /(['"])((?:\\.|(?!\1).)*?)\1\s*:\s*(['"])((?:\\.|(?!\3).)*?)\3/g;
    let m;
    while ((m = re.exec(block)) !== null) out[m[2].replace(/\\'/g, "'")] = m[4].replace(/\\'/g, "'");
    return out;
  }
  const mom = { ...shared, ...extractAfter(momIdx) };
  const dod = { ...shared, ...extractAfter(dodIdx) };
  return { mom, dod };
}

const aliases = loadAliases();

for (const slug of ['mom', 'dod']) {
  const abbr = slug.toUpperCase();
  const kodexPath = path.join(siteRoot, 'content', 'kodex-outputs', `${abbr}_kodex.html`);
  const mdPath = path.join(siteRoot, 'content', 'manual-downloads', `${abbr}_Manual_Downloads.md`);
  const flat = parseKodex(fs.readFileSync(kodexPath, 'utf-8'));
  const nodes = groupHierarchy(flat);
  const sexlab = collectSexLab(nodes);
  const kodexMods = [];
  for (const s of sexlab) for (const m of s.mods) kodexMods.push(m);
  const manual = parseManual(fs.readFileSync(mdPath, 'utf-8'));
  const byNorm = new Map();
  for (const e of manual) byNorm.set(normalize(e.title), e);

  const aliasMap = aliases[slug] || {};
  const aliasByNorm = new Map();
  for (const [k, v] of Object.entries(aliasMap)) aliasByNorm.set(normalize(k), normalize(v));

  let matchedExact = 0, matchedAlias = 0, matchedNonLL = 0;
  const unmatched = [];
  const aliasHits = [];
  for (const mod of kodexMods) {
    const norm = normalize(mod);
    const direct = byNorm.get(norm);
    if (direct) {
      if (direct.landing) matchedExact++; else matchedNonLL++;
      continue;
    }
    const ali = aliasByNorm.get(norm);
    if (ali) {
      const ent = byNorm.get(ali);
      if (ent && ent.landing) { matchedAlias++; aliasHits.push(mod); continue; }
    }
    unmatched.push(mod);
  }

  console.log(`\n=== ${abbr} ===`);
  console.log(`Kodex SexLab mods:       ${kodexMods.length}`);
  console.log(`Exact -> LL:             ${matchedExact}`);
  console.log(`Alias -> LL (additional): ${matchedAlias}`);
  console.log(`Total LL linked:         ${matchedExact + matchedAlias}`);
  console.log(`Still unmatched:         ${unmatched.length}`);
  console.log(`\n-- Alias hits (${aliasHits.length}) --`);
  for (const h of aliasHits) console.log(`  ${h}`);
  console.log(`\n-- Remaining unmatched (${unmatched.length}) --`);
  for (const u of unmatched) console.log(`  ${u}`);
}
