'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArmorCatalogVariant, ArmorSet } from '@/types/armorCatalog';

const PER_PAGE_OPTIONS = [24, 48, 96];
const FEATURE_TAGS = ['Modular', 'Multi-colored'];
const LETTERS = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

type GroupKey = 'gender' | 'category' | 'style' | 'features' | 'theme' | 'support';

const GROUPS: { key: GroupKey; label: string; pill: string }[] = [
  { key: 'gender', label: 'Gender', pill: 'Gender' },
  { key: 'category', label: 'Category', pill: 'Category' },
  { key: 'style', label: 'Style', pill: 'Style' },
  { key: 'features', label: 'Features', pill: 'Features' },
  { key: 'theme', label: 'Theme / Affinity', pill: 'Theme' },
  { key: 'support', label: 'Body & Physics Support', pill: 'Body support' },
];

const POPULAR_FILTERS: { group: GroupKey; value: string }[] = [
  { group: 'style', value: 'Grounded' },
  { group: 'style', value: 'Fantastical' },
  { group: 'category', value: 'Heavy' },
  { group: 'gender', value: 'Female' },
];

type Selected = Record<GroupKey, string[]>;

const emptySelected = (): Selected => ({
  gender: [],
  category: [],
  style: [],
  features: [],
  theme: [],
  support: [],
});

function supportKeys(item: ArmorSet): string[] {
  const keys = Object.entries(item.support)
    .filter(([, value]) => {
      const v = value.trim();
      return v && v.toUpperCase() !== 'N/A';
    })
    .map(([key]) => key);
  return keys.length ? keys : ['None listed'];
}

function itemValues(item: ArmorSet, group: GroupKey): string[] {
  switch (group) {
    case 'gender':
      return item.gender;
    case 'category':
      return item.categories;
    case 'style':
      return item.style ? [item.style] : [];
    case 'features':
      return item.themes.filter((t) => FEATURE_TAGS.includes(t));
    case 'theme':
      return item.themes.filter((t) => !FEATURE_TAGS.includes(t));
    case 'support':
      return supportKeys(item);
  }
}

function nameLetter(name: string): string {
  const first = name.trim().charAt(0).toUpperCase();
  return first >= 'A' && first <= 'Z' ? first : '#';
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('');
}

function ArmorImage({ item, modal = false }: { item: ArmorSet; modal?: boolean }) {
  const sources = useMemo(
    () =>
      Array.from(new Set(modal ? [item.imageUrl, item.thumbnailUrl] : [item.thumbnailUrl, item.imageUrl])).filter(
        (s) => /^https?:\/\//i.test(s),
      ),
    [item, modal],
  );
  const [index, setIndex] = useState(0);

  if (!sources.length || index >= sources.length) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-bordello-bg">
        <span className="text-2xl font-bold text-bordello-muted/60">{initials(item.name)}</span>
        <span className="text-[10px] uppercase tracking-widest text-bordello-muted/40">Image unavailable</span>
      </div>
    );
  }

  return (
    // Hot-linked from Nexus's CDN on purpose — explicit imagery must never be
    // stored on or proxied through this site's host. Keep as plain <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[index]}
      alt={modal ? `${item.name} armor preview from the original mod page` : ''}
      referrerPolicy="no-referrer"
      loading={modal ? 'eager' : 'lazy'}
      decoding="async"
      className={
        modal
          ? 'w-full h-full object-contain'
          : 'w-full h-full object-cover saturate-[.72] contrast-[1.03] transition-all duration-300 group-hover:saturate-100 group-hover:scale-[1.02]'
      }
      onError={() => setIndex((i) => i + 1)}
    />
  );
}

