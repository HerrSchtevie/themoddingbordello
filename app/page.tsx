import Link from 'next/link';
import Image from 'next/image';
import { modlists } from '@/lib/modlists';
import { ModlistCard } from '@/components/cards/ModlistCard';
import { ArrCard } from '@/components/cards/ArrCard';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-32 text-center overflow-hidden">
        <Image
          src="/assets/logos/BordelloMasque.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-bordello-bg/75" />
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
            The Modding Bordello
          </h1>
          <p className="text-lg sm:text-xl text-bordello-muted mb-4 max-w-2xl mx-auto">
            Welcome to the official sanctum of The Modding Bordello — the central archive of all Bordello modlists.
          </p>
          <p className="text-lg sm:text-xl text-bordello-muted mb-10 max-w-2xl mx-auto">
            Each modlist has its own tailored installation guide, overview, and support resources. Choose your journey below:
          </p>
          <Link
            href="/choose-your-path"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-bordello-bg font-semibold rounded-lg hover:bg-bordello-text transition-colors text-lg"
          >
            Choose Your Path
          </Link>
        </div>
      </section>

      {/* Modlist Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Modlists</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modlists.map((list) => (
            <ModlistCard key={list.slug} list={list} />
          ))}
        </div>
      </section>

      {/* Affiliated Modlists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Affiliated Modlists</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArrCard />
        </div>
      </section>

      {/* Utility Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Compare the Lists — teal/green tint */}
          <Link
            href="/compare"
            className="group relative p-6 rounded-xl border border-bordello-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f1a] via-bordello-surface to-bordello-bg/80" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#2a9d8f]/10 to-transparent" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-2">Compare the Lists</h3>
              <p className="text-sm text-bordello-muted">Find the right modlist for your playstyle</p>
            </div>
          </Link>

          {/* Shared Guides — neutral */}
          <Link
            href="/guides"
            className="group relative p-6 rounded-xl border border-bordello-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-bordello-surface via-bordello-surface to-bordello-bg/80" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-2">Shared Guides</h3>
              <p className="text-sm text-bordello-muted">SOS configuration guides for all modlists</p>
            </div>
          </Link>

          {/* Changelogs — blue/purple tint */}
          <Link
            href="/changelogs"
            className="group relative p-6 rounded-xl border border-bordello-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-bordello-surface to-bordello-bg/80" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#5a2a83]/10 to-transparent" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-2">Changelogs</h3>
              <p className="text-sm text-bordello-muted">Latest updates for every modlist</p>
            </div>
          </Link>

          {/* Community — warm tone */}
          <Link
            href="/community"
            className="group relative p-6 rounded-xl border border-bordello-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1a15] via-bordello-surface to-bordello-bg/80" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#cc6600]/8 to-transparent" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-sm text-bordello-muted">Discord, Nexus, and more</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
