'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { LuxuryGoldBackground } from './LuxuryGoldBackground';

/* ─── Gallery Data ───────────────────────────────────────────── */
const AMENITY_IMAGES = [
    "1_Five_Star_Club_House.jpg.jpeg",
    "2_Swimming_Pool_with_Kids_Splash_Pool.jpg.jpeg",
    "3_Cafeteria.jpg.jpeg",
    "4_Fully_Equipped_Gym.jpg.jpeg",
    "5_Banquet_Hall.jpg.jpeg",
    "6_Kids_Play_Area.jpg.jpeg",
    "7_Library.jpg.jpeg",
    "8_Basement_Parking.jpg.jpeg",
    "9_Stilt_Parking.jpg.jpeg",
    "10_Surface_Parking.jpg.jpeg",
];

/* ─── Amenity metadata with categories ─────────────────────── */
const AMENITIES: { label: string; category: string; tag: string }[] = [
    { label: 'Five Star Club House', category: 'Social', tag: 'Premium Lifestyle' },
    { label: 'Swimming Pool with Kids Splash Pool', category: 'Recreation', tag: 'All Ages' },
    { label: 'Cafeteria', category: 'Social', tag: 'Fine Dining' },
    { label: 'Fully Equipped Gym', category: 'Wellness', tag: 'State of the Art' },
    { label: 'Banquet Hall', category: 'Events', tag: 'Grand Celebrations' },
    { label: 'Kids Play Area', category: 'Kids', tag: 'Safe & Fun' },
    { label: 'Library', category: 'Leisure', tag: 'Quiet Reading' },
    { label: 'Basement Parking', category: 'Parking', tag: 'Secure Access' },
    { label: 'Stilt Parking', category: 'Parking', tag: 'Covered Shelter' },
    { label: 'Surface Parking', category: 'Parking', tag: 'Open Air' },
];

const CATEGORIES = ['All', 'Social', 'Recreation', 'Wellness', 'Events', 'Kids', 'Leisure', 'Parking'];

const CATEGORY_ICONS: Record<string, string> = {
    All: '✦', Social: '◉', Recreation: '◈', Wellness: '◎',
    Events: '◑', Kids: '◔', Leisure: '◒', Parking: '◐',
};

const categoryColor: Record<string, string> = {
    Social: '#c8a07e', Recreation: '#a0b4d4', Wellness: '#7eb8a0',
    Events: '#a08ab4', Kids: '#d4b07a', Leisure: '#8ab0a0',
    Parking: '#9098c0',
};

