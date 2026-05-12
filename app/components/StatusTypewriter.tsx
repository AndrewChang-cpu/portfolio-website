'use client';

import { useEffect, useState } from 'react';
import type { AvailabilityStatus } from '@/lib/resume';

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const HOLD_MS = 800;

type Phase = 'typing' | 'holding' | 'deleting';

export default function StatusTypewriter({ statuses }: { statuses: AvailabilityStatus[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    const current = statuses[index];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('holding'), HOLD_MS);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('deleting'), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % statuses.length);
        setPhase('typing');
      }
    }
  }, [phase, displayed, index, statuses]);

  return (
    <p className="font-mono text-pixel-green text-sm">
      {displayed}
      <span className="animate-pulse">_</span>
    </p>
  );
}
