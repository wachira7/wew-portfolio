import type { IconType } from 'react-icons';
import {
  SiAnthropic,
  SiDjango,
  SiDocker,
  SiGithubactions,
  SiHuggingface,
  SiKubernetes,
  SiLangchain,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiStripe,
  SiTypescript,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const tools: [string, IconType][] = [
  ['React', SiReact],
  ['Next.js', SiNextdotjs],
  ['TypeScript', SiTypescript],
  ['Python', SiPython],
  ['Django', SiDjango],
  ['Node.js', SiNodedotjs],
  ['PyTorch', SiPytorch],
  ['Hugging Face', SiHuggingface],
  ['LangChain', SiLangchain],
  ['Claude', SiAnthropic],
  ['PostgreSQL', SiPostgresql],
  ['Redis', SiRedis],
  ['Docker', SiDocker],
  ['Kubernetes', SiKubernetes],
  ['AWS', FaAws],
  ['GitHub Actions', SiGithubactions],
  ['Stripe', SiStripe],
];

export default function ToolMarquee() {
  return (
    <section className="border-y border-line/[0.08] py-10" aria-label="Tools I work with">
      <div className="container mb-8">
        <p className="eyebrow">Good ideas. The right tools.</p>
      </div>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-14 pr-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...tools, ...tools].map(([name, Icon], i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= tools.length}
              className="flex shrink-0 items-center gap-3 text-xl text-muted/80 transition-colors duration-300 hover:text-fg"
            >
              <Icon className="h-6 w-6" />
              <span className="font-medium tracking-tight">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
