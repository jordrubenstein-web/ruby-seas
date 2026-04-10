"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { LOGO_GLB_PATH, USE_LOGO_GLB } from "@/lib/logo3d";

export type GlobeModelProps = {
  scrollProgress: number;
};

/** Procedural faceted globe + tuna + waves + ruby (no external .glb). */
function ProceduralGlobe({ scrollProgress }: GlobeModelProps) {
  const root = useRef<THREE.Group>(null);
  const tunaOrbitRef = useRef<THREE.Group>(null);
  const rubyRef = useRef<THREE.Mesh>(null);
  const waveMatRefs = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  useFrame((state, delta) => {
    const boost = 1 + scrollProgress * 0.65;
    if (root.current) {
      root.current.rotation.y += delta * 0.52 * boost;
      const s = 1 + scrollProgress * 0.08;
      root.current.scale.setScalar(s);
    }
    if (tunaOrbitRef.current) {
      tunaOrbitRef.current.rotation.y += delta * 0.18;
    }
    if (rubyRef.current) {
      const baseY = rubyRef.current.userData.baseY ?? rubyRef.current.position.y;
      if (rubyRef.current.userData.baseY === undefined) {
        rubyRef.current.userData.baseY = baseY;
      }
      rubyRef.current.position.y =
        rubyRef.current.userData.baseY +
        Math.sin(state.clock.elapsedTime * 2.2) * 0.035;
    }
    if (scrollProgress > 0.65) {
      const pulse = 0.72 + Math.sin(state.clock.elapsedTime * 3) * 0.12;
      for (const m of waveMatRefs.current) {
        if (m) m.opacity = Math.min(1, pulse);
      }
    }
  });

  const tunaMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#B8C4D0",
        metalness: 0.72,
        roughness: 0.22,
      }),
    [],
  );

  const sparklePositions = useMemo(
    () =>
      [0, 1, 2].map((i) => {
        const v = new THREE.Vector3().setFromSphericalCoords(
          1.03,
          0.55 + i * 0.35,
          i * 2.05,
        );
        return [v.x, v.y, v.z] as [number, number, number];
      }),
    [],
  );

  return (
    <group ref={root}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#3A7CB8"
          metalness={0.15}
          roughness={0.32}
        />
      </mesh>
      <mesh scale={0.98}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#1E4870"
          metalness={0.1}
          roughness={0.45}
          transparent
          opacity={0.35}
        />
      </mesh>
      {sparklePositions.map((position, i) => (
        <Billboard key={i} follow position={position}>
          <mesh>
            <planeGeometry args={[0.09, 0.09]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={1.35}
            />
          </mesh>
        </Billboard>
      ))}
      <group ref={tunaOrbitRef}>
        <group position={[1.32, 0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={tunaMat}>
            <capsuleGeometry args={[0.06, 0.38, 6, 12]} />
          </mesh>
          <mesh
            position={[0.22, 0.06, 0]}
            rotation={[0, 0, -0.55]}
            material={tunaMat}
          >
            <coneGeometry args={[0.12, 0.2, 6]} />
          </mesh>
        </group>
        <group position={[-1.12, -0.22, 0.52]} rotation={[0.35, -2.15, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={tunaMat}>
            <capsuleGeometry args={[0.05, 0.34, 6, 12]} />
          </mesh>
        </group>
      </group>
      <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, -0.42, 0]}>
        <torusGeometry args={[0.92, 0.05, 8, 48, Math.PI * 1.1]} />
        <meshPhysicalMaterial
          ref={(el) => {
            waveMatRefs.current[0] = el;
          }}
          color="#56C5B0"
          metalness={0}
          roughness={0.2}
          transmission={0.55}
          thickness={0.4}
          transparent
          opacity={0.85}
          ior={1.33}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.2, 0.3]} position={[0.05, -0.55, 0.1]}>
        <torusGeometry args={[0.88, 0.04, 8, 40, Math.PI * 0.85]} />
        <meshPhysicalMaterial
          ref={(el) => {
            waveMatRefs.current[1] = el;
          }}
          color="#56C5B0"
          metalness={0}
          roughness={0.22}
          transmission={0.45}
          thickness={0.35}
          transparent
          opacity={0.75}
          ior={1.33}
        />
      </mesh>
      <mesh ref={rubyRef} position={[0.52, 0.55, 0.82]} scale={0.11} rotation={[0.4, -0.5, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#B91C1C"
          metalness={0.06}
          roughness={0.12}
          transmission={0.28}
          thickness={0.15}
          ior={1.77}
        />
      </mesh>
    </group>
  );
}

/** Optional: load Blender export when `NEXT_PUBLIC_USE_LOGO_GLB=1`. */
function GlbGlobe({ scrollProgress }: GlobeModelProps) {
  const { scene } = useGLTF(LOGO_GLB_PATH);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const boost = 1 + scrollProgress * 0.65;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.52 * boost;
      const s = 1 + scrollProgress * 0.08;
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clone} />
    </group>
  );
}

export function GlobeModel(props: GlobeModelProps) {
  if (USE_LOGO_GLB) {
    return <GlbGlobe {...props} />;
  }
  return <ProceduralGlobe {...props} />;
}

if (USE_LOGO_GLB) {
  useGLTF.preload(LOGO_GLB_PATH);
}
