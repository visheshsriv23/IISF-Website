"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Startup } from "@/shared/types";
import { drawBack, drawFront, loadCardFonts } from "./cardTexture";
import { INK, prefersReducedMotion } from "./toon";

const W = 2.5;
const H = 3.5;

/** Hard-edged foil stripes that sweep across the card face, masked by the card's rounded shape. */
const foil = {
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D map; uniform float uTime; varying vec2 vUv;
    void main(){
      float a = texture2D(map, vUv).a;
      float d = vUv.x + vUv.y * 0.6 - mod(uTime * 0.45, 3.2) + 0.9;
      float band = step(0.0, d) * step(d, 0.1) + step(0.16, d) * step(d, 0.2);
      gl_FragColor = vec4(1.0, 1.0, 1.0, band * a * 0.5);
    }`,
};

/** Drag-to-spin with momentum. Listens on the canvas element so vertical page scroll still works. */
function useSpin(still: boolean) {
  const gl = useThree((s) => s.gl);
  const spin = useRef({ velocity: still ? 0 : 14, dragging: false, lastX: 0 });

  useEffect(() => {
    const el = gl.domElement;
    const s = spin.current;
    const down = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.velocity = (e.clientX - s.lastX) * 0.9;
      s.lastX = e.clientX;
    };
    const up = () => (s.dragging = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  return spin;
}

function Card({ front, back, still }: { front: THREE.Texture; back: THREE.Texture; still: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const shadow = useRef<THREE.Mesh>(null!);
  const foilRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => ({ map: { value: front }, uTime: { value: 0 } }), [front]);
  const spinRef = useSpin(still);

  useFrame(({ pointer, clock }, dt) => {
    const s = spinRef.current;
    const g = group.current;
    if (!s.dragging) s.velocity = THREE.MathUtils.damp(s.velocity, still ? 0 : 0.55, 1.5, dt);
    g.rotation.y += s.velocity * dt;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, still ? 0 : -pointer.y * 0.25, 4, dt);
    g.position.y = still ? 0 : Math.sin(clock.elapsedTime * 1.4) * 0.08;
    foilRef.current.uniforms.uTime.value = clock.elapsedTime;
    // Flat ink "drop shadow" that narrows as the card turns edge-on
    shadow.current.scale.x = 0.25 + Math.abs(Math.cos(g.rotation.y)) * 0.95;
  });

  return (
    <>
      <group ref={group}>
        <RoundedBox args={[W * 0.985, H * 0.985, 0.05]} radius={0.12} smoothness={4}>
          <meshBasicMaterial color={INK} />
        </RoundedBox>
        <mesh position-z={0.03}>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial map={front} transparent alphaTest={0.5} toneMapped={false} />
        </mesh>
        <mesh position-z={0.031}>
          <planeGeometry args={[W, H]} />
          <shaderMaterial ref={foilRef} {...foil} uniforms={uniforms} transparent depthWrite={false} />
        </mesh>
        <mesh position-z={-0.03} rotation-y={Math.PI}>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial map={back} transparent alphaTest={0.5} toneMapped={false} />
        </mesh>
      </group>
      <mesh ref={shadow} position={[0.1, -H / 2 - 0.22, 0]} rotation-x={-Math.PI / 2.1}>
        <circleGeometry args={[0.8, 48]} />
        <meshBasicMaterial color={INK} />
      </mesh>
    </>
  );
}

/** Drag-to-spin 3D trading card. Swapping the startup triggers a quick flip. */
export default function CardStage({ startup }: { startup: Startup }) {
  const [textures, setTextures] = useState<{ front: THREE.Texture; back: THREE.Texture } | null>(null);
  const [still] = useState(prefersReducedMotion);

  useEffect(() => {
    let cancelled = false;
    let made: { front: THREE.Texture; back: THREE.Texture } | null = null;
    loadCardFonts().then((fonts) => {
      if (cancelled) return;
      made = { front: drawFront(startup, fonts), back: drawBack(startup, fonts) };
      setTextures(made);
    });
    return () => {
      cancelled = true;
      made?.front.dispose();
      made?.back.dispose();
    };
  }, [startup]);

  return (
    <div className="size-full cursor-grab touch-pan-y active:cursor-grabbing">
      <Canvas aria-hidden dpr={[1, 2]} camera={{ position: [0, -0.15, 7.8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        {/* Keyed so each new startup remounts the card and lands with a spin flourish */}
        {textures && <Card key={textures.front.uuid} front={textures.front} back={textures.back} still={still} />}
      </Canvas>
    </div>
  );
}
