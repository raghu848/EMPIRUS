'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { LuxuryGoldBackground } from './LuxuryGoldBackground';

interface Props {
  id: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  image?: string;
  images?: string[];
  imageAlt?: string;
  reverse?: boolean;
  cta?: { label: string; href: string };
  stat?: { value: string; label: string };   /* optional floating stat */
  tag?: string;                              /* optional corner tag e.g. "EST. 2018" */
}

/* ── tiny hook: magnetic mouse tilt on image ── */
function useTilt(strength = 10) {
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 120, damping: 18 });
  const sRotY = useSpring(rotY, { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
    rotY.set(x);
    rotX.set(-y);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  return { sRotX, sRotY, onMove, onLeave };
}

export const AboutSection = ({
  id, eyebrow, title, body, image, images, imageAlt, reverse, cta,
  stat = { value: '8+', label: 'Years of Excellence' },
  tag = '',
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayImages = images || (image ? [image] : []);

  useEffect(() => {
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(8);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  const rot = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);  /* subtle text-block rotation drift */

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(40px, 6vw, 80px) 0',
        overflow: 'hidden',
      }}
    >
      <LuxuryGoldBackground />
      {/* ── injected styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,opsz,wght@0,8..144,300;0,8..144,400;1,8..144,300;1,8..144,400&display=swap');

        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.3em;
          text-transform: uppercase; text-decoration: none;
          color: #c8a44a;
          border: 1px solid rgba(200,164,74,0.35);
          padding: 14px 28px; border-radius: 40px;
          background: rgba(200,164,74,0.04);
          transition: background 0.35s, border-color 0.35s, color 0.35s, box-shadow 0.35s;
          box-shadow: 0 0 0 0 rgba(200,164,74,0);
        }
        .ab-cta-btn:hover {
          background: rgba(200,164,74,0.1);
          border-color: rgba(200,164,74,0.65);
          color: #e8c97a;
          box-shadow: 0 0 28px rgba(200,164,74,0.12);
        }
        .ab-cta-btn .arrow {
          display: inline-block; width: 22px; height: 1px;
          background: currentColor; position: relative;
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-cta-btn:hover .arrow { width: 32px; }
        .ab-cta-btn .arrow::after {
          content: ''; position: absolute; right: 0; top: -3px;
          width: 6px; height: 6px;
          border-right: 1px solid currentColor;
          border-top: 1px solid currentColor;
          transform: rotate(45deg);
        }

        /* Animated number counter feel via CSS */
        @keyframes abCountUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Reveal lines */
        @keyframes abLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .ab-stat-value {
          font-family: var(--font-serif);
          font-size: clamp(3.2rem, 5.5vw, 5.2rem);
          font-weight: 300; 
          line-height: 0.9;
          display: block;
          background: linear-gradient(135deg, #e8c97a 0%, #c8a44a 50%, #a07830 100%);
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 4px;
        }
      `}</style>


      {/* ── decorative roman numeral aside ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          [reverse ? 'left' : 'right']: '3%',
          top: '50%', translateY: '-50%',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300, fontSize: 'clamp(6rem, 12vw, 14rem)',
          color: 'rgba(200,164,74,0.04)',
          lineHeight: 1, userSelect: 'none',
          letterSpacing: '-0.05em', zIndex: 0,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        II
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div style={{ position: 'relative', zIndex: 4 }}>
        <div className="ab-grid" style={{ direction: reverse ? 'rtl' : 'ltr' }}>
          <style>{`
          .ab-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(48px, 8vw, 100px);
            align-items: center;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 clamp(24px, 6vw, 80px);
            position: relative;
            z-index: 2;
          }
          @media (min-width: 1024px) {
            .ab-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}</style>

          {/* ════════════════ IMAGE COLUMN ════════════════ */}
          <motion.div
            style={{ direction: 'ltr', rotateX: tilt.sRotX, rotateY: tilt.sRotY }}
            onMouseMove={tilt.onMove}
            onMouseLeave={tilt.onLeave}
            initial={{ opacity: 0, x: reverse ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div style={{ position: 'relative' }}>

              {/* Main image frame */}
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 48px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,164,74,0.1)',
              }}>
                {/* Image Container */}
                <div style={{
                  position: 'absolute', inset: 0,
                }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <Image
                        src={displayImages[currentIndex]}
                        alt={imageAlt ?? eyebrow}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>


                {/* Tag — corner stamp */}
                {/* <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  fontFamily: "'Cinzel', serif",
                  fontSize: '10px', letterSpacing: '0.3em',
                  color: 'rgba(200,164,74,0.9)',
                  border: '1px solid rgba(200,164,74,0.3)',
                  padding: '6px 12px', borderRadius: '20px',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(8,6,4,0.5)',
                }}
              >
                {tag}
              </motion.div> */}



                {/* Gold corner flourishes */}
                {[
                  { top: 0, left: 0, borderTop: '2px solid rgba(200,164,74,0.5)', borderLeft: '2px solid rgba(200,164,74,0.5)' },
                  { top: 0, right: 0, borderTop: '2px solid rgba(200,164,74,0.5)', borderRight: '2px solid rgba(200,164,74,0.5)' },
                  { bottom: 0, left: 0, borderBottom: '2px solid rgba(200,164,74,0.5)', borderLeft: '2px solid rgba(200,164,74,0.5)' },
                  { bottom: 0, right: 0, borderBottom: '2px solid rgba(200,164,74,0.5)', borderRight: '2px solid rgba(200,164,74,0.5)' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    style={{
                      position: 'absolute', width: '24px', height: '24px', ...s,
                    }}
                  />
                ))}
              </div>

              {/* ── Floating stat card ── */}
              <motion.div
                initial={{ opacity: 0, y: 24, x: reverse ? -24 : 24 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
                style={{
                  position: 'absolute',
                  bottom: '-28px',
                  [reverse ? 'right' : 'left']: '-28px',
                  background: 'rgba(15,11,4,0.95)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '4px',
                  padding: '22px 26px',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.04) inset',
                  minWidth: '150px',
                }}
              >
                {/* Gold top line */}
                <div style={{
                  width: '28px', height: '1px',
                  background: 'linear-gradient(90deg, #c8a44a, rgba(200,164,74,0.2))',
                  marginBottom: '10px',
                }} />
                <div className="ab-stat-value" style={{ textAlign: 'center', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '11px', letterSpacing: '0.36em',
                  color: 'rgba(200,164,74,0.95)',
                  marginTop: '8px', textTransform: 'uppercase',
                  textAlign: 'center'
                }}>
                  {stat.label}
                </div>
              </motion.div>

              {/* ── Vertical accent line beside image ── */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                style={{
                  position: 'absolute',
                  top: '15%', bottom: '15%',
                  [reverse ? 'left' : 'right']: '-20px',
                  width: '1px',
                  background: 'linear-gradient(to bottom, transparent, rgba(200,164,74,0.35), transparent)',
                  transformOrigin: 'top',
                }}
              />
            </div>
          </motion.div>

          {/* ════════════════ TEXT COLUMN ════════════════ */}
          <motion.div
            style={{
              direction: 'ltr',
              display: 'flex', flexDirection: 'column', gap: '0',
            }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  width: '36px', height: '1px',
                  background: 'linear-gradient(90deg, #c8a44a, rgba(200,164,74,0.3))',
                  transformOrigin: 'left',
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '10px', letterSpacing: '0.35em',
                color: '#c8a44a', textTransform: 'uppercase',
              }}>
                {eyebrow}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                fontFamily: "var(--font-hand)",
                fontWeight: 400,
                fontSize: 'clamp(2.8rem, 3.8vw, 3.8rem)',
                lineHeight: 1.1,
                letterSpacing: '0.01em',
                color: '#f5f2ec',
                margin: '0 0 24px',
              }}
            >
              {title}
            </motion.h2>

            {/* Gold separator with small diamond */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '28px', transformOrigin: 'left',
              }}
            >
              <div style={{ width: '48px', height: '1px', background: 'rgba(200,164,74,0.5)' }} />
              <div style={{
                width: '5px', height: '5px',
                background: 'transparent',
                border: '1px solid rgba(200,164,74,0.6)',
                transform: 'rotate(45deg)', flexShrink: 0,
              }} />
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(200,164,74,0.3), transparent)' }} />
            </motion.div>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                fontWeight: 300,
                lineHeight: 1.85,
                color: 'rgba(220,210,190,0.88)',
                marginBottom: '36px',
              }}
            >
              {body}
            </motion.div>


            {/* CTA */}
            {cta && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <a href={cta.href} className="ab-cta-btn">
                  <span>{cta.label}</span>
                  <span className="arrow" />
                </a>
              </motion.div>
            )}
          </motion.div>
        </div> {/* Closes the new relative div */}
      </div> {/* Closes the main content div that holds image and text columns */}
    </section>
  );
};