import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalNav } from '@/components/nav/GlobalNav';
import { Footer } from '@/components/nav/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Modding Bordello',
  description: 'Premium Skyrim modlist documentation hub — Journals of Jyggalag, Tomes of Talos, Hymns of Hircine, Mantras of Mara, Diaries of Dibella, and Visions of Vaermina.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <GlobalNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
