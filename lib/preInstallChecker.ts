import { ModlistSlug } from '@/types/modlist';

export type ProfileKey = 'lords-vision' | 'performance';
export type DriveType = 'nvme' | 'sata-ssd' | 'hdd' | 'external';
export type CpuTier = 'low' | 'mid' | 'upper-mid' | 'high';
export type ResolutionTier = '1080p' | '1440p' | '4k';

export interface ProfileRequirements {
  installGB: number;
  downloadGB: number;
  totalGB: number;
  ramMinGB: number;
  ramRecommendedGB: number;
  vramMinGB: number;
  vramRecommendedGB: number;
  cpuMinTier: CpuTier;
  cpuRecommendedTier: CpuTier;
}

export interface ModlistRequirements {
  'lords-vision': ProfileRequirements;
  performance: ProfileRequirements;
}

const SHARED_RAM = { ramMinGB: 16, ramRecommendedGB: 32 };

function buildRequirements(installGB: number, downloadGB: number): ModlistRequirements {
  const totalGB = installGB + downloadGB;
  return {
    'lords-vision': {
      installGB,
      downloadGB,
      totalGB,
      ...SHARED_RAM,
      vramMinGB: 8,
      vramRecommendedGB: 16,
      cpuMinTier: 'mid',
      cpuRecommendedTier: 'upper-mid',
    },
    performance: {
      installGB,
      downloadGB,
      totalGB,
      ...SHARED_RAM,
      vramMinGB: 6,
      vramRecommendedGB: 8,
      cpuMinTier: 'low',
      cpuRecommendedTier: 'mid',
    },
  };
}

export const modlistRequirements: Record<Exclude<ModlistSlug, 'arr'>, ModlistRequirements> = {
  joj: buildRequirements(594, 283),
  tot: buildRequirements(464, 254),
  hoh: buildRequirements(588, 280),
  mom: buildRequirements(630, 289),
  dod: buildRequirements(628, 290),
  vov: buildRequirements(268, 162),
};

export const supportedCheckerSlugs: Exclude<ModlistSlug, 'arr'>[] = [
  'joj',
  'tot',
  'hoh',
  'mom',
  'dod',
  'vov',
];

export function isSupportedCheckerSlug(slug: string): slug is Exclude<ModlistSlug, 'arr'> {
  return (supportedCheckerSlugs as string[]).includes(slug);
}

export type GpuBrand = 'nvidia' | 'amd' | 'intel';
export type CpuBrand = 'intel' | 'amd';

export interface GpuOption {
  name: string;
  vramGB: number;
}

export const gpuBrandLabels: Record<GpuBrand, string> = {
  nvidia: 'NVIDIA',
  amd: 'AMD',
  intel: 'Intel',
};

export const cpuBrandLabels: Record<CpuBrand, string> = {
  intel: 'Intel',
  amd: 'AMD',
};

