'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { LuxuryGoldBackground } from './LuxuryGoldBackground';

/* ─── Location Data ──────────────────────────────────────────── */
const LOCATIONS = [
  { place: 'Manav Mangal School', time: 'Immediate', image: '/location_images/Manav_mangal_school.jpeg', category: 'Education', icon: '🎓' },
  { place: 'CGC Landran', time: '~ 2 Min', image: '/location_images/cgc_landran.jpeg', category: 'Education', icon: '🎓' },
  { place: 'Amity University', time: '~ 5 Min', image: '/location_images/Amity_univercity.jpeg', category: 'Education', icon: '🎓' },
  { place: 'Quark City', time: '~ 3 Min', image: '/location_images/quark_city.jpeg', category: 'IT & Business', icon: '🏢' },
  { place: 'IT City', time: '~ 2 Min', image: '/location_images/IT city.jpeg', category: 'IT & Business', icon: '🏢' },
  { place: 'IVY Hospital', time: '~ 3 Min', image: '/location_images/IVY.jpeg', category: 'Healthcare', icon: '🏥' },
  { place: 'Sohana Hospital', time: '~ 5 Min', image: '/location_images/sohana_hospital.jpeg', category: 'Healthcare', icon: '🏥' },
  { place: 'Fortis Hospital', time: '~ 10 Min', image: '/location_images/Fortis_hospital.jpeg', category: 'Healthcare', icon: '🏥' },
  { place: 'CP 67 Mall', time: '~ 8 Min', image: '/location_images/cp 67.jpeg', category: 'Lifestyle', icon: '🛍️' },
  { place: 'International Airport', time: '~ 20 Min', image: '/location_images/Airport.jpeg', category: 'Transport', icon: '✈️' },
];

/* Duplicate for seamless infinite scroll */
const SCROLL_ITEMS = [...LOCATIONS, ...LOCATIONS];

/* ─── Component ──────────────────────────────────────────────── */
export const LocationAdvantage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  /* Intersection Observer for entrance animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Infinite scroll animation loop */
  const CARD_WIDTH = 290; // card width + gap
  const TOTAL_WIDTH = LOCATIONS.length * CARD_WIDTH;

  const animate = useCallback(() => {
    if (!isPaused && trackRef.current) {
      posRef.current -= 0.5; // speed: 0.5px per frame
      if (Math.abs(posRef.current) >= TOTAL_WIDTH) {
        posRef.current = 0;
      }
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    }
    animRef.current = requestAnimationFrame(animate);
  }, [isPaused, TOTAL_WIDTH]);

  useEffect(() => {
    if (isVisible) {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [isVisible, animate]);

  const fadeUp = (delay: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.9s ${delay}ms var(--ease), transform 0.9s ${delay}ms var(--ease-spring)`,
  });

  return (
    <section
      id="location"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '2rem 0 4rem',
        overflow: 'hidden',
      }}
    >
      <LuxuryGoldBackground />

      {/* ── Header ── */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '0.75rem', ...fadeUp(0) }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold-lt)',
            marginBottom: '0.75rem',
          }}>
            Prime Connectivity
          </p>
          <h2 style={{
            fontFamily: 'var(--font-hand)', fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--white)',
            margin: 0, lineHeight: 1.2,
          }}>
            Location{' '}
            <span style={{ color: 'var(--gold)' }}>Advantages</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)',
            maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7,
          }}>
            Strategically positioned for seamless connectivity to top schools, hospitals,
            IT hubs, and lifestyle destinations.
          </p>
        </div>

        {/* ── Divider ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', margin: '1.5rem auto 2.5rem', maxWidth: '300px',
          ...fadeUp(100),
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)' }} />
          <div style={{ width: '6px', height: '6px', background: 'var(--gold)', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)' }} />
        </div>
      </div>

      {/* ── Infinite Scroll Track ── */}
      <div
        style={{
          position: 'relative', zIndex: 10, width: '100%',
          overflow: 'hidden',
          /* Fade edges for premium seamless feel */
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          ...fadeUp(250),
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setHoveredIdx(null); }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '20px',
            width: 'max-content',
            willChange: 'transform',
            paddingLeft: '20px',
          }}
        >
          {SCROLL_ITEMS.map((loc, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  width: '270px',
                  flexShrink: 0,
                  background: 'rgba(25,32,28,0.85)',
                  border: `1px solid ${isHovered ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)'}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.45s var(--ease-spring), border-color 0.3s var(--ease), box-shadow 0.4s var(--ease)',
                  transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered
                    ? '0 12px 40px rgba(212,175,55,0.12), 0 0 40px rgba(212,175,55,0.04) inset'
                    : '0 0 40px rgba(212,175,55,0.04) inset',
                }}
              >
                {/* ── Image ── */}
                <div style={{
                  position: 'relative', width: '100%', height: '170px',
                  overflow: 'hidden', background: 'var(--surface-2)',
                }}>
                  <Image
                    src={loc.image}
                    alt={loc.place}
                    fill
                    sizes="240px"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.6s var(--ease)',
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, rgba(10,18,14,0.65) 100%)',
                    zIndex: 2, pointerEvents: 'none',
                  }} />
                  {/* Time badge */}
                  <div style={{
                    position: 'absolute', top: '8px', right: '8px', zIndex: 3,
                    background: 'rgba(10,18,14,0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(223,188,115,0.35)',
                    borderRadius: '20px',
                    padding: '3px 10px',
                    fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.04em', color: 'var(--gold-lt)',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.85 }}>
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 4v4.5l3 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {loc.time}
                  </div>
                  {/* Category pill on image */}
                  <div style={{
                    position: 'absolute', bottom: '8px', left: '8px', zIndex: 3,
                    background: 'rgba(10,18,14,0.7)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '20px',
                    padding: '3px 10px',
                    fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                    color: 'var(--gold-lt)',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    {loc.icon} {loc.category}
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div style={{
                  padding: '0.75rem 0.85rem',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'var(--gold-dim)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '15px', flexShrink: 0,
                    border: '1px solid rgba(223,188,115,0.15)',
                  }}>
                    {loc.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 400,
                      color: '#ffffff', letterSpacing: '0.02em', lineHeight: 1.3, margin: 0,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {loc.place}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 500,
                      color: 'var(--gold-lt)', margin: '2px 0 0', letterSpacing: '0.02em',
                    }}>
                      {loc.time} drive
                    </p>
                  </div>
                  {/* Arrow */}
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none"
                    style={{
                      opacity: isHovered ? 1 : 0.3,
                      transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                      transition: 'all 0.3s var(--ease)',
                      flexShrink: 0, color: 'var(--gold)',
                    }}
                  >
                    <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Stats ── */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          gap: '2.5rem', marginTop: '3rem', paddingTop: '2rem',
          borderTop: '1px solid var(--faint)',
          ...fadeUp(400),
        }}>
          {[
            { value: '10+', label: 'Key Destinations' },
            { value: 'Approx. 20', label: 'Minutes Drive' },
            { value: 'Multiple', label: 'Top Hospitals' },
            { value: 'Multiple', label: 'Edu Institutions' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 600, color: 'var(--gold)', lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)', marginTop: '0.35rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
