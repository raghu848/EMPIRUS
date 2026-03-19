'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [phase, setPhase] = useState<'locked' | 'opening' | 'open'>('locked');

  // Initial cinematic reveal
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 400);
    const t2 = setTimeout(() => setPhase('open'), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '640px',
        overflow: 'hidden',
        background: '#080A0C',
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

      {/* ─── FULLSCREEN VIDEO BACKGROUND ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase !== 'locked' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source src="/pictures/Regal_Empirus_Website_2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ─── SCROLL INDICATOR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase === 'open' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '30px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
};
