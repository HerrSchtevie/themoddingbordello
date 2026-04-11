import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GlobalNav } from '@/components/nav/GlobalNav';
import { Footer } from '@/components/nav/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Modding Bordello',
  description: 'Welcome to the official sanctum of The Modding Bordello — the central archive of all Bordello modlists. Each modlist has its own tailored installation guide, overview, and support resources.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'The Modding Bordello',
    description: 'Welcome to the official sanctum of The Modding Bordello — the central archive of all Bordello modlists. Each modlist has its own tailored installation guide, overview, and support resources.',
    siteName: 'The Modding Bordello',
    type: 'website',
    images: [
      {
        url: 'https://www.themoddingbordello.com/bordello-masque.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.themoddingbordello.com/bordello-masque.png'],
  },
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
