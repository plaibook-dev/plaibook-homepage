import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Plaibook — AI Sales Optimization for Home Services";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1F2E, #1A1A2E)",
          padding: 80,
        }}
      >
        {/* Logo placeholder */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "#6AA89A",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            P
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#FAFAFA",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          Your Sales Funnel Is Leaking.
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#8AC0B4",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 30,
          }}
        >
          We Plug the Holes.
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#6B7280",
            textAlign: "center",
          }}
        >
          AI-Powered Sales Optimization for Home Services
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#6B7280",
            position: "absolute",
            bottom: 40,
          }}
        >
          plaibook.tech
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
