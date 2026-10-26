import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "IISF KNIT Sultanpur: Got an idea? Apply.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand-style social card, reused by every page that doesn't define its own. */
export default async function OgImage() {
  const font = await readFile(join(process.cwd(), "src/assets/ArchivoBlack-Regular.ttf"));

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#FFF8E7", padding: 64, fontFamily: "Archivo" }}>
        <div style={{ display: "flex", alignSelf: "flex-start", border: "6px solid #111", borderRadius: 999, background: "#C6F432", padding: "10px 28px", fontSize: 30, boxShadow: "6px 6px 0 #111" }}>
          IISF · KNIT SULTANPUR
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, textTransform: "uppercase", color: "#111" }}>
          <span>Got an idea?</span>
          <span style={{ display: "flex" }}>
            <span style={{ background: "#FFD60A", padding: "0 16px", transform: "rotate(-1.5deg)" }}>Apply.</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["#FF4FA3", "#2F5BFF", "#C9B6FF", "#C6F432"].map((c) => (
            <div key={c} style={{ width: 64, height: 64, borderRadius: 999, background: c, border: "6px solid #111" }} />
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: font, style: "normal", weight: 400 }] },
  );
}
