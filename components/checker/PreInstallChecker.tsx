'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { modlistBySlug } from '@/lib/modlists';
import { ModlistSlug } from '@/types/modlist';
import {
  CpuBrand,
  DriveType,
  GpuBrand,
  ProfileKey,
  cpuBrandLabels,
  cpuOptions,
  gpuBrandLabels,
  gpuOptions,
  isSupportedCheckerSlug,
  ramOptions,
  resolutionOptions,
  supportedCheckerSlugs,
  vramOptions,
} from '@/lib/preInstallChecker';
import {
  CheckItem,
  CheckerInput,
  Readiness,
  Severity,
  evaluateChecker,
} from '@/lib/preInstallCheckerRules';

type SupportedSlug = Exclude<ModlistSlug, 'arr'>;

interface PreInstallCheckerProps {
  initialList?: string;
  initialProfile?: string;
}

type Step = 1 | 2 | 3 | 4;

interface FormState {
  list: SupportedSlug | '';
  profile: ProfileKey | '';
  gpuBrand: GpuBrand | '';
  gpuModel: string;
  gpuOtherName: string;
  vramChoice: string;
  vramOther: string;
  cpuBrand: CpuBrand | '';
  cpuModelChoice: string;
  cpuOtherName: string;
  ramChoice: string;
  ramOther: string;
  resolutionChoice: string;
  resolutionOther: string;
  installDrive: DriveType | '';
  installFreeGB: string;
  downloadsSameDrive: 'yes' | 'no' | '';
  downloadsDrive: DriveType | '';
  downloadsFreeGB: string;
}

const driveOptions: { value: DriveType; label: string }[] = [
  { value: 'nvme', label: 'NVMe SSD' },
  { value: 'sata-ssd', label: 'SATA SSD' },
  { value: 'hdd', label: 'HDD' },
  { value: 'external', label: 'External Drive' },
];

const OTHER = 'other';

function normalizeProfile(input?: string): ProfileKey | '' {
  if (input === 'lords-vision' || input === 'performance') return input;
  return '';
}

function normalizeList(input?: string): SupportedSlug | '' {
  if (input && isSupportedCheckerSlug(input)) return input;
  return '';
}

const initialForm = (list: SupportedSlug | '', profile: ProfileKey | ''): FormState => ({
  list,
  profile,
  gpuBrand: '',
  gpuModel: '',
  gpuOtherName: '',
  vramChoice: '',
  vramOther: '',
  cpuBrand: '',
  cpuModelChoice: '',
  cpuOtherName: '',
  ramChoice: '',
  ramOther: '',
  resolutionChoice: '1920x1080',
  resolutionOther: '',
  installDrive: '',
  installFreeGB: '',
  downloadsSameDrive: '',
  downloadsDrive: '',
  downloadsFreeGB: '',
});