/* ─── Custom Cursor (Desktop Only) ───────────────────────────── */
const MagneticCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 120, damping: 20 });
    const springY = useSpring(y, { stiffness: 120, damping: 20 });

    useEffect(() => {
        // Detect touch device and skip cursor
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouch(true);
            return;
        }
        const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
        const enter = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (el.closest('[data-cursor="expand"]')) setIsHovering(true);
        };
        const leave = () => setIsHovering(false);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseover', enter);
        window.addEventListener('mouseout', leave);
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseover', enter);
            window.removeEventListener('mouseout', leave);
        };
    }, []);

    if (isTouch) return null;

    return (
        <motion.div
            style={{
                position: 'fixed', top: 0, left: 0, pointerEvents: 'none',
                zIndex: 99999, x: springX, y: springY,
                translateX: '-50%', translateY: '-50%',
            }}
        >
            <motion.div
                animate={{ scale: isHovering ? 2.8 : 1, opacity: isHovering ? 0.15 : 0.5 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                style={{
                    width: 16, height: 16, borderRadius: '50%',
                    background: 'var(--gold)',
                    mixBlendMode: 'difference',
                }}
            />
        </motion.div>
    );
};

/* ─── useIsMobile hook ───────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
}

/* ─── Component ──────────────────────────────────────────────── */
export const VisuraGallery = () => {
    const outerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [favorited, setFavorited] = useState<Set<number>>(new Set());
    const [lightbox, setLightbox] = useState<{
        active: boolean; url: string; index: number; zoomed: boolean;
    }>({ active: false, url: '', index: 0, zoomed: false });

    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragScrollStart = useRef(0);
    const currentTranslate = useRef(0);

    const isMobile = useIsMobile();

    const filteredIndices = AMENITIES
        .map((a, i) => ({ ...a, origIdx: i }))
        .filter(a => activeCategory === 'All' || a.category === activeCategory);

    /* ── Scroll-driven horizontal movement (DESKTOP ONLY) ── */
    useEffect(() => {
        if (isMobile) return;
        const handleScroll = () => {
            if (!outerRef.current || !trackRef.current) return;
            const outer = outerRef.current;
            const rect = outer.getBoundingClientRect();
            const outerHeight = outer.offsetHeight;
            const windowH = window.innerHeight;
            const scrollableDistance = outerHeight - windowH;
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1);
            setScrollProgress(progress);
            const trackWidth = trackRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxTranslate = trackWidth - viewportWidth;
            currentTranslate.current = -progress * maxTranslate;
            trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeCategory, isMobile]);

    /* ── Drag support (DESKTOP ONLY) ── */
    const handleDragStart = (e: React.MouseEvent) => {
        if (isMobile) return;
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragScrollStart.current = currentTranslate.current;
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    };

    const handleDragMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current || !trackRef.current) return;
        const dx = e.clientX - dragStartX.current;
        const trackWidth = trackRef.current.scrollWidth;
        const max = -(trackWidth - window.innerWidth);
        const newT = Math.min(0, Math.max(max, dragScrollStart.current + dx));
        currentTranslate.current = newT;
        trackRef.current.style.transform = `translateX(${newT}px)`;
    }, []);

    const handleDragEnd = useCallback(() => {
        isDragging.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, []);

    useEffect(() => {
        if (isMobile) return;
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
        };
    }, [handleDragMove, handleDragEnd, isMobile]);

    /* ── Touch swipe (DESKTOP horizontal mode only) ── */
    const touchStartX = useRef(0);
    const touchStartT = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isMobile) return;
        touchStartX.current = e.touches[0].clientX;
        touchStartT.current = currentTranslate.current;
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (isMobile || !trackRef.current) return;
        const dx = e.touches[0].clientX - touchStartX.current;
        const trackWidth = trackRef.current.scrollWidth;
        const max = -(trackWidth - window.innerWidth);
        const newT = Math.min(0, Math.max(max, touchStartT.current + dx));
        currentTranslate.current = newT;
        trackRef.current.style.transform = `translateX(${newT}px)`;
    };

    /* ── Lightbox navigation ── */
    const navigateLightbox = useCallback((dir: number) => {
        const list = filteredIndices;
        const curPos = list.findIndex(a => a.origIdx === lightbox.index);
        const nextPos = (curPos + dir + list.length) % list.length;
        const next = list[nextPos];
        setLightbox(lb => ({
            ...lb,
            url: `/pictures/${AMENITY_IMAGES[next.origIdx]}`,
            index: next.origIdx,
            zoomed: false,
        }));
    }, [lightbox.index, filteredIndices]);

    /* ── Keyboard events ── */
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightbox.active) return;
            if (e.key === 'Escape') setLightbox(lb => ({ ...lb, active: false, zoomed: false }));
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'z' || e.key === 'Z') setLightbox(lb => ({ ...lb, zoomed: !lb.zoomed }));
            if (e.key === 'f' || e.key === 'F') toggleFav(lightbox.index);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox, navigateLightbox]);

    const openLightbox = (origIdx: number) => {
        setLightbox({ active: true, url: `/pictures/${AMENITY_IMAGES[origIdx]}`, index: origIdx, zoomed: false });
    };

    const toggleFav = (idx: number) => {
        setFavorited(prev => {
            const next = new Set(prev);
            next.has(idx) ? next.delete(idx) : next.add(idx);
            return next;
        });
    };

    /* ── Size patterns (Desktop) ── */
    const sizes = [
        { w: '260px', h: '360px', imgH: '200px', radius: '20px 8px 20px 8px' },
        { w: '290px', h: '400px', imgH: '240px', radius: '24px 14px' },
        { w: '270px', h: '370px', imgH: '210px', radius: '12px 28px 12px 28px' },
        { w: '280px', h: '390px', imgH: '230px', radius: '22px' },
        { w: '250px', h: '350px', imgH: '190px', radius: '28px 10px' },
    ];

    /* ─────────── RENDER ─────────── */
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        #amenities {
          --gold: #c9a96e;
          --gold-lt: #e2c99a;
          --gold-glow: rgba(201,169,110,0.4);
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'DM Sans', sans-serif;
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .gallery-card {
          transition: box-shadow 0.5s ease;
        }
        .gallery-card:hover {
          box-shadow: 0 28px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,169,110,0.2);
        }

        .cat-pill {
          cursor: pointer;
          border: 1px solid rgba(201,169,110,0.25);
          background: transparent;
          color: rgba(255,255,255,0.4);
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          transition: all 0.3s ease;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cat-pill::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.08), transparent);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cat-pill:hover::before { opacity: 1; animation: shimmer 1.2s infinite; }
        .cat-pill.active {
          background: #c9a96e;
          border-color: #c9a96e;
          color: #1e2022;
        }
        .cat-pill:hover:not(.active) { color: #e2c99a; border-color: rgba(201,169,110,0.5); }

        .fav-btn {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          transition: all 0.3s ease;
          position: absolute; top: 14px; right: 14px; z-index: 10;
        }
        .fav-btn:hover {
          border-color: rgba(255,100,100,0.5);
          background: rgba(255,80,80,0.15);
          transform: scale(1.1);
        }
        .fav-btn.active {
          background: rgba(220,60,60,0.3);
          border-color: rgba(220,60,60,0.5);
        }

        .thumb-strip {
          display: flex; gap: 8px; overflow-x: auto; padding: 0 1rem;
          scrollbar-width: none;
        }
        .thumb-strip::-webkit-scrollbar { display: none; }
        .thumb-item {
          width: 56px; height: 38px; flex-shrink: 0; border-radius: 5px;
          overflow: hidden; cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.25s ease; opacity: 0.5;
        }
        .thumb-item:hover { opacity: 0.8; }
        .thumb-item.active { border-color: #c9a96e; opacity: 1; }
        .thumb-item img { width: 100%; height: 100%; object-fit: cover; }

        .kbd-hint {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.25); text-transform: uppercase;
          display: flex; gap: 16px; align-items: center;
        }
        kbd {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px; padding: 2px 6px;
          font-family: 'DM Sans', sans-serif; font-size: 10px;
        }

        /* ── Category pills scroll container on mobile ── */
        .cat-pills-scroll {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 480px;
          justify-content: flex-end;
        }
        @media (max-width: 767px) {
          .cat-pills-scroll {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            max-width: 100%;
            justify-content: flex-start;
            padding-bottom: 4px;
          }
          .cat-pills-scroll::-webkit-scrollbar { display: none; }
        }

        /* ── Mobile gallery grid ── */
        .vg-mobile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 0 1.25rem;
        }
        @media (min-width: 480px) and (max-width: 767px) {
          .vg-mobile-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        /* ── Hide kbd hints on mobile ── */
        @media (max-width: 767px) {
          .kbd-hint { display: none !important; }
          .fav-btn { width: 28px; height: 28px; font-size: 11px; top: 8px; right: 8px; }
        }

        /* ── Lightbox mobile fix ── */
        @media (max-width: 767px) {
          .lb-nav-btn {
            width: 36px !important; height: 36px !important;
            font-size: 14px !important;
          }
          .lb-topbar { padding: 0.8rem 1rem !important; }
          .lb-topbar-title { font-size: 0.95rem !important; }
          .lb-topbar-cat { display: none !important; }
          .lb-topbar-actions button { padding: 5px 10px !important; font-size: 10px !important; }
          .thumb-strip { padding: 0 0.75rem; }
          .thumb-item { width: 44px; height: 30px; }
        }
      `}</style>

            <MagneticCursor />

            {/* ── MOBILE LAYOUT ── */}
            {isMobile ? (
                <div id="amenities" style={{ padding: '3rem 0 6rem', position: 'relative' }}>
                    <LuxuryGoldBackground />

                    {/* Header */}
                    <div style={{ padding: '4rem 1.25rem 1.5rem', position: 'relative', zIndex: 4 }}>
                        {/* Eyebrow */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span style={{
                                fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500,
                                letterSpacing: '0.44em', textTransform: 'uppercase',
                                color: 'var(--gold)', opacity: 0.8,
                            }}>
                                ✦ &nbsp; Curated Sanctuary &nbsp; ✦
                            </span>
                        </div>

                        <h2 style={{
                            fontFamily: 'var(--font-serif)', fontWeight: 300,
                            fontSize: 'clamp(1.8rem, 7vw, 2.8rem)',
                            color: '#ffffff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em',
                        }}>
                            Let our experience
                            <br />
                            <em style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>
                                speak for us
                            </em>
                        </h2>

                        {/* Stat strip */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontFamily: 'var(--font-sans)' }}>
                            {[['10+', 'Amenities'], ['5⭑', 'Lifestyle'], ['∞', 'Experiences']].map(([val, lbl]) => (
                                <div key={lbl}>
                                    <div style={{ fontSize: '18px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{val}</div>
                                    <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '2px' }}>{lbl}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter Pills — scrollable row */}
                    <div style={{ padding: '0 1.25rem', marginBottom: '1rem', position: 'relative', zIndex: 4 }}>
                        <div className="cat-pills-scroll">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`cat-pill${activeCategory === cat ? ' active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    <span style={{ marginRight: '5px', opacity: 0.7 }}>{CATEGORY_ICONS[cat]}</span>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Count */}
                    <div style={{ padding: '0 1.25rem', marginBottom: '1rem', position: 'relative', zIndex: 4 }}>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={activeCategory}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                style={{
                                    fontFamily: 'var(--font-sans)', fontSize: '10px',
                                    color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase',
                                }}
                            >
                                Showing {filteredIndices.length} of {AMENITY_IMAGES.length} amenities
                                {activeCategory !== 'All' && (
                                    <> — <span style={{ color: 'var(--gold-lt)' }}>{activeCategory}</span></>
                                )}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* ── Mobile Grid ── */}
                    <div className="vg-mobile-grid" style={{ position: 'relative', zIndex: 4 }}>
                        <AnimatePresence mode="popLayout">
                            {filteredIndices.map((amenity, displayIdx) => {
                                const { origIdx, label, category, tag } = amenity;
                                const imgUrl = `/pictures/${AMENITY_IMAGES[origIdx]}`;
                                const catColor = categoryColor[category] || 'var(--gold)';
                                const isFav = favorited.has(origIdx);

                                return (
                                    <motion.div
                                        key={origIdx}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: displayIdx * 0.03 }}
                                        className="gallery-card"
                                        style={{
                                            background: 'rgba(25,28,30,0.85)',
                                            borderRadius: '14px', overflow: 'hidden',
                                            position: 'relative',
                                            border: '1px solid rgba(212,175,55,0.15)',
                                            boxShadow: '0 0 40px rgba(212,175,55,0.04) inset',
                                        }}
                                    >
                                        {/* Category colour accent bar */}
                                        <div style={{
                                            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                            background: catColor, opacity: 0.5, zIndex: 10,
                                        }} />

                                        {/* Favourite button */}
                                        <button
                                            className={`fav-btn${isFav ? ' active' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); toggleFav(origIdx); }}
                                        >
                                            {isFav ? '♥' : '♡'}
                                        </button>

                                        {/* Image */}
                                        <div
                                            onClick={() => openLightbox(origIdx)}
                                            style={{
                                                width: '100%', aspectRatio: '4/3', overflow: 'hidden',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={label}
                                                draggable={false}
                                                style={{
                                                    width: '100%', height: '100%', objectFit: 'cover',
                                                    display: 'block',
                                                }}
                                            />
                                        </div>

                                        {/* Card bottom content */}
                                        <div style={{ padding: '8px 10px 10px' }}>
                                            <p style={{
                                                fontFamily: 'var(--font-sans)', fontSize: '14px',
                                                fontWeight: 400, color: 'rgba(255,255,255,0.85)',
                                                letterSpacing: '0.03em', margin: '0 0 4px',
                                                lineHeight: 1.3,
                                            }}>
                                                {label}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    fontFamily: 'var(--font-sans)', fontSize: '10px',
                                                    letterSpacing: '0.12em', color: catColor,
                                                    textTransform: 'uppercase', fontWeight: 500,
                                                    background: `${catColor}18`, padding: '2px 6px',
                                                    borderRadius: '20px', border: `1px solid ${catColor}30`,
                                                }}>
                                                    {tag}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filteredIndices.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{
                                    gridColumn: '1 / -1', textAlign: 'center',
                                    fontFamily: 'var(--font-serif)', color: 'rgba(255,255,255,0.45)',
                                    fontSize: '1.4rem', fontWeight: 300, fontStyle: 'italic', padding: '3rem 0',
                                }}
                            >
                                No amenities in this category
                            </motion.div>
                        )}
                    </div>

                    {/* Saved count */}
                    {favorited.size > 0 && (
                        <div style={{
                            textAlign: 'center', padding: '1rem 1.25rem 0',
                            fontFamily: 'var(--font-sans)', fontSize: '10px',
                            letterSpacing: '0.18em', color: 'rgba(220,100,100,0.85)', textTransform: 'uppercase',
                        }}>
                            ♥ {favorited.size} saved
                        </div>
                    )}
                </div >
            ) : (
                /* ── DESKTOP LAYOUT (original horizontal scroll) ── */
                <div
                    ref={outerRef}
                    id="amenities"
                    style={{ height: '380vh', position: 'relative', background: '#1e2022' }}
                >
                    {/* ── Sticky viewport ── */}
                    <div style={{
                        position: 'sticky', top: 0, height: '100vh',
                        overflow: 'hidden', display: 'grid',
                        gridTemplateRows: 'auto 1fr auto', // Header / Track / Footer
                    }}>
                        <LuxuryGoldBackground />
                        {/* Ambient BG */}
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                            background: `
                                radial-gradient(ellipse 80% 50% at 20% 30%, rgba(201,169,110,0.06) 0%, transparent 60%),
                                radial-gradient(ellipse 60% 40% at 80% 70%, rgba(100,120,160,0.05) 0%, transparent 60%),
                                linear-gradient(180deg, #1e2022 50%, #2a2d2f 50%)
                            `,
                        }} />

                        {/* Decorative vertical rule */}
                        <div style={{
                            position: 'absolute', left: '1.5rem', top: '10%', bottom: '10%',
                            width: '1px',
                            background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.3) 40%, rgba(201,169,110,0.3) 60%, transparent)',
                            zIndex: 3,
                        }} />

                        {/* Header + Info Block */}
                        <div style={{ position: 'relative', zIndex: 4 }}>
                            {/* ── Header Block ── */}
                            <div style={{
                                padding: '2.5rem 3.5rem 1rem 4rem', // Further reduced padding
                                display: 'flex', alignItems: 'flex-end',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap', gap: '1rem',
                            }}>
                                <div>
                                    {/* Eyebrow */}
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <span style={{
                                            fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 500,
                                            letterSpacing: '0.44em', textTransform: 'uppercase',
                                            color: 'var(--gold)', opacity: 0.8,
                                        }}>
                                            ✦ &nbsp; Curated Sanctuary &nbsp; ✦
                                        </span>
                                    </div>

                                    <h2 style={{
                                        fontFamily: 'var(--font-serif)', fontWeight: 300,
                                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                        color: '#ffffff', margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em',
                                    }}>
                                        Let our experience
                                        <br />
                                        <em style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 400 }}>
                                            speak for us
                                        </em>
                                    </h2>

                                    {/* Stat strip */}
                                    <div style={{ display: 'flex', gap: '2rem', marginTop: '1.25rem', fontFamily: 'var(--font-sans)' }}>
                                        {[['10+', 'Amenities'], ['5⭑', 'Lifestyle'], ['∞', 'Experiences']].map(([val, lbl]) => (
                                            <div key={lbl}>
                                                <div style={{ fontSize: '20px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>{val}</div>
                                                <div style={{ fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: '2px' }}>{lbl}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Category Filter Pills ── */}
                                <div className="cat-pills-scroll">
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat}
                                            className={`cat-pill${activeCategory === cat ? ' active' : ''}`}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            <span style={{ marginRight: '5px', opacity: 0.7 }}>{CATEGORY_ICONS[cat]}</span>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Count badge */}
                            <div style={{ padding: '0 3.5rem 0.5rem 4rem' }}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={activeCategory}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        style={{
                                            fontFamily: 'var(--font-sans)', fontSize: '10px',
                                            color: 'rgba(255,255,255,0.55)', letterSpacing: '0.2em', textTransform: 'uppercase',
                                        }}
                                    >
                                        Showing {filteredIndices.length} of {AMENITY_IMAGES.length} amenities
                                        {activeCategory !== 'All' && (
                                            <> — <span style={{ color: 'var(--gold-lt)' }}>{activeCategory}</span></>
                                        )}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* ── Horizontal Cards Track ── */}
                        <div
                            ref={trackRef}
                            data-cursor="expand"
                            onMouseDown={handleDragStart}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            style={{
                                display: 'flex', gap: '20px',
                                paddingLeft: '4rem', paddingRight: '4rem',
                                width: 'max-content', willChange: 'transform',
                                alignItems: 'center', position: 'relative', zIndex: 4,
                                cursor: 'grab', userSelect: 'none',
                                overflow: 'visible',
                            }}
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredIndices.map((amenity, displayIdx) => {
                                    const { origIdx, label, category, tag } = amenity;
                                    const imgUrl = `/pictures/${AMENITY_IMAGES[origIdx]}`;
                                    const s = sizes[origIdx % 5];
                                    const floatDelay = (origIdx * 0.35) % 2.5;
                                    const floatDur = 3 + (origIdx % 3) * 0.6;
                                    const catColor = categoryColor[category] || 'var(--gold)';
                                    const isFav = favorited.has(origIdx);
                                    const isHov = hoveredIdx === origIdx;

                                    return (
                                        <motion.div
                                            key={origIdx}
                                            layout
                                            initial={{ opacity: 0, scale: 0.85, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.85, y: 20 }}
                                            transition={{ duration: 0.4, delay: displayIdx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                            className="gallery-card"
                                            onMouseEnter={() => setHoveredIdx(origIdx)}
                                            onMouseLeave={() => setHoveredIdx(null)}
                                            style={{
                                                width: s.w, height: s.h, flexShrink: 0,
                                                background: 'rgba(25,28,30,0.85)',
                                                borderRadius: s.radius, overflow: 'hidden',
                                                position: 'relative',
                                                border: '1px solid rgba(212,175,55,0.15)',
                                                boxShadow: '0 0 40px rgba(212,175,55,0.04) inset',
                                            } as React.CSSProperties}
                                        >
                                            {/* Category colour accent bar */}
                                            <div style={{
                                                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                                background: catColor, opacity: isHov ? 1 : 0.4,
                                                transition: 'opacity 0.4s ease', zIndex: 10,
                                            }} />

                                            {/* Favourite button */}
                                            <button
                                                className={`fav-btn${isFav ? ' active' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); toggleFav(origIdx); }}
                                            >
                                                {isFav ? '♥' : '♡'}
                                            </button>

                                            {/* Index tag */}
                                            <span style={{
                                                position: 'absolute', top: '12px', left: '14px', zIndex: 8,
                                                fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 500,
                                                letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)',
                                            }}>
                                                .{String(origIdx + 1).padStart(2, '0')}
                                            </span>

                                            {/* Image */}
                                            <div
                                                onClick={() => openLightbox(origIdx)}
                                                style={{
                                                    width: '100%', height: s.imgH, overflow: 'hidden',
                                                    padding: '10px', paddingTop: '32px', cursor: 'pointer',
                                                }}
                                            >
                                                <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '10px', position: 'relative' }}>
                                                    <img
                                                        src={imgUrl}
                                                        alt={label}
                                                        draggable={false}
                                                        style={{
                                                            width: '100%', height: '100%', objectFit: 'cover',
                                                            transform: isHov ? 'scale(1.07)' : 'scale(1)',
                                                            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
                                                            display: 'block',
                                                        }}
                                                    />
                                                    {/* Hover expand overlay */}
                                                    <div style={{
                                                        position: 'absolute', inset: 0,
                                                        background: 'rgba(0,0,0,0.35)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        opacity: isHov ? 1 : 0, transition: 'opacity 0.4s ease',
                                                    }}>
                                                        <div style={{
                                                            width: 40, height: 40, borderRadius: '50%',
                                                            border: '1.5px solid rgba(255,255,255,0.8)',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            color: '#fff', fontSize: 16,
                                                        }}>⤢</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card bottom content */}
                                            <div style={{ padding: '4px 14px 14px' }}>
                                                <span style={{
                                                    fontFamily: 'var(--font-serif)',
                                                    fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                                                    fontWeight: 300, color: 'rgba(255,255,255,0.07)',
                                                    lineHeight: 1, display: 'block', marginBottom: '-6px',
                                                }}>
                                                    {String(origIdx + 1).padStart(2, '0')}
                                                </span>
                                                <p style={{
                                                    fontFamily: 'var(--font-sans)', fontSize: '15px',
                                                    fontWeight: 400, color: 'rgba(255,255,255,0.85)',
                                                    letterSpacing: '0.03em', margin: '0 0 6px',
                                                }}>
                                                    {label}
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{
                                                        fontFamily: 'var(--font-sans)', fontSize: '10px',
                                                        letterSpacing: '0.12em', color: catColor,
                                                        textTransform: 'uppercase', fontWeight: 500,
                                                        background: `${catColor}18`, padding: '3px 8px',
                                                        borderRadius: '20px', border: `1px solid ${catColor}30`,
                                                    }}>
                                                        {tag}
                                                    </span>
                                                    <span style={{
                                                        fontFamily: 'var(--font-sans)', fontSize: '10px',
                                                        letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)',
                                                        textTransform: 'uppercase',
                                                    }}>
                                                        {category}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {filteredIndices.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    style={{
                                        width: '60vw', textAlign: 'center',
                                        fontFamily: 'var(--font-serif)', color: 'rgba(255,255,255,0.45)',
                                        fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', padding: '4rem 0',
                                    }}
                                >
                                    No amenities in this category
                                </motion.div>
                            )}
                        </div>

                        {/* ── Progress Bar & Bottom Strip ── */}
                        <div style={{ position: 'relative', zIndex: 5 }}>
                            {favorited.size > 0 && (
                                <div style={{
                                    textAlign: 'right', padding: '0 3.5rem 6px',
                                    fontFamily: 'var(--font-sans)', fontSize: '10px',
                                    letterSpacing: '0.18em', color: 'rgba(220,100,100,0.85)', textTransform: 'uppercase',
                                }}>
                                    ♥ {favorited.size} saved
                                </div>
                            )}

                            {/* Progress track */}
                            <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                                <div style={{
                                    height: '100%', width: `${scrollProgress * 100}%`,
                                    background: 'linear-gradient(90deg, var(--gold), var(--gold-lt))',
                                    boxShadow: '0 0 18px var(--gold-glow)',
                                    transition: 'width 0.05s linear', position: 'relative',
                                }}>
                                    <div style={{
                                        position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                                        width: 8, height: 8, borderRadius: '50%',
                                        background: 'var(--gold-lt)', boxShadow: '0 0 12px var(--gold)',
                                    }} />
                                </div>
                            </div>

                            {/* Bottom info bar */}
                            <div style={{
                                padding: '12px 3.5rem 16px 4rem',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: 'rgba(30,32,34,0.95)', backdropFilter: 'blur(10px)',
                                borderTop: '1px solid rgba(255,255,255,0.05)',
                            }}>
                                <div className="kbd-hint">
                                    <span><kbd>Drag</kbd> to explore</span>
                                    <span><kbd>↑↓</kbd> scroll</span>
                                    <span><kbd>♡</kbd> save</span>
                                </div>
                                <div className="kbd-hint" style={{ display: 'flex' }}>
                                    <span style={{ color: 'var(--gold)', opacity: 0.7 }}>{Math.round(scrollProgress * 100)}%</span>
                                    <span>—</span>
                                    <span>{filteredIndices.length} shown</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )}

            {/* ── Lightbox (shared between mobile & desktop) ── */}
            <AnimatePresence>
                {lightbox.active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 10000,
                            display: 'flex', flexDirection: 'column',
                            background: 'rgba(14,15,16,0.97)',
                            backdropFilter: 'blur(32px)',
                        }}
                    >
                        {/* Top bar */}
                        <div className="lb-topbar" style={{
                            padding: '1.4rem 2rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(0,0,0,0.3)',
                            flexWrap: 'wrap', gap: '0.5rem',
                        }}>
                            <div className="lb-topbar-title" style={{
                                fontFamily: 'var(--font-serif)', fontSize: '1.2rem',
                                color: 'rgba(255,255,255,0.7)', fontWeight: 300, fontStyle: 'italic',
                            }}>
                                {AMENITIES[lightbox.index]?.label}
                                <span className="lb-topbar-cat" style={{
                                    fontFamily: 'var(--font-sans)', fontSize: '10px',
                                    color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em',
                                    textTransform: 'uppercase', marginLeft: '14px', fontStyle: 'normal',
                                }}>
                                    {AMENITIES[lightbox.index]?.category}
                                </span>
                            </div>

                            <div className="lb-topbar-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {/* Close */}
                                <button
                                    onClick={() => setLightbox(lb => ({ ...lb, active: false, zoomed: false }))}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '6px', color: 'rgba(255,255,255,0.4)',
                                        fontFamily: 'var(--font-sans)', fontSize: '9px',
                                        letterSpacing: '0.16em', textTransform: 'uppercase',
                                        padding: '7px 16px', cursor: 'pointer',
                                    }}
                                >
                                    ✕ Close
                                </button>
                            </div>
                        </div>

                        {/* Main image */}
                        <div style={{
                            flex: 1, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', position: 'relative', overflow: 'hidden',
                        }}>
                            <button
                                className="lb-nav-btn"
                                onClick={() => navigateLightbox(-1)}
                                style={{
                                    position: 'absolute', left: isMobile ? '0.5rem' : '2rem', zIndex: 10,
                                    width: 52, height: 52, borderRadius: '50%',
                                    border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)',
                                    color: '#fff', fontSize: 20, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                ←
                            </button>

                            <motion.img
                                key={lightbox.url}
                                initial={{ scale: 0.88, opacity: 0, filter: 'blur(10px)' }}
                                animate={{ scale: lightbox.zoomed ? 1.6 : 1, opacity: 1, filter: 'blur(0px)' }}
                                exit={{ scale: 1.06, opacity: 0, filter: 'blur(8px)' }}
                                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                src={lightbox.url}
                                alt=""
                                style={{
                                    maxHeight: isMobile ? '60vh' : '72vh',
                                    maxWidth: isMobile ? '90vw' : '80vw',
                                    objectFit: 'contain', borderRadius: '6px',
                                    cursor: lightbox.zoomed ? 'zoom-out' : 'zoom-in',
                                    boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
                                }}
                                onClick={() => setLightbox(lb => ({ ...lb, zoomed: !lb.zoomed }))}
                            />

                            <button
                                className="lb-nav-btn"
                                onClick={() => navigateLightbox(1)}
                                style={{
                                    position: 'absolute', right: isMobile ? '0.5rem' : '2rem', zIndex: 10,
                                    width: 52, height: 52, borderRadius: '50%',
                                    border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)',
                                    color: '#fff', fontSize: 20, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                →
                            </button>
                        </div>

                        {/* Bottom: thumbnails + meta */}
                        <div style={{
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            paddingTop: '10px', paddingBottom: '12px',
                            background: 'rgba(0,0,0,0.3)',
                        }}>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0 1rem 8px',
                            }}>
                                <div className="kbd-hint">
                                    <span><kbd>←</kbd><kbd>→</kbd> navigate</span>
                                    <span><kbd>Esc</kbd> close</span>
                                </div>
                                <div style={{
                                    fontFamily: 'var(--font-sans)', fontSize: '9px',
                                    color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase',
                                }}>
                                    <span style={{ color: 'var(--gold)' }}>{lightbox.index + 1}</span>
                                    &nbsp;/&nbsp;{AMENITY_IMAGES.length}
                                </div>
                            </div>

                            <div className="thumb-strip">
                                {AMENITY_IMAGES.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`thumb-item${idx === lightbox.index ? ' active' : ''}`}
                                        onClick={() => setLightbox(lb => ({
                                            ...lb, url: `/pictures/${img}`, index: idx, zoomed: false,
                                        }))}
                                    >
                                        <img src={`/pictures/${img}`} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};