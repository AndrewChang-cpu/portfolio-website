'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false must be inside a Client Component
const HeroScene = dynamic(() => import('@/app/components/HeroScene'), { ssr: false });

export default function HeroSceneWrapper() {
  return <HeroScene />;
}
