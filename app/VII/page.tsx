import type { Metadata } from 'next';
import Script from 'next/script';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'VII',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: '<!-- Sealed in the year the dragon stirred. Speak not its name — save unto the Watcher of Order, who keeps thy voice in private. -->' }} />
      <style dangerouslySetInnerHTML={{ __html:
        'nav,footer{display:none!important}main{padding:0!important;margin:0!important}html,body{background:#050306!important}'
      }} />
      <div className={styles.scroll} aria-hidden={false}>
        <div className={styles.numeral} aria-hidden="true">VII</div>

        <div className={styles.embers} aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={styles.ember} style={{
              left: `${(i * 7.3) % 100}%`,
              animationDelay: `${(i * 1.7) % 12}s`,
              animationDuration: `${10 + (i % 5) * 2}s`,
            }} />
          ))}
        </div>

        <main className={styles.center}>
          <div className={styles.ornament} aria-hidden="true">⸻</div>
          <p className={styles.cipher}>QWxkdWluIGF3YWtlbnMu</p>
          <div className={styles.ornament} aria-hidden="true">⸻</div>
        </main>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/emblem.jpg" alt="" aria-hidden="true" className={styles.emblem} />

        <p className={styles.whisper}>speak the prophecy in private to the watcher of order</p>
      </div>

      <Script id="vii-mark" strategy="afterInteractive">
        {`console.log("%cThe seventh seal is read, not broken.", "color:#7a0000;font-style:italic;letter-spacing:0.1em");
console.log("%cSpeak the prophecy in private to the Watcher of Order.", "color:#7a0000;font-style:italic;letter-spacing:0.1em");`}
      </Script>
    </>
  );
}
