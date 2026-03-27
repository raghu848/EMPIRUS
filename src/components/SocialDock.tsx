'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Instagram, Facebook, Phone, MessageCircle, ChevronsDown, ChevronsUp } from 'lucide-react';

const DOCK_ITEMS = [
    { id: 'instagram', icon: <Instagram size={20} />, label: 'Instagram', href: 'https://www.instagram.com/gdpl70/', color: '#E1306C' },
    { id: 'facebook', icon: <Facebook size={20} />, label: 'Facebook', href: 'https://www.facebook.com/gdplmohali', color: '#1877F2' },
    { id: 'whatsapp', icon: <MessageCircle size={20} />, label: 'WhatsApp', href: 'https://wa.me/917789000077', color: '#25D366' },
    { id: 'phone', icon: <Phone size={20} />, label: 'Call Us', href: 'tel:+917789000077', color: '#34C759' },
];

const MagneticIcon = ({ children, label, href, brandColor }: { children: React.ReactNode, label: string, href: string, brandColor: string }) => {
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
        x.set((e.clientX - centerX) * 0.4); // Reduce movement intensity
        y.set((e.clientY - centerY) * 0.4); // Reduce movement intensity
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
                    color: brandColor, // Using the original brand color
                    cursor: 'pointer',
                    transition: 'color 0.3s',
                }}
                whileHover={{
                    color: '#fff', // Turn white on hover
                    scale: 1.1,
                    boxShadow: `0 0 12px ${brandColor}4D`, // Subtle glow with brand color
                }}
            >
                {children}
            </motion.a>
        </div>
    );
};

export const SocialDock = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div
            style={{
                position: 'fixed',
                right: 'clamp(12px, 4vw, 24px)',
                top: '60%', // Lowered slightly for mobile reachability
                transform: 'translateY(-50%)',
                zIndex: 1000,
                pointerEvents: 'none',
            }}
        >
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'clamp(40px, 4.5vw, 48px)',
                    padding: isExpanded ? 'clamp(16px, 3vw, 24px) 0' : '8px 0',
                    background: 'rgba(10, 18, 14, 0.45)', // Darker glass for better contrast
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                    pointerEvents: 'all',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, scale: 0.8 }}
                            animate={{ height: 'auto', opacity: 1, scale: 1 }}
                            exit={{ height: 0, opacity: 0, scale: 0.8 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'clamp(8px, 1.5vw, 12px)',
                                overflow: 'hidden'
                            }}
                        >
                            {DOCK_ITEMS.map((item) => (
                                <MagneticIcon key={item.id} label={item.label} href={item.href} brandColor={item.color}>
                                    <div style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
                                        {item.icon}
                                    </div>
                                </MagneticIcon>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button */}
                <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                    }}
                    whileHover={{ color: '#fff', scale: 1.1 }}
                    animate={{ rotate: isExpanded ? 0 : 180 }}
                >
                    <ChevronsDown size={20} />
                </motion.button>
            </motion.div>
        </div>
    );
};
