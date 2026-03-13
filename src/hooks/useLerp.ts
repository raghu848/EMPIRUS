'use client';

import { useState, useEffect, useCallback } from 'react';

export const useLerp = (targetValue: { x: number; y: number }, lerpFactor: number = 0.12) => {
  const [currentValue, setCurrentValue] = useState(targetValue);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const update = useCallback(() => {
    setCurrentValue((prev) => ({
      x: lerp(prev.x, targetValue.x, lerpFactor),
      y: lerp(prev.y, targetValue.y, lerpFactor),
    }));
  }, [targetValue, lerpFactor]);

  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      update();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [update]);

  return currentValue;
};
