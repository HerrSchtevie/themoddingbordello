export type ModlistSlug = 'joj' | 'tot' | 'hoh' | 'mom' | 'dod' | 'vov' | 'arr';

export type ModlistPage = 'overview' | 'readme' | 'gameplay-guide' | 'changelog' | 'manual-downloads' | 'load-order';

export interface ModlistMeta {
  slug: ModlistSlug;
  name: string;
  abbreviation: string;
  accentColor: string;
  splashArt: string;
  wallpaper: string;
  tagline: string;
  bookImage: string;
  pages: {
    readme: true;
    gameplayGuide: boolean;
    changelog: true;
    manualDownloads: boolean;
    kodex: boolean;
  };
  links: {
    nexus: string;
    loadOrder: string;
  };
}
