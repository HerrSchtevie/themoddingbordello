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
        all: { active: 3715, total: 3715 },
        esms: { active: 52, total: 52 },
        esps: { active: 181, total: 181 },
        esmsPlusEsps: { active: 233, total: 233 },
        esls: { active: 3482, total: 3482 },
      },
      perf: {
        all: { active: 3723, total: 3724 },
        esms: { active: 52, total: 52 },
        esps: { active: 183, total: 183 },
        esmsPlusEsps: { active: 235, total: 235 },
        esls: { active: 3488, total: 3489 },
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
        all: { active: 3226, total: 3226 },
        esms: { active: 51, total: 51 },
        esps: { active: 168, total: 168 },
        esmsPlusEsps: { active: 219, total: 219 },
        esls: { active: 3007, total: 3007 },
      },
      perf: {
        all: { active: 3233, total: 3235 },
        esms: { active: 51, total: 51 },
        esps: { active: 170, total: 170 },
        esmsPlusEsps: { active: 221, total: 221 },
        esls: { active: 3012, total: 3014 },
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
        all: { active: 3731, total: 3731 },
        esms: { active: 54, total: 54 },
        esps: { active: 186, total: 186 },
        esmsPlusEsps: { active: 240, total: 240 },
        esls: { active: 3491, total: 3491 },
      },
      perf: {
        all: { active: 3739, total: 3740 },
        esms: { active: 54, total: 54 },
        esps: { active: 188, total: 188 },
        esmsPlusEsps: { active: 242, total: 242 },
        esls: { active: 3497, total: 3498 },
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
        all: { active: 3762, total: 3762 },
        esms: { active: 61, total: 61 },
        esps: { active: 174, total: 174 },
        esmsPlusEsps: { active: 235, total: 235 },
        esls: { active: 3527, total: 3527 },
      },
      perf: {
        all: { active: 3768, total: 3770 },
        esms: { active: 61, total: 61 },
        esps: { active: 176, total: 176 },
        esmsPlusEsps: { active: 237, total: 237 },
        esls: { active: 3531, total: 3533 },
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
        all: { active: 3774, total: 3774 },
        esms: { active: 63, total: 63 },
        esps: { active: 176, total: 176 },
        esmsPlusEsps: { active: 239, total: 239 },
        esls: { active: 3535, total: 3535 },
      },
      perf: {
        all: { active: 3782, total: 3783 },
        esms: { active: 63, total: 63 },
        esps: { active: 178, total: 178 },
        esmsPlusEsps: { active: 241, total: 241 },
        esls: { active: 3541, total: 3542 },
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
        all: { active: 1441, total: 1442 },
        esms: { active: 30, total: 30 },
        esps: { active: 51, total: 51 },
        esmsPlusEsps: { active: 81, total: 81 },
        esls: { active: 1360, total: 1361 },
      },
      perf: {
        all: { active: 1451, total: 1452 },
        esms: { active: 30, total: 30 },
        esps: { active: 53, total: 53 },
        esmsPlusEsps: { active: 83, total: 83 },
        esls: { active: 1368, total: 1369 },
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
