import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D1321",
          borderRadius: 7,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 17 L10 9 L14 13 L20 5" stroke="#FF5A3C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="5" r="2.2" fill="#F2A93B" />
        </svg>
      </div>
    ),
    size
  );
}
