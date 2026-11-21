import Image from "next/image";
import { blurProps } from "@/lib/blur";

export function DashboardPhoto({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-black">
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className="h-auto w-full"
        sizes="(min-width: 1024px) 640px, 100vw"
        {...blurProps(src)}
      />
    </div>
  );
}
