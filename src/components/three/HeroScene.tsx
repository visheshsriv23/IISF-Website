"use client";

import { useLayoutEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Outlines, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { cssFont, INK, prefersReducedMotion, toonGradient } from "./toon";

const C = { lime: "#C6F432", pink: "#FF4FA3", sun: "#FFD60A", blue: "#2F5BFF", lilac: "#C9B6FF", paper: "#FFFFFF" };

/** Toon material + black outline, the building block of every hero object. */
function Toon({ color, outline = 0.045 }: { color: string; outline?: number }) {
  return (
    <>
      <meshToonMaterial color={color} gradientMap={toonGradient()} />
      <Outlines thickness={outline} color={INK} />
    </>
  );
}

/** Pops in with a bounce, wobbles on hover, does a full spin on click. */
function Prop({ children, position, delay = 0, scale = 1 }: { children: ReactNode; position: [number, number, number]; delay?: number; scale?: number }) {
  const ref = useRef<THREE.Group>(null!);

  useLayoutEffect(() => {
    const tween = gsap.from(ref.current.scale, { x: 0, y: 0, z: 0, duration: 1.1, delay: 0.3 + delay, ease: "elastic.out(1, 0.5)" });
    return () => void tween.kill();
  }, [delay]);

  const spin = () => gsap.to(ref.current.rotation, { y: `+=${Math.PI * 2}`, duration: 0.9, ease: "back.out(1.4)" });
  const hover = (on: boolean) => gsap.to(ref.current.scale, { x: scale * (on ? 1.15 : 1), y: scale * (on ? 1.15 : 1), z: scale * (on ? 1.15 : 1), duration: 0.3, ease: "back.out(2)" });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group ref={ref} position={position} scale={scale} onClick={spin} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        {children}
      </group>
    </Float>
  );
}

function RupeeCoin() {
  const face = useMemo(() => {
    const canvas = Object.assign(document.createElement("canvas"), { width: 256, height: 256 });
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = C.sun;
    ctx.fillRect(0, 0, 256, 256);
    ctx.lineWidth = 10;
    ctx.strokeStyle = INK;
    ctx.beginPath();
    ctx.arc(128, 128, 96, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = `150px ${cssFont("--font-archivo", "Arial Black")}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("₹", 128, 138);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Faces are separate discs (not cylinder caps) so the ₹ reads upright.
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.24, 48]} />
        <Toon color={C.sun} outline={0.05} />
      </mesh>
      {[1, -1].map((side) => (
        <mesh key={side} position={[0, 0.121 * side, 0]} rotation={[(-Math.PI / 2) * side, 0, 0]}>
          <circleGeometry args={[1, 48]} />
          <meshToonMaterial map={face} gradientMap={toonGradient()} />
        </mesh>
      ))}
    </group>
  );
}

function Bulb() {
  return (
    <group rotation={[0, 0, -0.3]}>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <Toon color={C.sun} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.45 - i * 0.16, 0]}>
          <cylinderGeometry args={[0.36 - i * 0.03, 0.36 - i * 0.03, 0.14, 24]} />
          <Toon color={C.lilac} outline={0.03} />
        </mesh>
      ))}
    </group>
  );
}

function Rocket() {
  const flame = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => flame.current.scale.setY(1 + Math.sin(clock.elapsedTime * 22) * 0.18));

  return (
    <group rotation={[0, 0, -0.65]}>
      <mesh>
        <capsuleGeometry args={[0.42, 1, 8, 24]} />
        <Toon color={C.paper} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <coneGeometry args={[0.42, 0.6, 24]} />
        <Toon color={C.pink} />
      </mesh>
      <mesh position={[0, 0.25, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.08, 24]} />
        <Toon color={C.blue} outline={0.03} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.sin((i * Math.PI * 2) / 3) * 0.42, -0.6, Math.cos((i * Math.PI * 2) / 3) * 0.42]} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
          <boxGeometry args={[0.06, 0.5, 0.4]} />
          <Toon color={C.pink} outline={0.03} />
        </mesh>
      ))}
      <mesh ref={flame} position={[0, -1.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.24, 0.6, 16]} />
        <Toon color={C.lime} outline={0.03} />
      </mesh>
    </group>
  );
}

function Star() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 0.45 : 1;
      const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
      shape[i ? "lineTo" : "moveTo"](Math.cos(a) * r, Math.sin(a) * r);
    }
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.06, bevelSegments: 2 });
    return geo.center();
  }, []);

  return (
    <mesh geometry={geometry}>
      <Toon color={C.pink} />
    </mesh>
  );
}

function Donut() {
  return (
    <mesh rotation={[0.9, 0.3, 0]}>
      <torusGeometry args={[0.7, 0.3, 24, 48]} />
      <Toon color={C.blue} />
    </mesh>
  );
}

function Block() {
  return (
    <RoundedBox args={[1, 1, 1]} radius={0.12} rotation={[0.5, 0.6, 0]}>
      <Toon color={C.lime} />
    </RoundedBox>
  );
}

/** Tilts the whole cluster toward the cursor and fits it to the canvas width. */
function Rig({ children, still }: { children: ReactNode; still: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();
  const fit = Math.min(1, viewport.width / 6.4);

  useFrame(({ pointer }, dt) => {
    if (still) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.35, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.2, 3, dt);
  });

  return (
    <group ref={group} scale={fit}>
      {children}
    </group>
  );
}

export default function HeroScene({ eventSource, compact }: { eventSource: RefObject<HTMLElement | null>; compact?: boolean }) {
  const still = prefersReducedMotion();

  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : "always"}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 6, 8]} intensity={2.4} />
      <Rig still={still}>
        <Prop position={[-2.15, 1.95, 0]} scale={0.85}><RupeeCoin /></Prop>
        <Prop position={[2.2, 2.0, -0.5]} delay={0.1}><Bulb /></Prop>
        <Prop position={[2.35, -0.6, 0.4]} delay={0.2} scale={0.85}><Rocket /></Prop>
        <Prop position={[-2.35, -1.6, 0.2]} delay={0.3} scale={0.8}><Star /></Prop>
        {!compact && <Prop position={[0.9, -2.35, -0.6]} delay={0.4} scale={0.75}><Donut /></Prop>}
        {!compact && <Prop position={[-0.4, 2.55, -1.2]} delay={0.5} scale={0.55}><Block /></Prop>}
      </Rig>
    </Canvas>
  );
}
