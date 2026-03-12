'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BIKE_RIDER_SPRITE, STAR_SPRITE, type PixelSprite } from '@/lib/sprites';

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

    // Ground line
    const groundGeo = new THREE.PlaneGeometry(frustumSize * aspect, 0.04);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -frustumSize / 2 + 1.2;
    scene.add(ground);

    // Star sprites
    const starTexture = createSpriteTexture(STAR_SPRITE);
    const stars: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.PlaneGeometry(0.4, 0.4);
      const mat = new THREE.MeshBasicMaterial({ map: starTexture, transparent: true });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * frustumSize * aspect,
        (Math.random() * frustumSize) / 2,
        0
      );
      scene.add(mesh);
      stars.push(mesh);
    }

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

      // Stars twinkle (opacity pulse)
      const t = Date.now() * 0.001;
      stars.forEach((star, i) => {
        (star.material as THREE.MeshBasicMaterial).opacity =
          0.4 + 0.6 * Math.abs(Math.sin(t + i * 0.8));
      });

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
      starTexture.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-hidden="true" />;
}
