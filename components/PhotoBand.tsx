import Image from "next/image";

// A wide photo under a page heading (owner, 2026-11-21: images on every page, in the site's design). Same frame as
// DashboardPhoto on the homepage: rounded-2xl, hairline border, black ground; a soft fade into the page at the foot.
export function PhotoBand({
  src,
  alt,
  priority = true,
  tall = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** 3:2 instead of the wide banner, for narrow columns. */
  tall?: boolean;
}) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-border bg-black ${tall ? "aspect-[3/2]" : "aspect-[16/9] sm:aspect-[12/5]"}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}
