'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BIKE_RIDER_SPRITE, type PixelSprite } from '@/lib/sprites';

function createSpriteTexture(sprite: PixelSprite): THREE.DataTexture {
  const texture = new THREE.DataTexture(
    sprite.data,
    sprite.width,
    sprite.height,
    THREE.RGBAFormat
  );
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.flipY = true;
  texture.needsUpdate = true;
  return texture;
}

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Camera — orthographic for 2D pixel look
    const aspect = mount.clientWidth / mount.clientHeight;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      100
    );
    camera.position.z = 10;

    const scene = new THREE.Scene();

    // Bike rider sprite
    const bikeTexture = createSpriteTexture(BIKE_RIDER_SPRITE);
    const bikeGeo = new THREE.PlaneGeometry(2.0, 1.0);
    const bikeMat = new THREE.MeshBasicMaterial({ map: bikeTexture, transparent: true });
    const bike = new THREE.Mesh(bikeGeo, bikeMat);
    bike.position.set((-frustumSize * aspect) / 2, -frustumSize / 2 + 1.8, 0);
    scene.add(bike);

    const halfWidth = (frustumSize * aspect) / 2;
    let animFrameId: number;

    // Animation loop
    function animate() {
      animFrameId = requestAnimationFrame(animate);

      // Bike moves right, wraps at screen edge
      bike.position.x += 0.04;
      if (bike.position.x > halfWidth + 1.5) {
        bike.position.x = -halfWidth - 1.5;
      }

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      const newAspect = w / h;
      camera.left   = (-frustumSize * newAspect) / 2;
      camera.right  = (frustumSize * newAspect) / 2;
      camera.top    = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(mount);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      bikeTexture.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
