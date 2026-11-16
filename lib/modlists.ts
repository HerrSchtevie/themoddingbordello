import { ModlistMeta, ModlistSlug } from '@/types/modlist';

export const modlists: ModlistMeta[] = [
  {
    slug: 'joj',
    name: 'Journals of Jyggalag',
    abbreviation: 'JOJ',
    accentColor: '#7a0000',
    headerColor: '#C22222',
    splashArt: '/assets/logos/splashjoj.png',
    wallpaper: '/assets/wallpapers/JOJWallpaper.png',
    tagline: 'Let Order guide your path.',
    bookImage: '/assets/books/JOJ_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/146771',
      loadOrder: 'https://modlistgrimoire.com/modlists/journals-of-jyggalag',
    },
    pluginCounts: {
      main: {
        all: { active: 3751, total: 3751 },
        esms: { active: 53, total: 53 },
        esps: { active: 184, total: 184 },
        esmsPlusEsps: { active: 237, total: 237 },
        esls: { active: 3514, total: 3514 },
      },
    },
  },
  {
    slug: 'tot',
    name: 'Tomes of Talos',
    abbreviation: 'TOT',
    accentColor: '#0000ff',
    headerColor: '#5B7FFF',
    splashArt: '/assets/logos/splashtot.png',
    wallpaper: '/assets/wallpapers/TOTWallpaper.png',
    tagline: 'Strength in Voice, Strength in Faith.',
    bookImage: '/assets/books/TOT_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/154277',
      loadOrder: 'https://modlistgrimoire.com/modlists/tomes-of-talos',
    },
    pluginCounts: {
      main: {
        all: { active: 3247, total: 3247 },
        esms: { active: 52, total: 52 },
        esps: { active: 169, total: 169 },
        esmsPlusEsps: { active: 221, total: 221 },
        esls: { active: 3026, total: 3026 },
      },
    },
  },
  {
    slug: 'hoh',
    name: 'Hymns of Hircine',
    abbreviation: 'HOH',
    accentColor: '#354838',
    headerColor: '#7DA87B',
    splashArt: '/assets/logos/splashhoh.png',
    wallpaper: '/assets/wallpapers/HOHWallpaper.png',
    tagline: 'In the Name of the Hunter, Let None Escape.',
    bookImage: '/assets/books/HOH_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/156686',
      loadOrder: 'https://modlistgrimoire.com/modlists/hymns-of-hircine',
    },
    pluginCounts: {
      main: {
        all: { active: 3761, total: 3761 },
        esms: { active: 55, total: 55 },
        esps: { active: 190, total: 190 },
        esmsPlusEsps: { active: 245, total: 245 },
        esls: { active: 3516, total: 3516 },
      },
    },
  },
  {
    slug: 'mom',
    name: 'Mantras of Mara',
    abbreviation: 'MOM',
    accentColor: '#cc6600',
    headerColor: '#D46F00',
    splashArt: '/assets/logos/splashmom.png',
    wallpaper: '/assets/wallpapers/MOMWallpaper.png',
    tagline: 'Whispered Words Become Eternal Bonds.',
    bookImage: '/assets/books/MOM_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: true, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/158622',
      loadOrder: 'https://modlistgrimoire.com/modlists/mantras-of-mara',
    },
    pluginCounts: {
      main: {
        all: { active: 3799, total: 3799 },
        esms: { active: 62, total: 62 },
        esps: { active: 181, total: 181 },
        esmsPlusEsps: { active: 243, total: 243 },
        esls: { active: 3556, total: 3556 },
      },
    },
  },
  {
    slug: 'dod',
    name: 'Diaries of Dibella',
    abbreviation: 'DOD',
    accentColor: '#5a2a83',
    headerColor: '#A46FE0',
    splashArt: '/assets/logos/splashdod.png',
    wallpaper: '/assets/wallpapers/DODWallpaper.png',
    tagline: 'In Pleasure and Peril, We Persist.',
    bookImage: '/assets/books/DOD_Book.png',
    pages: { readme: true, gameplayGuide: true, changelog: true, manualDownloads: true, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/156694',
      loadOrder: 'https://modlistgrimoire.com/modlists/diaries-of-dibella',
    },
    pluginCounts: {
      main: {
        all: { active: 3806, total: 3806 },
        esms: { active: 64, total: 64 },
        esps: { active: 186, total: 186 },
        esmsPlusEsps: { active: 250, total: 250 },
        esls: { active: 3556, total: 3556 },
      },
    },
  },
  {
    slug: 'vov',
    name: 'Visions of Vaermina',
    abbreviation: 'VOV',
    accentColor: '#006E75',
    headerColor: '#3AAFB8',
    splashArt: '/assets/logos/splashvov.png',
    wallpaper: '/assets/wallpapers/VOVWallpaper.png',
    tagline: 'Where dreams reshape reality.',
    bookImage: '/assets/books/VOV_Book.png',
    pages: { readme: true, gameplayGuide: false, changelog: true, manualDownloads: false, kodex: true },
    links: {
      nexus: 'https://www.nexusmods.com/skyrimspecialedition/mods/173492',
      loadOrder: 'https://modlistgrimoire.com/modlists/visions-of-vaermina',
    },
    pluginCounts: {
      main: {
        all: { active: 1459, total: 1459 },
        esms: { active: 30, total: 30 },
        esps: { active: 53, total: 53 },
        esmsPlusEsps: { active: 83, total: 83 },
        esls: { active: 1376, total: 1376 },
      },
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
