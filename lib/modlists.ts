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
        all: { active: 3713, total: 3713 },
        esms: { active: 52, total: 52 },
        esps: { active: 184, total: 184 },
        esmsPlusEsps: { active: 236, total: 236 },
        esls: { active: 3477, total: 3477 },
      },
      perf: {
        all: { active: 3721, total: 3722 },
        esms: { active: 52, total: 52 },
        esps: { active: 186, total: 186 },
        esmsPlusEsps: { active: 238, total: 238 },
        esls: { active: 3483, total: 3484 },
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
        all: { active: 3225, total: 3225 },
        esms: { active: 51, total: 51 },
        esps: { active: 173, total: 173 },
        esmsPlusEsps: { active: 224, total: 224 },
        esls: { active: 3001, total: 3001 },
      },
      perf: {
        all: { active: 3232, total: 3234 },
        esms: { active: 51, total: 51 },
        esps: { active: 175, total: 175 },
        esmsPlusEsps: { active: 226, total: 226 },
        esls: { active: 3006, total: 3008 },
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
        esps: { active: 191, total: 191 },
        esmsPlusEsps: { active: 245, total: 245 },
        esls: { active: 3483, total: 3483 },
      },
      perf: {
        all: { active: 3736, total: 3737 },
        esms: { active: 54, total: 54 },
        esps: { active: 193, total: 193 },
        esmsPlusEsps: { active: 247, total: 247 },
        esls: { active: 3489, total: 3490 },
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
        all: { active: 3760, total: 3760 },
        esms: { active: 61, total: 61 },
        esps: { active: 172, total: 172 },
        esmsPlusEsps: { active: 233, total: 233 },
        esls: { active: 3527, total: 3527 },
      },
      perf: {
        all: { active: 3766, total: 3768 },
        esms: { active: 61, total: 61 },
        esps: { active: 174, total: 174 },
        esmsPlusEsps: { active: 235, total: 235 },
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
        all: { active: 3771, total: 3771 },
        esms: { active: 63, total: 63 },
        esps: { active: 177, total: 177 },
        esmsPlusEsps: { active: 240, total: 240 },
        esls: { active: 3531, total: 3531 },
      },
      perf: {
        all: { active: 3779, total: 3780 },
        esms: { active: 63, total: 63 },
        esps: { active: 179, total: 179 },
        esmsPlusEsps: { active: 242, total: 242 },
        esls: { active: 3537, total: 3538 },
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
        all: { active: 1438, total: 1439 },
        esms: { active: 30, total: 30 },
        esps: { active: 52, total: 52 },
        esmsPlusEsps: { active: 82, total: 82 },
        esls: { active: 1356, total: 1357 },
      },
      perf: {
        all: { active: 1448, total: 1449 },
        esms: { active: 30, total: 30 },
        esps: { active: 54, total: 54 },
        esmsPlusEsps: { active: 84, total: 84 },
        esls: { active: 1364, total: 1365 },
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
