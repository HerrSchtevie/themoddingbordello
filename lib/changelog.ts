import fs from 'fs';
import path from 'path';
import { VersionBlock } from '@/types/changelog';
import { renderMarkdown } from './markdown';

// Matches h1 headings like "# JOJ 6.1.2 (WORK IN PROGRESS)" or "# JOJ 6.1.1 (Updated - 04.05.2026)"
// Captures: full label after "# ", and the version number
const VERSION_HEADING_RE = /^# (.+ (\d+\.\d+\.\d+).*)$/;

export function parseVersionBlocks(raw: string): { preamble: string; blocks: { version: string; label: string; rawMarkdown: string }[] } {
  const lines = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const blocks: { version: string; label: string; rawMarkdown: string }[] = [];
  let preamble = '';
  let currentVersion: string | null = null;
  let currentLabel = '';
  let currentLines: string[] = [];

  for (const line of lines) {
    const match = line.match(VERSION_HEADING_RE);
    if (match) {
      if (currentVersion) {
        blocks.push({ version: currentVersion, label: currentLabel, rawMarkdown: currentLines.join('\n') });
      } else {
        preamble = currentLines.join('\n').trim();
      }
      currentLabel = match[1];
      currentVersion = match[2];
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }

  if (currentVersion) {
    blocks.push({ version: currentVersion, label: currentLabel, rawMarkdown: currentLines.join('\n') });
  }

  return { preamble, blocks };
}

export async function loadChangelog(filePath: string): Promise<{ preambleHtml: string; versions: VersionBlock[] }> {
  const fullPath = path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { preamble, blocks } = parseVersionBlocks(raw);

  const preambleHtml = preamble ? await renderMarkdown(preamble) : '';

  const versions: VersionBlock[] = await Promise.all(
    blocks.map(async (block, index) => ({
      version: block.version,
      label: block.label,
      rawMarkdown: block.rawMarkdown,
      html: await renderMarkdown(block.rawMarkdown),
      isLatest: index === 0,
    }))
  );

  return { preambleHtml, versions };
}
