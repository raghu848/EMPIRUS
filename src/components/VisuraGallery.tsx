'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ["ARCHITECTURE", "LANDSCAPE", "MINIMALIST", "URBAN", "ABSTRACT"];

interface TrackItem {
    el: HTMLDivElement | null;
    speed: number;
    pos: number;
    items: number;
    isHovered: boolean;
    momentum: number;
}

const AMENITY_IMAGES = [
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_13.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_14.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_17.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_18.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_19.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_20.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_22.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_23.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_24.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_25.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_26.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_27.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_29.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_31.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_33.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_35.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_36.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_37.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_38.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_39.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_40.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_42.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_43.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_44.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_45.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_46.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_6.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_8.jpg",
    "1773376444347-7fb8d954-7026-4359-a76b-393af27b675e_9.jpg",
];

export const VisuraGallery = () => {
    const [imagesViewed, setImagesViewed] = useState(0);
    const [scrollPerc, setScrollPerc] = useState(0);
    const [dragStatus, setDragStatus] = useState('AUTO-SCROLL');
    const [lightbox, setLightbox] = useState<{ active: boolean; url: string; index: number }>({
        active: false,
        url: '',
        index: 0
    });

    const [isMobile, setIsMobile] = useState(false);

    const tracksRef = useRef<TrackItem[]>([
        { el: null, speed: -0.6, pos: 0, items: 12, isHovered: false, momentum: 0 },
        { el: null, speed: 1.2, pos: 0, items: 12, isHovered: false, momentum: 0 }
    ]);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Calibrate speeds for mobile
            if (mobile) {
                tracksRef.current[0].speed = -0.4;
                tracksRef.current[1].speed = 0.5; // Significantly slower on mobile
            } else {
                tracksRef.current[0].speed = -0.6;
                tracksRef.current[1].speed = 1.2;
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const activeTrackIdx = useRef<number | null>(null);
    const startX = useRef(0);
    const currentX = useRef(0);
    const dragStartTime = useRef(0);
    const [collection, setCollection] = useState<string[]>([]);

    useEffect(() => {
        // Initialize collection with local images
        const newCollection: string[] = AMENITY_IMAGES.map(img => `/Amenities/${img}`);
        setCollection(newCollection);

        // Animation Loop
        let rafId: number;
        const friction = 0.94; // Smoother deceleration

        const update = () => {
            tracksRef.current.forEach((track, idx) => {
                if (!track.el) return;

                if (!track.isHovered && (!isDragging || activeTrackIdx.current !== idx)) {
                    track.pos += track.speed;
                }

                if (track.momentum) {
                    track.pos += track.momentum;
                    track.momentum *= friction;
                    if (Math.abs(track.momentum) < 0.05) track.momentum = 0;
                }

                const trackWidth = track.el.scrollWidth / 2;
                if (track.pos <= -trackWidth) track.pos = 0;
                if (track.pos > 0) track.pos = -trackWidth;

                track.el.style.transform = `translate3d(${track.pos}px, 0, 0)`; // Use translate3d for better perf
            });

            // Update scroll percentage relative to the gallery container
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const totalHeight = containerRef.current.scrollHeight;
                const visibleY = Math.min(Math.max(-rect.top, 0), totalHeight);
                setScrollPerc(Math.round((visibleY / totalHeight) * 100));
            }

            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(rafId);
    }, [isDragging]);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, idx: number) => {
        setIsDragging(true);
        activeTrackIdx.current = idx;
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        startX.current = x;
        currentX.current = x;
        dragStartTime.current = Date.now();
        tracksRef.current[idx].momentum = 0;
        setDragStatus(`DRAGGING ROW ${idx + 1}`);
    };

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging || activeTrackIdx.current === null) return;
            const x = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
            const dist = x - currentX.current;
            tracksRef.current[activeTrackIdx.current].pos += dist;
            currentX.current = x;
        };

        const handleEnd = (e: MouseEvent | TouchEvent) => {
            if (!isDragging || activeTrackIdx.current === null) return;
            const duration = Date.now() - dragStartTime.current;
            if (duration < 10) return; // Prevent jitter on clicks

            const x = 'changedTouches' in e ? (e as TouchEvent).changedTouches[0].clientX : (e as MouseEvent).clientX;
            const dist = x - startX.current;

            tracksRef.current[activeTrackIdx.current].momentum = dist / (duration / 16);

            setIsDragging(false);
            activeTrackIdx.current = null;
            setDragStatus('AUTO-SCROLL');
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMove, { passive: true });
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove, { passive: true });
            window.addEventListener('touchend', handleEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);

    const openLightbox = (url: string, index: number) => {
        setLightbox({ active: true, url, index });
        setImagesViewed(prev => prev + 1);
    };

    const navigateLightbox = (dir: number) => {
        const nextIdx = (lightbox.index + dir + collection.length) % collection.length;
        setLightbox({ ...lightbox, url: collection[nextIdx], index: nextIdx });
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox({ ...lightbox, active: false });
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
        };
        if (lightbox.active) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightbox]);

    return (
        <section
            id="visura-gallery"
            ref={containerRef}
            className="relative py-8 md:py-12 overflow-hidden bg-[#0A0A0F]"
            style={{ fontFamily: "'Space Mono', monospace" }}
        >
            {/* Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

            <div className="absolute inset-0 pointer-events-none opacity-5 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_20%_30%,#ff3c0033,transparent_40%),radial-gradient(circle_at_80%_70%,#00ffff11,transparent_40%)]" />

            <div className="container mx-auto px-4 md:px-6 mb-8 flex justify-between items-end relative z-10">
                <div>
                    <span className="text-[#ff3c00] text-[8px] md:text-[9px] tracking-[0.4em] uppercase mb-1 block">Curated Sanctuary</span>
                    <h2 className="text-3xl md:text-4xl text-white font-['Bebas_Neue'] leading-none uppercase">The Podium Life</h2>
                </div>
                <div className="text-[8px] md:text-[9px] text-white/50 flex gap-4 uppercase">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#ff3c00] rounded-full animate-pulse" />
                        LIVE VIEWS: {String(imagesViewed).padStart(4, '0')}
                    </div>
                </div>
            </div>

            {[0, 1].map((rowIndex) => (
                <div key={rowIndex} className="mb-6 md:mb-8 group last:mb-0">
                    <div className="container mx-auto px-4 md:px-6 mb-2 md:mb-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <span className="text-[9px] md:text-[10px] uppercase text-white/30 tracking-widest">
                            {rowIndex === 0 ? 'Elevated' : 'Lifestyle'} Perspectives
                        </span>
                        <div className="w-12 md:w-16 h-[1px] bg-[#ff3c00]/20" />
                    </div>

                    <div
                        className="track-wrapper cursor-grab active:cursor-grabbing overflow-hidden"
                        onMouseDown={(e) => handleDragStart(e, rowIndex)}
                        onTouchStart={(e) => handleDragStart(e, rowIndex)}
                        onMouseEnter={() => { tracksRef.current[rowIndex].isHovered = true; }}
                        onMouseLeave={() => { tracksRef.current[rowIndex].isHovered = false; }}
                    >
                        <div
                            ref={(el) => { tracksRef.current[rowIndex].el = el; }}
                            className="flex gap-3 md:gap-4 px-4 md:px-6 w-max will-change-transform"
                        >
                            {/* Original 12 + Duplicate 12 for infinite */}
                            {[...Array(24)].map((_, i) => {
                                const realIdx = i % 12;
                                const imgIdx = (rowIndex * 12 + realIdx) % AMENITY_IMAGES.length;
                                const imgUrl = `/Amenities/${AMENITY_IMAGES[imgIdx]}`;
                                return (
                                    <div
                                        key={i}
                                        className="relative w-[220px] md:w-[280px] h-[300px] md:h-[360px] rounded-sm overflow-hidden flex-shrink-0 group/card transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] z-10 hover:z-20"
                                        onClick={() => openLightbox(imgUrl, imgIdx)}
                                    >
                                        <img src={imgUrl} alt="" className="w-full h-full object-cover grayscale-[0.3] transition-all duration-1000 group-hover/card:scale-105 group-hover/card:grayscale-0 pointer-events-none" draggable="false" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex flex-col justify-end p-4 md:p-6 pointer-events-none translate-y-2 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-700">
                                            <span className="text-[#ff3c00] text-[8px] md:text-[9px] mb-1">AMENITY // 0{imgIdx + 1}</span>
                                            <h3 className="text-white font-['Bebas_Neue'] text-xl md:text-2xl uppercase">Project Perspective</h3>
                                            <div className="mt-2 md:mt-3 py-1.5 border border-white/10 text-center text-[8px] md:text-[9px] tracking-widest text-white/40 backdrop-blur-sm group-hover/card:border-white/30 transition-colors">EXPLORE</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}

            {/* Bottom Stats Bar (Gallery specific) */}
            <div className="mt-20 border-t border-white/10 pt-10 pb-4 container mx-auto px-6 flex justify-between items-center text-[9px] text-white/30 tracking-[0.2em] uppercase">
                <div className="flex gap-10">
                    <div className="flex gap-3">
                        <span className="text-white/10">NAV:</span> {scrollPerc}% COMPLETE
                    </div>
                    <div className="flex gap-3">
                        <span className="text-white/10">STATUS:</span> <span className="text-[#ff3c00]">{dragStatus}</span>
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="flex gap-3">
                        <span className="text-white/10">TRACKS:</span> {tracksRef.current.map((t, i) => (
                            <span key={i} className={activeTrackIdx.current === i ? 'text-white' : ''}>{t.speed < 0 ? '←' : '→'}</span>
                        ))}
                    </div>
                    <div>VISURA // VERSION 1.1</div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox.active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-10 bg-black/95 backdrop-blur-2xl"
                    >
                        <button
                            className="absolute top-10 right-10 text-white/50 hover:text-white text-xs tracking-[0.3em] z-[10001]"
                            onClick={() => setLightbox({ ...lightbox, active: false })}
                        >
                            CLOSE (ESC)
                        </button>

                        <div className="absolute inset-y-0 left-10 flex items-center z-[10001]">
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#ff3c00] hover:border-[#ff3c00] transition-all" onClick={() => navigateLightbox(-1)}>←</button>
                        </div>
                        <div className="absolute inset-y-0 right-10 flex items-center z-[10001]">
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#ff3c00] hover:border-[#ff3c00] transition-all" onClick={() => navigateLightbox(1)}>→</button>
                        </div>

                        <motion.img
                            key={lightbox.url}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                            src={lightbox.url}
                            className="max-h-full max-w-full object-contain shadow-2xl"
                            alt=""
                        />

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                            <h4 className="text-white font-['Bebas_Neue'] text-2xl uppercase tracking-wider mb-2">Item {lightbox.index + 1} of {collection.length}</h4>
                            <div className="w-12 h-0.5 bg-[#ff3c00] mx-auto" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
