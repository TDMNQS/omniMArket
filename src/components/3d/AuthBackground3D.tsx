import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AuthBackground3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 40, 180);
    camera.lookAt(0, 0, 0);

    // Particle Wave Grid
    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const red = new THREE.Color('#EF233C');
    const green = new THREE.Color('#22C55E');
    const darkGray = new THREE.Color('#333338');

    for (let i = 0; i < count; i++) {
      const u = (i % 40) - 20;
      const v = Math.floor(i / 40) - 15;

      positions[i * 3] = u * 9;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = v * 9;

      const rand = Math.random();
      const c = rand > 0.85 ? green : rand > 0.7 ? red : darkGray;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Dynamic wave animation
    let frameId: number;
    let clock = new THREE.Clock();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const x = array[i * 3];
        const z = array[i * 3 + 2];
        array[i * 3 + 1] = Math.sin(x * 0.04 + elapsed * 1.5) * 6 + Math.cos(z * 0.04 + elapsed * 1.2) * 6;
      }
      posAttr.needsUpdate = true;

      scene.rotation.y = elapsed * 0.04;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
