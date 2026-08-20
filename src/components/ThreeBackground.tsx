"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Pink colour palette ────────────────────────────────
    const pinks = [
      0xff69b4, // hot pink
      0xffb6c1, // light pink
      0xff1493, // deep pink
      0xffc0cb, // pink
      0xe91e8c, // vibrant magenta-pink
      0xf48fb1, // medium pink
      0xfce4ec, // pale blush
      0xf06292, // flamingo
      0xec407a, // rose
    ];

    const pick = () => pinks[Math.floor(Math.random() * pinks.length)];

    // ── Helper: random position in view ───────────────────
    const rpos = (spread = 35, depthSpread = 15) =>
      new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * (spread * 0.7),
        (Math.random() - 0.5) * depthSpread - 3
      );

    // ── Lights ─────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const pl1 = new THREE.PointLight(0xff69b4, 3, 60);
    pl1.position.set(15, 15, 10);
    scene.add(pl1);

    const pl2 = new THREE.PointLight(0xff1493, 2, 60);
    pl2.position.set(-15, -12, 5);
    scene.add(pl2);

    const pl3 = new THREE.PointLight(0xffc0cb, 1.5, 50);
    pl3.position.set(0, 20, -5);
    scene.add(pl3);

    // ── Mesh factory ──────────────────────────────────────
    type ObjectMeta = {
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      floatOffset: number;
      floatSpeed: number;
      baseY: number;
    };
    const objects: ObjectMeta[] = [];

    const addMesh = (
      geometry: THREE.BufferGeometry,
      wireframe = false,
      opacity = 0.6
    ) => {
      const mat = new THREE.MeshPhongMaterial({
        color: pick(),
        transparent: true,
        opacity,
        wireframe,
        shininess: 80,
        specular: new THREE.Color(0xffffff),
      });
      const mesh = new THREE.Mesh(geometry, mat);
      const pos = rpos();
      mesh.position.copy(pos);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(mesh);
      objects.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.004,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.4 + Math.random() * 0.6,
        baseY: pos.y,
      });
    };

    // ── Spheres ──────────────────────────────────────────
    for (let i = 0; i < 4; i++) {
      addMesh(
        new THREE.SphereGeometry(0.35 + Math.random() * 0.9, 16, 16),
        false,
        0.35 + Math.random() * 0.18
      );
    }

    // ── Tori ─────────────────────────────────────────────
    for (let i = 0; i < 3; i++) {
      const r = 0.6 + Math.random() * 1.2;
      const tube = 0.12 + Math.random() * 0.22;
      addMesh(
        new THREE.TorusGeometry(r, tube, 8, 36),
        Math.random() > 0.5,
        0.3 + Math.random() * 0.18
      );
    }

    // ── Icosahedra ───────────────────────────────────────
    for (let i = 0; i < 3; i++) {
      addMesh(
        new THREE.IcosahedronGeometry(0.4 + Math.random() * 0.8, 0),
        Math.random() > 0.6,
        0.32 + Math.random() * 0.18
      );
    }

    // ── Octahedra ────────────────────────────────────────
    for (let i = 0; i < 2; i++) {
      addMesh(
        new THREE.OctahedronGeometry(0.4 + Math.random() * 0.7),
        false,
        0.35 + Math.random() * 0.18
      );
    }

    // ── Torus-knots ──────────────────────────────────────
    for (let i = 0; i < 1; i++) {
      addMesh(
        new THREE.TorusKnotGeometry(
          0.4 + Math.random() * 0.4,
          0.08 + Math.random() * 0.1,
          36,
          8
        ),
        false,
        0.3 + Math.random() * 0.16
      );
    }

    // ── Particles ─────────────────────────────────────────
    const PARTICLE_COUNT = 120;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pColors = new Float32Array(PARTICLE_COUNT * 3);
    const particlePinkHex = [0xff69b4, 0xffb6c1, 0xff1493, 0xf06292];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 70;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 35 - 5;

      const c = new THREE.Color(
        particlePinkHex[Math.floor(Math.random() * particlePinkHex.length)]
      );
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Mouse parallax ────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize handler ────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;
    let lastFrame = 0;

    const animate = (frameTime = 0) => {
      animId = requestAnimationFrame(animate);
      if (frameTime - lastFrame < 33) return;
      lastFrame = frameTime;
      const t = clock.getElapsedTime();

      // Animate each object
      objects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeedX;
        obj.mesh.rotation.y += obj.rotSpeedY;
        obj.mesh.position.y =
          obj.baseY +
          Math.sin(t * obj.floatSpeed + obj.floatOffset) * 0.8;
      });

      // Slow particle drift
      particles.rotation.y = t * 0.025;
      particles.rotation.x = t * 0.01;

      // Subtle mouse-based camera parallax
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.018;
      camera.position.y += (mouse.y * 0.9 - camera.position.y) * 0.018;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      objects.forEach((o) => {
        o.mesh.geometry.dispose();
        (o.mesh.material as THREE.Material).dispose();
      });
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none opacity-55"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;
