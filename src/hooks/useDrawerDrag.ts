import { useEffect, useRef, useState } from "react";

type DrawerHeight = {
  compact: number;
  partial: number;
  full: number;
};

export const useDrawerDrag = (heights: DrawerHeight, bottomOffset: number = 80) => {
  const [currentHeight, setCurrentHeight] = useState(heights.compact);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const snapToClosest = (height: number) => {
    const distances = [
      { height: heights.compact, distance: Math.abs(height - heights.compact) },
      { height: heights.partial, distance: Math.abs(height - heights.partial) },
      { height: heights.full, distance: Math.abs(height - heights.full) },
    ];
    
    distances.sort((a, b) => a.distance - b.distance);
    setCurrentHeight(distances[0].height);
  };

  const handleStart = (clientY: number) => {
    setIsDragging(true);
    startY.current = clientY;
    startHeight.current = currentHeight;
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;
    
    const deltaY = startY.current - clientY;
    const newHeight = Math.max(
      heights.compact,
      Math.min(heights.full, startHeight.current + deltaY)
    );
    
    setCurrentHeight(newHeight);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToClosest(currentHeight);
  };

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-drawer-handle]')) {
        handleStart(e.touches[0].clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => handleEnd();

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-drawer-handle]')) {
        handleStart(e.clientY);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientY);
      }
    };

    const onMouseUp = () => handleEnd();

    drawer.addEventListener('touchstart', onTouchStart, { passive: false });
    drawer.addEventListener('mousedown', onMouseDown);
    
    if (isDragging) {
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      drawer.removeEventListener('touchstart', onTouchStart);
      drawer.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, currentHeight]);

  return {
    drawerRef,
    currentHeight,
    setCurrentHeight,
    isDragging,
  };
};
