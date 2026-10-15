// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '@/context/theme-context';
import CustomCursor from '@/components/effects/cursor';
import BackToTop from '@/components/ui/back-to-top';


const inter = Inter({
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-inter', 
});

export const metadata: Metadata = {
  title: 'Emmanuel W. Wachira | Full-Stack & AI Engineer',
  description: 'Full-Stack and AI Engineer in Nairobi. Production SaaS platforms with CI/CD and payments, and LLM applications with fine-tuning, RAG and agents.',
  keywords: 'full-stack developer, AI engineer, LLM, RAG, LangGraph, DevOps, Next.js, Django, Python, Nairobi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            {/* Custom Cursor */}
            <CustomCursor /> 
            
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            
            {/* Back to Top Button */}
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}