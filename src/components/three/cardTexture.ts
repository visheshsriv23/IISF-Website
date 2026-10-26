import * as THREE from "three";
import { ACCENT_HEX, RARITY, sectorAccent, splitPair } from "@/lib/utils";
import type { Startup } from "@/shared/types";
import { cssFont, INK } from "./toon";

/** Card textures are drawn on a 2D canvas (5:7, same as the DOM trading card). */
export const CARD_W = 1000;
export const CARD_H = 1400;
const R = 56;

type Fonts = { display: string; body: string; hand: string; hindi: string };

export async function loadCardFonts(): Promise<Fonts> {
  const fonts = {
    display: cssFont("--font-archivo", "Arial Black"),
    body: cssFont("--font-grotesk", "system-ui"),
    hand: cssFont("--font-caveat", "cursive"),
    hindi: cssFont("--font-baloo", "sans-serif"),
  };
  await Promise.all([
    document.fonts.load(`100px ${fonts.display}`),
    document.fonts.load(`bold 40px ${fonts.body}`),
    document.fonts.load(`40px ${fonts.hand}`),
    document.fonts.load(`40px ${fonts.hindi}`, "जुगाड़"),
  ]);
  return fonts;
}

function canvas() {
  const el = Object.assign(document.createElement("canvas"), { width: CARD_W, height: CARD_H });
  const ctx = el.getContext("2d")!;
  // Rounded card silhouette; everything outside stays transparent.
  ctx.beginPath();
  ctx.roundRect(0, 0, CARD_W, CARD_H, R);
  ctx.clip();
  return { el, ctx };
}

function box(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string, r = 24, line = 10) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = line;
  ctx.strokeStyle = INK;
  ctx.stroke();
}

/** Shrinks the font until the text fits the width. */
function fitText(ctx: CanvasRenderingContext2D, text: string, family: string, size: number, maxWidth: number) {
  do ctx.font = `${size--}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > 20);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 2) {
  const words = text.split(" ");
  let line = "";
  let lines = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      if (++lines === maxLines) return;
      line = word;
    } else line = test;
  }
  ctx.fillText(line, x, y + lines * lineHeight);
}

function texture(el: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(el);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function drawFront(s: Startup, f: Fonts) {
  const { el, ctx } = canvas();
  const accent = ACCENT_HEX[sectorAccent(s.sector)];

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Header strip
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, CARD_W, 120);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 120, CARD_W, 10);
  ctx.font = `bold 46px ${f.body}`;
  ctx.fillText(s.sector.toUpperCase(), 56, 82);
  ctx.textAlign = "right";
  ctx.fillText(`#${String(s.sort).padStart(3, "0")}`, CARD_W - 56, 82);
  ctx.textAlign = "left";

  // Art box with the startup's initials
  box(ctx, 50, 170, 900, 540, accent);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(55, 175, 890, 530, 20);
  ctx.clip();
  ctx.strokeStyle = "rgba(17,17,17,0.12)";
  ctx.lineWidth = 6;
  for (let i = -600; i < 1000; i += 34) {
    ctx.beginPath();
    ctx.moveTo(50 + i, 710);
    ctx.lineTo(50 + i + 540, 170);
    ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.font = `280px ${f.display}`;
  const initials = s.name.replace(/[^A-Z]/g, "").slice(0, 2) || s.name.slice(0, 2).toUpperCase();
  ctx.fillText(initials, CARD_W / 2, 545);
  ctx.textAlign = "left";

  // Name + tagline
  fitText(ctx, s.name.toUpperCase(), f.display, 110, 900);
  ctx.fillText(s.name.toUpperCase(), 50, 840);
  ctx.font = `500 40px ${f.body}`;
  wrap(ctx, s.tagline, 50, 905, 900, 50);

  // Stats panel
  const stats = [["STAGE", s.stage], ["TEAM", `${s.team_size} ppl`], ["FUNDING", s.funding || "—"], ["FOUNDED", String(s.founded)]];
  box(ctx, 50, 1020, 900, 230, "#fff", 22, 8);
  ctx.fillStyle = INK;
  ctx.fillRect(496, 1020, 8, 230);
  ctx.fillRect(50, 1131, 900, 8);
  stats.forEach(([label, value], i) => {
    const x = 80 + (i % 2) * 450;
    const y = 1020 + Math.floor(i / 2) * 115;
    ctx.globalAlpha = 0.6;
    ctx.font = `bold 26px ${f.body}`;
    ctx.fillText(label, x, y + 42);
    ctx.globalAlpha = 1;
    ctx.font = `bold 46px ${f.body}`;
    ctx.fillText(value, x, y + 92);
  });

  // Rarity pill
  const rarity = RARITY[s.stage].toUpperCase();
  ctx.font = `bold 34px ${f.body}`;
  const w = ctx.measureText(rarity).width + 60;
  box(ctx, 50, 1280, w, 70, "#FFD60A", 35, 6);
  ctx.fillStyle = INK;
  ctx.fillText(rarity, 80, 1327);

  // Card border last so it sits on top of everything
  ctx.lineWidth = 28;
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.roundRect(0, 0, CARD_W, CARD_H, R);
  ctx.stroke();
  return texture(el);
}

export function drawBack(s: Startup, f: Fonts) {
  const { el, ctx } = canvas();
  ctx.fillStyle = "#2F5BFF";
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Star pattern
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.font = `60px ${f.display}`;
  for (let y = 60; y < CARD_H; y += 120) for (let x = (y / 120) % 2 ? 40 : 100; x < CARD_W; x += 120) ctx.fillText("✦", x, y);

  box(ctx, 90, 200, 820, 1000, "#fff", 36, 12);
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.font = `200px ${f.display}`;
  ctx.fillText("IISF", CARD_W / 2, 430);
  ctx.font = `bold 38px ${f.body}`;
  ctx.fillText("KNIT SULTANPUR", CARD_W / 2, 495);

  ctx.font = `bold 30px ${f.body}`;
  ctx.globalAlpha = 0.6;
  ctx.fillText("FOUNDERS", CARD_W / 2, 610);
  ctx.globalAlpha = 1;
  ctx.font = `64px ${f.hand}`;
  (s.founders.length ? s.founders : ["Your name here?"]).slice(0, 3).forEach((entry, i) => {
    const [name, role] = splitPair(entry);
    ctx.fillText(role ? `${name} · ${role}` : name, CARD_W / 2, 690 + i * 80, 760);
  });

  box(ctx, 200, 960, 600, 110, "#C6F432", 55, 8);
  ctx.fillStyle = INK;
  ctx.font = `56px ${f.hindi}`;
  ctx.fillText("जुगाड़ से जीनियस तक", CARD_W / 2, 1033);

  ctx.font = `40px ${f.display}`;
  ctx.fillStyle = "#fff";
  ctx.fillText("COLLECT 'EM ALL", CARD_W / 2, 1310);

  ctx.lineWidth = 28;
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.roundRect(0, 0, CARD_W, CARD_H, R);
  ctx.stroke();
  return texture(el);
}
