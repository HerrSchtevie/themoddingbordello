const TOOL_HOTKEYS: { name: string; url: string; method: string; kbd?: string; text?: string }[] = [
  {
    name: 'Modex',
    url: 'https://www.nexusmods.com/skyrimspecialedition/mods/137877',
    method: 'Hotkey',
    kbd: 'DELETE',
  },
  {
    name: 'Tailor',
    url: 'https://www.nexusmods.com/skyrimspecialedition/mods/173691?tab=description',
    method: 'Hotkey',
    kbd: 'F7',
  },
  {
    name: 'Dress Up',
    url: 'https://www.nexusmods.com/skyrimspecialedition/mods/142755',
    method: 'Magic',
    text: 'Equip the ability “Dress Up”',
  },
];

const FLOW_STEPS = [
  {
    question: 'Do you know the name of the outfit?',
    no: 'Catalog',
    yes: 'Continue',
  },
  {
    question: 'Do you want to work with wigs, hair color, modular item sets, or conditional outfits?',
    yes: 'Tailor',
    no: 'Continue',
  },
  {
    question: 'Do you want to see it on the character quickly without adding items or trading?',
    yes: 'Dress Up',
    no: 'Modex',
  },
];

const TOOL_CARDS: {
  id: string;
  label: string;
  title: string;
  route: { answer: 'YES' | 'NO'; from: string };
  hotkey?: { kbd?: string; text?: string };
  intro: string;
  detail?: { pros: string; tradeoffs: string };
  steps: string[];
  link?: { href: string; text: string };
}[] = [
  {
    id: 'guide-plan',
    label: '01 · Plan',
    title: 'Start with the catalog',
    route: { answer: 'NO', from: 'Question 1' },
    intro:
      'Use search and filters for category, style, theme, gender, features, and body support to identify the exact armor set you want.',
    steps: [
      'Open the armor card and inspect its thumbnail and tags.',
      'Open the mod page to review every available option.',
      'Note the author and mod name. Be prepared to search by these names.',
    ],
    link: { href: '#catalog', text: 'Return to catalog ↑' },
  },
  {
    id: 'guide-tailor',
    label: '02 · Tailor',
    title: 'Using Tailor',
    route: { answer: 'YES', from: 'Question 2' },
    hotkey: { kbd: 'F7' },
    intro:
      'Tailor is best when you want to play with character hair options, assemble an outfit with pieces from multiple outfits, explore modular looks easily, or save multiple outfits for different circumstances.',
    detail: {
      pros: 'outfit-focused organization, easier repeat use, and a better workflow for consistent character wardrobes.',
      tradeoffs:
        'it may take more setup, and a saved outfit can still contain clipping or incompatible pieces if the underlying equipment is not checked. The add-on also requires you to know the name of the .esp that owns the armor piece, making it clunky to search for items.',
    },
    steps: [
      'Open Tailor (F7) while pointing at the NPC you are interested in.',
      'Create a new outfit.',
      'Preview the outfit in real time and make modifications.',
      'Save the outfit with a clear name, such as “Court,” “Travel,” or “Battle.”',
    ],
    link: { href: 'https://www.nexusmods.com/skyrimspecialedition/mods/173691?tab=description', text: 'Open Nexus page ↗' },
  },
  {
    id: 'guide-dressup',
    label: '03 · Dress Up',
    title: 'Using Dress Up',
    route: { answer: 'YES', from: 'Question 3' },
    hotkey: { text: 'Magic' },
    intro: 'Use Dress Up to see an outfit quickly on an NPC without adding items or trading.',
    steps: [
      'Equip the “Dress Up” ability via Magic.',
      'Cast it on an NPC and select the armor you want to place on them.',
      'Cast it again on an NPC and use the Other Apparel → Strip function to reset their armor.',
      'Cast it with no target to place the items directly in your inventory.',
    ],
    link: { href: 'https://www.nexusmods.com/skyrimspecialedition/mods/142755', text: 'Open Nexus page ↗' },
  },
  {
    id: 'guide-modex',
    label: '04 · Modex',
    title: 'Using Modex',
    route: { answer: 'NO', from: 'Question 3' },
    hotkey: { kbd: 'DELETE' },
    intro: 'Use Modex when you know what you want and need a fast, searchable way to add the actual pieces of one or more sets.',
    steps: [
      'Hit DELETE to open Modex and navigate to “Add Item.”',
      'Use the search bar at the top to find the item.',
      'Select each item you want. You can drag across multiple items or Ctrl-click to select multiple items.',
      'Right-click and select “Add Selection to Inventory.”',
      'Use the items for yourself or your companions.',
    ],
    link: { href: 'https://www.nexusmods.com/skyrimspecialedition/mods/137877', text: 'Open Nexus page ↗' },
  },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block px-2 py-0.5 rounded-md border border-bordello-muted/40 border-b-2 bg-bordello-bg font-mono text-xs text-white align-middle">
      {children}
    </kbd>
  );
}

