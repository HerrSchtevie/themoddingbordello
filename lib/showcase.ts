import fs from 'node:fs';
import path from 'node:path';
import { ModlistSlug } from '@/types/modlist';

const SUPPORTED_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png']);

export function getShowcaseImages(slug: ModlistSlug): string[] {
  const dir = path.join(process.cwd(), 'public', 'showcase', slug);
  if (!fs.existsSync(dir)) return [];

  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return [];
  }

  return entries
    .filter((name) => SUPPORTED_EXTS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((name) => `/showcase/${slug}/${name}`);
}
