'use client';

import { useState, useEffect, useRef } from 'react';
import { useLerp } from '@/hooks/useLerp';

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isImageHovering, setIsImageHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const lerpPos = useLerp(mousePos, 0.12);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"]'));
      setIsImageHovering(!!target.closest('img'));
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 w-[38px] h-[38px] border-[1.5px] border-gold/50 rounded-full pointer-events-none transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${lerpPos.x - 19}px, ${lerpPos.y - 19}px) scale(${isMouseDown ? 0.75 : isImageHovering ? 1.9 : isHovering ? 1.6 : 1
            })`,
          backgroundColor: isHovering ? 'rgba(201, 168, 76, 0.1)' : 'transparent',
          borderStyle: isImageHovering ? 'dashed' : 'solid',
          opacity: isVisible ? 1 : 0,
          boxShadow: isVisible ? '0 0 10px rgba(0,0,0,0.1)' : 'none',
          zIndex: 999999,
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          transform: `translate(${mousePos.x - 3}px, ${mousePos.y - 3}px)`,
          opacity: isVisible && !isHovering ? 1 : 0,
          boxShadow: '0 0 4px rgba(0,0,0,0.3)',
          zIndex: 999999,
        }}
      />
    </>
  );
};