export const gpuOptions: Record<GpuBrand, GpuOption[]> = {
  nvidia: [
    { name: 'RTX 5090', vramGB: 32 },
    { name: 'RTX 5080', vramGB: 16 },
    { name: 'RTX 5070 Ti', vramGB: 16 },
    { name: 'RTX 5070', vramGB: 12 },
    { name: 'RTX 4090', vramGB: 24 },
    { name: 'RTX 4080 Super', vramGB: 16 },
    { name: 'RTX 4080', vramGB: 16 },
    { name: 'RTX 4070 Ti Super', vramGB: 16 },
    { name: 'RTX 4070 Ti', vramGB: 12 },
    { name: 'RTX 4070 Super', vramGB: 12 },
    { name: 'RTX 4070', vramGB: 12 },
    { name: 'RTX 4060 Ti', vramGB: 8 },
    { name: 'RTX 4060', vramGB: 8 },
    { name: 'RTX 3090 Ti', vramGB: 24 },
    { name: 'RTX 3090', vramGB: 24 },
    { name: 'RTX 3080 Ti', vramGB: 12 },
    { name: 'RTX 3080', vramGB: 10 },
    { name: 'RTX 3070 Ti', vramGB: 8 },
    { name: 'RTX 3070', vramGB: 8 },
    { name: 'RTX 3060 Ti', vramGB: 8 },
    { name: 'RTX 3060', vramGB: 12 },
    { name: 'RTX 2080 Ti', vramGB: 11 },
    { name: 'RTX 2080 Super', vramGB: 8 },
    { name: 'RTX 2080', vramGB: 8 },
    { name: 'RTX 2070 Super', vramGB: 8 },
    { name: 'RTX 2070', vramGB: 8 },
    { name: 'RTX 2060 Super', vramGB: 8 },
    { name: 'RTX 2060', vramGB: 6 },
    { name: 'GTX 1080 Ti', vramGB: 11 },
    { name: 'GTX 1080', vramGB: 8 },
    { name: 'GTX 1070 Ti', vramGB: 8 },
    { name: 'GTX 1070', vramGB: 8 },
    { name: 'GTX 1060', vramGB: 6 },
  ],
  amd: [
    { name: 'RX 9070 XT', vramGB: 16 },
    { name: 'RX 9070', vramGB: 16 },
    { name: 'RX 7900 XTX', vramGB: 24 },
    { name: 'RX 7900 XT', vramGB: 20 },
    { name: 'RX 7900 GRE', vramGB: 16 },
    { name: 'RX 7800 XT', vramGB: 16 },
    { name: 'RX 7700 XT', vramGB: 12 },
    { name: 'RX 7600 XT', vramGB: 16 },
    { name: 'RX 7600', vramGB: 8 },
    { name: 'RX 6950 XT', vramGB: 16 },
    { name: 'RX 6900 XT', vramGB: 16 },
    { name: 'RX 6800 XT', vramGB: 16 },
    { name: 'RX 6800', vramGB: 16 },
    { name: 'RX 6750 XT', vramGB: 12 },
    { name: 'RX 6700 XT', vramGB: 12 },
    { name: 'RX 6600 XT', vramGB: 8 },
    { name: 'RX 6600', vramGB: 8 },
    { name: 'RX 5700 XT', vramGB: 8 },
    { name: 'RX 5600 XT', vramGB: 6 },
  ],
  intel: [
    { name: 'Arc B580', vramGB: 12 },
    { name: 'Arc B570', vramGB: 10 },
    { name: 'Arc A770', vramGB: 16 },
    { name: 'Arc A750', vramGB: 8 },
    { name: 'Arc A580', vramGB: 8 },
    { name: 'Arc A380', vramGB: 6 },
  ],
};

export const cpuOptions: Record<CpuBrand, string[]> = {
  intel: [
    'Core Ultra 9 285K',
    'Core Ultra 7 265K',
    'Core Ultra 5 245K',
    'Core i9-14900K',
    'Core i9-14900KF',
    'Core i7-14700K',
    'Core i5-14600K',
    'Core i9-13900K',
    'Core i7-13700K',
    'Core i5-13600K',
    'Core i5-13400',
    'Core i9-12900K',
    'Core i7-12700K',
    'Core i5-12600K',
    'Core i5-12400',
    'Core i9-11900K',
    'Core i7-11700K',
    'Core i5-11600K',
    'Core i5-11400',
    'Core i9-10900K',
    'Core i7-10700K',
    'Core i5-10600K',
    'Core i5-10400',
  ],
  amd: [
    'Ryzen 9 9950X3D',
    'Ryzen 9 9950X',
    'Ryzen 9 9900X',
    'Ryzen 7 9800X3D',
    'Ryzen 7 9700X',
    'Ryzen 5 9600X',
    'Ryzen 9 7950X3D',
    'Ryzen 9 7950X',
    'Ryzen 9 7900X',
    'Ryzen 7 7800X3D',
    'Ryzen 7 7700X',
    'Ryzen 5 7600X',
    'Ryzen 5 7600',
    'Ryzen 9 5950X',
    'Ryzen 9 5900X',
    'Ryzen 7 5800X3D',
    'Ryzen 7 5800X',
    'Ryzen 5 5600X',
    'Ryzen 5 5600',
    'Ryzen 7 3800X',
    'Ryzen 7 3700X',
    'Ryzen 5 3600',
  ],
};

export const vramOptions: number[] = [4, 6, 8, 10, 12, 16, 20, 24, 32];
export const ramOptions: number[] = [8, 16, 24, 32, 48, 64, 96, 128];

export interface ResolutionOption {
  value: string;
  label: string;
}

export const resolutionOptions: ResolutionOption[] = [
  { value: '1920x1080', label: '1920\u00d71080 (1080p)' },
  { value: '2560x1440', label: '2560\u00d71440 (1440p)' },
  { value: '3440x1440', label: '3440\u00d71440 (Ultrawide 21:9)' },
  { value: '5120x1440', label: '5120\u00d71440 (Super Ultrawide 32:9)' },
  { value: '3840x2160', label: '3840\u00d72160 (4K)' },
];
