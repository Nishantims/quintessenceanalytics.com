import Image from "next/image";

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
      />
    </div>
  );
}
