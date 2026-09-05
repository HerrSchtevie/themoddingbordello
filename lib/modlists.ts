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
      loadOrder: 'https://loadorderlibrary.com/lists/journals-of-jyggalag-2',
    },
    pluginCounts: {
      lv: {
        all: { active: 3716, total: 3716 },
        esms: { active: 52, total: 52 },
        esps: { active: 181, total: 181 },
        esmsPlusEsps: { active: 233, total: 233 },
        esls: { active: 3483, total: 3483 },
      },
      perf: {
        all: { active: 3724, total: 3725 },
        esms: { active: 52, total: 52 },
        esps: { active: 183, total: 183 },
        esmsPlusEsps: { active: 235, total: 235 },
        esls: { active: 3489, total: 3490 },
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
      loadOrder: 'https://loadorderlibrary.com/lists/tomes-of-talos',
    },
    pluginCounts: {
      lv: {
        all: { active: 3227, total: 3227 },
        esms: { active: 51, total: 51 },
        esps: { active: 167, total: 167 },
        esmsPlusEsps: { active: 218, total: 218 },
        esls: { active: 3009, total: 3009 },
      },
      perf: {
        all: { active: 3234, total: 3236 },
        esms: { active: 51, total: 51 },
        esps: { active: 169, total: 169 },
        esmsPlusEsps: { active: 220, total: 220 },
        esls: { active: 3014, total: 3016 },
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
      loadOrder: 'https://loadorderlibrary.com/lists/hymns-of-hircine',
    },
    pluginCounts: {
      lv: {
        all: { active: 3728, total: 3728 },
        esms: { active: 54, total: 54 },
        esps: { active: 185, total: 185 },
        esmsPlusEsps: { active: 239, total: 239 },
        esls: { active: 3489, total: 3489 },
      },
      perf: {
        all: { active: 3736, total: 3737 },
        esms: { active: 54, total: 54 },
        esps: { active: 187, total: 187 },
        esmsPlusEsps: { active: 241, total: 241 },
        esls: { active: 3495, total: 3496 },
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
      loadOrder: 'https://loadorderlibrary.com/lists/mantras-of-mara',
    },
    pluginCounts: {
      lv: {
        all: { active: 3763, total: 3763 },
        esms: { active: 61, total: 61 },
        esps: { active: 174, total: 174 },
        esmsPlusEsps: { active: 235, total: 235 },
        esls: { active: 3528, total: 3528 },
      },
      perf: {
        all: { active: 3769, total: 3771 },
        esms: { active: 61, total: 61 },
        esps: { active: 176, total: 176 },
        esmsPlusEsps: { active: 237, total: 237 },
        esls: { active: 3532, total: 3534 },
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
      loadOrder: 'https://loadorderlibrary.com/lists/diaries-of-dibella',
    },
    pluginCounts: {
      lv: {
        all: { active: 3771, total: 3771 },
        esms: { active: 63, total: 63 },
        esps: { active: 176, total: 176 },
        esmsPlusEsps: { active: 239, total: 239 },
        esls: { active: 3532, total: 3532 },
      },
      perf: {
        all: { active: 3779, total: 3780 },
        esms: { active: 63, total: 63 },
        esps: { active: 178, total: 178 },
        esmsPlusEsps: { active: 241, total: 241 },
        esls: { active: 3538, total: 3539 },
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
      loadOrder: 'https://loadorderlibrary.com/lists/visions-of-vaermina',
    },
    pluginCounts: {
      lv: {
        all: { active: 1440, total: 1441 },
        esms: { active: 30, total: 30 },
        esps: { active: 51, total: 51 },
        esmsPlusEsps: { active: 81, total: 81 },
        esls: { active: 1359, total: 1360 },
      },
      perf: {
        all: { active: 1450, total: 1451 },
        esms: { active: 30, total: 30 },
        esps: { active: 53, total: 53 },
        esmsPlusEsps: { active: 83, total: 83 },
        esls: { active: 1367, total: 1368 },
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
