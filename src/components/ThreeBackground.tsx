"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PINK_PALETTE = [
  0xff6b9d, 0xff8ab4, 0xf06292, 0xec407a, 0xf48fb1, 0xffc1d6, 0xe91e8c,
];

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      62,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    mount.appendChild(renderer.domElement);

    const pick = () =>
      PINK_PALETTE[Math.floor(Math.random() * PINK_PALETTE.length)];

    const rpos = (spread = 28, depth = 14) =>
      new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * (spread * 0.62),
        (Math.random() - 0.5) * depth - 2
      );

    const envScene = new THREE.Scene();
    envScene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(8, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xffe4ee, side: THREE.BackSide })
      )
    );
    [
      [0xff6b9d, 3.2, 2.4, -1.5],
      [0xffc1d6, -3.5, 1.2, 2],
      [0xffffff, 0.4, 3.8, 1.8],
    ].forEach(([color, x, y, z]) => {
      const lightMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.4, 12, 12),
        new THREE.MeshBasicMaterial({ color })
      );
      lightMesh.position.set(x, y, z);
      envScene.add(lightMesh);
    });
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;
    pmrem.dispose();
    envScene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      }
    });

    scene.add(new THREE.HemisphereLight(0xfff1f6, 0xd7e0ea, 0.85));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const roseLight = new THREE.PointLight(0xff5c9a, 18, 42, 2);
    roseLight.position.set(10, 8, 8);
    scene.add(roseLight);

    const blushLight = new THREE.PointLight(0xffc2d6, 12, 36, 2);
    blushLight.position.set(-12, -6, 6);
    scene.add(blushLight);

    const accentLight = new THREE.PointLight(0xffffff, 8, 28, 2);
    accentLight.position.set(0, 10, -4);
    scene.add(accentLight);

    type ObjectMeta = {
      mesh: THREE.Object3D;
      rotSpeed: THREE.Vector3;
      floatOffset: number;
      floatSpeed: number;
      drift: number;
      basePos: THREE.Vector3;
      scaleBase: number;
      scaleAmp: number;
    };
    const objects: ObjectMeta[] = [];
    const disposables: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> =
      [];

    const physical = (
      color: number,
      options: {
        opacity?: number;
        transmission?: number;
        metalness?: number;
        roughness?: number;
        iridescence?: number;
      } = {}
    ) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        metalness: options.metalness ?? 0.18,
        roughness: options.roughness ?? 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        transparent: true,
        opacity: options.opacity ?? 0.78,
        transmission: options.transmission ?? 0,
        thickness: 0.85,
        ior: 1.42,
        iridescence: options.iridescence ?? 0.35,
        iridescenceIOR: 1.28,
        envMapIntensity: 1.15,
        specularIntensity: 1,
      });
      disposables.push(mat);
      return mat;
    };

    const wire = (color: number, opacity = 0.22) => {
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity,
      });
      disposables.push(mat);
      return mat;
    };

    const track = (
      mesh: THREE.Object3D,
      extras: Partial<ObjectMeta> = {}
    ) => {
      const pos = mesh.position.clone();
      objects.push({
        mesh,
        rotSpeed: extras.rotSpeed ??
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.004,
            (Math.random() - 0.5) * 0.006,
            (Math.random() - 0.5) * 0.003
          ),
        floatOffset: extras.floatOffset ?? Math.random() * Math.PI * 2,
        floatSpeed: extras.floatSpeed ?? 0.35 + Math.random() * 0.45,
        drift: extras.drift ?? 0.35 + Math.random() * 0.35,
        basePos: extras.basePos ?? pos,
        scaleBase: extras.scaleBase ?? 1,
        scaleAmp: extras.scaleAmp ?? 0.035,
      });
    };

    const addShape = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      withHalo = false
    ) => {
      disposables.push(geometry);
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);

      if (withHalo) {
        const halo = new THREE.Mesh(geometry, wire(0xffb7d0, 0.2));
        halo.scale.setScalar(1.08);
        group.add(halo);
      }

      const pos = rpos();
      group.position.copy(pos);
      group.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(group);
      track(group);
      return group;
    };

    addShape(
      new THREE.IcosahedronGeometry(1.15, 1),
      physical(0xff7eab, { transmission: 0.62, opacity: 0.92, roughness: 0.08 }),
      true
    );
    addShape(
      new THREE.SphereGeometry(0.95, 48, 48),
      physical(0xffc1d6, { transmission: 0.7, opacity: 0.9, roughness: 0.06 })
    );
    addShape(
      new THREE.TorusKnotGeometry(0.72, 0.18, 128, 24, 2, 3),
      physical(0xec407a, { metalness: 0.45, roughness: 0.16, iridescence: 0.55 }),
      true
    );
    addShape(
      new THREE.DodecahedronGeometry(0.85, 0),
      physical(0xf48fb1, { transmission: 0.35, opacity: 0.86, roughness: 0.14 })
    );
    addShape(
      new THREE.TorusGeometry(1.05, 0.16, 24, 80),
      physical(0xff6b9d, { metalness: 0.28, roughness: 0.2, iridescence: 0.4 }),
      true
    );
    addShape(
      new THREE.OctahedronGeometry(0.7, 0),
      physical(0xff8ab4, { metalness: 0.35, roughness: 0.12 })
    );
    addShape(
      new THREE.CapsuleGeometry(0.28, 0.85, 8, 20),
      physical(0xf06292, { metalness: 0.22, roughness: 0.18, opacity: 0.7 })
    );
    addShape(
      new THREE.IcosahedronGeometry(0.55, 0),
      physical(0xffc0cb, { transmission: 0.5, opacity: 0.88, roughness: 0.1 })
    );
    addShape(
      new THREE.TorusGeometry(0.62, 0.1, 16, 64),
      physical(0xe91e8c, { metalness: 0.4, roughness: 0.22, opacity: 0.68 })
    );

    const orbitHub = new THREE.Group();
    orbitHub.position.set(-6.5, 3.2, -3);
    scene.add(orbitHub);
    track(orbitHub, {
      rotSpeed: new THREE.Vector3(0, 0.0035, 0.001),
      scaleAmp: 0,
    });

    for (let i = 0; i < 4; i++) {
      const satGeo = new THREE.SphereGeometry(0.14 + Math.random() * 0.08, 24, 24);
      disposables.push(satGeo);
      const sat = new THREE.Mesh(
        satGeo,
        physical(pick(), { transmission: 0.45, opacity: 0.9, roughness: 0.1 })
      );
      const angle = (i / 4) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 1.7, Math.sin(angle * 1.4) * 0.45, Math.sin(angle) * 1.7);
      orbitHub.add(sat);
    }

    const particleCount = 220;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 64;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 42;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
      pSpeeds[i] = 0.12 + Math.random() * 0.28;

      const c = new THREE.Color(pick());
      c.offsetHSL(0, 0, (Math.random() - 0.5) * 0.12);
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.35, "rgba(255,182,193,0.7)");
      gradient.addColorStop(1, "rgba(255,105,180,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);
    disposables.push(particleTexture);

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
    disposables.push(pGeo);

    const pMat = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(pMat);

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animId: number;
    let lastFrame = 0;
    const positionAttr = pGeo.getAttribute("position") as THREE.BufferAttribute;

    const renderFrame = () => {
      const t = clock.getElapsedTime();

      objects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeed.x;
        obj.mesh.rotation.y += obj.rotSpeed.y;
        obj.mesh.rotation.z += obj.rotSpeed.z;
        obj.mesh.position.x =
          obj.basePos.x + Math.sin(t * obj.floatSpeed * 0.55 + obj.floatOffset) * obj.drift;
        obj.mesh.position.y =
          obj.basePos.y + Math.sin(t * obj.floatSpeed + obj.floatOffset) * 0.95;
        obj.mesh.position.z =
          obj.basePos.z + Math.cos(t * obj.floatSpeed * 0.4 + obj.floatOffset) * 0.28;
        const pulse = obj.scaleBase + Math.sin(t * 0.7 + obj.floatOffset) * obj.scaleAmp;
        obj.mesh.scale.setScalar(pulse);
      });

      for (let i = 0; i < particleCount; i++) {
        const y = positionAttr.getY(i) + Math.sin(t * pSpeeds[i] + i) * 0.004;
        positionAttr.setY(i, y > 22 ? -22 : y);
      }
      positionAttr.needsUpdate = true;
      particles.rotation.y = t * 0.018;
      particles.rotation.x = Math.sin(t * 0.08) * 0.08;

      roseLight.position.x = Math.cos(t * 0.22) * 12;
      roseLight.position.z = Math.sin(t * 0.22) * 8 + 4;
      blushLight.position.x = Math.sin(t * 0.18) * -11;
      blushLight.position.y = Math.cos(t * 0.16) * 6 - 2;

      camera.position.x += (mouse.x * 1.6 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 1.1 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    const animate = (frameTime = 0) => {
      animId = requestAnimationFrame(animate);
      if (reducedMotion) return;
      if (frameTime - lastFrame < 16) return;
      lastFrame = frameTime;
      renderFrame();
    };

    renderFrame();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      envMap.dispose();
      disposables.forEach((item) => item.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none opacity-70"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;
