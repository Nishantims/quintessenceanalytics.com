import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Plain "Q" letterform, transparent background — no icon box, no bar
// shapes, matching the text-only "QA.com" logo used everywhere else.
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
          fontSize: 26,
          fontWeight: 800,
          color: "#FF6699",
        }}
      >
        Q
      </div>
    ),
    size
  );
}
