import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroGlobe3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL not supported, falling back to static visual', e);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    // Group for globe and rings
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Core Sphere Wireframe
    const sphereGeo = new THREE.IcosahedronGeometry(70, 4);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x22C55E,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    worldGroup.add(sphereMesh);

    // 2. Holographic Dots on Sphere Surface
    const particleCount = 700;
    const dotPositions = new Float32Array(particleCount * 3);
    const dotColors = new Float32Array(particleCount * 3);

    const redColor = new THREE.Color('#EF233C');
    const greenColor = new THREE.Color('#22C55E');
    const whiteColor = new THREE.Color('#FFFFFF');

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 72 + (Math.random() * 4 - 2);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      // Color distribution (70% Green/Yes, 25% Red/No, 5% White/Center)
      const rand = Math.random();
      const col = rand > 0.4 ? greenColor : rand > 0.1 ? redColor : whiteColor;
      dotColors[i * 3] = col.r;
      dotColors[i * 3 + 1] = col.g;
      dotColors[i * 3 + 2] = col.b;
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    worldGroup.add(dotPoints);

    // 3. Orbital Prediction Rings (Red & Green)
    const createRing = (radius: number, colorHex: string, rotX: number, rotY: number) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.7, radius + 0.7, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ringGreen = createRing(96, '#22C55E', Math.PI / 3, 0.4);
    const ringRed = createRing(110, '#EF233C', -Math.PI / 4, -0.6);
    worldGroup.add(ringGreen);
    worldGroup.add(ringRed);

    // 4. Floating glowing pulse markers
    const pulseCount = 8;
    const markerGeo = new THREE.SphereGeometry(1.6, 12, 12);
    const markers: THREE.Mesh[] = [];
    for (let i = 0; i < pulseCount; i++) {
      const isGreen = i % 2 === 0;
      const markerMat = new THREE.MeshBasicMaterial({
        color: isGreen ? 0x22C55E : 0xEF233C,
        transparent: true,
        opacity: 0.9
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      const angle = (i / pulseCount) * Math.PI * 2;
      marker.position.set(
        Math.cos(angle) * (96 + (i % 2) * 14),
        Math.sin(angle) * (96 + (i % 2) * 14),
        Math.sin(angle * 2) * 20
      );
      worldGroup.add(marker);
      markers.push(marker);
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.8;
      targetRotationX = y * 0.8;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      worldGroup.rotation.y += (targetRotationY - worldGroup.rotation.y) * 0.05 + 0.0025;
      worldGroup.rotation.x += (targetRotationX - worldGroup.rotation.x) * 0.05;

      // Independent ring rotations
      ringGreen.rotation.z = elapsedTime * 0.2;
      ringRed.rotation.z = -elapsedTime * 0.15;

      // Pulse markers
      markers.forEach((m, idx) => {
        const scale = 1 + Math.sin(elapsedTime * 3 + idx) * 0.35;
        m.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[380px] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};
