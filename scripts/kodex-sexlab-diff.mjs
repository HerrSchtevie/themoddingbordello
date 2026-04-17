import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');

function stripTags(s) {
  return s.replace(/<[^>]*>/g, '').trim();
}
function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019\u2032`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseKodex(html) {
  const tableStart = html.indexOf('<table id="modTable"');
  const tbodyStart = html.indexOf('<tbody>', tableStart);
  const tbodyEnd = html.indexOf('</tbody>', tbodyStart);
  const body = html.slice(tbodyStart + 7, tbodyEnd);
  const rowRe =
    /<tr(?:\s+class="([^"]*)")?>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>/g;
  const sections = [];
  let m;
  let cur = null;
  while ((m = rowRe.exec(body)) !== null) {
    const [, cls, nameCell] = m;
    const isSep = (cls || '').includes('separator-row');
    const anchor = nameCell.match(/<a[^>]*>([\s\S]*?)<\/a>/i);
    const name = decode(stripTags(anchor ? anchor[1] : nameCell));
    if (isSep || name.endsWith(' - Separator')) {
      const title = name.endsWith(' - Separator') ? name.slice(0, -' - Separator'.length) : name;
      cur = { title, mods: [] };
      sections.push(cur);
    } else {
      if (!cur) {
        cur = { title: 'Base Game & Official Files', mods: [] };
        sections.push(cur);
      }
      cur.mods.push(name);
    }
  }
  return sections;
}

function groupHierarchy(flat) {
  const nodes = [];
  let g = null;
  for (const s of flat) {
    if (s.mods.length === 0) {
      g = { kind: 'group', title: s.title, children: [] };
      nodes.push(g);
    } else if (g) {
      g.children.push(s);
    } else {
      nodes.push({ kind: 'section', title: s.title, mods: s.mods });
    }
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
    const title = cells[0];
    const url = cells[1];
    if (!title || !url) continue;
    if (/^title$/i.test(title)) continue;
    if (!/^https?:\/\//i.test(url)) continue;
    const m = url.match(/^(https?:\/\/(?:www\.)?loverslab\.com\/files\/file\/[^/?#]+\/)/i);
    entries.push({ title, url, landing: m ? m[1] : null });
  }
  return entries;
}

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

  const unmatched = [];
  let matched = 0;
  let matchedButNoLanding = 0;
  for (const mod of kodexMods) {
    const e = byNorm.get(normalize(mod));
    if (e) {
      if (e.landing) matched++;
      else matchedButNoLanding++;
    } else unmatched.push(mod);
  }

  console.log(`\n=== ${abbr} ===`);
  console.log(`Kodex SexLab mods: ${kodexMods.length}`);
  console.log(`Manual Downloads entries: ${manual.length}`);
  console.log(`Exact matched -> LL landing: ${matched}`);
  console.log(`Exact matched but non-LL URL: ${matchedButNoLanding}`);
  console.log(`Unmatched: ${unmatched.length}`);
  console.log(`\n-- Manual Downloads titles --`);
  for (const e of manual) console.log(`  [${e.landing ? 'LL' : 'XX'}] ${e.title}`);
  console.log(`\n-- Unmatched Kodex names --`);
  for (const u of unmatched) console.log(`  ${u}`);
}
