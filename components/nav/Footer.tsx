import { communityLinks } from '@/lib/community';

export function Footer() {
  return (
    <footer className="border-t border-bordello-border bg-bordello-bg mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6">
            {communityLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-bordello-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-bordello-muted">
            The Modding Bordello
          </p>
        </div>
      </div>
    </footer>
  );
}
