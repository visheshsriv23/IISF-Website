import * as THREE from "three";

export const INK = "#111111";

let gradient: THREE.DataTexture | null = null;

/** 3-step ramp for MeshToonMaterial: flat, comic-book shading that matches the brutal style. */
export function toonGradient() {
  if (gradient) return gradient;
  gradient = new THREE.DataTexture(new Uint8Array([90, 90, 90, 255, 190, 190, 190, 255, 255, 255, 255, 255]), 3, 1);
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
  gradient.needsUpdate = true;
  return gradient;
}

/** Reads the next/font family name from a CSS variable so canvas text uses the brand fonts. */
export function cssFont(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
