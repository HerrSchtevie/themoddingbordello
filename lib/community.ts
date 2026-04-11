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

export interface LoadOrderEntry {
  name: string;
  abbreviation: string;
  accentColor: string;
  url: string;
}

export const loadOrderEntries: LoadOrderEntry[] = [
  { name: 'Journals of Jyggalag', abbreviation: 'JOJ', accentColor: '#7a0000', url: 'https://loadorderlibrary.com/lists/journals-of-jyggalag-2' },
  { name: 'Tomes of Talos', abbreviation: 'TOT', accentColor: '#0000ff', url: 'https://loadorderlibrary.com/lists/tomes-of-talos' },
  { name: 'Hymns of Hircine', abbreviation: 'HOH', accentColor: '#354838', url: 'https://loadorderlibrary.com/lists/hymns-of-hircine' },
  { name: 'Mantras of Mara', abbreviation: 'MOM', accentColor: '#cc6600', url: 'https://loadorderlibrary.com/lists/mantras-of-mara' },
  { name: 'Diaries of Dibella', abbreviation: 'DOD', accentColor: '#5a2a83', url: 'https://loadorderlibrary.com/lists/diaries-of-dibella' },
  { name: 'Visions of Vaermina', abbreviation: 'VOV', accentColor: '#006E75', url: 'https://loadorderlibrary.com/lists/visions-of-vaermina' },
];
