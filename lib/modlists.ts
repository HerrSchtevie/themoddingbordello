import { ModlistMeta, ModlistSlug } from '@/types/modlist';

export const modlists: ModlistMeta[] = [
  {
    slug: 'joj',
    name: 'Journals of Jyggalag',
    abbreviation: 'JOJ',
    accentColor: '#7a0000',
    splashArt: '/assets/logos/splashjoj.png',
    wallpaper: '/assets/wallpapers/JOJWallpaper.png',
    tagline: 'Let Order guide your path.',
    bookImage: '/assets/books/JOJ_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/146771',
      loadOrder: 'https://loadorderlibrary.com/lists/journals-of-jyggalag-2',
    },
    pluginCounts: {
      all: { active: 3687, total: 3687 },
      esms: { active: 52, total: 52 },
      esps: { active: 182, total: 182 },
      esmsPlusEsps: { active: 234, total: 234 },
      esls: { active: 3453, total: 3453 },
    },
  },
  {
    slug: 'tot',
    name: 'Tomes of Talos',
    abbreviation: 'TOT',
    accentColor: '#0000ff',
    splashArt: '/assets/logos/splashtot.png',
    wallpaper: '/assets/wallpapers/TOTWallpaper.png',
    tagline: 'Strength in Voice, Strength in Faith.',
    bookImage: '/assets/books/TOT_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/154277',
      loadOrder: 'https://loadorderlibrary.com/lists/tomes-of-talos',
    },
    pluginCounts: {
      all: { active: 3205, total: 3205 },
      esms: { active: 51, total: 51 },
      esps: { active: 171, total: 171 },
      esmsPlusEsps: { active: 222, total: 222 },
      esls: { active: 2983, total: 2983 },
    },
  },
  {
    slug: 'hoh',
    name: 'Hymns of Hircine',
    abbreviation: 'HOH',
    accentColor: '#354838',
    splashArt: '/assets/logos/splashhoh.png',
    wallpaper: '/assets/wallpapers/HOHWallpaper.png',
    tagline: 'In the Name of the Hunter, Let None Escape.',
    bookImage: '/assets/books/HOH_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/156686',
      loadOrder: 'https://loadorderlibrary.com/lists/hymns-of-hircine',
    },
    pluginCounts: {
      all: { active: 3698, total: 3698 },
      esms: { active: 54, total: 54 },
      esps: { active: 189, total: 189 },
      esmsPlusEsps: { active: 243, total: 243 },
      esls: { active: 3455, total: 3455 },
    },
  },
  {
    slug: 'mom',
    name: 'Mantras of Mara',
    abbreviation: 'MOM',
    accentColor: '#cc6600',
    splashArt: '/assets/logos/splashmom.png',
    wallpaper: '/assets/wallpapers/MOMWallpaper.png',
    tagline: 'Whispered Words Become Eternal Bonds.',
    bookImage: '/assets/books/MOM_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: true, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/158622',
      loadOrder: 'https://loadorderlibrary.com/lists/mantras-of-mara',
    },
    pluginCounts: {
      all: { active: 3741, total: 3741 },
      esms: { active: 61, total: 61 },
      esps: { active: 171, total: 171 },
      esmsPlusEsps: { active: 232, total: 232 },
      esls: { active: 3509, total: 3509 },
    },
  },
  {
    slug: 'dod',
    name: 'Diaries of Dibella',
    abbreviation: 'DOD',
    accentColor: '#5a2a83',
    splashArt: '/assets/logos/splashdod.png',
    wallpaper: '/assets/wallpapers/DODWallpaper.png',
    tagline: 'In Pleasure and Peril, We Persist.',
    bookImage: '/assets/books/DOD_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: true, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/156694',
      loadOrder: 'https://loadorderlibrary.com/lists/diaries-of-dibella',
    },
    pluginCounts: {
      all: { active: 3746, total: 3746 },
      esms: { active: 63, total: 63 },
      esps: { active: 175, total: 175 },
      esmsPlusEsps: { active: 238, total: 238 },
      esls: { active: 3508, total: 3508 },
    },
  },
  {
    slug: 'vov',
    name: 'Visions of Vaermina',
    abbreviation: 'VOV',
    accentColor: '#006E75',
    splashArt: '/assets/logos/splashvov.png',
    wallpaper: '/assets/wallpapers/VOVWallpaper.png',
    tagline: 'Where dreams reshape reality.',
    bookImage: '/assets/books/VOV_Book.png',
    pages: { readme: true, gameplayGuide: false, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/173492',
      loadOrder: 'https://loadorderlibrary.com/lists/visions-of-vaermina',
    },
    pluginCounts: {
      all: { active: 1437, total: 1438 },
      esms: { active: 30, total: 30 },
      esps: { active: 52, total: 52 },
      esmsPlusEsps: { active: 82, total: 82 },
      esls: { active: 1355, total: 1356 },
    },
  },
];

export const modlistBySlug: Record<ModlistSlug, ModlistMeta> = Object.fromEntries(
  modlists.map((m) => [m.slug, m])
) as Record<ModlistSlug, ModlistMeta>;

export const allModlistSlugs: ModlistSlug[] = modlists.map((m) => m.slug);

export function getModlistContentPath(
  slug: ModlistSlug,
  page: 'overview' | 'readme' | 'gameplay-guide' | 'changelog' | 'manual-downloads'
): string {
  const abbr = modlistBySlug[slug].abbreviation;
  const map: Record<string, string> = {
    overview: `content/overviews/${abbr}_overview.md`,
    readme: `content/readmes/${abbr}_readme.md`,
    'gameplay-guide': `content/gameplay-guides/${abbr}_Gameplay_Guide.md`,
    changelog: `content/changelogs/${abbr}_changelog.md`,
    'manual-downloads': `content/manual-downloads/${abbr}_Manual_Downloads.md`,
  };
  return map[page];
}
