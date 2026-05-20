import fs from 'node:fs';
import path from 'node:path';
import { ModlistSlug } from '@/types/modlist';
import { modlistBySlug } from '@/lib/modlists';

export interface ShowcaseVideo {
  id: string;
  title: string | null;
  author: string | null;
  thumbnail: string;
}

const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

function extractVideoId(line: string): string | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return null;

  if (YOUTUBE_ID_RE.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.slice(1);
      return YOUTUBE_ID_RE.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const v = url.searchParams.get('v');
      if (v && YOUTUBE_ID_RE.test(v)) return v;

      const embedMatch = url.pathname.match(/^\/(?:embed|shorts|v|live)\/([A-Za-z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];
    }
  } catch {
    // not a URL — fall through
  }

  return null;
}

function getShowcaseVideoIds(slug: ModlistSlug): string[] {
  const abbr = modlistBySlug[slug].abbreviation;
  const file = path.join(process.cwd(), 'content', 'showcase', `${abbr}_videos.txt`);
  if (!fs.existsSync(file)) return [];

  let raw: string;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return [];
  }

  const ids: string[] = [];
  const seen = new Set<string>();
  for (const line of raw.split(/\r?\n/)) {
    const id = extractVideoId(line);
    if (id && !seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}

interface OEmbedResponse {
  title?: string;
  author_name?: string;
  thumbnail_url?: string;
}

async function fetchVideoMeta(id: string): Promise<ShowcaseVideo> {
  const fallback: ShowcaseVideo = {
    id,
    title: null,
    author: null,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${id}`,
    )}&format=json`;
    const res = await fetch(oembedUrl, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return fallback;
    const data = (await res.json()) as OEmbedResponse;
    return {
      id,
      title: data.title ?? null,
      author: data.author_name ?? null,
      thumbnail: data.thumbnail_url ?? fallback.thumbnail,
    };
  } catch {
    return fallback;
  }
}

export async function getShowcaseVideos(slug: ModlistSlug): Promise<ShowcaseVideo[]> {
  const ids = getShowcaseVideoIds(slug);
  if (ids.length === 0) return [];
  return Promise.all(ids.map(fetchVideoMeta));
}
