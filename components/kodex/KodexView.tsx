import { KodexNode, KodexSection } from '@/lib/kodex';

interface KodexViewProps {
  nodes: KodexNode[];
  accentColor: string;
}

function SectionCard({
  section,
  accentColor,
  headingLevel,
}: {
  section: KodexSection;
  accentColor: string;
  headingLevel: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <section>
      <Heading id={section.id} className="visually-hidden">
        {section.title}
      </Heading>
      <details className="group rounded-lg border border-bordello-border bg-bordello-surface/50 overflow-hidden">
        <summary
          className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 hover:bg-bordello-surface transition-colors select-none"
          style={{ borderLeft: `3px solid ${accentColor}` }}
        >
          <span className="text-base font-semibold text-white">
            {section.title}
          </span>
          <span className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-bordello-muted">
              {section.mods.length} {section.mods.length === 1 ? 'mod' : 'mods'}
            </span>
            <svg
              className="w-4 h-4 text-bordello-muted transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </summary>
        <div className="overflow-x-auto border-t border-bordello-border">
          <table className="w-full text-sm">
            <thead className="bg-bordello-bg/50 text-bordello-muted">
              <tr>
                <th className="text-left font-medium px-4 py-2">Mod Name</th>
                <th className="text-left font-medium px-4 py-2 whitespace-nowrap">
                  Mod Version
                </th>
                <th className="text-left font-medium px-4 py-2 whitespace-nowrap">
                  Is Enabled
                </th>
                <th className="text-left font-medium px-4 py-2">Priority</th>
              </tr>
            </thead>
            <tbody>
              {section.mods.map((mod, i) => (
                <tr
                  key={`${section.id}-${i}`}
                  className="border-t border-bordello-border/50 hover:bg-bordello-bg/40"
                >
                  <td className="px-4 py-2">
                    {mod.nexusUrl ? (
                      <a
                        href={mod.nexusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: accentColor }}
                      >
                        {mod.name}
                      </a>
                    ) : (
                      <span className="text-bordello-text">{mod.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-bordello-muted whitespace-nowrap">
                    {mod.version || '—'}
                  </td>
                  <td className="px-4 py-2 text-bordello-muted">
                    {mod.enabled}
                  </td>
                  <td className="px-4 py-2 text-bordello-muted">
                    {mod.priority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

export function KodexView({ nodes, accentColor }: KodexViewProps) {
  if (nodes.length === 0) {
    return (
      <p className="text-bordello-muted">No Kodex data available for this modlist.</p>
    );
  }

  return (
    <div className="space-y-6">
      {nodes.map((node) => {
        if (node.kind === 'group') {
          return (
            <div key={node.id} className="space-y-3">
              <h2
                id={node.id}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-bordello-muted pb-2 border-b"
                style={{ borderColor: accentColor }}
              >
                {node.title}
              </h2>
              {node.children.length > 0 && (
                <div className="space-y-3">
                  {node.children.map((child) => (
                    <SectionCard
                      key={child.id}
                      section={child}
                      accentColor={accentColor}
                      headingLevel="h3"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        }
        return (
          <SectionCard
            key={node.id}
            section={node}
            accentColor={accentColor}
            headingLevel="h2"
          />
        );
      })}
    </div>
  );
}
