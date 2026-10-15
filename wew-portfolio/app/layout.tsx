// app/layout.tsx

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SmoothScroll from '@/components/providers/smooth-scroll';
import BackToTop from '@/components/ui/back-to-top';
import { site } from '@/lib/site';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Emmanuel W. Wachira | Full-Stack & AI Engineer',
  description: 'Full-Stack and AI Engineer in Nairobi. Production SaaS platforms with CI/CD and payments, and LLM applications with fine-tuning, RAG and agents.',
  keywords: 'full-stack developer, AI engineer, LLM, RAG, LangGraph, DevOps, Next.js, Django, Python, Nairobi',
};

export const viewport: Viewport = {
  themeColor: '#090c0b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScroll />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
