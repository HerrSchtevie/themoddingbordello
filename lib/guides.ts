import { GuideMeta, GuideSlug } from '@/types/guide';

export const guides: GuideMeta[] = [
  {
    slug: 'sos-pre-install-checker',
    title: 'SOS Pre-Install Checker',
    description: 'Validate your hardware and storage setup before installing a Wabbajack modlist.',
    icon: 'tools',
    customHref: '/sos-pre-install-checker',
  },
  {
    slug: 'sos-tool-running-guide',
    title: 'SOS Tool Running Guide',
    description: 'When and how to safely run Pandora, Synthesis, ParallaxGen, xLODGen, TexGen, and DynDOLOD.',
    icon: 'wrench',
    filePath: 'content/sos-guides/SOS_Tool_Running_Guide.md',
  },
  {
    slug: 'sos-performance-tuning-guide',
    title: 'SOS Performance Tuning Guide',
    description: 'Optimize performance using Potato Mode, VRAMr, and BethINI without sacrificing stability.',
    icon: 'rocket',
    filePath: 'content/sos-guides/SOS_Performance_Tuning_Guide.md',
  },
  {
    slug: 'sos-keyboard-guide',
    title: 'SOS Keyboard Guide',
    description: 'All keyboard hotkey reminders across the lists.',
    icon: 'keyboard',
    filePath: 'content/sos-guides/SOS_Keyboard_Guide.md',
  },
  {
    slug: 'sos-controller-guide',
    title: 'SOS Controller Guide',
    description: 'How to enable and configure controller support.',
    icon: 'controller',
    filePath: 'content/sos-guides/SOS_Controller_Guide.md',
  },
  {
    slug: 'sos-follower-guide',
    title: 'SOS Follower Guide',
    description: 'Custom followers, where to find them, and compatibility notes.',
    icon: 'users',
    filePath: 'content/sos-guides/SOS_Follower_Guide.md',
  },
  {
    slug: 'sos-player-home-guide',
    title: 'SOS Player Home Guide',
    description: 'Player homes included in the lists, with features, acquisition, and location.',
    icon: 'home',
    filePath: 'content/sos-guides/SOS_Player_Home_Guide.md',
  },
  {
    slug: 'sos-npc-plugin-chooser-2-guide',
    title: 'SOS NPC Plugin Chooser 2 Guide',
    description: 'Managing and customizing NPC appearances.',
    icon: 'settings',
    filePath: 'content/sos-guides/SOS_NPC_Plugin_Chooser_2_Guide.md',
  },
  {
    slug: 'sos-de-spicing-guide',
    title: 'SOS De-Spicing Guide',
    description: 'Reduce overt erotic content while preserving core NSFW systems like OStim.',
    icon: 'fire',
    filePath: 'content/sos-guides/SOS_De-Spicing_Guide.md',
  },
  {
    slug: 'sos-rule-11-guide',
    title: 'SOS Rule 11 Guide',
    description: 'Understanding list modifications and their risks.',
    icon: 'info',
    filePath: 'content/sos-guides/SOS_Rule_11_Guide.md',
  },
];

export const guideBySlug: Record<GuideSlug, GuideMeta> = Object.fromEntries(
  guides.map((g) => [g.slug, g])
) as Record<GuideSlug, GuideMeta>;

export const allGuideSlugs: GuideSlug[] = guides.map((g) => g.slug);
