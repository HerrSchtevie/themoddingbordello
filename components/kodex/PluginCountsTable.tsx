import { PluginCounts } from '@/types/modlist';

interface PluginCountsTableProps {
  counts: PluginCounts;
  accentColor: string;
}

const PLUGIN_CAP = 254;

const ROWS: Array<{
  key: keyof PluginCounts;
  label: string;
  emphasize?: boolean;
}> = [
  { key: 'all', label: 'All plugins' },
  { key: 'esms', label: 'ESMs' },
  { key: 'esps', label: 'ESPs' },
  { key: 'esmsPlusEsps', label: 'ESMs + ESPs', emphasize: true },
  { key: 'esls', label: 'ESLs' },
];

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function PluginCountsTable({ counts, accentColor }: PluginCountsTableProps) {
  const capUsed = counts.esmsPlusEsps.active;
  const capPercent = Math.min(100, Math.round((capUsed / PLUGIN_CAP) * 100));
  const headroom = PLUGIN_CAP - capUsed;

  return (
    <details
      className="group rounded-lg border border-bordello-border bg-bordello-surface/50 overflow-hidden mb-6"
      aria-label="Plugin counts"
    >
      <summary
        className="cursor-pointer px-4 py-3 flex items-center justify-between gap-3 hover:bg-bordello-surface transition-colors select-none list-none [&::-webkit-details-marker]:hidden"
        style={{ borderLeft: `3px solid ${accentColor}` }}
      >
        <div className="flex items-baseline gap-3 flex-wrap min-w-0">
          <span className="text-base font-semibold text-white">Plugin counts</span>
          <span className="text-xs text-bordello-muted">
            <span className="tabular-nums" style={{ color: accentColor }}>
              {formatNumber(capUsed)}
            </span>
            {' / '}
            <span className="tabular-nums">{formatNumber(PLUGIN_CAP)}</span>
            {' standard plugin slots used ('}
            <span className="tabular-nums">{capPercent}%</span>
            {')'}
          </span>
        </div>
        <svg
          className="w-4 h-4 text-bordello-muted transition-transform duration-200 shrink-0 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      <div className="border-t border-bordello-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-bordello-bg/50 text-bordello-muted">
            <tr>
              <th className="text-left font-medium px-4 py-2">Type</th>
              <th className="text-right font-medium px-4 py-2 whitespace-nowrap">Active</th>
              <th className="text-right font-medium px-4 py-2 whitespace-nowrap">Total</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const cell = counts[row.key];
              return (
                <tr
                  key={row.key}
                  className="border-t border-bordello-border/50"
                  style={
                    row.emphasize
                      ? { background: `${accentColor}14` }
                      : undefined
                  }
                >
                  <td
                    className={`px-4 py-2 ${row.emphasize ? 'font-semibold text-white' : 'text-bordello-text'}`}
                    style={row.emphasize ? { borderLeft: `3px solid ${accentColor}` } : undefined}
                  >
                    {row.label}
                  </td>
                  <td className={`px-4 py-2 text-right tabular-nums ${row.emphasize ? 'font-semibold text-white' : 'text-bordello-text'}`}>
                    {formatNumber(cell.active)}
                  </td>
                  <td className={`px-4 py-2 text-right tabular-nums ${row.emphasize ? 'font-semibold text-white' : 'text-bordello-muted'}`}>
                    {formatNumber(cell.total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="px-4 py-3 text-xs text-bordello-muted border-t border-bordello-border">
        Skyrim allows up to {PLUGIN_CAP} standard plugins (ESMs + ESPs). ESL-flagged plugins
        do not count toward that limit, so the headroom for your own additions is{' '}
        <span className="tabular-nums text-bordello-text">{headroom}</span>{' '}
        standard slot{headroom === 1 ? '' : 's'}.
      </p>
    </details>
  );
}
