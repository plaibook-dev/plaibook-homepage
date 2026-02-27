import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Plaibook — Pest Control Companies Are Bleeding Money. We Fix That.";

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
          background: "linear-gradient(135deg, #1A1F2E 0%, #232838 50%, #1A1F2E 100%)",
          padding: 80,
          position: "relative",
        }}
      >
        {/* Subtle radial glow behind content */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(106, 168, 154, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Logo placeholder - larger with shadow */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "linear-gradient(135deg, #6AA89A, #54877C)",
            marginBottom: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(106, 168, 154, 0.3), 0 0 0 1px rgba(106, 168, 154, 0.1)",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            P
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#FAFAFA",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          Pest Control Companies Are
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#8AC0B4",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 32,
          }}
        >
          Bleeding Money. We Fix That.
        </div>

        {/* Horizontal divider line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "linear-gradient(90deg, transparent, #6AA89A, transparent)",
            marginBottom: 28,
            borderRadius: 2,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#8B90A0",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          AI-Powered Revenue Recovery for Home Services
        </div>

        {/* Stat pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: 100,
              background: "rgba(106, 168, 154, 0.12)",
              border: "1px solid rgba(106, 168, 154, 0.2)",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#8AC0B4",
                marginRight: 8,
              }}
            >
              17x
            </span>
            <span style={{ fontSize: 14, color: "#8B90A0" }}>
              appointments
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: 100,
              background: "rgba(212, 148, 11, 0.1)",
              border: "1px solid rgba(212, 148, 11, 0.2)",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#D4940B",
                marginRight: 8,
              }}
            >
              $700K+
            </span>
            <span style={{ fontSize: 14, color: "#8B90A0" }}>revenue</span>
          </div>
        </div>

        {/* Footer domain */}
        <div
          style={{
            fontSize: 16,
            color: "#5A6175",
            position: "absolute",
            bottom: 36,
            letterSpacing: "0.05em",
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
