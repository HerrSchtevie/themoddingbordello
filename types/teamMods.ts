export interface TeamModNavItem {
  name: string;
  modUrl: string;
  accent: string;
  nsfw: boolean;
}

export interface TeamMod {
  index: number;
  sort: number;
  name: string;
  blurb: string;
  author: string;
  authorUrl: string;
  modUrl: string;
  accent: string;
  nsfw: boolean;
  imageUrl: string;
  thumbnailUrl: string;
}
