import { brandColors, logoAspect, logoDataUri } from "@/lib/brand";

/**
 * Shared 1200×630 social card (content doc: "Face search demo visual, NOT logo —
 * left: selfie upload, right: instant results"). Rendered by next/og (flexbox only).
 */
export function OgCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  // The logo carries the brand name; show only what the eyebrow adds (e.g. a blog category).
  const label = eyebrow.replace(/^Snapdaps\s*·?\s*/, "");
  const tones = ["#f6b38a", "#a9b8f0", "#f3d48a", "#b8e0c2", "#f2a6c3", "#c9b6f2", "#9fd6e0", "#f5c9a0", "#a9b8f0"];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#ffffff",
        color: "#09090b",
        padding: 64,
        gap: 48,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1.15 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, color: "#71717a" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
          <img src={logoDataUri} width={Math.round(48 * logoAspect)} height={48} alt="Snapdaps" />
          {label && <span style={{ display: "flex" }}>{label}</span>}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 54 : 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
          {title.length > 100 ? `${title.slice(0, 97)}…` : title}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#71717a" }}>Upload once. Let AI do the rest.</div>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 22 }}>
        {/* Selfie */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            background: "#fff",
            borderRadius: 28,
            padding: 22,
            border: "2px solid #e2e5eb",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 999,
              background: "#e8b48f",
              border: `6px solid ${brandColors.blue}`,
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 20, fontWeight: 600 }}>Your selfie</div>
        </div>
        <div style={{ display: "flex", fontSize: 40, color: brandColors.blue }}>→</div>
        {/* Results */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "#fff",
            borderRadius: 28,
            padding: 20,
            border: "2px solid #e2e5eb",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", width: 252, gap: 10 }}>
            {tones.map((t, i) => (
              <div key={i} style={{ width: 76, height: 76, borderRadius: 12, background: t, display: "flex" }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, fontWeight: 600, color: "#157a3c" }}>38 photos found</div>
        </div>
      </div>
    </div>
  );
}
