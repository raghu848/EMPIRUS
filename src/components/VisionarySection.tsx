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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
              <motion.div
                style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '8px' }}
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
                    backgroundColor: 'transparent', zIndex: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    y: yImage // Apply parallax transform
                  }}
                >
                  <Image
                    src="/pictures/Reza.png"
                    alt="Ar. Reza Kabul"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top', mixBlendMode: 'multiply' }}
                  />
                </motion.div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ fontFamily: 'var(--font-hand)', fontWeight: 400, fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#000', margin: 0 }}
              >
                Ar. Reza Kabul
              </motion.h3>
            </div>

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
                  fontSize: 'clamp(3.6rem, 5.5vw, 4.8rem)',
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


      </div>
    </section>
  );
};
