import { ImageResponse } from "next/og";

export const alt = "Maison Belle — Beauty Studio Premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// shortcut: system serif keeps OG generation dependency-free; bundle Playfair if exact brand typography is required.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#FFF9F6",
        color: "#593D45",
        padding: "72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-120px",
          top: "-120px",
          width: "520px",
          height: "520px",
          borderRadius: "999px",
          background: "#F3DDE3",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "72px",
          bottom: "72px",
          width: "260px",
          height: "360px",
          background: "#C97991",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#7A5A62",
            }}
          >
            Beauty atelier
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 98,
              lineHeight: 0.95,
              fontFamily: "serif",
              maxWidth: 760,
            }}
          >
            Maison Belle
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 32,
              color: "#7A5A62",
              maxWidth: 640,
            }}
          >
            Cantik dengan caramu.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 22,
            color: "#7A5A62",
          }}
        >
          <span style={{ width: 44, height: 1, background: "#A8516A" }} />
          Hair · Nails · Makeup · Lash &amp; Brow
        </div>
      </div>
    </div>,
    { ...size },
  );
}
