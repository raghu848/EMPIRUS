'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const BULLETS = [
  { icon: '◈', text: 'Premier pricing at ₹8,600 per sq. ft.' },
  { icon: '◈', text: 'Rare 3-side open site for maximum light and air' },
  { icon: '◈', text: '100% sun-facing apartments, every unit' },
  { icon: '◈', text: '82-foot wide road access — seamless connectivity' },
  { icon: '◈', text: '20 minutes to International Airport' },
  { icon: '◈', text: 'Adjacent to leading IT hubs and top schools' },
];

export const InvestmentsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  /* Intersection trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Parallax on the full-bleed image */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const fade = (delay: number, x = 0, y = 28) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translate(0,0)' : `translate(${x}px,${y}px)`,
    transition: `opacity 1s ${delay}ms cubic-bezier(0.16,1,0.3,1),
                 transform 1s ${delay}ms cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section
      id="investments"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #071209 0%, #0a1a0e 50%, #071209 100%)',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,opsz,wght@0,8..144,300;0,8..144,400;1,8..144,300;1,8..144,400&display=swap');

        .inv-bullet:hover .inv-bullet-text { color: rgba(232,201,122,0.9) !important; }
        .inv-bullet:hover .inv-bullet-icon { color: #c8a44a !important; opacity: 1 !important; }

        .inv-cta {
          display: inline-flex; align-items: center; gap: 14px;
          font-family: 'Cinzel', serif; font-size: 8.5px; letter-spacing: 0.32em;
          text-transform: uppercase; text-decoration: none; color: #c8a44a;
          border: 1px solid rgba(200,164,74,0.32); border-radius: 40px;
          padding: 14px 28px; background: rgba(200,164,74,0.04);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .inv-cta:hover {
          background: rgba(200,164,74,0.1); border-color: rgba(200,164,74,0.65);
          color: #e8c97a; box-shadow: 0 0 32px rgba(200,164,74,0.12);
          transform: translateX(4px);
        }
        .inv-cta-arrow {
          display: inline-block; width: 24px; height: 1px;
          background: currentColor; position: relative;
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .inv-cta:hover .inv-cta-arrow { width: 36px; }
        .inv-cta-arrow::after {
          content: ''; position: absolute; right: 0; top: -3px;
          width: 7px; height: 7px;
          border-right: 1px solid currentColor;
          border-top: 1px solid currentColor;
          transform: rotate(45deg);
        }

        @keyframes invLineGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        .inv-vline-anim {
          transform-origin: top;
          animation: invLineGrow 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }

        @keyframes invKenBurns {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        .inv-img-ken { animation: invKenBurns 8s ease both; }

        /* Grain */
        .inv-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
        }

        @media (max-width: 768px) {
          .inv-layout { flex-direction: column !important; }
          .inv-image-col { width: 100% !important; height: 55vw !important; min-height: 280px !important; }
          .inv-text-col { padding: 48px 24px 60px !important; }
          .inv-vline { display: none !important; }
          .inv-big-number { font-size: 7rem !important; }
        }
      `}</style>

      {/* ── Atmosphere ── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 70% at 75% 50%, rgba(200,164,74,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 10% 30%, rgba(255,255,255,0.01) 0%, transparent 50%)
        `,
      }} />
      <div aria-hidden className="inv-grain" style={{
        position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ── TOP LABEL BAR ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px clamp(24px,5vw,72px)',
        borderBottom: '1px solid rgba(200,164,74,0.07)',
        position: 'relative', zIndex: 5,
        ...fade(0),
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#c8a44a',
            boxShadow: '0 0 8px rgba(200,164,74,0.6)',
          }} />
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '8px', letterSpacing: '0.38em',
            color: 'rgba(200,164,74,0.55)', textTransform: 'uppercase',
          }}>
            Site Advantage — Investment Overview
          </span>
        </div>
        <span style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '8px', letterSpacing: '0.22em',
          color: 'rgba(200,164,74,0.25)',
        }}>
          MULTI-FAMILY REAL ESTATE DISCIPLINED FOCUS
        </span>
      </div>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div
        className="inv-layout"
        style={{
          display: 'flex', flex: 1,
          minHeight: '85vh',
        }}
      >
        {/* ═══════════════ LEFT TEXT PANEL ═══════════════ */}
        <div
          className="inv-text-col"
          style={{
            width: '52%',
            padding: 'clamp(48px,8vh,100px) clamp(24px,5vw,72px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative', zIndex: 4,
          }}
        >
          {/* Giant background number */}
          <div
            aria-hidden
            className="inv-big-number"
            style={{
              position: 'absolute', top: '5%', left: '3%',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(8rem, 18vw, 20rem)',
              lineHeight: 1, userSelect: 'none',
              color: 'rgba(200,164,74,0.03)',
              letterSpacing: '-0.05em',
              pointerEvents: 'none',
            }}
          >
            01
          </div>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px', ...fade(80) }}>
            <div style={{
              width: '32px', height: '1px',
              background: 'linear-gradient(90deg, #c8a44a, rgba(200,164,74,0.3))',
            }} />
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '8.5px', letterSpacing: '0.36em',
              color: '#c8a44a', textTransform: 'uppercase',
            }}>
              The Right Investment
            </span>
          </div>

          {/* Main title — large, editorial */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.02em',
              color: '#f5f2ec',
              marginBottom: '28px',
              ...fade(140),
            }}
          >
            The Real<br />
            Estate Fund<br />
            <em style={{ fontStyle: 'italic', color: '#c8a44a' }}>Investments</em>
          </h2>

          {/* Gold divider with diamond */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', ...fade(200) }}>
            <div style={{ width: '44px', height: '1px', background: 'rgba(200,164,74,0.45)' }} />
            <div style={{
              width: '5px', height: '5px',
              border: '1px solid rgba(200,164,74,0.55)',
              transform: 'rotate(45deg)', flexShrink: 0,
            }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(200,164,74,0.25), transparent)' }} />
          </div>

          {/* Vertical divider + body text side-by-side */}
          <div style={{ display: 'flex', gap: '28px', marginBottom: '40px', ...fade(260) }}>
            {/* Thin vertical rule */}
            <div
              className="inv-vline inv-vline-anim"
              style={{
                width: '1px', flexShrink: 0,
                background: 'linear-gradient(to bottom, rgba(200,164,74,0.5), rgba(200,164,74,0.08))',
                alignSelf: 'stretch',
              }}
            />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              lineHeight: 1.85,
              color: 'rgba(220,210,190,0.6)',
              margin: 0,
            }}>
              The Real Estate Fund's goal is to provide attractive housing for tenants seeking a safe environment they can be proud of. We focus on multi-family properties in the 24–60 unit range, representing a significant piece of the market where we expect to find opportunities.
            </p>
          </div>

          {/* Bullet list */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '44px', ...fade(320) }}>
            {BULLETS.map((b, i) => (
              <li
                key={i}
                className="inv-bullet"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                  cursor: 'default',
                  transition: 'transform 0.3s',
                }}
              >
                <span
                  className="inv-bullet-icon"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '8px', flexShrink: 0, marginTop: '4px',
                    color: 'rgba(200,164,74,0.45)',
                    transition: 'color 0.3s, opacity 0.3s',
                  }}
                >
                  {b.icon}
                </span>
                <span
                  className="inv-bullet-text"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                    lineHeight: 1.6,
                    color: 'rgba(220,210,190,0.55)',
                    transition: 'color 0.3s',
                  }}
                >
                  {b.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div style={fade(400)}>
            <a href="#contact" className="inv-cta">
              <span>THE REAL ESTATE FUND INVESTMENTS</span>
              <span className="inv-cta-arrow" />
            </a>
          </div>
        </div>

        {/* ═══════════════ RIGHT IMAGE PANEL ═══════════════ */}
        <motion.div
          className="inv-image-col"
          ref={imageRef as any}
          style={{
            width: '48%',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, x: 80 }}
          animate={on ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {/* Parallax image */}
          <motion.div
            className="inv-img-ken"
            style={{
              position: 'absolute',
              inset: '-10%',
              y: imgY,
            }}
          >
            <Image
              src="/images/render-investments.jpg"
              alt="Regal Empirus Investment Property"
              fill
              priority
              style={{
                objectFit: 'cover',
                filter: 'brightness(0.82) contrast(1.05) saturate(0.9)',
              }}
            />
          </motion.div>

          {/* Left-side gradient blend into text panel */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(to right,  rgba(7,18,9,0.75) 0%, transparent 30%),
              linear-gradient(to bottom, rgba(7,18,9,0.3)  0%, transparent 25%),
              linear-gradient(to top,    rgba(7,18,9,0.5)  0%, transparent 35%)
            `,
            zIndex: 2,
          }} />

          {/* Image counter badge */}
          <div
            style={{
              position: 'absolute', top: '28px', right: '28px', zIndex: 6,
              fontFamily: "'Cinzel', serif",
              fontSize: '8px', letterSpacing: '0.3em',
              color: 'rgba(200,164,74,0.7)',
              border: '1px solid rgba(200,164,74,0.25)',
              padding: '7px 14px', borderRadius: '24px',
              background: 'rgba(7,18,9,0.55)',
              backdropFilter: 'blur(8px)',
              ...fade(300),
            }}
          >
            01 / 03
          </div>

          {/* Corner gold accents */}
          {[
            { top: 0, left: 0, borderTop: '2px solid rgba(200,164,74,0.4)', borderLeft: '2px solid rgba(200,164,74,0.4)' },
            { top: 0, right: 0, borderTop: '2px solid rgba(200,164,74,0.4)', borderRight: '2px solid rgba(200,164,74,0.4)' },
            { bottom: 0, left: 0, borderBottom: '2px solid rgba(200,164,74,0.4)', borderLeft: '2px solid rgba(200,164,74,0.4)' },
            { bottom: 0, right: 0, borderBottom: '2px solid rgba(200,164,74,0.4)', borderRight: '2px solid rgba(200,164,74,0.4)' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={on ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
              style={{
                position: 'absolute', width: '28px', height: '28px',
                zIndex: 6, ...s,
              }}
            />
          ))}

          {/* Bottom caption */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 6,
            padding: '22px 28px',
            borderTop: '1px solid rgba(200,164,74,0.1)',
            background: 'linear-gradient(to top, rgba(7,18,9,0.85) 0%, transparent 100%)',
            ...fade(450),
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '7.5px', letterSpacing: '0.32em',
                  color: 'rgba(200,164,74,0.5)', marginBottom: '4px',
                }}>
                  REGAL EMPIRUS — FLAGSHIP PROJECT
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic',
                  color: 'rgba(245,242,236,0.7)',
                }}>
                  Elevated Living Redefined
                </div>
              </div>
              {/* Mini stat */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.8rem', fontWeight: 300,
                  background: 'linear-gradient(135deg, #e8c97a, #c8a44a)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}>
                  ₹8,600
                </div>
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '7px', letterSpacing: '0.22em',
                  color: 'rgba(200,164,74,0.4)', textTransform: 'uppercase',
                }}>
                  Per Sq. Ft.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Section bottom rule ── */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(200,164,74,0.15), transparent)',
      }} />
    </section>
  );
};