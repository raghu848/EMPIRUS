'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const HeroSlider = () => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);

      // Synchronously update only the visible video element within the user gesture
      [desktopVideoRef.current, mobileVideoRef.current].forEach((video) => {
        if (video && window.getComputedStyle(video).display !== 'none') {
          video.muted = false;
          video.volume = 1;
          video.currentTime = 0;
          video.play().catch(() => { });
        }
      });

      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('pointerdown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    // Initial silent play attempt
    const playVideo = async (video: HTMLVideoElement | null) => {
      if (video) {
        try {
          video.muted = true;
          await video.play();
        } catch (error) {
          console.log("Autoplay failed:", error);
        }
      }
    };

    playVideo(desktopVideoRef.current);
    playVideo(mobileVideoRef.current);

    return () => {
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
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
      {/* ─── FULLSCREEN VIDEO BACKGROUND ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        {/* Desktop Video */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted={!hasInteracted}
          playsInline
          className="hide-mobile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            objectPosition: 'center',
          }}
        >
          <source src="/pictures/Regal_Empirus_Website_1.mp4" type="video/mp4" />
        </video>

        {/* Mobile Video */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted={!hasInteracted}
          playsInline
          className="hide-desktop"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            objectPosition: 'center',
          }}
        >
          <source src="/pictures/Regal_Empirus_Website_vertical.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ─── SCROLL INDICATOR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.0 }}
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
