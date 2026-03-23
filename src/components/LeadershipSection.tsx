'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { LuxuryGoldBackground } from './LuxuryGoldBackground';

const DIRECTORS = [
  {
    name: "Mr. B.S. Gill",
    role: "Director, Visionary Leader and Mentor",
    quote: "As a company, GDPL has always prioritized quality, innovation, and a deep-rooted commitment to community building. Our vision is to create developments that not only meet expectations but exceed them, leaving a lasting impact on the lives of our customers and the society at large.",
    image: "/images/mr bs gill.jpg",
  },
  {
    name: "Mr. Nardeep Singh",
    role: "Director, Driving Innovation and Growth",
    quote: "At GDPL, we are constantly innovating to align with the evolving needs of our customers. Our focus remains on delivering projects that uphold customer trust while paving the way for a brighter, more sustainable future.",
    image: "/images/nardeep singh.jpg",
  }
];

export const LeadershipSection = () => {
  return (
    <section id="team" style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '2rem', overflow: 'hidden' }}>
      <LuxuryGoldBackground />
      <div className="container" style={{ position: 'relative', zIndex: 4 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Leadership Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-hand)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: 'var(--white)',
              marginTop: '1rem',
              letterSpacing: '0.02em'
            }}
          >
            Guided by <em style={{ fontStyle: 'italic', color: 'var(--gold-lt)' }}>Experience</em>
          </motion.h2>
        </div>

        <div className="col-2" style={{ gap: '4rem', alignItems: 'flex-start' }}>
          {DIRECTORS.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '4px',
                height: '100%',
                boxShadow: '0 0 40px rgba(212,175,55,0.04) inset',
              }}
            >
              <motion.div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  borderRadius: '2px'
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.2 + 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </motion.div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '2.1rem',
                  color: 'var(--gold-lt)',
                  fontWeight: 400,
                  marginBottom: '0.25rem',
                  letterSpacing: '0.01em'
                }}>
                  {d.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '1.5rem'
                }}>
                  {d.role}
                </p>

                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    top: '-1rem',
                    left: '-0.5rem',
                    fontSize: '4rem',
                    color: 'rgba(212,175,55,0.1)',
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1
                  }}>
                    &ldquo;
                  </span>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    lineHeight: 1.8,
                    color: 'var(--white)',
                    opacity: 0.8,
                    fontStyle: 'italic'
                  }}>
                    {d.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
