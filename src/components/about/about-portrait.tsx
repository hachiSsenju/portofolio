import Image from "next/image";
import { MapPin } from "lucide-react";
import { site } from "@/data/site";

export function AboutPortrait() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-background-alt">
      <Image
        src="/images/mahdi-ibrahim.jpg"
        alt="Mahdi Ibrahim"
        fill
        priority
        sizes="(min-width: 1024px) 380px, 90vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute -right-8 -top-8 z-10 h-32 w-32 rotate-12 rounded-[2rem] bg-accent"
      />

      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-xl border border-border bg-card/90 px-4 py-3 backdrop-blur">
        <div>
          <p className="text-sm font-semibold">Mahdi Ibrahim</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-foreground-muted">
            <MapPin className="h-3 w-3" />
            {site.location}
          </p>
        </div>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
      </div>
    </div>
  );
}
