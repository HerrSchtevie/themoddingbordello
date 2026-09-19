import {
  CpuTier,
  DriveType,
  ModlistRequirements,
  TierRequirements,
  ResolutionTier,
  modlistRequirements,
} from './preInstallChecker';
import { ModlistSlug } from '@/types/modlist';

export type Severity = 'good' | 'warn' | 'bad';
export type Readiness = 'ready' | 'risky' | 'not-recommended';

export interface CheckItem {
  label: string;
  severity: Severity;
  message: string;
}

export interface CheckerInput {
  list: ModlistSlug;
  visualAddons: boolean;
  gpuName: string;
  vramGB: number;
  cpuModel: string;
  ramGB: number;
  resolution: string;
  installDrive: DriveType;
  installFreeGB: number;
  combinedStorage: boolean;
  downloadsDrive: DriveType | null;
  downloadsFreeGB: number | null;
}

export interface CheckerReport {
  readiness: Readiness;
  summary: string;
  addons: Severity | 'not-requested';
  install: CheckItem[];
  runtime: CheckItem[];
  storage: CheckItem[];
  notes: string[];
}

const CPU_TIER_RANK: Record<CpuTier, number> = { low: 1, mid: 2, 'upper-mid': 3, high: 4 };

const CPU_TIER_LABELS: Record<CpuTier, string> = {
  low: 'Low',
  mid: 'Mid',
  'upper-mid': 'Upper-mid',
  high: 'High',
};

export function classifyCpu(cpuModel: string): CpuTier {
  const s = cpuModel.toLowerCase().replace(/\s+/g, ' ').trim();
  if (!s) return 'mid';

  if (/(i9|ryzen\s*9|threadripper|ultra\s*9|core\s*ultra\s*9)/.test(s)) return 'high';

  const intelGen = s.match(/i([579])[- ]?(\d{4,5})/);
  if (intelGen) {
    const family = Number(intelGen[1]);
    const model = Number(intelGen[2]);
    const gen = model >= 10000 ? Math.floor(model / 1000) : Math.floor(model / 1000);
    if (family === 7) {
      if (gen >= 12) return 'upper-mid';
      if (gen >= 10) return 'upper-mid';
      if (gen >= 8) return 'mid';
      return 'low';
    }
    if (family === 5) {
      if (gen >= 12) return 'upper-mid';
      if (gen >= 10) return 'mid';
      if (gen >= 8) return 'mid';
      return 'low';
    }
  }

  const ryzen = s.match(/ryzen\s*([3579])\s*(\d{3,4})/);
  if (ryzen) {
    const family = Number(ryzen[1]);
    const model = Number(ryzen[2]);
    const series = model >= 1000 ? Math.floor(model / 1000) : 0;
    if (family === 7) {
      if (series >= 5) return 'upper-mid';
      if (series >= 3) return 'mid';
      return 'low';
    }
    if (family === 5) {
      if (series >= 5) return 'upper-mid';
      if (series >= 3) return 'mid';
      return 'low';
    }
    if (family === 3) return 'low';
  }

  if (/(i7|ryzen\s*7)/.test(s)) return 'upper-mid';
  if (/(i5|ryzen\s*5)/.test(s)) return 'mid';
  if (/(i3|ryzen\s*3|pentium|celeron|athlon)/.test(s)) return 'low';

  return 'mid';
}

export function parseResolution(resolution: string): ResolutionTier {
  const m = resolution.match(/(\d{3,5})\s*[xX\u00d7*]\s*(\d{3,5})/);
  if (!m) return '1080p';
  const w = Number(m[1]);
  const h = Number(m[2]);
  const pixels = w * h;
  if (pixels >= 5_500_000) return '4k';
  if (pixels >= 2_400_000) return '1440p';
  return '1080p';
}

function compareCpu(user: CpuTier, required: CpuTier): number {
  return CPU_TIER_RANK[user] - CPU_TIER_RANK[required];
}

