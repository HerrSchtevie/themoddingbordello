export type ModlistSlug = 'joj' | 'tot' | 'hoh' | 'mom' | 'dod' | 'vov';

export type ModlistPage = 'overview' | 'readme' | 'gameplay-guide' | 'changelog' | 'manual-downloads' | 'load-order' | 'showcase';

/** 'main' is the single profile of a one-profile list (JOJ since 8.0.0); 'lv' and 'perf' are the two profiles of the lists still shipping Lord's Vision + Performance. */
export type KodexProfileKey = 'main' | 'lv' | 'perf';

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
