"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

/* ── Topographic wireframe terrain – GPU optimized  ───────────────────── */

/** Simple 2D value-noise helper for CPU-side initial geometry */
function hash(x: number, y: number) {
  let h = x * 374761393 + y * 668265263;
  h = ((h ^ (h >> 13)) * 1274126177) | 0;
  return (h & 0x7fffffff) / 0x7fffffff; // 0..1
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function valueNoise(px: number, py: number) {
  const ix = Math.floor(px);
  const iy = Math.floor(py);
  const fx = smoothstep(px - ix);
  const fy = smoothstep(py - iy);
  return lerp(
    lerp(hash(ix, iy), hash(ix + 1, iy), fx),
    lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), fx),
    fy
  );
}

function fbm(x: number, y: number, octaves = 5) {
  let v = 0, amp = 1, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    v += valueNoise(x * freq, y * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2.0;
  }
  return v / max; // 0..1
}

/* ── Shader ───────────────────────────────────────────────────────────── */

const TopoShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#2E2E2E") },
    uOpacity: { value: 0.09 },
  },
  vertexShader: `
    uniform float uTime;
    attribute float aElevation;
    varying float vElevation;

    void main() {
      vElevation = aElevation;
      vec3 pos = position;

      // Add wave animation on GPU
      float wave = sin(pos.x * 0.06 + uTime) * cos(pos.y * 0.06 + uTime * 0.7) * 0.8;
      pos.z += aElevation + wave;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vElevation;

    void main() {
      // Subtle depth fade based on elevation if needed, but keeping it simple for brutalist look
      gl_FragColor = vec4(uColor, uOpacity);
    }
  `,
};

/* ── Components ───────────────────────────────────────────────────────── */

function TopoTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { size, segments } = { size: 160, segments: 100 }; // Reduced segments slightly

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const count = geo.attributes.position.count;
    const elevations = new Float32Array(count);
    const posAttr = geo.attributes.position;

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);

      let z = fbm(x * 0.025 + 50, y * 0.025 + 50, 5) * 10 - 5;
      z = Math.round(z * 2.5) / 2.5;
      elevations[i] = z;
      
      posAttr.setZ(i, 0);
    }

    geo.setAttribute("aElevation", new THREE.BufferAttribute(elevations, 1));
    return geo;
  }, [size, segments, fbm]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.6, 0, Math.PI / 5]}
      position={[0, -8, 0]}
    >
      <shaderMaterial
        ref={materialRef}
        args={[TopoShader]}
        wireframe
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Contour rings (like topo map contours) ───────────────────────────── */
function ContourRings() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    const items: { radius: number; y: number }[] = [];
    for (let i = 0; i < 18; i++) {
      items.push({
        radius: 8 + i * 4.5,
        y: -8 + fbm(i * 0.4, 0.5) * 4 - 2,
      });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.008;
  });

  return (
    <group ref={groupRef} position={[0, -6, 0]}>
      {rings.map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2.6, 0, 0]} position={[0, r.y, 0]}>
          <ringGeometry args={[r.radius, r.radius + 0.05, 128]} />
          <meshBasicMaterial
            color="#2E2E2E"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Responsive camera setup ──────────────────────────────────────────── */
function CameraRig() {
  const { size: viewport, clock } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const lastViewport = useRef({ w: 0, h: 0 });

  useFrame((state) => {
    const { camera, size: viewport } = state;
    target.current.x += (mouse.current.x - target.current.x) * 0.02;
    target.current.y += (mouse.current.y - target.current.y) * 0.02;

    camera.position.x = 50 + target.current.x * 6;
    camera.position.y = 50 - target.current.y * 4;
    camera.lookAt(0, 0, 0);

    /* Responsive zoom — only update projection matrix when viewport actually changes */
    if (
      (camera as THREE.OrthographicCamera).zoom !== undefined &&
      (lastViewport.current.w !== viewport.width || lastViewport.current.h !== viewport.height)
    ) {
      lastViewport.current = { w: viewport.width, h: viewport.height };
      const minDim = Math.min(viewport.width, viewport.height);
      (camera as THREE.OrthographicCamera).zoom = minDim < 600 ? 14 : minDim < 1024 ? 20 : 26;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <orthographicCamera
      // @ts-expect-error r3f applies makeDefault via attach
      makeDefault
      position={[50, 50, 50]}
      zoom={26}
      near={0.1}
      far={1000}
    />
  );
}

/* ── Exported component ───────────────────────────────────────────────── */
export default function HeroVisual() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "var(--bg)",
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <CameraRig />

        {/* Soft diffuse lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[30, 50, 20]} intensity={0.6} />

        <TopoTerrain />
        <ContourRings />

        {/* Fog for depth fade – matches sage bg */}
        <fog attach="fog" args={["#B0BDB0", 40, 160]} />

        {/* Canvas clear color to match site */}
        <color attach="background" args={["#B0BDB0"]} />
      </Canvas>
    </div>
  );
}
