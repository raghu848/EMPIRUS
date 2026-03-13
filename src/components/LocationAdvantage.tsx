'use client';

import { useRef, useEffect, useState } from 'react';

const PROXIMITY = [
  { place: 'MANAV MANGAL SCHOOL', time: '0 MINS' },
  { place: 'CGC LANDRAN', time: '2 MINS' },
  { place: 'AMITY SCHOOL', time: '7 MINS' },
  { place: 'QUARK CITY', time: '3 MINS' },
  { place: 'IT HUB', time: '2 MINS' },
  { place: 'IVY HOSPITAL', time: '3 MINS' },
  { place: 'SOHANA MULTISPECIALITY HOSPITAL', time: '5 MINS' },
  { place: 'FORTIS HOSPITAL', time: '10 MINS' },
  { place: 'CP 67 MALL', time: '8 MINS' },
  { place: 'INTERNATIONAL AIRPORT', time: '20 MINS' },
];

export const LocationAdvantage = () => {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const anim = (ms: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 1.2s ${ms}ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s ${ms}ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
  });

  return (
    <section
      id="location"
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#3d3d3d', // matching the dark grey background in the image
        background: 'linear-gradient(to bottom, #444 0%, #303030 60%, #1e1e1e 100%)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem 0 2rem 0',
        overflow: 'hidden'
      }}
    >
      {/* Background City/Map graphic */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/maps.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'overlay', // Blend with the dark background gradient
        opacity: 0.15, // Lowered opacity so white text is clearly visible
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Adding some subtle grid/network lines to mimic the map nodes if the image isn't available */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(180deg, transparent 90%, rgba(255,255,255,0.02) 90%),
          linear-gradient(90deg, transparent 90%, rgba(255,255,255,0.02) 90%)
        `,
        backgroundSize: '100px 100px',
        zIndex: 1,
        pointerEvents: 'none',
      }}/>

      <div className="container" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Header (Location Advantages) */}
        <div style={{ ...anim(0), textAlign: 'center', width: '100%', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ flex: 1, maxWidth: '200px', height: '1px', background: 'rgba(255,255,255,0.3)', marginRight: '1rem' }} />
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            color: 'var(--white)',
            margin: 0
          }}>
            Location Advantages
          </h2>
          <span style={{ flex: 1, maxWidth: '200px', height: '1px', background: 'rgba(255,255,255,0.3)', marginLeft: '1rem' }} />
        </div>

        {/* Location List */}
        <div style={{ ...anim(200), display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'center' }}>
          {PROXIMITY.map((item, idx) => (
            <p key={idx} style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.9rem', 
              letterSpacing: '0.05em', 
              color: 'rgba(255,255,255,0.85)',
              margin: 0
            }}>
              {item.place} - <span style={{ fontWeight: 600, color: 'var(--white)' }}>{item.time}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Footer text from the image */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto', paddingTop: '4rem' }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            margin: 0
          }}>
            FOR INTERNAL TRAINING PURPOSE -
          </p>
        </div>
      </div>
      
    </section>
  );
};
