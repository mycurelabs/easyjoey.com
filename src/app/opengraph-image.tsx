import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "EasyJoey - Clinic Software for Filipino Doctors"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
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
          background: "linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%)",
          padding: "60px",
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "24px",
              fontSize: "48px",
            }}
          >
            E
          </div>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "white",
            }}
          >
            EasyJoey
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 600,
            color: "white",
            textAlign: "center",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          Clinic Software for Filipino Doctors
        </div>

        {/* Value Proposition */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          More time for patients. Less time on paperwork.
        </div>

        {/* Features Bar */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {["EMR", "Offline-Ready", "Free Forever"].map((feature) => (
            <div
              key={feature}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                padding: "12px 24px",
                borderRadius: "100px",
                color: "white",
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