export function PreInstallChecker({ initialList, initialProfile }: PreInstallCheckerProps) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(
    initialForm(normalizeList(initialList), normalizeProfile(initialProfile))
  );

  const totalSteps = 3;

  const gpuModels = form.gpuBrand ? gpuOptions[form.gpuBrand] : [];
  const cpuModels = form.cpuBrand ? cpuOptions[form.cpuBrand] : [];

  const resolvedGpuName = useMemo(() => {
    if (!form.gpuBrand) return '';
    if (form.gpuModel === OTHER) return form.gpuOtherName.trim();
    if (form.gpuModel) return `${gpuBrandLabels[form.gpuBrand]} ${form.gpuModel}`;
    return '';
  }, [form.gpuBrand, form.gpuModel, form.gpuOtherName]);

  const resolvedVramGB = useMemo(() => {
    if (form.vramChoice === OTHER) return Number(form.vramOther);
    return Number(form.vramChoice);
  }, [form.vramChoice, form.vramOther]);

  const resolvedCpuModel = useMemo(() => {
    if (!form.cpuBrand) return '';
    if (form.cpuModelChoice === OTHER) return form.cpuOtherName.trim();
    if (form.cpuModelChoice) return `${cpuBrandLabels[form.cpuBrand]} ${form.cpuModelChoice}`;
    return '';
  }, [form.cpuBrand, form.cpuModelChoice, form.cpuOtherName]);

  const resolvedRamGB = useMemo(() => {
    if (form.ramChoice === OTHER) return Number(form.ramOther);
    return Number(form.ramChoice);
  }, [form.ramChoice, form.ramOther]);

  const resolvedResolution = useMemo(() => {
    if (form.resolutionChoice === OTHER) return form.resolutionOther.trim();
    return form.resolutionChoice;
  }, [form.resolutionChoice, form.resolutionOther]);

  const canAdvanceFrom1 = form.list !== '' && form.profile !== '';
  const canAdvanceFrom2 =
    resolvedGpuName !== '' &&
    resolvedCpuModel !== '' &&
    resolvedVramGB > 0 &&
    resolvedRamGB > 0 &&
    resolvedResolution !== '';
  const canAdvanceFrom3 =
    form.installDrive !== '' &&
    Number(form.installFreeGB) > 0 &&
    (form.downloadsSameDrive === 'yes' ||
      (form.downloadsSameDrive === 'no' &&
        form.downloadsDrive !== '' &&
        Number(form.downloadsFreeGB) > 0));

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleGpuModelChange = (value: string) => {
    setForm((f) => {
      const next: FormState = { ...f, gpuModel: value };
      if (value && value !== OTHER && f.gpuBrand) {
        const match = gpuOptions[f.gpuBrand].find((g) => g.name === value);
        if (match) {
          next.vramChoice = vramOptions.includes(match.vramGB) ? String(match.vramGB) : OTHER;
          next.vramOther = vramOptions.includes(match.vramGB) ? '' : String(match.vramGB);
        }
      }
      if (value === OTHER) {
        next.gpuOtherName = '';
      }
      return next;
    });
  };

  const handleGpuBrandChange = (value: string) => {
    setForm((f) => ({
      ...f,
      gpuBrand: value as GpuBrand | '',
      gpuModel: '',
      gpuOtherName: '',
    }));
  };

  const handleCpuBrandChange = (value: string) => {
    setForm((f) => ({
      ...f,
      cpuBrand: value as CpuBrand | '',
      cpuModelChoice: '',
      cpuOtherName: '',
    }));
  };

  const report = useMemo(() => {
    if (step !== 4) return null;
    if (!form.list || !form.profile || !form.installDrive || form.downloadsSameDrive === '') return null;
    const combinedStorage = form.downloadsSameDrive === 'yes';
    if (!combinedStorage && (!form.downloadsDrive || Number(form.downloadsFreeGB) <= 0)) return null;
    const input: CheckerInput = {
      list: form.list,
      profile: form.profile,
      gpuName: resolvedGpuName,
      vramGB: resolvedVramGB,
      cpuModel: resolvedCpuModel,
      ramGB: resolvedRamGB,
      resolution: resolvedResolution,
      installDrive: form.installDrive,
      installFreeGB: Number(form.installFreeGB),
      combinedStorage,
      downloadsDrive: combinedStorage ? null : (form.downloadsDrive as DriveType),
      downloadsFreeGB: combinedStorage ? null : Number(form.downloadsFreeGB),
    };
    return evaluateChecker(input);
  }, [
    step,
    form,
    resolvedGpuName,
    resolvedVramGB,
    resolvedCpuModel,
    resolvedRamGB,
    resolvedResolution,
  ]);

  const accent = form.list ? modlistBySlug[form.list].accentColor : '#a1a1aa';

  const reset = () => {
    setStep(1);
    setForm(initialForm('', ''));
  };

  if (step === 4 && report && form.list) {
    return <ResultView report={report} list={form.list} accent={accent} onReset={reset} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {step <= totalSteps && (
        <div className="mb-6">
          <span className="text-sm text-bordello-muted">
            Step {step} of {totalSteps}
          </span>
          <div className="mt-2 h-1 bg-bordello-border rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <StepContainer title="Select Your Modlist">
          <Field label="Modlist">
            <Select
              value={form.list}
              onChange={(v) => update('list', v as SupportedSlug | '')}
              options={[
                { value: '', label: 'Select a modlist\u2026' },
                ...supportedCheckerSlugs.map((slug) => ({
                  value: slug,
                  label: `${modlistBySlug[slug].abbreviation} \u2014 ${modlistBySlug[slug].name}`,
                })),
              ]}
            />
          </Field>
          <Field label="Profile">
            <Select
              value={form.profile}
              onChange={(v) => update('profile', v as ProfileKey | '')}
              options={[
                { value: '', label: 'Select a profile\u2026' },
                { value: 'lords-vision', label: 'Lord\u2019s Vision' },
                { value: 'performance', label: 'Performance' },
              ]}
            />
          </Field>
          <WizardNav
            onBack={null}
            onNext={() => setStep(2)}
            canNext={canAdvanceFrom1}
            accent={accent}
          />
        </StepContainer>
      )}

      {step === 2 && (
        <StepContainer title="Your Hardware">
          <Field label="GPU Brand">
            <Select
              value={form.gpuBrand}
              onChange={handleGpuBrandChange}
              options={[
                { value: '', label: 'Select a GPU brand\u2026' },
                { value: 'nvidia', label: 'NVIDIA' },
                { value: 'amd', label: 'AMD' },
                { value: 'intel', label: 'Intel' },
              ]}
            />
          </Field>

          {form.gpuBrand && (
            <Field label="GPU Model">
              <Select
                value={form.gpuModel}
                onChange={handleGpuModelChange}
                options={[
                  { value: '', label: 'Select a GPU model\u2026' },
                  ...gpuModels.map((g) => ({ value: g.name, label: g.name })),
                  { value: OTHER, label: `Other ${gpuBrandLabels[form.gpuBrand]} GPU` },
                ]}
              />
            </Field>
          )}

          {form.gpuBrand && form.gpuModel === OTHER && (
            <Field label="GPU Name">
              <TextInput
                value={form.gpuOtherName}
                onChange={(v) => update('gpuOtherName', v)}
                placeholder={`e.g. ${gpuBrandLabels[form.gpuBrand]} RTX 4070`}
              />
            </Field>
          )}

          <Field label="VRAM">
            <Select
              value={form.vramChoice}
              onChange={(v) => update('vramChoice', v)}
              options={[
                { value: '', label: 'Select VRAM\u2026' },
                ...vramOptions.map((n) => ({ value: String(n), label: `${n} GB` })),
                { value: OTHER, label: 'Other' },
              ]}
            />
          </Field>

          {form.vramChoice === OTHER && (
            <Field label="VRAM (GB)">
              <NumberInput
                value={form.vramOther}
                onChange={(v) => update('vramOther', v)}
                placeholder="e.g. 12"
              />
            </Field>
          )}

          <Field label="CPU Brand">
            <Select
              value={form.cpuBrand}
              onChange={handleCpuBrandChange}
              options={[
                { value: '', label: 'Select a CPU brand\u2026' },
                { value: 'intel', label: 'Intel' },
                { value: 'amd', label: 'AMD' },
              ]}
            />
          </Field>

          {form.cpuBrand && (
            <Field label="CPU Model">
              <Select
                value={form.cpuModelChoice}
                onChange={(v) => update('cpuModelChoice', v)}
                options={[
                  { value: '', label: 'Select a CPU model\u2026' },
                  ...cpuModels.map((name) => ({ value: name, label: name })),
                  { value: OTHER, label: `Other ${cpuBrandLabels[form.cpuBrand]} CPU` },
                ]}
              />
            </Field>
          )}

          {form.cpuBrand && form.cpuModelChoice === OTHER && (
            <Field label="CPU Name">
              <TextInput
                value={form.cpuOtherName}
                onChange={(v) => update('cpuOtherName', v)}
                placeholder={`e.g. ${cpuBrandLabels[form.cpuBrand]} Core i7-12700K`}
              />
            </Field>
          )}

          <Field label="RAM">
            <Select
              value={form.ramChoice}
              onChange={(v) => update('ramChoice', v)}
              options={[
                { value: '', label: 'Select RAM\u2026' },
                ...ramOptions.map((n) => ({ value: String(n), label: `${n} GB` })),
                { value: OTHER, label: 'Other' },
              ]}
            />
          </Field>

          {form.ramChoice === OTHER && (
            <Field label="RAM (GB)">
              <NumberInput
                value={form.ramOther}
                onChange={(v) => update('ramOther', v)}
                placeholder="e.g. 32"
              />
            </Field>
          )}

          <Field label="Resolution">
            <Select
              value={form.resolutionChoice}
              onChange={(v) => update('resolutionChoice', v)}
              options={[
                ...resolutionOptions.map((r) => ({ value: r.value, label: r.label })),
                { value: OTHER, label: 'Other' },
              ]}
            />
          </Field>

          {form.resolutionChoice === OTHER && (
            <Field label="Resolution (WxH)">
              <TextInput
                value={form.resolutionOther}
                onChange={(v) => update('resolutionOther', v)}
                placeholder="e.g. 2560x1080"
              />
            </Field>
          )}

          <WizardNav
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
            canNext={canAdvanceFrom2}
            accent={accent}
          />
        </StepContainer>
      )}

      {step === 3 && (
        <StepContainer title="Storage & Setup">
          <h3 className="text-base font-semibold text-white">Install Location</h3>
          <Field label="Install Drive Type">
            <Select
              value={form.installDrive}
              onChange={(v) => update('installDrive', v as DriveType | '')}
              options={[
                { value: '', label: 'Select a drive type\u2026' },
                ...driveOptions,
              ]}
            />
          </Field>
          <Field label="Install Drive Free Space (GB)">
            <NumberInput
              value={form.installFreeGB}
              onChange={(v) => update('installFreeGB', v)}
              placeholder="e.g. 700"
            />
          </Field>

          <h3 className="text-base font-semibold text-white pt-2">Downloads Location</h3>
          <Field label="Are downloads on the same drive as install?">
            <Select
              value={form.downloadsSameDrive}
              onChange={(v) => update('downloadsSameDrive', v as 'yes' | 'no' | '')}
              options={[
                { value: '', label: 'Select\u2026' },
                { value: 'yes', label: 'Yes \u2014 same drive for install and downloads' },
                { value: 'no', label: 'No \u2014 separate drive for downloads' },
              ]}
            />
          </Field>

          {form.downloadsSameDrive === 'no' && (
            <>
              <Field label="Downloads Drive Type">
                <Select
                  value={form.downloadsDrive}
                  onChange={(v) => update('downloadsDrive', v as DriveType | '')}
                  options={[
                    { value: '', label: 'Select a drive type\u2026' },
                    ...driveOptions,
                  ]}
                />
              </Field>
              <Field label="Downloads Drive Free Space (GB)">
                <NumberInput
                  value={form.downloadsFreeGB}
                  onChange={(v) => update('downloadsFreeGB', v)}
                  placeholder="e.g. 300"
                />
              </Field>
            </>
          )}

          <WizardNav
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
            canNext={canAdvanceFrom3}
            nextLabel="Check My Setup"
            accent={accent}
          />
        </StepContainer>
      )}
    </div>
  );
}

function StepContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">{title}</h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-bordello-text mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputClasses =
  'w-full p-3 rounded-lg border border-bordello-border bg-bordello-surface text-bordello-text placeholder:text-bordello-muted/60 focus:outline-none focus:border-bordello-muted transition-colors';

const numberInputClasses = `${inputClasses} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`;

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClasses}
    />
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      inputMode="numeric"
      min={0}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={numberInputClasses}
    />
  );
}

function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T | '';
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClasses}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function WizardNav({
  onBack,
  onNext,
  canNext,
  nextLabel = 'Next',
  accent,
}: {
  onBack: (() => void) | null;
  onNext: () => void;
  canNext: boolean;
  nextLabel?: string;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between pt-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-bordello-muted hover:text-white transition-colors"
        >
          Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-white transition-all hover:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: accent }}
      >
        {nextLabel}
      </button>
    </div>
  );
}

function ResultView({
  report,
  list,
  accent,
  onReset,
}: {
  report: ReturnType<typeof evaluateChecker>;
  list: SupportedSlug;
  accent: string;
  onReset: () => void;
}) {
  const meta = modlistBySlug[list];
  const suggestedProfileLabel =
    report.suggestedProfile === 'lords-vision' ? 'Lord\u2019s Vision' : 'Performance';

  return (
    <div className="max-w-3xl mx-auto">
      <SummaryCard
        readiness={report.readiness}
        summary={report.summary}
        suggestedProfileLabel={suggestedProfileLabel}
        accent={accent}
        abbreviation={meta.abbreviation}
      />

      <Section title="Install Readiness" items={report.install} />
      <Section title="Runtime Suitability" items={report.runtime} />

      <div className="mt-8 rounded-xl border border-bordello-border bg-bordello-surface/60 p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Helpful Notes</h3>
        <ul className="space-y-2">
          {report.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-bordello-text">
              <span className="text-bordello-muted mt-0.5">-</span>
              <span>
                {note === 'See the SOS Performance Tuning Guide for detailed steps.' ? (
                  <>
                    See the{' '}
                    <Link
                      href="/guides/sos-performance-tuning"
                      className="underline hover:text-white transition-colors"
                    >
                      SOS Performance Tuning Guide
                    </Link>
                    {' '}for detailed steps.
                  </>
                ) : note}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/modlists/${list}/overview`}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg text-white transition-colors hover:brightness-125"
          style={{ backgroundColor: accent }}
        >
          Overview
        </Link>
        <Link
          href="/guides/sos-performance-tuning-guide"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg text-bordello-text bg-bordello-surface border border-bordello-border hover:text-white hover:border-bordello-muted/50 transition-colors"
        >
          SOS Performance Tuning Guide
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="ml-auto text-sm text-bordello-muted hover:text-white transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

const readinessMeta: Record<Readiness, { label: string; color: string; border: string }> = {
  ready: { label: 'Ready', color: '#22c55e', border: '#22c55e' },
  risky: { label: 'Risky', color: '#f97316', border: '#f97316' },
  'not-recommended': { label: 'Not Recommended', color: '#ef4444', border: '#ef4444' },
};

function SummaryCard({
  readiness,
  summary,
  suggestedProfileLabel,
  accent,
  abbreviation,
}: {
  readiness: Readiness;
  summary: string;
  suggestedProfileLabel: string;
  accent: string;
  abbreviation: string;
}) {
  const meta = readinessMeta[readiness];
  return (
    <div
      className="p-6 sm:p-8 rounded-xl border-2 mb-8"
      style={{ borderColor: meta.border }}
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: accent, color: '#fff' }}
        >
          {abbreviation}
        </span>
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: meta.color, color: '#0a0a0f' }}
        >
          {meta.label}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Suggested Profile: {suggestedProfileLabel}
      </h2>
      <p className="text-bordello-text">{summary}</p>
    </div>
  );
}

const severityMeta: Record<Severity, { icon: string; color: string }> = {
  good: { icon: '\u2713', color: '#22c55e' },
  warn: { icon: '!', color: '#f97316' },
  bad: { icon: '\u00d7', color: '#ef4444' },
};

function Section({ title, items }: { title: string; items: CheckItem[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => {
          const sev = severityMeta[item.severity];
          return (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg border border-bordello-border bg-bordello-surface/60"
            >
              <span
                className="mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: sev.color, color: '#0a0a0f' }}
                aria-hidden
              >
                {sev.icon}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className="text-sm text-bordello-text">{item.message}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