function evaluateInstallDrive(driveType: DriveType): CheckItem {
  if (driveType === 'nvme') {
    return { label: 'Install Drive', severity: 'good', message: 'NVMe SSD — ideal for installation.' };
  }
  if (driveType === 'sata-ssd') {
    return { label: 'Install Drive', severity: 'good', message: 'SATA SSD — acceptable for installation.' };
  }
  if (driveType === 'hdd') {
    return {
      label: 'Install Drive',
      severity: 'bad',
      message: 'Installing to an HDD is not supported and will likely fail or cause major issues.',
    };
  }
  return {
    label: 'Install Drive',
    severity: 'bad',
    message: 'Installing to an external drive is not supported and will likely fail or cause major issues.',
  };
}

function evaluateDownloadsDrive(driveType: DriveType): CheckItem {
  const typeLabel =
    driveType === 'nvme' ? 'NVMe SSD' :
    driveType === 'sata-ssd' ? 'SATA SSD' :
    driveType === 'hdd' ? 'HDD' :
    'External drive';
  return {
    label: 'Downloads Drive',
    severity: 'good',
    message: `${typeLabel} — acceptable for the downloads folder.`,
  };
}

function evaluateFreeSpace(
  label: string,
  freeGB: number,
  requiredGB: number,
  sizeLabel: string
): CheckItem {
  if (freeGB < requiredGB) {
    return {
      label,
      severity: 'bad',
      message: `Not enough free space. This list requires ~${requiredGB} GB ${sizeLabel}; you have ${freeGB} GB.`,
    };
  }
  const margin = freeGB - requiredGB;
  if (margin < 50) {
    return {
      label,
      severity: 'warn',
      message: `You meet the ~${requiredGB} GB ${sizeLabel} requirement, but Wabbajack creates temporary files during installation. Very little space above the minimum may cause issues.`,
    };
  }
  return {
    label,
    severity: 'good',
    message: `${freeGB} GB free — meets the ~${requiredGB} GB ${sizeLabel} requirement.`,
  };
}

function evaluateInstall(input: CheckerInput, req: TierRequirements): CheckItem[] {
  const items: CheckItem[] = [];

  items.push(evaluateInstallDrive(input.installDrive));

  if (input.combinedStorage) {
    items.push(
      evaluateFreeSpace(
        'Combined Drive Free Space',
        input.installFreeGB,
        req.totalGB,
        'total'
      )
    );
  } else {
    items.push(
      evaluateFreeSpace(
        'Install Drive Free Space',
        input.installFreeGB,
        req.installGB,
        'install'
      )
    );
    if (input.downloadsDrive) {
      items.push(evaluateDownloadsDrive(input.downloadsDrive));
    }
    if (input.downloadsFreeGB !== null) {
      items.push(
        evaluateFreeSpace(
          'Downloads Drive Free Space',
          input.downloadsFreeGB,
          req.downloadGB,
          'download'
        )
      );
    }
  }

  return items;
}

