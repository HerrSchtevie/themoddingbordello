import type { Metadata } from 'next';

// The privacy page. Its Haskill section is what Discord's app review links to, so it must stay true to the bot as built.
// Haskill is Herr Schtevie's own bot, not a staff tool: its summaries go to him alone.
// It says what is read, why, how long it is kept, who sees it and how to opt out, and deliberately nothing about how
// the bot works: the server has trolls, and mechanics are a map for gaming it.
export const metadata: Metadata = {
  title: 'Privacy | The Modding Bordello',
  description: 'What this website and Haskill, the Bordello Discord bot, collect, how it is used, and how to opt out.',
};

const EMAIL = 'herrschtevie@protonmail.com';
const UPDATED = 'November 7, 2026';

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 flex flex-col gap-2">{children}</ul>;
}

const linkClass = 'text-white underline underline-offset-2 hover:text-bordello-text';

const Mail = () => (
  <a href={`mailto:${EMAIL}`} className={linkClass}>
    {EMAIL}
  </a>
);

const Out = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
    {children}
  </a>
);

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy</h1>
      <p className="text-bordello-muted mb-8">Last updated {UPDATED}.</p>

      <div className="flex flex-col gap-10 text-bordello-text leading-relaxed">
        <p>
          This page covers the two things that handle information about you here: this website, and Haskill, Herr
          Schtevie&apos;s private AI assistant, which has a bot in our Discord server. Discord, Nexus Mods, Wabbajack and
          the other bots in the server have their own privacy policies.
        </p>

        <Section id="website" title="This website">
          <List>
            <li>
              <strong className="text-white">No accounts.</strong> There is nothing to sign in to. The pre-install
              checker and the quiz run in your browser, and your answers aren&apos;t sent anywhere.
            </li>
            <li>
              <strong className="text-white">Visit statistics.</strong> Google Analytics counts which pages are
              visited, and uses cookies to tell new visitors from returning ones. Google handles that data under{' '}
              <Out href="https://policies.google.com/privacy">its own privacy policy</Out>. A content blocker or{' '}
              <Out href="https://tools.google.com/dlpage/gaoptout">Google&apos;s opt-out add-on</Out> turns it off.
            </li>
            <li>
              <strong className="text-white">Hosting.</strong> The site is hosted by Vercel, which, like any web
              host, processes your IP address to deliver pages and keep the site secure.
            </li>
            <li>
              <strong className="text-white">Saved in your browser.</strong> If you confirm the age notice on the
              shared armor catalog, your browser remembers it. That never leaves your device.
            </li>
            <li>
              <strong className="text-white">Videos and links.</strong> Showcase videos come from YouTube, which may
              set cookies once you play one. Links to Nexus Mods, Discord and other sites lead to their own policies.
            </li>
          </List>
        </Section>

        <Section id="haskill" title="Haskill, Herr Schtevie's AI assistant">
          <p>
            Haskill is Herr Schtevie&apos;s private AI assistant. It runs on his own hardware, not on a cloud AI
            service. In our Discord it has a read-only bot that helps him keep up with support in a busy server. The
            bot doesn&apos;t post or send messages, and it can&apos;t see direct messages.
          </p>
          <List>
            <li>
              <strong className="text-white">What it reads:</strong> messages in the channels it has access to,
              mostly the support channels.
            </li>
            <li>
              <strong className="text-white">Why:</strong> to write private summaries for Herr Schtevie, such as
              problems that keep coming up, questions that went unanswered, and messages that need his attention. He
              uses them to fix guides and bugs.
            </li>
            <li>
              <strong className="text-white">What it keeps:</strong> support summaries, with links back to the
              original messages and an anonymised identifier in place of your account, but no usernames or message
              text. Messages that need his attention are passed on to him as written. It also keeps anonymous weekly
              totals, such as how often a problem came up, with nothing that points back to anyone. Everything else is
              deleted within 30 days.
            </li>
            <li>
              <strong className="text-white">Who sees it:</strong> only Herr Schtevie. Your messages are never sold,
              never shared with third parties (AI services included), and never used to train AI models.
            </li>
          </List>
        </Section>

        <Section id="opting-out" title="Opting out and questions">
          <p>
            To have Haskill skip your messages and delete what it has kept about you, or for any question about this
            page, message Herr Schtevie on Discord or email <Mail />. If this page changes, the date at the top
            changes with it.
          </p>
        </Section>
      </div>
    </div>
  );
}
