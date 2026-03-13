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
                  fontWeight: 200, 
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
                  lineHeight: '1.1',
                  color: '#999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  CRAFTED BY<br/>
                  <span style={{ color: '#000', fontWeight: 400 }}>A VISIONARY</span>
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
                  "One of the foremost talents in the realm of Indian architecture, Reza Kabul's foray into the industry was a random experience of viewing books architecture that proved catalyst enough for a switch from engineering to architecture. After a brief stint at a prominent architecture studio in Mumbai, he set up ARK Reza Kabul Architects Pvt. Ltd., India in 1988, and further expanded with ARK Studio Pune in Pune, India and ARK Studio Inc in San Francisco Bay Area, USA.",
                  "Reza Kabul has envisioned and successfully executed a string of path breaking projects centred on the design philosophy of 'liberating spaces'. He has handled projects for leading names in Indian real estate industry, and continues to enjoy the trust and appreciation with projects that set pioneering benchmarks in architectural design.",
                  "A speaker for 'Marcus Evans Tall Buildings Conference' in Seoul, Korea (2008) and a pioneer in tall buildings, Reza Kabul has been listed in the Limca Book of Awards (2003) for Shreepati Arcade, the tallest building in India. His signature projects are spread globally in United States, India, Mauritius, United Arab Emirates, Sri Lanka, Sudan, Bhutan, and Kenya."
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
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.25rem', color: '#000', margin: 0 }}>
              AR. REZA KABUL
            </h3>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              FOR INTERNAL TRAINING PURPOSE
            </span>
          </div>
        </div>
        
      </div>
    </section>
  );
};
