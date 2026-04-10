"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { GlobeModel } from "./GlobeModel";

type Props = {
  className?: string;
  /** 0–1 from GSAP ScrollTrigger while the lockup is on screen */
  scrollProgress?: number;
};

export function Logo3DScene({ className, scrollProgress = 0 }: Props) {
  return (
    <Canvas
      className={className}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.15, 4.2], fov: 36 }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={1.15} />
           <directionalLight position={[-4, -2, 4]} intensity={0.35} color="#56C5B0" />
      {/* Globe must not share Suspense with Environment — preset loads remote HDR and blocks the whole tree with fallback=null (blank canvas). */}
      <Suspense fallback={null}>
        <GlobeModel scrollProgress={scrollProgress} />
      </Suspense>
      <Suspense fallback={null}>
        <Environment preset="city" background={false} />
      </Suspense>
    </Canvas>
  );
}