function ArmorDetailModal({ item, onClose }: { item: ArmorSet; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const supportEntries = Object.entries(item.support).filter(([, v]) => v.trim());

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} details`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-bordello-border bg-bordello-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close armor details"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-bordello-bg/80 text-bordello-muted hover:text-white transition-colors"
        >
          ✕
        </button>
        <div className="h-80 sm:h-96 bg-bordello-bg">
          <ArmorImage item={item} modal />
        </div>
        <div className="p-6">
          <p className="text-sm text-bordello-muted">
            {item.authorUrl ? (
              <a href={item.authorUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {item.author}
              </a>
            ) : (
              item.author
            )}
          </p>
          <h2 className="text-2xl font-bold text-white mt-1">{item.name}</h2>
          {item.originalName && item.originalName !== item.name && (
            <p className="text-sm text-bordello-muted mt-1">Mod page: {item.originalName}</p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {[...item.categories, ...item.gender, item.style, ...item.themes].filter(Boolean).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-bordello-bg border border-bordello-border text-bordello-text"
              >
                {tag}
              </span>
            ))}
          </div>
          {item.armorTier && item.armorTier !== 'Unassigned' && (
            <p className="text-sm text-bordello-muted mt-4">
              <span className="text-bordello-text font-medium">Armor tier:</span> {item.armorTier}
            </p>
          )}
          {supportEntries.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-white mb-2">Body &amp; Physics Support</h3>
              <ul className="space-y-1">
                {supportEntries.map(([key, value]) => (
                  <li key={key} className="text-sm text-bordello-muted flex gap-2">
                    <span className="text-bordello-text font-medium shrink-0">{key}:</span>
                    {/^https?:\/\//i.test(value.trim()) ? (
                      <a
                        href={value.trim()}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-2 hover:text-white transition-colors break-all"
                      >
                        Patch / conversion link
                      </a>
                    ) : (
                      <span>{value.trim()}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6">
            <a
              href={item.modUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 rounded-lg border border-bordello-border bg-bordello-bg text-sm font-medium text-white hover:border-bordello-muted/40 hover:brightness-125 transition-all"
            >
              Open on Nexus Mods ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArmorCatalogClient({ items, variant }: { items: ArmorSet[]; variant: ArmorCatalogVariant }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Selected>(emptySelected);
  const [sortOrder, setSortOrder] = useState<'az' | 'za' | 'author' | 'authorDesc' | 'newest'>('az');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(48);
  const [openGroup, setOpenGroup] = useState<GroupKey | null>(null);
  const [popoverQuery, setPopoverQuery] = useState('');
  const [active, setActive] = useState<ArmorSet | null>(null);
  const hydratedFromUrl = useRef(false);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Restore state from the URL once on mount so filtered/paged views are shareable.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const sort = params.get('sort');
    const p = Number(params.get('page'));
    const next = emptySelected();
    for (const f of params.getAll('f')) {
      const i = f.indexOf('~');
      if (i < 1) continue;
      const key = f.slice(0, i) as GroupKey;
      if (key in next) next[key].push(f.slice(i + 1));
    }
    if (q) setQuery(q);
    if (sort === 'za' || sort === 'author' || sort === 'authorDesc' || sort === 'newest') {
      setSortOrder(sort);
    }
    if (Number.isInteger(p) && p > 1) setPage(p);
    const per = params.get('per');
    if (per === 'all') setPerPage(0);
    else if (per && PER_PAGE_OPTIONS.includes(Number(per))) setPerPage(Number(per));
    if (Object.values(next).some((v) => v.length)) setSelected(next);
    hydratedFromUrl.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedFromUrl.current) return;
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (sortOrder !== 'az') params.set('sort', sortOrder);
    if (page > 1) params.set('page', String(page));
    if (perPage !== 48) params.set('per', perPage === 0 ? 'all' : String(perPage));
    for (const group of GROUPS) {
      for (const value of selected[group.key]) params.append('f', `${group.key}~${value}`);
    }
    const search = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`);
  }, [query, selected, sortOrder, page, perPage]);

  // One popover open at a time; close on outside click or Escape.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenGroup(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const facets = useMemo(() => {
    const map = new Map<GroupKey, Map<string, number>>();
    for (const group of GROUPS) map.set(group.key, new Map());
    for (const item of items) {
      for (const group of GROUPS) {
        const counts = map.get(group.key)!;
        for (const value of itemValues(item, group.key)) {
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
      }
    }
    const sorted = new Map<GroupKey, [string, number][]>();
    map.forEach((counts, key) => {
      sorted.set(
        key,
        Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0])),
      );
    });
    return sorted;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = items.filter((item) => {
      if (q) {
        const searchable = [
          item.name,
          item.originalName,
          item.author,
          item.style,
          item.armorTier,
          ...item.categories,
          ...item.gender,
          ...item.themes,
        ]
          .join(' ')
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return GROUPS.every((group) => {
        const chosen = selected[group.key];
        if (!chosen.length) return true;
        const values = itemValues(item, group.key);
        return chosen.some((v) => values.includes(v));
      });
    });
    return rows.sort((a, b) => {
      if (sortOrder === 'za') return b.name.localeCompare(a.name);
      if (sortOrder === 'author') return a.author.localeCompare(b.author) || a.name.localeCompare(b.name);
      if (sortOrder === 'authorDesc') return b.author.localeCompare(a.author) || a.name.localeCompare(b.name);
      if (sortOrder === 'newest') return b.id - a.id || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });
  }, [items, query, selected, sortOrder]);

  const pageSize = perPage === 0 ? Math.max(filtered.length, 1) : perPage;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const letterPages = useMemo(() => {
    if (sortOrder !== 'az' && sortOrder !== 'za') return new Map<string, number>();
    const map = new Map<string, number>();
    filtered.forEach((item, i) => {
      const letter = nameLetter(item.name);
      if (!map.has(letter)) map.set(letter, Math.floor(i / pageSize) + 1);
    });
    return map;
  }, [filtered, sortOrder, pageSize]);

  const activeFilterCount = GROUPS.reduce((n, g) => n + selected[g.key].length, 0);

  const goToPage = (p: number) => {
    setPage(p);
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleFilter = (group: GroupKey, value: string) => {
    setSelected((prev) => {
      const has = prev[group].includes(value);
      return { ...prev, [group]: has ? prev[group].filter((v) => v !== value) : [...prev[group], value] };
    });
    setPage(1);
  };

  const pageNumbers = useMemo(() => {
    const nums: (number | '…')[] = [];
    for (let p = 1; p <= pageCount; p += 1) {
      if (p === 1 || p === pageCount || Math.abs(p - currentPage) <= 1) {
        nums.push(p);
      } else if (nums[nums.length - 1] !== '…') {
        nums.push('…');
      }
    }
    return nums;
  }, [pageCount, currentPage]);

  return (
    <div id="catalog" ref={gridTopRef} className="scroll-mt-44">
      <div
        ref={barRef}
        className="sticky top-16 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-bordello-bg/95 backdrop-blur border-b border-bordello-border"
      >
        <div className="flex flex-wrap items-center gap-2 py-3">
          <label className="relative flex-1 min-w-[180px]">
            <span className="sr-only">Search armor</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search the armor archive…"
              className="w-full px-3.5 py-2 rounded-lg bg-bordello-surface border border-bordello-border text-sm text-bordello-text placeholder:text-bordello-muted/60 focus:outline-none focus:border-[#a21827]/70"
            />
          </label>

          {GROUPS.map((group, groupIndex) => {
            const options = facets.get(group.key) ?? [];
            if (!options.length) return null;
            const selectedCount = selected[group.key].length;
            const isOpen = openGroup === group.key;
            const pq = popoverQuery.trim().toLowerCase();
            const visibleOptions = pq ? options.filter(([value]) => value.toLowerCase().includes(pq)) : options;
            return (
              <div key={group.key} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenGroup(isOpen ? null : group.key);
                    setPopoverQuery('');
                  }}
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border transition-colors ${
                    selectedCount > 0 || isOpen
                      ? 'border-[#c13a47] bg-[#a21827]/15 text-white'
                      : 'border-bordello-border bg-bordello-surface text-bordello-muted hover:border-[#6c2631] hover:text-white'
                  }`}
                >
                  {group.pill}
                  {selectedCount > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-[#a21827] text-white text-[10px] font-semibold tabular-nums">
                      {selectedCount}
                    </span>
                  )}
                  <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    className={`absolute top-full mt-2 ${groupIndex >= 4 ? 'right-0' : 'left-0'} w-64 max-h-80 overflow-y-auto rounded-xl border border-bordello-border bg-bordello-surface shadow-2xl z-50 p-3`}
                  >
                    {options.length > 12 && (
                      <input
                        type="search"
                        value={popoverQuery}
                        onChange={(e) => setPopoverQuery(e.target.value)}
                        placeholder={`Search ${group.label.toLowerCase()}…`}
                        autoFocus
                        className="w-full mb-2 px-2.5 py-1.5 rounded-lg bg-bordello-bg border border-bordello-border text-sm text-bordello-text placeholder:text-bordello-muted/60 focus:outline-none focus:border-[#a21827]/70"
                      />
                    )}
                    {visibleOptions.length === 0 && (
                      <p className="text-sm text-bordello-muted px-1 py-2">No matches.</p>
                    )}
                    {visibleOptions.map(([value, count]) => (
                      <label
                        key={value}
                        className="flex items-center gap-2.5 px-1 py-1.5 rounded text-sm text-bordello-muted cursor-pointer hover:text-white hover:bg-bordello-bg/60 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selected[group.key].includes(value)}
                          onChange={() => toggleFilter(group.key, value)}
                          className="appearance-none w-3.5 h-3.5 shrink-0 rounded-[2px] border border-[#4a4a56] bg-bordello-bg checked:border-[#c13a47] checked:bg-[#a21827] checked:shadow-[inset_0_0_0_3px_#12121a] cursor-pointer transition-colors"
                        />
                        <span className="flex-1 truncate">{value}</span>
                        <span className="text-[10px] text-bordello-muted/60 tabular-nums">{count}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <label className="flex items-center gap-2 text-sm text-bordello-muted">
            <span className="sr-only">Sort</span>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value as typeof sortOrder);
                setPage(1);
              }}
              className="px-2.5 py-2 rounded-lg bg-bordello-surface border border-bordello-border text-sm text-bordello-text focus:outline-none focus:border-[#a21827]/70"
            >
              <option value="az">Armor A–Z</option>
              <option value="za">Armor Z–A</option>
              <option value="author">Author A–Z</option>
              <option value="authorDesc">Author Z–A</option>
              <option value="newest">Newest additions</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-bordello-muted">
            <span className="sr-only">Display per page</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="px-2.5 py-2 rounded-lg bg-bordello-surface border border-bordello-border text-sm text-bordello-text focus:outline-none focus:border-[#a21827]/70"
            >
              {PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} per page
                </option>
              ))}
              <option value={0}>Show all</option>
            </select>
          </label>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelected(emptySelected());
                setPage(1);
              }}
              className="text-[10px] uppercase tracking-wider text-[#ce6d76] hover:text-white transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1.5 pb-3">
            {GROUPS.flatMap((group) =>
              selected[group.key].map((value) => (
                <button
                  key={`${group.key}-${value}`}
                  type="button"
                  onClick={() => toggleFilter(group.key, value)}
                  title={`Remove ${group.label} filter`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border border-bordello-border bg-bordello-surface text-bordello-text hover:border-[#6c2631] transition-colors"
                >
                  {value}
                  <span className="text-[#ce6d76]">✕</span>
                </button>
              )),
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-5 mb-4">
        <span className="text-[10px] uppercase tracking-[0.16em] text-bordello-muted/70 mr-1">Popular</span>
        {POPULAR_FILTERS.map(({ group, value }) => {
          const isActive = selected[group].includes(value);
          return (
            <button
              key={`${group}-${value}`}
              type="button"
              onClick={() => toggleFilter(group, value)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                isActive
                  ? 'border-[#c13a47] bg-[#a21827]/25 text-white'
                  : 'border-bordello-border bg-bordello-surface text-bordello-muted hover:border-[#6c2631] hover:text-white'
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>

      {(sortOrder === 'az' || sortOrder === 'za') && filtered.length > pageSize && (
        <nav aria-label="Jump to letter" className="flex flex-wrap gap-1 mb-5">
          {LETTERS.map((letter) => {
            const target = letterPages.get(letter);
            return (
              <button
                key={letter}
                type="button"
                disabled={!target}
                onClick={() => target && goToPage(target)}
                className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium border border-transparent text-bordello-muted enabled:hover:text-white enabled:hover:border-bordello-border disabled:opacity-25 disabled:cursor-default transition-colors"
              >
                {letter}
              </button>
            );
          })}
        </nav>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-bordello-muted">
          <span className="text-white font-semibold">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'set' : 'sets'} found
          {pageCount > 1 && (
            <span>
              {' '}
              · page {currentPage} of {pageCount}
            </span>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-bordello-border bg-bordello-surface/60 p-12 text-center">
          <h3 className="text-lg font-semibold text-white mb-1">No armor follows that path.</h3>
          <p className="text-sm text-bordello-muted mb-4">Remove a filter or broaden your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelected(emptySelected());
              setPage(1);
            }}
            className="px-4 py-2 rounded-lg text-sm border border-bordello-border text-bordello-text hover:border-bordello-muted/40 transition-colors"
          >
            Reset catalog
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {pageItems.map((item) => (
              <article
                key={`${item.id}-${item.name}`}
                className="group rounded-xl border border-bordello-border bg-bordello-surface/80 overflow-hidden hover:border-[#6c2631] hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  aria-label={`View details for ${item.name}`}
                  className="text-left flex-1 flex flex-col"
                >
                  <div className="aspect-[4/5] bg-bordello-bg overflow-hidden">
                    <ArmorImage item={item} />
                  </div>
                  <div className="p-3 flex-1">
                    <p className="text-xs text-bordello-muted truncate">{item.author}</p>
                    <h3 className="text-sm font-semibold text-white mt-0.5 leading-snug">{item.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {[...item.categories, ...item.gender, item.style, item.themes.find((t) => !FEATURE_TAGS.includes(t))]
                        .filter((tag): tag is string => Boolean(tag))
                        .slice(0, 4)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide bg-bordello-bg border border-bordello-border text-bordello-muted"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </button>
                <div className="px-3 pb-3">
                  <a
                    href={item.modUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-bordello-muted hover:text-white underline underline-offset-2 transition-colors"
                  >
                    Nexus Mods ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
          {pageCount > 1 && (
            <nav aria-label="Catalog pages" className="mt-8 flex items-center justify-center gap-1.5 flex-wrap">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg text-sm border border-bordello-border text-bordello-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-bordello-muted/40 transition-colors"
              >
                Prev
              </button>
              {pageNumbers.map((p, i) =>
                p === '…' ? (
                  <span key={`e${i}`} className="px-1 text-bordello-muted text-sm">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    aria-current={p === currentPage ? 'page' : undefined}
                    className={`min-w-9 px-2.5 py-1.5 rounded-lg text-sm border transition-colors ${
                      p === currentPage
                        ? 'border-[#a21827] bg-bordello-surface text-white font-semibold'
                        : 'border-bordello-border text-bordello-muted hover:border-[#6c2631] hover:text-bordello-text'
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => goToPage(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg text-sm border border-bordello-border text-bordello-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-bordello-muted/40 transition-colors"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}

      {active && <ArmorDetailModal item={active} onClose={() => setActive(null)} />}
    </div>
  );
}
