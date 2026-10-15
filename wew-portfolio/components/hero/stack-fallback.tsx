// Static isometric stack for browsers without WebGL.
export default function StackFallback() {
  const layers = [0, 1, 2];
  return (
    <svg viewBox="0 0 400 420" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="fb-glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgb(110 231 183 / 0.16)" />
          <stop offset="1" stopColor="rgb(110 231 183 / 0.03)" />
        </linearGradient>
        <radialGradient id="fb-pool">
          <stop offset="0" stopColor="rgb(110 231 183 / 0.18)" />
          <stop offset="1" stopColor="rgb(110 231 183 / 0)" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="370" rx="170" ry="40" fill="url(#fb-pool)" />
      {[150, 175, 200, 225, 250].map((x) => (
        <line key={x} x1={x} x2={x} y1="120" y2="300" stroke="rgb(110 231 183 / 0.25)" strokeWidth="1" />
      ))}
      {layers.map((i) => {
        const y = 110 + i * 95;
        return (
          <g key={i}>
            <polygon
              points={`200,${y - 60} 340,${y} 200,${y + 60} 60,${y}`}
              fill="url(#fb-glass)"
              stroke="rgb(110 231 183 / 0.45)"
              strokeWidth="1"
            />
            <polygon
              points={`200,${y - 18} 242,${y} 200,${y + 18} 158,${y}`}
              fill="rgb(10 18 16)"
              stroke="rgb(110 231 183 / 0.9)"
              strokeWidth="1.2"
            />
          </g>
        );
      })}
    </svg>
  );
}