function evaluateRuntime(input: CheckerInput, req: TierRequirements, tier: 'shipped' | 'addons'): CheckItem[] {
  const items: CheckItem[] = [];

  if (input.ramGB < req.ramMinGB) {
    items.push({
      label: 'RAM',
      severity: 'bad',
      message: `${input.ramGB} GB is below the ${req.ramMinGB} GB minimum.`,
    });
  } else if (input.ramGB < req.ramRecommendedGB) {
    items.push({
      label: 'RAM',
      severity: 'warn',
      message: `${input.ramGB} GB meets the minimum but is below the ${req.ramRecommendedGB} GB recommended.`,
    });
  } else {
    items.push({
      label: 'RAM',
      severity: 'good',
      message: `${input.ramGB} GB meets the recommended ${req.ramRecommendedGB} GB.`,
    });
  }

  if (input.vramGB < req.vramMinGB) {
    items.push({
      label: 'VRAM',
      severity: 'bad',
      message: `${input.vramGB} GB is below the ${req.vramMinGB} GB minimum for this list.`,
    });
  } else if (input.vramGB < req.vramRecommendedGB) {
    items.push({
      label: 'VRAM',
      severity: 'warn',
      message: `${input.vramGB} GB meets the minimum but is below the ${req.vramRecommendedGB} GB recommended.`,
    });
  } else {
    items.push({
      label: 'VRAM',
      severity: 'good',
      message: `${input.vramGB} GB meets the recommended ${req.vramRecommendedGB} GB.`,
    });
  }

  const userCpuTier = classifyCpu(input.cpuModel);
  const cpuDelta = compareCpu(userCpuTier, req.cpuMinTier);
  const cpuRecDelta = compareCpu(userCpuTier, req.cpuRecommendedTier);
  const cpuLabel = `CPU (${CPU_TIER_LABELS[userCpuTier]})`;
  if (cpuDelta < 0) {
    items.push({
      label: cpuLabel,
      severity: 'bad',
      message: `Below the ${CPU_TIER_LABELS[req.cpuMinTier]} tier minimum for this list.`,
    });
  } else if (cpuRecDelta < 0) {
    items.push({
      label: cpuLabel,
      severity: 'warn',
      message: `Meets minimum but is below the ${CPU_TIER_LABELS[req.cpuRecommendedTier]} tier recommended.`,
    });
  } else {
    items.push({
      label: cpuLabel,
      severity: 'good',
      message: `Meets or exceeds the ${CPU_TIER_LABELS[req.cpuRecommendedTier]} tier recommended.`,
    });
  }

  const res = parseResolution(input.resolution);
  const resItem = evaluateResolution(res, input.vramGB, tier);
  items.push(resItem);

  return items;
}

function evaluateResolution(res: ResolutionTier, vramGB: number, tier: 'shipped' | 'addons'): CheckItem {
  const label = `Resolution (${res})`;
  if (tier === 'addons') {
    if (res === '4k') {
      if (vramGB >= 16) return { label, severity: 'good', message: '4K with 16+ GB VRAM is suitable for the optional ENB presets and DLSS 5.' };
      if (vramGB >= 12) return { label, severity: 'warn', message: '4K on 12 GB VRAM may struggle with the optional ENB presets and DLSS 5.' };
      return { label, severity: 'bad', message: '4K with the optional add-ons needs 16 GB VRAM. Drop to 1440p or run the list as shipped.' };
    }
    if (res === '1440p') {
      if (vramGB >= 12) return { label, severity: 'good', message: '1440p with 12+ GB VRAM is suitable for the optional ENB presets and DLSS 5.' };
      return { label, severity: 'bad', message: '1440p with the optional add-ons needs at least 12 GB VRAM.' };
    }
    if (vramGB >= 12) return { label, severity: 'good', message: '1080p with 12+ GB VRAM runs the optional add-ons well.' };
    if (vramGB >= 8) return { label, severity: 'warn', message: '1080p on 8 GB VRAM is tight for the optional add-ons. Run the list as shipped.' };
    return { label, severity: 'bad', message: '1080p with the optional add-ons needs at least 8 GB VRAM.' };
  }

  if (res === '4k') {
    if (vramGB >= 16) return { label, severity: 'good', message: '4K with 16+ GB VRAM is suitable for this list.' };
    if (vramGB >= 12) return { label, severity: 'warn', message: '4K on 12 GB VRAM is borderline. VRAMr and the Performance preset of Texture Downscaler are strongly recommended.' };
    return { label, severity: 'bad', message: '4K needs at least 12 GB VRAM on this list.' };
  }
  if (res === '1440p') {
    if (vramGB >= 12) return { label, severity: 'good', message: '1440p with 12+ GB VRAM is suitable for this list.' };
    if (vramGB >= 8) return { label, severity: 'warn', message: '1440p on 8 GB VRAM is tight. VRAMr and the Performance preset of Texture Downscaler are strongly recommended.' };
    return { label, severity: 'bad', message: '1440p needs at least 8 GB VRAM on this list.' };
  }
  if (vramGB >= 12) return { label, severity: 'good', message: '1080p with 12+ GB VRAM runs this list well.' };
  if (vramGB >= 8) return { label, severity: 'warn', message: '1080p on 8 GB VRAM runs with VRAMr and the Performance preset of Texture Downscaler.' };
  return { label, severity: 'bad', message: '1080p needs at least 8 GB VRAM on this list; 6 GB cards are unsupported.' };
}

