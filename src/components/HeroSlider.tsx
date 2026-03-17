'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    image: '/images/render-hero-1.jpg',
    heading: 'Regal Empirus',
    subline: 'Unlock the True Potential of Your Real Estate',
  },
  {
    image: '/images/render-hero-2.jpg',
    heading: 'A 2-Acre Oasis',
    subline: 'Rising Above the City with Unmatched Amenities',
  },
  {
    image: '/images/render-hero-3.jpg',
    heading: 'Bungalows in the Sky',
    subline: 'Crafted by Ar. Reza Kabul for the Chosen Few',
  },
];

// Softer, slower curtain variants
const curtainTop = {
  initial: { y: 0 },
  animate: { y: '-100%', transition: { delay: 0.4, duration: 1.4, ease: [0.76, 0, 0.24, 1] as const } }
};

const curtainBottom = {
  initial: { y: 0 },
  animate: { y: '100%', transition: { delay: 0.4, duration: 1.4, ease: [0.76, 0, 0.24, 1] as const } }
};

export const HeroSlider = () => {
  const [cur, setCur] = useState(0);
  const [phase, setPhase] = useState<'locked' | 'opening' | 'open'>('locked');
  const [animKey, setAnimKey] = useState(0);

  // Initial cinematic reveal - slowed down
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 400);
    const t2 = setTimeout(() => setPhase('open'), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const goTo = useCallback((idx: number) => {
    setCur(idx);
    setAnimKey(k => k + 1);
  }, []);

  /* Auto-advance only after the curtain is open, with a much longer delay so it's not "too fast" */
  useEffect(() => {
    if (phase !== 'open') return;
    const t = setInterval(() => goTo((cur + 1) % SLIDES.length), 9000); // 9 seconds per slide
    return () => clearInterval(t);
  }, [cur, goTo, phase]);

  const slide = SLIDES[cur];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '640px',
        overflow: 'hidden',
        background: '#080A0C', // matches curtain color
      }}
    >
      {/* ─── CURTAINS ─── */}
      <motion.div
        variants={curtainTop}
        initial="initial"
        animate="animate"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '50vh',
          background: '#080A0C',
          zIndex: 9999,
          pointerEvents: phase === 'open' ? 'none' : 'all',
        }}
      />
      <motion.div
        variants={curtainBottom}
        initial="initial"
        animate="animate"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          height: '50vh',
          background: '#080A0C',
          zIndex: 9999,
          pointerEvents: phase === 'open' ? 'none' : 'all',
        }}
      />

      {/* ─── BACKGROUNDS ─── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={cur}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }} // Slower, smoother crossfade
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <motion.div
            className={phase === 'open' ? 'ken-burns-drift' : ''}
            initial={{ scale: 1.06 }}
            animate={
              // If it's the very first load, slowly zoom out as curtains open
              (phase !== 'locked' && cur === 0 && animKey === 0)
                ? { scale: 1.0, transition: { delay: 0.4, duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] as const } }
                // Otherwise slowly settle or just stay at 1.0 and let CSS drift take over
                : { scale: 1.0, transition: { duration: 1.8, ease: "easeOut" } }
            }
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </motion.div>

          {/* TREF-Style Dark Overlay (Stronger on left side for text readability) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.15)', // base darkening
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ─── CONTENT (TREF Layout - Left Aligned) ─── */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%' }}>

          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${animKey}`}
              initial="hidden"
              animate={phase !== 'locked' ? "visible" : "hidden"}
              exit="exit"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              {/* Eyebrow */}
              <motion.p
                custom={animKey === 0 ? 1.0 : 0.2}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: (delay) => ({
                    opacity: 1, y: 0,
                    transition: { delay, duration: 0.8, ease: "easeOut" } // Smoother duration
                  }),
                  exit: { opacity: 0, y: -10, transition: { duration: 0.4 } }
                }}
                className="eyebrow"
                style={{ marginBottom: '1.5rem', color: 'var(--gold-lt)' }}
              >
                EXPERT APPROACH
              </motion.p>

              {/* Main Headline Base Wrapper */}
              <h1
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontWeight: 400,
                  fontSize: 'clamp(3.2rem, 6.5vw, 6.5rem)',
                  lineHeight: 1.2,
                  letterSpacing: '0.02em',
                  color: '#fff',
                  margin: '0',
                  paddingBottom: '0.2em',
                }}
              >
                {/* Line 1 - Wipe Reveal */}
                <motion.span
                  custom={animKey === 0 ? 1.2 : 0.3}
                  variants={{
                    hidden: { clipPath: 'inset(0 100% 0 0)' },
                    visible: (delay) => ({
                      clipPath: 'inset(0 0% -20% 0)',
                      transition: { delay, duration: 0.9, ease: [0.76, 0, 0.24, 1] as const } // Smoother, slightly slower wipe
                    }),
                    exit: { opacity: 0, transition: { duration: 0.4 } }
                  }}
                  style={{ display: 'block' }}
                >
                  {slide.heading}
                </motion.span>
              </h1>

              {/* Subline */}
              <motion.h2
                custom={animKey === 0 ? 1.6 : 0.5}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: (delay) => ({
                    opacity: 1, y: 0,
                    transition: { delay, duration: 0.8, ease: "easeOut" }
                  }),
                  exit: { opacity: 0, transition: { duration: 0.4 } }
                }}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  lineHeight: 1.4,
                  color: '#e0e0e0',
                  marginTop: '1.25rem',
                  letterSpacing: '0.01em',
                  maxWidth: '600px',
                }}
              >
                {slide.subline}
              </motion.h2>

              {/* CTA */}
              <motion.div
                custom={animKey === 0 ? 1.9 : 0.6}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: (delay) => ({
                    opacity: 1, y: 0,
                    transition: { delay, duration: 0.8, ease: "easeOut" }
                  }),
                  exit: { opacity: 0, transition: { duration: 0.4 } }
                }}
                style={{ marginTop: '3.5rem' }}
              >
                <a href="#contact" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem 2.5rem',
                  border: '1px solid rgba(255,255,255,0.6)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.4s ease, color 0.4s ease, transform 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#fff';
                    (e.currentTarget as HTMLElement).style.color = '#000';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                  }}
                >
                  Investment Inquiry
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Minimal slide indicators at bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '4rem',
            left: 'var(--container-px, 2rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              custom={animKey === 0 ? 2.2 + (i * 0.1) : 0}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: (delay) => ({
                  opacity: 1, scale: 1,
                  transition: { delay, duration: 0.6 }
                })
              }}
              initial="hidden"
              animate={phase !== 'locked' ? "visible" : "hidden"}
              style={{
                height: '2px',
                width: cur === i ? '40px' : '20px',
                background: cur === i ? '#fff' : 'rgba(255,255,255,0.3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.6s',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
