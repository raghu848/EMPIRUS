'use client';

import { useRef, useEffect, useState } from 'react';

const ENTRIES = [
  {
    years:  '2002 — 2010',
    title:  'Foundational Excellence',
    desc:   'Established the design language that now defines ultra-luxury high-rise living in North India.',
  },
  {
    years:  '2010 — 2016',
    title:  'Signature Projects',
    desc:   'Delivered landmark residential and commercial developments across Tricity. Each project pushed the boundaries of thoughtful design.',
  },
  {
    years:  '2016 — 2022',
    title:  'Luxury Expansion',
    desc:   'Elevated the product standard with bespoke amenities, podium parks, and world-class finishes.',
  },
  {
    years:  '2024 — Present',
    title:  'Regal Empirus',
    desc:   'The culmination of 22 years of vision — a liberating architectural statement in Sector 91, Mohali.',
    active: true,
  },
];

export const Timeline = () => {
  const ref  = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    // Reveal animation trigger
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-py"
      style={{ 
        background: 'var(--bg)', 
        position: 'relative', 
        paddingTop: '8rem', 
        paddingBottom: '12rem',
        opacity: on ? 1 : 0,
        transition: 'opacity 1s ease'
      }}
    >
      <style>{`
        .tl-grid {
          display: block;
          position: relative;
        }
        .tl-left {
          position: sticky;
          top: 0; /* Or header height if needed, header is fixed, but if not we can use like 80px */
          /* Let's use 10vh to give a bit of breathing room below the fixed app header */
          top: 10vh;
          z-index: 10;
          padding-top: 1rem;
          padding-bottom: 2rem;
          background: linear-gradient(var(--bg) 85%, transparent);
          margin-bottom: 2rem;
        }
        .tl-right {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }
        @media (min-width: 1024px) {
          .tl-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: start;
          }
          .tl-left {
            top: 25vh;
            background: transparent;
            padding-top: 0;
            padding-bottom: 0;
            margin-bottom: 0;
            padding-right: 2rem;
          }
          .tl-right {
            gap: 8rem;
          }
        }
      `}</style>
      
      <div className="container tl-grid">
        {/* Left Column - Sticky Heading */}
        <div className="tl-left">
          <h2
            style={{
              fontFamily: 'var(--font-hand)',
              fontWeight: 400,
              fontSize: 'clamp(2.6rem, 4.5vw, 4.8rem)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              color: 'var(--gold-lt)',
              marginBottom: '1rem',
            }}
          >
            A Legacy of <br />
            <span style={{ color: 'var(--white)' }}>Visionary Design</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              lineHeight: 1.8,
              maxWidth: '400px'
            }}
          >
            TRACK RECORD OF ARCHITECTURAL EXCELLENCE AND HIGH-RISE INNOVATION
          </p>
        </div>

        {/* Right Column - Scrolling Timeline */}
        <div className="tl-right">
          {/* Continuous Vertical Line */}
          <div 
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: '40px', 
              bottom: 0, 
              width: '1px', 
              background: 'var(--faint)',
              zIndex: 0
            }} 
          />
          
          {/* EST Text */}
          <div 
            style={{ 
              position: 'absolute', 
              left: '-24px', 
              top: 0, 
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'var(--white)',
              transform: 'rotate(-90deg)',
              transformOrigin: 'left top',
              whiteSpace: 'nowrap'
            }}
          >
            EST. 2002
          </div>

          {/* Timeline Entries */}
          {ENTRIES.map((e, i) => (
            <div 
              key={i} 
              style={{
                position: 'relative',
                paddingLeft: '4rem', // Space from the vertical line
                transform: on ? 'translateY(0)' : 'translateY(40px)',
                transition: `transform 0.8s ${300 + i * 150}ms cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ${300 + i * 150}ms ease`,
                opacity: on ? 1 : 0
              }}
            >
              {/* Timeline Dot */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: '24px', 
                  transform: 'translateX(-50%)', 
                  width: '9px', 
                  height: '9px', 
                  borderRadius: '50%', 
                  background: e.active ? 'var(--gold-lt)' : 'var(--muted)',
                  boxShadow: e.active ? '0 0 10px rgba(209,193,161,0.5)' : 'none',
                  zIndex: 2
                }} 
              />
              
              {/* Massive Serif Year */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 300,
                  fontSize: 'clamp(3rem, 6vw, 5rem)', // Massive elegant text
                  color: e.active ? 'var(--gold-lt)' : 'var(--white)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  letterSpacing: '-0.03em'
                }}
              >
                {e.years}
              </h3>
              
              {/* Title & Description */}
              <h4 
                style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '14px', 
                  fontWeight: 500, 
                  color: 'var(--white)', 
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem' 
                }}
              >
                {e.title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'var(--muted)',
                  maxWidth: '450px',
                }}
              >
                {e.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
