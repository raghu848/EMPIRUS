'use client';

import { useEffect, useRef, useState } from 'react';
import { LuxuryGoldBackground } from './LuxuryGoldBackground';

const STATS = [
  { value: 8, suffix: '+', label: 'Years of Excellence' },
  { value: 0, suffix: '3+1 & 4+1 Bhk', label: 'Luxury Living' },
  { value: 2, suffix: ' Acre', label: 'Podium Park' },
  { value: 95, suffix: '%+', label: 'Sun-Facing Apartments' },
];

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const pct = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.floor(ease * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return val;
}

const StatItem = ({ value, suffix, label }: typeof STATS[number]) => {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const num = useCountUp(value, on);

  return (
    <div
      ref={ref}
      style={{
        padding: '2rem 1.5rem',
        textAlign: 'center' as const,
        borderRight: '1px solid rgba(212,175,55,0.15)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        position: 'relative' as const,
        boxShadow: '0 0 40px rgba(212,175,55,0.04) inset',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)',
          fontWeight: 300,
          color: 'var(--gold-lt)',
          lineHeight: 1,
          marginBottom: '0.75rem',
          opacity: on ? 1 : 0,
          transform: on ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s var(--ease-spring), transform 0.7s var(--ease-spring)',
          textShadow: '0 0 40px rgba(212,168,67,0.3)',
        }}
      >
        {value > 0 && num.toLocaleString()}<span style={{ color: 'var(--gold)', fontSize: '70%', marginLeft: '2px' }}>{suffix}</span>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        {label}
      </p>
      {/* Gold glow underline accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: on ? '40px' : '0',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          transition: 'width 1s var(--ease-spring)',
        }}
      />
    </div>
  );
};

export const StatsBar = () => (
  <div
    style={{
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <LuxuryGoldBackground />
    {/* Gold shimmer top border */}
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold-lt) 50%, var(--gold) 70%, transparent 100%)',
        opacity: 0.6,
      }}
    />
    <div
      className="container"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        borderLeft: '1px solid rgba(212,175,55,0.15)',
        position: 'relative',
        zIndex: 4,
      }}
    >
      {STATS.map((s, i) => (
        <StatItem key={i} {...s} />
      ))}
    </div>
  </div>
);
