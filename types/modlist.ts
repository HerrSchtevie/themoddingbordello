export type ModlistSlug = 'joj' | 'tot' | 'hoh' | 'mom' | 'dod' | 'vov';

export type ModlistPage = 'overview' | 'readme' | 'gameplay-guide' | 'changelog' | 'manual-downloads' | 'load-order' | 'showcase';

export type KodexProfileKey = 'lv' | 'perf';

export interface PluginCountCell {
  active: number;
  total: number;
}

export interface PluginCounts {
  all: PluginCountCell;
  esms: PluginCountCell;
  esps: PluginCountCell;
  esmsPlusEsps: PluginCountCell;
  esls: PluginCountCell;
}

export interface ModlistMeta {
  slug: ModlistSlug;
  name: string;
  abbreviation: string;
  accentColor: string;
  /** Brighter list color used for header/link text on dark backgrounds (mirrors the Nexus page header color). */
  headerColor: string;
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
  pluginCounts?: Partial<Record<KodexProfileKey, PluginCounts>>;
}
