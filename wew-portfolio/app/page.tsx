"use client";

import PageTransition from '@/components/ui/page-transition';
import Hero from '@/components/hero/hero';
import ToolMarquee from '@/components/home/tool-marquee';
import SelectedWork from '@/components/home/selected-work';
import BeyondCode from '@/components/home/beyond-code';
import Terminal from '@/components/home/terminal';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <ToolMarquee />
      <SelectedWork />
      <BeyondCode />
      <Terminal />
    </PageTransition>
  );
}
