'use client';

import { useEffect, useRef } from 'react';

// Only nav links get the ▶ selection effect — not all interactive elements
const NAV_SELECTOR = 'nav a';

export default function PixelCursor() {
  const crosshairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const crosshair = crosshairRef.current;
    if (!crosshair) return;

    let isOverNav = false;

    function onMove(e: MouseEvent) {
      crosshair!.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      const target = e.target as Element | null;
      const hovering = !!target?.closest(NAV_SELECTOR);

      if (hovering !== isOverNav) {
        isOverNav = hovering;
        crosshair!.style.opacity = hovering ? '0' : '1';
        document.body.classList.toggle('cursor-selecting', hovering);
      }
    }

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.classList.remove('cursor-selecting');
    };
  }, []);

  // Zero-size container centered exactly on the cursor coordinate.
  // Each arm is positioned relative to that center using negative margins/insets.
  // Gap: 4px each side of center. Arm length: 10px.
  return (
    <div
      ref={crosshairRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[99999]"
    >
      {/* Left arm: extends 14px left, stops 4px from center */}
      <div className="absolute top-0 bg-pixel-accent"
           style={{ width: 10, height: 1, right: 4, marginTop: -0.5 }} />
      {/* Right arm: starts 4px right of center, extends 10px right */}
      <div className="absolute top-0 bg-pixel-accent"
           style={{ width: 10, height: 1, left: 4, marginTop: -0.5 }} />
      {/* Top arm: extends 10px up, stops 4px from center */}
      <div className="absolute left-0 bg-pixel-accent"
           style={{ width: 1, height: 10, bottom: 4, marginLeft: -0.5 }} />
      {/* Bottom arm: starts 4px below center, extends 10px down */}
      <div className="absolute left-0 bg-pixel-accent"
           style={{ width: 1, height: 10, top: 4, marginLeft: -0.5 }} />
    </div>
  );
}
