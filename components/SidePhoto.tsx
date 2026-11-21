import Image from "next/image";
import { blurProps } from "@/lib/blur";

// A photo beside text (owner, 2026-11-21: "keep the image size as on the contact page, on the right side of the
// text, in alternate sections"). Same frame as DashboardPhoto: rounded-2xl, hairline border, black ground. 4:3 by
// default; `wide` = 3:2 for the dashboard screenshots. Shows a blurred preview while the photo loads.
export function SidePhoto({
  src,
  alt,
  priority = false,
  wide = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-border bg-black ${wide ? "aspect-[3/2]" : "aspect-[4/3]"} ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" {...blurProps(src)} />
    </div>
  );
}
