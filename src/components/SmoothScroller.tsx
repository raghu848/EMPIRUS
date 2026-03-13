'use client';

import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

export const SmoothScroller = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
