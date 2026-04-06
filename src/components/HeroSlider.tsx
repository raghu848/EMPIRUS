'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const HeroSlider = () => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // 1. Setup Intersection Observer to monitor section visibility
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 } // Triggers as soon as it enters/leaves the viewport
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 2. Setup first-time interaction listener (unlocks audio)
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('pointerdown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  // 3. Centralized video playback logic (handles Scroll, Resize, and Interactions)
  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    const updateVideos = () => {
      const manageVideo = (video: HTMLVideoElement | null) => {
        if (!video) return;

        // Determine if this specific video element is currently meant to be displayed
        // This prevents the "mobile" video from playing sound on desktop, and vice versa.
        const isVisibleOnScreen = window.getComputedStyle(video).display !== 'none';

        if (isInView && isVisibleOnScreen) {
          // Unmute if user has interacted, otherwise keep it muted for autoplay
          video.muted = !hasInteracted;
          if (hasInteracted) {
            video.volume = 1;
          }
          
          // Using a catch block to handle browser autoplay blockages gracefully
          video.play().catch(() => {});
        } else {
          // If not in view OR is the hidden version of the video: Pause and Mute
          video.pause();
          video.muted = true;
        }
      };

      manageVideo(desktopVideo);
      manageVideo(mobileVideo);
    };

    // Run immediately when state changes
    updateVideos();

    // Also listen to window resize to switch between desktop/mobile videos if needed
    window.addEventListener('resize', updateVideos);
    return () => window.removeEventListener('resize', updateVideos);
  }, [isInView, hasInteracted]);

  return (
    <section
      ref={sectionRef}
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
        {/* Dark Overlay Gradient for better visibility of scroll indicator */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Desktop Video */}
        <video
          ref={desktopVideoRef}
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
            color: 'rgba(255,255,255,0.9)',
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
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
};
