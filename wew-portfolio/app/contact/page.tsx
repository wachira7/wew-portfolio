import type { Metadata } from 'next';
import { FiArrowUpRight, FiFileText, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Reveal from '@/components/ui/reveal';
import ContactForm from '@/components/contact/contact-form';
import CopyEmail from '@/components/contact/copy-email';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact | Emmanuel W. Wachira',
  description: 'Get in touch about full-stack, DevOps and AI engineering roles or projects.',
};

const links = [
  { label: 'GitHub', handle: 'wachira7', href: site.github, icon: FiGithub },
  { label: 'LinkedIn', handle: 'emmanuelwaruts77', href: site.linkedin, icon: FiLinkedin },
  { label: 'Résumé', handle: 'resume.pdf', href: site.resume, icon: FiFileText },
];

export default function ContactPage() {
  return (
    <div className="pb-24 pt-36 md:pt-44">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="text-accent">Open to opportunities</span>
              </p>
              <h1 className="text-5xl font-semibold leading-[1.02] tracking-tightest text-fg md:text-7xl">
                Let&apos;s build something real<span className="text-accent">.</span>
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
                I&apos;m open to full-stack, DevOps and AI engineering roles, and to interesting projects. Tell me what
                you&apos;re working on; I reply within 24–48 hours.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <p className="eyebrow mb-4">Email</p>
              <CopyEmail />
            </Reveal>

            <Reveal delay={0.15} className="mt-14">
              <p className="eyebrow mb-4">Call, text or WhatsApp</p>
              <ul className="border-t border-line/[0.08]">
                {site.phones.map((phone) => (
                  <li key={phone.tel} className="flex flex-wrap items-center justify-between gap-3 border-b border-line/[0.08] py-4">
                    <a href={`tel:${phone.tel}`} className="group flex items-center gap-4 text-fg transition-colors hover:text-accent">
                      <FiPhone className="h-4 w-4 text-subtle transition-colors group-hover:text-accent" />
                      <span className="tabular-nums">{phone.display}</span>
                    </a>
                    <span className="flex items-center gap-2">
                      <a
                        href={`tel:${phone.tel}`}
                        className="rounded-md border border-line/10 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        Call
                      </a>
                      <a
                        href={phone.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${phone.display}`}
                        className="flex items-center gap-1.5 rounded-md border border-line/10 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        <FaWhatsapp className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-14">
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="border-t border-line/[0.08]">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-line/[0.08] py-4 transition-colors hover:text-accent"
                    >
                      <span className="flex items-center gap-4 text-fg transition-colors group-hover:text-accent">
                        <l.icon className="h-4 w-4 text-subtle transition-colors group-hover:text-accent" />
                        {l.label}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-xs text-subtle">
                        {l.handle}
                        <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-xs text-subtle">
              <span>
                <span className="text-muted">Based in</span> Nairobi, Kenya
              </span>
              <span>
                <span className="text-muted">Time zone</span> EAT · UTC+3
              </span>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-6">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