const YES = '#34d399';
const NO = '#f87171';

function FlowchartDesktop() {
  return (
    <svg
      viewBox="0 0 1000 280"
      className="hidden lg:block w-full h-auto"
      aria-label="Outfit tool decision flow: question one, do you know the name of the outfit — no leads to the catalog, yes continues. Question two, wigs, hair color, modular sets, or conditional outfits — yes leads to Tailor, no continues. Question three, quick preview without adding items — yes leads to Dress Up, no leads to Modex."
    >
      <defs>
        <marker id="flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
        </marker>
      </defs>

      <g>
        <rect x="20" y="20" width="240" height="84" rx="10" fill="#12121a" stroke="#1e1e2e" />
        <text x="40" y="44" fill="#71717a" fontSize="11" fontFamily="inherit" letterSpacing="2">
          01
        </text>
        <text x="40" y="68" fill="#ffffff" fontSize="15" fontWeight="600" fontFamily="inherit">
          Do you know the name
        </text>
        <text x="40" y="88" fill="#ffffff" fontSize="15" fontWeight="600" fontFamily="inherit">
          of the outfit?
        </text>
      </g>

      <g>
        <rect x="380" y="20" width="240" height="84" rx="10" fill="#12121a" stroke="#1e1e2e" />
        <text x="400" y="40" fill="#71717a" fontSize="11" fontFamily="inherit" letterSpacing="2">
          02
        </text>
        <text x="400" y="60" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="inherit">
          Do you want wigs, hair color,
        </text>
        <text x="400" y="78" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="inherit">
          modular item sets, or
        </text>
        <text x="400" y="96" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="inherit">
          conditional outfits?
        </text>
      </g>

      <g>
        <rect x="740" y="20" width="240" height="84" rx="10" fill="#12121a" stroke="#1e1e2e" />
        <text x="760" y="40" fill="#71717a" fontSize="11" fontFamily="inherit" letterSpacing="2">
          03
        </text>
        <text x="760" y="60" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="inherit">
          Do you want to see it quickly
        </text>
        <text x="760" y="78" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="inherit">
          on the character, without
        </text>
        <text x="760" y="96" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="inherit">
          adding items or trading?
        </text>
      </g>

      <g style={{ color: YES }}>
        <path d="M260 62 H372" stroke={YES} strokeWidth="1.5" fill="none" markerEnd="url(#flow-arrow)" />
        <text x="316" y="54" textAnchor="middle" fill={YES} fontSize="12" fontWeight="600" fontFamily="inherit">
          YES
        </text>
      </g>
      <g style={{ color: NO }}>
        <path d="M620 62 H732" stroke={NO} strokeWidth="1.5" fill="none" markerEnd="url(#flow-arrow)" />
        <text x="676" y="54" textAnchor="middle" fill={NO} fontSize="12" fontWeight="600" fontFamily="inherit">
          NO
        </text>
      </g>

      <g style={{ color: NO }}>
        <path d="M140 104 V192" stroke={NO} strokeWidth="1.5" fill="none" markerEnd="url(#flow-arrow)" />
        <text x="152" y="152" fill={NO} fontSize="12" fontWeight="600" fontFamily="inherit">
          NO
        </text>
      </g>
      <g style={{ color: YES }}>
        <path d="M500 104 V192" stroke={YES} strokeWidth="1.5" fill="none" markerEnd="url(#flow-arrow)" />
        <text x="512" y="152" fill={YES} fontSize="12" fontWeight="600" fontFamily="inherit">
          YES
        </text>
      </g>
      <g style={{ color: YES }}>
        <path d="M800 104 V148 H735 V192" stroke={YES} strokeWidth="1.5" fill="none" markerEnd="url(#flow-arrow)" />
        <text x="812" y="132" fill={YES} fontSize="12" fontWeight="600" fontFamily="inherit">
          YES
        </text>
      </g>
      <g style={{ color: NO }}>
        <path d="M920 104 V148 H930 V192" stroke={NO} strokeWidth="1.5" fill="none" markerEnd="url(#flow-arrow)" />
        <text x="932" y="132" fill={NO} fontSize="12" fontWeight="600" fontFamily="inherit">
          NO
        </text>
      </g>

      {[
        { href: '#guide-plan', x: 40, w: 200, cx: 140, label: 'Catalog' },
        { href: '#guide-tailor', x: 400, w: 200, cx: 500, label: 'Tailor' },
        { href: '#guide-dressup', x: 655, w: 160, cx: 735, label: 'Dress Up' },
        { href: '#guide-modex', x: 860, w: 140, cx: 930, label: 'Modex' },
      ].map((node) => (
        <a key={node.href} href={node.href} aria-label={`Jump to the ${node.label} guide`}>
          <g className="cursor-pointer">
            <rect
              x={node.x}
              y="196"
              width={node.w}
              height="52"
              rx="10"
              stroke="#6c2631"
              className="fill-[#a21827]/[0.14] hover:fill-[#a21827]/30 transition-all"
            />
            <text
              x={node.cx}
              y="228"
              textAnchor="middle"
              fill="#ce6d76"
              fontSize="16"
              fontWeight="600"
              fontFamily="inherit"
            >
              {node.label} ↓
            </text>
          </g>
        </a>
      ))}
    </svg>
  );
}

