export interface CommunityLink {
  platform: string;
  url: string;
  label: string;
  description: string;
}

export const communityLinks: CommunityLink[] = [
  { platform: 'discord', url: 'https://discord.com/invite/themoddingbordello', label: 'Discord', description: 'Join the community for support, updates, and discussion.' },
  { platform: 'nexus', url: 'https://www.nexusmods.com/profile/HerrSchtevie', label: 'Nexus Mods', description: 'View modlists and updates on Nexus Mods.' },
  { platform: 'kofi', url: 'https://ko-fi.com/herrschtevie', label: 'Ko-fi', description: 'Support development and ongoing work.' },
  { platform: 'twitch', url: 'https://www.twitch.tv/herrschtevie', label: 'Twitch', description: 'Watch live streams and development content.' },
  { platform: 'reddit', url: 'https://www.reddit.com/r/themoddingbordello/', label: 'Reddit', description: 'Public discussion hub for updates and community interaction.' },
];
