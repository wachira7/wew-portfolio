import { ImageResponse } from 'next/og';
import { featuredProjects } from '@/content/projects';
import { site } from '@/lib/site';

// Social preview for every page that doesn't set its own (case studies use their screenshots).
export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#090c0b';
const FG = '#ecf0ee';
const MUTED = '#a0aaa6';
const SUBTLE = '#7d8783';
const MINT = '#6ee7b7';

/** Isometric glass stack, echoing the 3D hero. */
function Stack() {
  const layers = [0, 1, 2];
  return (
    <svg width="420" height="460" viewBox="0 0 400 440">
      <defs>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={MINT} stopOpacity="0.22" />
          <stop offset="1" stopColor={MINT} stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor={MINT} stopOpacity="0.16" />
          <stop offset="1" stopColor={MINT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pool">
          <stop offset="0" stopColor={MINT} stopOpacity="0.28" />
          <stop offset="1" stopColor={MINT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="215" rx="200" ry="220" fill="url(#glow)" />
      <ellipse cx="200" cy="395" rx="190" ry="45" fill="url(#pool)" />
      {[150, 175, 200, 225, 250].map((x) => (
        <line key={x} x1={x} x2={x} y1="120" y2="310" stroke={MINT} strokeOpacity="0.35" strokeWidth="1.5" />
      ))}
      {layers.map((i) => {
        const y = 115 + i * 100;
        return (
          <g key={i}>
            <polygon points={`200,${y - 64} 350,${y} 200,${y + 64} 50,${y}`} fill="url(#glass)" stroke={MINT} strokeOpacity="0.55" strokeWidth="1.5" />
            <polygon points={`200,${y - 20} 245,${y} 200,${y + 20} 155,${y}`} fill="#0a1210" stroke={MINT} strokeWidth="2" />
          </g>
        );
      })}
    </svg>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: BG,
          color: FG,
          padding: '64px 72px',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      >

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ display: 'flex', fontSize: 44, letterSpacing: -2 }}>
              ew<span style={{ color: MINT }}>.</span>
            </div>
            <div style={{ display: 'flex', fontSize: 24, color: FG }}>
              Emmanuel<span style={{ color: SUBTLE, marginLeft: 8 }}>W. Wachira</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 18, letterSpacing: 4, color: MINT, textTransform: 'uppercase' }}>
              <div style={{ width: 10, height: 10, borderRadius: 10, background: MINT }} />
              {site.role} · Nairobi, KE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 28, fontSize: 76, lineHeight: 1.04, letterSpacing: -3 }}>
              I build AI and SaaS systems that&nbsp;<span style={{ color: MINT }}>ship.</span>
            </div>
            <div style={{ display: 'flex', marginTop: 28, fontSize: 24, color: MUTED, lineHeight: 1.45 }}>
              Production SaaS with real-world payments, and LLM applications with fine-tuned models, RAG and agents.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 18, color: SUBTLE }}>
            {featuredProjects.map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, background: MINT }} />
                {p.title}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', position: 'absolute', right: 40, top: 85 }}>
          <Stack />
        </div>
      </div>
    ),
    size
  );
}
