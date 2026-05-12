'use client';

import { useEffect, useState } from 'react';

const FRAMES = Array.from({ length: 7 }, (_, i) => `/images/bike/frame-${i + 1}.png`);
const FRAME_MS = 120; // ~8fps

export default function LandingBackground() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrameIndex(i => (i + 1) % FRAMES.length), FRAME_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Panning background — overflow-hidden only on this layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-fade-in">
        <div className="flex h-full animate-pan-bg" style={{ width: 'max-content' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/backgrounds/cmu mizzou background.png" alt="" aria-hidden className="h-full w-auto object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/backgrounds/cmu mizzou background.png" alt="" aria-hidden className="h-full w-auto object-cover" />
        </div>
      </div>

      {/* Sprite — pinned to the path in the background image.
          bottom: 17% matches the path's position as a fraction of image height,
          which stays correct at any viewport size since the bg is always h-full. */}
      <div className="fixed pointer-events-none" style={{ zIndex: -5, bottom: '17%', left: '50%', transform: 'translateX(-50%)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FRAMES[frameIndex]}
          alt="Andrew biking"
          className="h-40 w-auto object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </>
  );
}
