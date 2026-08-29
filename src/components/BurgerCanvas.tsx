"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BurgerCanvasProps {
  progressRef: React.MutableRefObject<number>;
}

// Check WebGL availability helper
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

// Procedural Sesame Seeds scattered on top of the bun dome
function SesameSeeds() {
  const seedsCount = 45;
  const [seeds, setSeeds] = useState<[number, number, number][]>([]);

  useEffect(() => {
    const generated: [number, number, number][] = [];
    for (let i = 0; i < seedsCount; i++) {
      const theta = Math.acos(Math.random() * 0.75 + 0.25); // sit on top dome
      const phi = Math.random() * Math.PI * 2;
      const r = 1.51; // sat on top of the 1.5 radius bun

      const x = r * Math.sin(theta) * Math.cos(phi);
      const z = r * Math.sin(theta) * Math.sin(phi);
      const y = r * Math.cos(theta) - 0.2; // adjust origin offset

      generated.push([x, y, z]);
    }
    setSeeds(generated);
  }, []);

  return (
    <group>
      {seeds.map((pos, idx) => (
        <mesh key={idx} position={pos} rotation={[Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.4]}>
          <boxGeometry args={[0.04, 0.02, 0.09]} />
          <meshStandardMaterial color="#eae5da" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Inner model handler animating the layers in the frame loop
function BurgerModel({ progressRef }: BurgerCanvasProps) {
  const crownRef = useRef<THREE.Group>(null);
  const tomatoRef = useRef<THREE.Group>(null);
  const cheeseRef = useRef<THREE.Mesh>(null);
  const pattyRef = useRef<THREE.Mesh>(null);
  const heelRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const progress = progressRef.current;

    // Separate burger layers vertically based on scroll progress
    if (crownRef.current) {
      crownRef.current.position.y = 0.75 + progress * 1.5;
      crownRef.current.rotation.y = progress * 0.25;
      crownRef.current.rotation.z = progress * -0.05;
    }
    if (tomatoRef.current) {
      tomatoRef.current.position.y = 0.3 + progress * 0.75;
      tomatoRef.current.rotation.y = progress * -0.3;
    }
    if (cheeseRef.current) {
      cheeseRef.current.position.y = 0.08 + progress * 0.15;
      cheeseRef.current.rotation.y = progress * 0.15;
    }
    if (pattyRef.current) {
      pattyRef.current.position.y = -0.22 - progress * 0.65;
      pattyRef.current.rotation.y = progress * -0.2;
    }
    if (heelRef.current) {
      heelRef.current.position.y = -0.65 - progress * 1.35;
      heelRef.current.rotation.y = progress * 0.15;
    }
  });

  return (
    <group position={[0, -0.2, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* 1. Crown Bun (Hemisphere) */}
      <group ref={crownRef}>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#b27e3d" roughness={0.55} metalness={0.05} />
        </mesh>
        {/* Flat bun cut face */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.02, 32]} />
          <meshStandardMaterial color="#f0d3a8" roughness={0.7} />
        </mesh>
        <SesameSeeds />
      </group>

      {/* 2. Tomatoes (Double flat slices) */}
      <group ref={tomatoRef}>
        <mesh position={[-0.4, 0.1, -0.2]} rotation={[0.1, 0.2, -0.05]}>
          <cylinderGeometry args={[0.65, 0.65, 0.16, 32]} />
          <meshStandardMaterial color="#c62828" roughness={0.65} />
        </mesh>
        <mesh position={[0.4, 0.08, 0.2]} rotation={[0.05, -0.1, 0.1]}>
          <cylinderGeometry args={[0.65, 0.65, 0.16, 32]} />
          <meshStandardMaterial color="#c62828" roughness={0.65} />
        </mesh>
      </group>

      {/* 3. Melted Truffle Cheddar Cheese (Square slice draped over) */}
      <mesh ref={cheeseRef} position={[0, 0.05, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.75, 0.04, 1.75]} />
        <meshStandardMaterial color="#e5a91a" roughness={0.4} />
      </mesh>

      {/* 4. Hand-Pressed Wagyu Patty (Charred thick cylinder) */}
      <mesh ref={pattyRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.45, 1.48, 0.38, 32]} />
        <meshStandardMaterial color="#35221b" roughness={0.9} bumpScale={0.05} />
      </mesh>

      {/* 5. Heel Bun (Flat cylinder) */}
      <mesh ref={heelRef} position={[0, -0.55, 0]}>
        <cylinderGeometry args={[1.5, 1.45, 0.26, 32]} />
        <meshStandardMaterial color="#b27e3d" roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  );
}

export default function BurgerCanvas({ progressRef }: BurgerCanvasProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!webglSupported) return null;

  return (
    <div className="w-full h-full min-h-[450px] md:min-h-[550px] relative pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        {/* Stylized premium restaurant lighting keys */}
        <directionalLight position={[6, 12, 4]} intensity={1.3} castShadow />
        <directionalLight position={[-6, -6, 2]} intensity={0.3} />
        <pointLight position={[0, 4, -4]} intensity={0.4} color="#f2ca50" />
        
        <BurgerModel progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
