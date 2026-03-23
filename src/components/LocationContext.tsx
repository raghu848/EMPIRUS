'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export const LocationContext = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const fadeUp = (delay: number) => ({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 1.2s ${delay}ms var(--ease), transform 1.2s ${delay}ms var(--ease-spring)`,
    });

    return (
        <section
            ref={sectionRef}
            style={{
                position: 'relative',
                minHeight: '20vh', // Minimal height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: '#0a120e',
                padding: '2.5rem 0 1.5rem', // Tightly reduced vertical padding
            }}
        >
            {/* Background with Blur */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
            }}>
                <Image
                    src="/pictures/mapbg.jpg"
                    alt="Location Strategic Map"
                    fill
                    style={{
                        objectFit: 'cover',
                        filter: 'blur(0.4px) brightness(0.42)', // Minimal blur for maximum map clarity
                        opacity: 0.75,
                    }}
                />
                {/* Dark subtle gradient overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(10,18,14,0.9) 100%)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, #0a120e, transparent 20%, transparent 80%, #0a120e)',
                }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.45em', textTransform: 'uppercase', color: 'var(--gold-lt)',
                    marginBottom: '0.75rem', ...fadeUp(0)
                }}>
                    Prime Location
                </p>

                <h2 style={{
                    fontFamily: 'var(--font-hand)', fontWeight: 400,
                    fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', color: 'var(--white)',
                    margin: '0 auto 1.5rem', lineHeight: 1.1, maxWidth: '900px',
                    textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(223,188,115,0.15)', // Added glow/shadow
                    ...fadeUp(100)
                }}>
                    The Pulse of a <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Growing City</span>
                </h2>

                <div style={{
                    maxWidth: '1050px', // Increased width for three-line paragraphs
                    margin: '0 auto',
                    ...fadeUp(200)
                }}>
                    <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
                        color: 'rgba(255,255,255,0.98)',
                        lineHeight: 1.9,
                        marginBottom: '1.5rem',
                        letterSpacing: '0.01em',
                        fontWeight: 300,
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)', // Added shadow for legibility
                    }}>
                        Located in the thriving Sector 91, Regal Empirus places you at the center of connectivity, convenience, and future growth. With excellent access to Chandigarh, major road networks, and key lifestyle destinations, every essential is within easy reach.
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
                        color: 'rgba(255,255,255,0.98)',
                        lineHeight: 1.9,
                        letterSpacing: '0.01em',
                        fontWeight: 300,
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)', // Added shadow for legibility
                    }}>
                        From top educational institutions and healthcare centers to business hubs and leisure spaces, the location offers a well-rounded urban lifestyle. Backed by continuous development in the region, it stands as a smart investment opportunity with promising appreciation.
                    </p>
                </div>

                {/* Decorative Divider */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '1.5rem', marginTop: '2.5rem', ...fadeUp(300)
                }}>
                    <div style={{ width: '100px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold-dim))' }} />
                    <div style={{ width: '10px', height: '10px', background: 'var(--gold)', transform: 'rotate(45deg)' }} />
                    <div style={{ width: '100px', height: '1px', background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
                </div>
            </div>
        </section>
    );
};
