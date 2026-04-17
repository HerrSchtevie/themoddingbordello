import { ModlistSlug } from '@/types/modlist';

/**
 * Manual-download title aliases for Kodex mods inside the SexLab section.
 * Keys are Kodex mod names; values are the corresponding Manual Downloads title.
 * Both sides are compared after normalizeModName(), so exact casing/punctuation
 * need not match.
 *
 * Scope: MOM and DOD only, SexLab section only.
 */

const sharedSexLabAliases: Record<string, string> = {
  'SexLab Framework': 'SexLab Framework SE / AE v166b',
  'SexLab Framework P+': 'SexLab Framework PPLUS v2.15.6 (AE 1.6.1170)',
  'Creature Framework': 'CreatureFrameworkV3-2A',
  'Sexlab Framework Sound Replacer AIO': 'SexLab Framework Sound Replacer (AIO)',

  'Slave Tats SE': 'SlaveTatsSE-1.3.9.7z',
  'Slave Tats NG': 'SlaveTatsNG-0.7.6.7z',
  'Fade Tattoos Continued': 'Fade Tattoos Continued 2.1.0',
  'Alpia Slavetats Pack': 'Alpia Scribbles SlaveTats Pack (Base)',
  'Alpia Slavetats Orc': 'Alpia Scribbles SlaveTats Pack (Orc)',
  'Alpia Slavetats Riek': 'Alpia Scribbles SlaveTats Pack (Riek)',

  'Yamete Kudasai': 'Yamete Kudasai 2.2.3',
  'SexLab CumTextures Remake': 'SexLab CumTextures Remake v1.2',
  'Simple Slavery Plus Plus': 'Simple Slavery Plus Plus 6.3.26 (SE)',
  'Submissive Lola Resubmission': 'SubmissiveLolaResubmission 2.1.13.7z',

  'Devious Devices NG': 'Devious Devices NG v0.4.2',
  'Devious Follower Escape': 'Devious Devices – Follower Escape',
  'Deviously Enchanted Chests SE': 'Deviously Enchanted Chests SE / LE 3.220',
  'Devious Lore SE': 'Devious Lore SE / AE 3.0.2',
  'Devious Lore Dwarven Gilded Oil Suit': 'Devious Lore – Dwarven Gilded Oil Suit (3BA)',
  'Devious Lore Voicepack': 'Devious Lore 3.0.2 – AI Voiceover (ElevenLabs)',
  'Devious Devices - I4 Patch': 'I4 – Inventory Interface Information Injector (DD Patch)',
  "Devious Devices - Laura's Bondage Shop": "Laura’s Bondage Shop v3.54 SE",
  "Devious Devices - Laura's Bondage Shop - Lux Patch": "Laura’s Bondage Shop – Lux Lighting Patch",
  "Devious Devices - Laura's Bondage Shop - Voicepack": "Laura’s Bondage Shop 3.55 – AI Voiceover",

  'SexLab Eager NPCs': 'SexLab Eager NPCs SE',
  'SexLab Eager NPCs - Voicepack': 'SLEN Rev2 Voicepack bsa',

  'Collectible Waifu Cards': 'Collectible Waifu Cards 3.1.5',
  'Dripping When Aroused NG': 'Dripping When Aroused NG v2.0.6',
  'Amorous Adventures': 'AmorousAdventures v3.4-SexLab',

  'SexLab Solutions': 'SexLab Solutions v3 – Revisited SE 1.1.6',
  'SexLab Solutions - Voicepack': 'SL Solutions v3 Revisited 1.1.6 Voicepack bsa.7z',
  'SexLab Confabulation': 'SexLab Confabulation v1.7.4',
  'SexLab Confabulation - Hotfix': 'SexLab Confabulation v1.7.4 Hotfix',
  'SexLab Confabulation - Solutions Patch': 'SexLab Confabulation – Solutions Patch v1.7.4',
  'SexLab Confabulation - Voicepack': 'SexLab Confabulation 1.7.4 – Voicepack',

  'The Book Of Sex': 'The Book Of Sex SE v1.1.7z',

  "Billyy's SLAL Animations 10.0": 'SLAL Billyy Animations v10.0 SE',
  'FlufyFox SLAL': 'FlufyFox SLAL Pack – Creature',
  'FlufyFox SLAL Human': 'FlufyFox SLAL Pack – Human',
  'SLAL Animations by Leito v1.6': 'SLAL - Animations By Leito - 9/12/16 1.6',
  'SLAL SE Creature Animations by Sailing Rebel': 'SLAL SE Creature Animations by Sailing Rebel (SRB) v03.0',
  'KomAnim': 'KomAnim T2 AIO (SE 323616c)',
  'DF Spank SLAL mini': 'DF Spank – SLAL Mini Pack (SE)',

  'Sexlab Fill Her Up Baka Edition': 'Fill Her Up – Baka Edition',
  'Automated SLSB Conversions 0.9d': 'Automated SLSB Conversions v0.9d HF',
  'SexLab Sex Sound': 'SexLab Sex Sound 0.13.0',
};

export const manualDownloadAliases: Partial<
  Record<ModlistSlug, Record<string, string>>
> = {
  mom: {
    ...sharedSexLabAliases,
    'Devious Lore SE KS Hair Patch': 'Devious Lore SE / AE – KS Hairs Patch 3.0.2',
    'MYSLALPACK v12.0': 'FunnyBizness (v25) SLAL Pack by Shashankie v12.0',
  },
  dod: {
    ...sharedSexLabAliases,
    'Devious Lore KS Hairs Patch': 'Devious Lore SE / AE – KS Hairs Patch 3.0.2',
    'MYSLALPACK v12.0': 'FunnyBizness (v25) SLAL Pack by Shashankie v12.0 SE Rev1',
  },
};
