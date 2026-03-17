'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Investments', href: '#investments' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const linksRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV.map(n => n.href.slice(1));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  /* ── Pill position tracker ── */
  useEffect(() => {
    const updatePill = () => {
      if (!linksRef.current || !activeRef.current) return;
      const parent = linksRef.current.getBoundingClientRect();
      const child = activeRef.current.getBoundingClientRect();
      setPillStyle({ left: child.left - parent.left, width: child.width });
    };
    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [active]);

  /* ── Body lock when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ─────────── GLOBAL STYLES ─────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        :root {
          --gold-lt:   #e5d8be;
          --gold:      #d1c1a1;
          --gold-dk:   #bca882;
          --gold-dim:  rgba(209,193,161,0.18);
          --gold-line: rgba(209,193,161,0.22);
          --nav-bg:    rgba(17,29,23,0.97);
          --ink:       #0a0a0c;
        }

        /* Pill active indicator */
        .re-active-pill {
          position: absolute;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(209,193,161,0.18), rgba(168,143,105,0.08));
          box-shadow:
            0 0 0 1px rgba(209,193,161,0.25),
            inset 0 1px 0 rgba(240,230,210,0.1);
          top: 50%;
          transform: translateY(-50%);
          height: 36px;
          pointer-events: none;
          transition:
            left  0.4s cubic-bezier(0.34,1.56,0.64,1),
            width 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* Nav link */
        .re-nav-link {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          padding: 10px 18px;
          border-radius: 50px;
          text-decoration: none;
          position: relative;
          z-index: 1;
          transition: color 0.3s;
          white-space: nowrap;
        }
        .re-nav-link:hover          { color: #fff; }
        .re-nav-link.re-nav-active  { color: var(--gold-lt); }

        /* CTA button */
        .re-cta {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          background: linear-gradient(135deg, rgba(209,193,161,0.18), rgba(140,115,80,0.1));
          border: 1px solid rgba(209,193,161,0.38);
          border-radius: 50px;
          padding: 10px 20px;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow:
            0 0 14px rgba(209,193,161,0.08),
            inset 0 1px 0 rgba(240,230,210,0.1);
          transition: all 0.35s;
        }
        .re-cta:hover {
          color: var(--gold-lt);
          background: linear-gradient(135deg, rgba(209,193,161,0.3), rgba(168,143,105,0.2));
          box-shadow: 0 0 28px rgba(209,193,161,0.2), inset 0 1px 0 rgba(240,230,210,0.15);
          border-color: rgba(209,193,161,0.6);
        }

        /* Phone link */
        .re-phone-link {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.3s;
        }
        .re-phone-link:hover { color: var(--gold-lt); }

        /* Outer glow pulse */
        @keyframes reGoldPulse {
          0%,100% {
            box-shadow:
              0 0 0 1px rgba(209,193,161,0.22),
              0 16px 56px rgba(0,0,0,0.7),
              0 2px 0 rgba(209,193,161,0.04) inset;
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(209,193,161,0.38),
              0 16px 56px rgba(0,0,0,0.7),
              0 0 32px rgba(209,193,161,0.07),
              0 2px 0 rgba(209,193,161,0.12) inset;
          }
        }

        /* Mobile drawer link */
        .re-drawer-link {
          font-family: 'Cinzel', serif;
          font-size: 1.6rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: color 0.3s;
        }
        .re-drawer-link:hover { color: var(--gold-lt); }

        /* Burger lines */
        .re-burger-line {
          display: block;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), rgba(209,193,161,0.3));
          transition: transform 0.4s cubic-bezier(0.77,0,0.175,1), opacity 0.3s, width 0.3s;
        }

        /* Responsive hide */
        @media (max-width: 900px) { .re-desktop-only { display: none !important; } }
        @media (min-width: 901px) { .re-mobile-only  { display: none !important; } }
      `}</style>

      {/* ─────────── HEADER SHELL ─────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '12px 24px' : '20px 24px',
          transition: 'padding 0.5s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }}
      >
        {/* ── Floating pill container ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            height: scrolled ? '56px' : '64px',
            maxWidth: '1100px',
            width: '100%',
            position: 'relative',
            pointerEvents: 'all',
            transition: 'height 0.5s cubic-bezier(0.16,1,0.3,1)',

            /* Dark glass body */
            background: 'linear-gradient(135deg, rgba(21,35,28,0.97) 0%, rgba(17,29,23,0.99) 100%)',
            borderRadius: '60px',
            padding: '0 10px',

            /* Layered gold border via outline trick */
            outline: '1px solid transparent',
            backgroundClip: 'padding-box',

            /* Animation */
            animation: 'reGoldPulse 5s ease-in-out infinite',
          }}
        >
          {/* Gold gradient border via pseudo-like absolute layer */}
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: '-1px',
              borderRadius: '61px',
              background: 'linear-gradient(135deg, rgba(209,193,161,0.55) 0%, rgba(168,143,105,0.12) 35%, rgba(209,193,161,0.06) 65%, rgba(229,216,190,0.48) 100%)',
              zIndex: -1,
            }}
          />

          {/* ── LOGO ── */}
          <Link
            href="/"
            style={{
              flexShrink: 0,
              padding: '0 24px 0 22px',
              borderRight: '1px solid rgba(209,193,161,0.18)',
              marginRight: '6px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="/images/regal_empirus/Asset 1.png"
              alt="Regal Empirus"
              style={{ height: '36px', width: 'auto', display: 'block' }}
            />
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <div
            className="re-desktop-only"
            ref={linksRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              gap: '2px',
              position: 'relative',
            }}
          >
            {/* Sliding active pill */}
            <div
              className="re-active-pill"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />

            {NAV.map(n => {
              const id = n.href.slice(1);
              const isActive = active === id;
              return (
                <Link
                  key={id}
                  href={n.href}
                  ref={isActive ? (el) => { activeRef.current = el; } : undefined}
                  className={`re-nav-link${isActive ? ' re-nav-active' : ''}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>

          {/* ── DESKTOP RIGHT ── */}
          <div
            className="re-desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '0 10px 0 18px',
              borderLeft: '1px solid rgba(209,193,161,0.18)',
              marginLeft: '6px',
            }}
          >
            <a href="tel:+917789000077" className="re-phone-link">
              +91 77890 00077
            </a>
            <a href="#contact" className="re-cta">
              <span>Investment Inquiry</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* ── MOBILE: logo text + burger ── */}
          <div
            className="re-mobile-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
              padding: '0 14px 0 4px',
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '13px',
                letterSpacing: '0.22em',
                color: '#fff',
                opacity: 0.95,
                fontWeight: 600,
              }}
            >
              REGAL EMPIRUS
            </span>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: '5px',
                padding: '4px',
              }}
            >
              {[
                { w: '22px', open_t: 'rotate(45deg) translate(4.5px, 4.5px)' },
                { w: '14px', open_t: undefined, hide: true },
                { w: '22px', open_t: 'rotate(-45deg) translate(4.5px, -4.5px)' },
              ].map((bar, i) => (
                <span
                  key={i}
                  className="re-burger-line"
                  style={{
                    width: bar.w,
                    transform: open && bar.open_t ? bar.open_t : 'none',
                    opacity: open && bar.hide ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ─────────── MOBILE DRAWER ─────────── */}
      <div
        className="re-mobile-only"
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'linear-gradient(160deg, rgba(21,35,28,0.99) 0%, rgba(17,29,23,1) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.2rem',
          opacity: open ? 1 : 0,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Decorative glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '300px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(209,193,161,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Thin top border line */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: '10%', right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(209,193,161,0.4), transparent)',
        }} />

        {/* Logo mark */}
        <div style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '11px', letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
        }}>
          Regal Empirus
        </div>

        {NAV.map((n, i) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className="re-drawer-link"
            style={{
              transitionProperty: 'opacity, transform, color',
              transitionDuration: '0.4s, 0.4s, 0.3s',
              transitionDelay: open ? `${i * 0.06}s, ${i * 0.06}s, 0s` : '0s, 0s, 0s',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
            }}
          >
            {n.label}
          </Link>
        ))}

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <a href="tel:+917789000077" style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '13px', letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            transition: 'color 0.3s',
          }}>
            +91 77890 00077
          </a>
          <a href="#contact" className="re-cta" onClick={() => setOpen(false)}>
            Investment Inquiry
          </a>
        </div>

        {/* Bottom thin line */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: '10%', right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(209,193,161,0.3), transparent)',
        }} />
      </div>
    </>
  );
};