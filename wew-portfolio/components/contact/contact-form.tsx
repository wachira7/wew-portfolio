"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';
import { site } from '@/lib/site';

// EmailJS identifiers. The public key is designed to ship to the browser.
const EMAILJS = {
  serviceId: 'service_jp2nl6d',
  templateId: 'template_qp6hq8m',
  publicKey: 'O8kiblordTUDKcWXe',
};

const topics = ['Full-time role', 'Freelance project', 'Collaboration', 'Just saying hi'];

type Status = 'idle' | 'sending' | 'success' | 'error';

const field =
  'peer w-full rounded-lg border border-line/10 bg-bg px-4 pb-2.5 pt-6 text-fg outline-none transition-colors placeholder:text-transparent focus:border-accent/60 focus:bg-surface-2/40';
const label =
  'pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle transition-colors peer-focus:text-accent';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        EMAILJS.publicKey
      );
      if (response.status !== 200) throw new Error(`EmailJS responded ${response.status}`);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-line/10 bg-surface p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: ease.out }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: ease.out, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/40"
            >
              <FiCheck className="h-7 w-7" />
            </motion.div>
            <h3 className="mt-6 text-2xl font-medium text-fg">Message sent.</h3>
            <p className="mt-2 max-w-xs text-muted">Thanks for reaching out. I&apos;ll get back to you within 24–48 hours.</p>
            <Button variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: ease.out }}
            onSubmit={submit}
            className="space-y-4"
          >
            <fieldset>
              <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">What&apos;s this about?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const active = form.subject === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setForm((f) => ({ ...f, subject: active ? '' : t }))}
                      className={cn(
                        'rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-300',
                        active ? 'border-accent/60 bg-accent/10 text-accent' : 'border-line/10 text-muted hover:text-fg'
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required autoComplete="name" placeholder="Name" value={form.name} onChange={set('name')} className={field} />
                <label htmlFor="name" className={label}>Name</label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email" value={form.email} onChange={set('email')} className={field} />
                <label htmlFor="email" className={label}>Email</label>
              </div>
            </div>
            <div className="relative">
              <input id="subject" name="subject" required placeholder="Subject" value={form.subject} onChange={set('subject')} className={field} />
              <label htmlFor="subject" className={label}>Subject</label>
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Message"
                value={form.message}
                onChange={set('message')}
                className={cn(field, 'resize-none')}
              />
              <label htmlFor="message" className={label}>Message</label>
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-lg border border-[rgb(253_164_175/0.3)] bg-[rgb(253_164_175/0.06)] px-4 py-3 text-sm text-[rgb(253_164_175)]">
                That didn&apos;t send. Please try again, or email me directly at{' '}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
                .
              </p>
            )}

            <Button type="submit" size="lg" fullWidth disabled={status === 'sending'} trailingIcon={<FiArrowUpRight />} className="disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
