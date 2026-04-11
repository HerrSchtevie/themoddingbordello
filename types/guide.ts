export type GuideSlug =
  | 'sos-tool-running-guide'
  | 'sos-keyboard-guide'
  | 'sos-controller-guide'
  | 'sos-follower-guide'
  | 'sos-player-home-guide'
  | 'sos-npc-plugin-chooser-2-guide'
  | 'sos-rule-11-guide';

export interface GuideMeta {
  slug: GuideSlug;
  title: string;
  description: string;
  icon: string;
  filePath: string;
}
