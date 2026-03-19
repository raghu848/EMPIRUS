'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export const VisionarySection = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress within the section for parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax value for the image (moves up slower than the scroll)
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="visionary"
      ref={containerRef}
      style={{ background: 'var(--white)', color: '#333', padding: '0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {/* Main Content Area */}
        <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="col-2" style={{ alignItems: 'center', width: '100%' }}>

            {/* Left Image Side (With Parallax) */}
            <motion.div
              style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '8px' }}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.05), transparent)',
                zIndex: 1
              }} />
              <motion.div
                style={{
                  position: 'absolute', width: '100%', height: '115%', // taller to allow parallax
                  backgroundColor: '#f5f5f5', zIndex: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  y: yImage // Apply parallax transform
                }}
              >
                <Image
                  src="/images/regal_empirus/Architect_Image.png"
                  alt="Ar. Reza Kabul"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </motion.div>
            </motion.div>

            {/* Right Text Side (Fade Up) */}
            <div style={{ zIndex: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                style={{ marginBottom: '2rem' }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  lineHeight: '1.1',
                  color: '#999',
                  letterSpacing: '0.05em'
                }}>
                  Crafted by<br />
                  <span style={{ color: '#000', fontWeight: 400, fontFamily: 'var(--font-hand)', fontSize: '1.2em', letterSpacing: '0.05em' }}>A Visionary</span>
                </h2>
              </motion.div>

              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                lineHeight: 1.8,
                color: '#333',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {[
                  "Ar. Reza Kabul is a renowned architect with decades of experience and landmark projects across India and internationally. Founder of ARK Reza Kabul Architects, he is known for his philosophy of “liberating spaces,” focusing on openness, light, and functional design.",
                  "His award-winning work has set benchmarks in high-rise architecture, with projects spanning India, the USA, and the UAE",
                  "At Regal Empirus, his vision translates into elegant, spacious homes that blend modern design with timeless living."
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    {text}
                  </motion.p>
                ))}

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                  style={{ fontWeight: 600, color: '#000', marginTop: '1rem' }}
                >
                  Bachelor of Architecture (1985) M.S. University, Baroda
                </motion.p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Area */}
        <div style={{
          background: 'linear-gradient(90deg, #d3d3d3 0%, #ffffff 50%, #d3d3d3 100%)',
          borderTop: '1px solid #ccc',
          padding: '1.5rem 0'
        }}>
          <style>{`
            .vis-footer-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            @media (max-width: 767px) {
              .vis-footer-bar {
                flex-direction: column;
                gap: 0.5rem;
                text-align: center;
              }
            }
          `}</style>
          <div className="container vis-footer-bar">
            <h3 style={{ fontFamily: 'var(--font-hand)', fontWeight: 400, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: '#000', margin: 0 }}>
              Ar. Reza Kabul
            </h3>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.65rem, 2vw, 0.85rem)', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              FOR INTERNAL TRAINING PURPOSE
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
