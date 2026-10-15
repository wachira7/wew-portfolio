"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa';
import PageTransition from '@/components/ui/page-transition';
import Hero from '@/components/hero/hero';
import Terminal from '@/components/home/terminal';
import ToolMarquee from '@/components/home/tool-marquee';
import SelectedWork from '@/components/home/selected-work';



export default function Home() {
  return (
    <PageTransition>
      <div className="relative min-h-screen">

        <Hero />

        <ToolMarquee />
        <SelectedWork />

        {/* ── About ────────────────────────────────────────── */}
        <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
          <div className="container">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">About Me</h2>
                <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
                  Full-Stack and AI Engineer with a background in field operations at KOKO Networks and
                  formal training from Moringa School. I build complete, deployable products — not just
                  prototypes.
                </p>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                  I completed Ed Donner&apos;s AI Engineer Core Track (LLM engineering, RAG, QLoRA and agents),
                  and hold AWS Cloud Architecting and Cloud Foundations certifications, a Google Project
                  Management Certificate, and a DevOps certification. Open to full-stack, DevOps and AI
                  engineering roles.
                </p>
                <Button href="/about">
                  More About Me <FaArrowRight className="ml-2" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/images/profile/cape.jpg"
                    alt="Emmanuel W. Wachira - Full-stack Developer"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        <Terminal />
      </div>
    </PageTransition>
  );
}