export function OutfitToolGuide() {
  return (
    <section id="guides" className="mt-16 scroll-mt-24">
      <p className="text-xs uppercase tracking-widest text-bordello-muted">Practical wardrobe notes</p>
      <h2 className="text-2xl font-bold text-white mt-1 mb-3">Outfit Creation Tools</h2>
      <p className="text-bordello-muted max-w-3xl">
        The Modding Bordello modlists have three distinct methods to add items to your character. Use whichever tool you
        prefer — the decision flow below may help you choose, and each tool has basic utilization steps further down.
      </p>

      <div className="mt-6 rounded-xl border border-bordello-border bg-bordello-surface/60 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-bordello-border">
              <th className="text-left p-3 font-semibold text-white">Tool</th>
              <th className="text-left p-3 font-semibold text-white">How to open it</th>
            </tr>
          </thead>
          <tbody>
            {TOOL_HOTKEYS.map((tool) => (
              <tr key={tool.name} className="border-b border-bordello-border last:border-0">
                <td className="p-3">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-medium underline underline-offset-2 hover:brightness-125 transition-all"
                  >
                    {tool.name}
                  </a>
                </td>
                <td className="p-3 text-bordello-muted">
                  <span className="inline-block px-2 py-0.5 rounded bg-bordello-bg border border-bordello-border text-xs uppercase tracking-wide mr-2">
                    {tool.method}
                  </span>
                  {tool.kbd ? <Kbd>{tool.kbd}</Kbd> : <span className="text-bordello-text font-medium">{tool.text}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-widest text-bordello-muted">Tool selection</p>
        <h3 className="text-xl font-semibold text-white mt-1 mb-4">Find the shortest path to the right tool</h3>

        <FlowchartDesktop />

        <ol className="lg:hidden space-y-3 max-w-2xl">
          {FLOW_STEPS.map((step, i) => (
            <li key={step.question} className="rounded-xl border border-bordello-border bg-bordello-surface/60 p-4">
              <p className="text-sm font-semibold text-white">
                <span className="text-bordello-muted mr-2">{i + 1}.</span>
                {step.question}
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <span className="text-bordello-muted">
                  <strong className="text-emerald-400/90 font-semibold mr-1.5">YES</strong>
                  {step.yes}
                </span>
                <span className="text-bordello-muted">
                  <strong className="text-red-400/90 font-semibold mr-1.5">NO</strong>
                  {step.no}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {TOOL_CARDS.map((card) => (
          <article
            key={card.title}
            id={card.id}
            className="rounded-xl border border-bordello-border bg-bordello-surface/60 p-5 scroll-mt-32"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs uppercase tracking-widest text-bordello-muted">{card.label}</p>
              <div className="flex items-center gap-2">
                {card.hotkey &&
                  (card.hotkey.kbd ? (
                    <Kbd>{card.hotkey.kbd}</Kbd>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-bordello-bg border border-bordello-border text-xs uppercase tracking-wide text-bordello-muted">
                      {card.hotkey.text}
                    </span>
                  ))}
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border"
                  style={{
                    color: card.route.answer === 'YES' ? YES : NO,
                    borderColor: card.route.answer === 'YES' ? `${YES}55` : `${NO}55`,
                  }}
                  title={`${card.route.from}: ${card.route.answer}`}
                >
                  {card.route.answer} · Q{card.route.from.slice(-1)}
                </span>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-white mt-2">{card.title}</h4>
            <p className="text-sm text-bordello-muted mt-2">{card.intro}</p>
            {card.detail && (
              <>
                <p className="text-sm text-bordello-muted mt-2">
                  <strong className="text-bordello-text">Pros:</strong> {card.detail.pros}
                </p>
                <p className="text-sm text-bordello-muted mt-2">
                  <strong className="text-bordello-text">Tradeoffs:</strong> {card.detail.tradeoffs}
                </p>
              </>
            )}
            <ol className="list-decimal pl-5 mt-3 space-y-1 text-sm text-bordello-text">
              {card.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {card.link && (
              <a
                href={card.link.href}
                {...(card.link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="inline-block mt-4 text-sm text-bordello-muted hover:text-white underline underline-offset-2 transition-colors"
              >
                {card.link.text}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