function pickWorst(items: CheckItem[]): Severity {
  if (items.some((i) => i.severity === 'bad')) return 'bad';
  if (items.some((i) => i.severity === 'warn')) return 'warn';
  return 'good';
}

export function evaluateChecker(input: CheckerInput): CheckerReport {
  const bundle: ModlistRequirements = modlistRequirements[input.list];

  const install = evaluateInstall(input, bundle.shipped);
  const runtime = evaluateRuntime(input, bundle.shipped, 'shipped');
  const storage = install.filter(
    (i) =>
      i.label === 'Combined Drive Free Space' ||
      i.label === 'Install Drive Free Space' ||
      i.label === 'Downloads Drive Free Space' ||
      i.label === 'Downloads Drive'
  );

  const installSeverity = pickWorst(install);
  const runtimeSeverity = pickWorst(runtime);

  let readiness: Readiness = 'ready';
  if (installSeverity === 'bad' || runtimeSeverity === 'bad') readiness = 'not-recommended';
  else if (installSeverity === 'warn' || runtimeSeverity === 'warn') readiness = 'risky';

  let summary: string;
  if (readiness === 'ready') summary = 'Your setup is ready for installation.';
  else if (readiness === 'risky')
    summary = 'Your setup can install, but some items are borderline. Review the warnings below.';
  else summary = 'Your setup is not ready for installation. Resolve the blockers below before proceeding.';

  let addons: Severity | 'not-requested' = 'not-requested';
  if (input.visualAddons) {
    const addonRuntime = evaluateRuntime(input, bundle.addons, 'addons');
    const addonSeverity = pickWorst(addonRuntime);
    addons = addonSeverity;

    let addonMessage: string;
    if (addonSeverity === 'good') {
      addonMessage = 'Your hardware meets the recommended tier for the optional ENB presets and DLSS 5.';
    } else if (addonSeverity === 'warn') {
      addonMessage = 'Borderline for the optional ENB presets and DLSS 5. Try them, but expect to dial back.';
    } else {
      addonMessage = 'Below the bar for the optional ENB presets and DLSS 5. Run the list as shipped.';
    }
    // Appended after readiness was already computed, so it never affects readiness.
    runtime.push({
      label: 'ENB presets / DLSS 5 (optional)',
      severity: addonSeverity,
      message: addonMessage,
    });

    if (readiness === 'ready' && addonSeverity !== 'good') {
      summary += ' The optional ENB presets and DLSS 5 are a stretch on this hardware; run the list as shipped first.';
    }
  }

  const notes: string[] = [];
  if (readiness === 'risky' || (input.visualAddons && addons !== 'good')) {
    notes.push('Run VRAMr to reduce VRAM pressure without visible quality loss.');
    notes.push('Use BethINI Pie to apply safe performance tuning.');
    notes.push('See the SOS Performance Tuning Guide for detailed steps.');
  }
  notes.push(
    'After installation, you may safely delete the downloads folder to free up space. This will not affect gameplay, but may limit your ability to reinstall or change mod options later.'
  );

  return {
    readiness,
    summary,
    addons,
    install,
    runtime,
    storage,
    notes,
  };
}
