import Link from 'next/link';
import Image from 'next/image';
import { loadMarkdown } from '@/lib/markdown';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

export default async function ComparePage() {
  const overviewHtml = await loadMarkdown('content/sos-guides/modlist_overview.md');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Compare the Bordello Lists
        </h1>
        <p className="text-lg text-bordello-muted mb-8 max-w-2xl mx-auto">
          Find the experience that fits your playstyle.
        </p>
        <Link
          href="/choose-your-path"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-bordello-bg font-semibold rounded-lg hover:bg-bordello-text transition-colors"
        >
          Take the Quiz
        </Link>
      </div>

      {/* Flowchart Image */}
      <div className="mb-16">
        <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-bordello-border">
          <Image
            src="/assets/wallpapers/list_overview.png"
            alt="Modlist comparison flowchart"
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Modlist Overview */}
      <div className="max-w-4xl mx-auto">
        <MarkdownRenderer html={overviewHtml} />
      </div>
    </div>
  );
}
