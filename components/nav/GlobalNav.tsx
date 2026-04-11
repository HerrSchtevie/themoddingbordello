'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ModlistDropdown } from './ModlistDropdown';
import { GuideDropdown } from './GuideDropdown';
import { ChangelogDropdown } from './ChangelogDropdown';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Choose Your Path', href: '/choose-your-path' },
  { label: 'Modlists', href: '/modlists', dropdown: 'modlists' as const },
  { label: 'Guides', href: '/guides', dropdown: 'guides' as const },
  { label: 'Changelogs', href: '/changelogs', dropdown: 'changelogs' as const },
  { label: 'Community', href: '/community' },
];

export function GlobalNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-bordello-bg/95 backdrop-blur border-b border-bordello-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white tracking-tight">
            The Modding Bordello
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.dropdown)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-bordello-surface'
                        : 'text-bordello-muted hover:text-white hover:bg-bordello-surface/50'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {item.dropdown === 'modlists' && openDropdown === 'modlists' && (
                    <ModlistDropdown />
                  )}
                  {item.dropdown === 'guides' && openDropdown === 'guides' && (
                    <GuideDropdown />
                  )}
                  {item.dropdown === 'changelogs' && openDropdown === 'changelogs' && (
                    <ChangelogDropdown />
                  )}
                </div>
              );
            })}
          </div>

          <MobileMenuButton />
        </div>
      </div>
    </nav>
  );
}

function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-bordello-muted hover:text-white p-2"
        aria-label="Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-bordello-bg border-b border-bordello-border p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')
                  ? 'text-white bg-bordello-surface'
                  : 'text-bordello-muted hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
