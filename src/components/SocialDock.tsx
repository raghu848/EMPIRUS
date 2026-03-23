'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Instagram, Facebook, Phone, MessageCircle, ChevronUp } from 'lucide-react';

const DOCK_ITEMS = [
    { id: 'instagram', icon: <Instagram size={20} />, label: 'Instagram', href: 'https://www.instagram.com/gdpl70/' },
    { id: 'facebook', icon: <Facebook size={20} />, label: 'Facebook', href: 'https://www.facebook.com/gdplmohali' },
    { id: 'whatsapp', icon: <MessageCircle size={20} />, label: 'WhatsApp', href: 'https://wa.me/917789000077' },
    { id: 'phone', icon: <Phone size={20} />, label: 'Call Us', href: 'tel:+917789000077' },
];

const MagneticIcon = ({ children, label, href }: { children: React.ReactNode, label: string, href: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    function handleMouseMove(e: React.MouseEvent) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }

    return (
        <div style={{ position: 'relative' }}>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: -10 }}
                        exit={{ opacity: 0, x: 10 }}
                        style={{
                            position: 'absolute',
                            right: '100%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.95)',
                            color: '#0a120e',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            pointerEvents: 'none',
                            zIndex: 100,
                        }}
                    >
                        {label}
                        {/* Arrow */}
                        <div style={{
                            position: 'absolute',
                            right: '-4px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 0, height: 0,
                            borderTop: '5px solid transparent',
                            borderBottom: '5px solid transparent',
                            borderLeft: '5px solid rgba(255, 255, 255, 0.95)',
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    x: mouseX,
                    y: mouseY,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                }}
                whileHover={{
                    color: '#e5d8be',
                    scale: 1.1,
                    boxShadow: '0 0 12px rgba(229, 216, 190, 0.3)',
                }}
            >
                {children}
            </motion.a>
        </div>
    );
};

export const SocialDock = () => {
    const [showScroll, setShowScroll] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setShowScroll(latest > 300);
        });
    }, [scrollY]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            style={{
                position: 'fixed',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
                pointerEvents: 'none',
            }}
            className="hidden lg:block"
        >
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ width: '56px' }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    padding: '24px 0',
                    gap: '12px',
                    background: 'rgba(10, 18, 14, 0.45)', // Darker glass for better contrast
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                    pointerEvents: 'all',
                    transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {DOCK_ITEMS.map((item) => (
                    <MagneticIcon key={item.id} label={item.label} href={item.href}>
                        <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
                            {item.icon}
                        </div>
                    </MagneticIcon>
                ))}

                <AnimatePresence>
                    {showScroll && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 10 }}
                            onClick={scrollToTop}
                            style={{
                                marginTop: '12px',
                                paddingTop: '12px',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '52px',
                                color: 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                            }}
                            whileHover={{ color: '#fff', scale: 1.1 }}
                        >
                            <ChevronUp size={24} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};
