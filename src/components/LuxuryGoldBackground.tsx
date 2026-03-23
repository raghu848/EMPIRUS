'use client';

import React from 'react';

export const LuxuryGoldBackground = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {/* Layer 1 — Dark warm base */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(160deg, #1c1608 0%, #0f0b04 60%, #14100d 100%)',
            }} />

            {/* Layer 2 — Soft gold bloom (top-left) */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.12) 0%, transparent 65%)',
            }} />

            {/* Layer 3 — Soft gold bloom (bottom-right) */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.10) 0%, transparent 65%)',
            }} />

            {/* Layer 4 — Centre horizontal warm band */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.05) 50%, transparent 100%)',
            }} />

            {/* Layer 5 — Diagonal shimmer lines */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(-55deg, transparent, transparent 48px, rgba(212,175,55,0.022) 48px, rgba(212,175,55,0.022) 49px)',
            }} />

            {/* Top Border Line */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.45) 50%, transparent)',
            }} />

            {/* Bottom Border Line */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.45) 50%, transparent)',
            }} />
        </div>
    );
};
