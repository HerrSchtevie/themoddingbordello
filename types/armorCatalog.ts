export interface ArmorSet {
  id: number;
  name: string;
  originalName: string;
  author: string;
  authorUrl: string;
  modUrl: string;
  style: string;
  categories: string[];
  gender: string[];
  themes: string[];
  armorTier: string;
  support: Record<string, string>;
  imageUrl: string;
  thumbnailUrl: string;
  nsfw: boolean;
  sfw: boolean;
  included: boolean;
}

export type ArmorCatalogVariant = 'tot' | 'shared';
