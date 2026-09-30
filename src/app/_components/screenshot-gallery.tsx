import Image from "next/image";
import { Screenshot } from "@/types/project";

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {screenshots.map((s) => (
        <figure key={s.src} className="overflow-hidden rounded-lg border border-border">
          <div className="relative aspect-video bg-surface">
            <Image src={s.src} alt={s.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          {s.caption && (
            <figcaption className="border-t border-border bg-surface px-3 py-2 text-xs text-muted">
              {s.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}