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
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 2,
          padding: "6px 7px",
          background: "linear-gradient(135deg, #FF6699 0%, #9900CC 55%, #0066FF 100%)",
          borderRadius: 8,
        }}
      >
        <div style={{ width: 3, height: 8, borderRadius: 2, background: "#fff", display: "flex" }} />
        <div style={{ width: 3, height: 13, borderRadius: 2, background: "#fff", display: "flex" }} />
        <div style={{ width: 3, height: 18, borderRadius: 2, background: "#fff", display: "flex" }} />
      </div>
    ),
    size
  );
}
