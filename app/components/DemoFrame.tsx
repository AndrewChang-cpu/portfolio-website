'use client';

import { useState } from 'react';

interface DemoFrameProps {
  src: string;
  title: string;
}

export default function DemoFrame({ src, title }: DemoFrameProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full border border-pixel-border bg-pixel-surface" style={{ height: '80vh' }}>
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 font-pixel text-[10px] text-pixel-accent">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="block w-3 h-3 bg-pixel-accent"
                style={{ animation: `blink 1s step-start ${i * 0.25}s infinite` }}
              />
            ))}
          </div>
          <span>&gt; LOADING DEMO...</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 font-pixel text-[10px] text-pixel-red">
          <span>&gt; DEMO UNAVAILABLE</span>
          <span className="text-pixel-muted font-mono text-[11px]">Could not load {title}</span>
        </div>
      )}

      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-storage-access-by-user-activation"
      />
    </div>
  );
}
