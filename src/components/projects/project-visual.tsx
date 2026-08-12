import Image, { type StaticImageData } from "next/image";
import {
  Recycle,
  Home,
  Sprout,
  GraduationCap,
  Layers,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  ekolo: Recycle,
  senagrix: Home,
  farmingafrica: Sprout,
  school: GraduationCap,
  komizi: Layers,
  "ekolo-mobile": Truck,
};

const gradientMap: Record<string, string> = {
  ekolo: "from-accent/25 via-accent/5 to-transparent",
  senagrix: "from-sky-400/20 via-sky-400/5 to-transparent",
  farmingafrica: "from-amber-400/20 via-amber-400/5 to-transparent",
  school: "from-violet-400/20 via-violet-400/5 to-transparent",
  komizi: "from-pink-400/20 via-pink-400/5 to-transparent",
  "ekolo-mobile": "from-accent/20 via-teal-400/5 to-transparent",
};

export function ProjectVisual({
  variant,
  name,
  className,
  iconClassName,
  src,
  priority,
}: {
  variant: string;
  name: string;
  className?: string;
  iconClassName?: string;
  src?: string | StaticImageData;
  priority?: boolean;
}) {
  const Icon = iconMap[variant] ?? Layers;
  const gradient = gradientMap[variant] ?? "from-accent/20 to-transparent";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-background-alt",
        className
      )}
    >
      <div
        aria-hidden
        className={cn("absolute inset-0 bg-gradient-to-br", gradient)}
      />

      {src ? (
        <Image
          src={src}
          alt={`${name} product screenshot`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="relative object-contain p-6 drop-shadow-xl"
        />
      ) : (
        <>
          <span
            aria-hidden
            className="absolute -bottom-6 -right-4 font-display text-[7rem] font-bold leading-none tracking-tighter text-foreground/[0.05] select-none"
          >
            {name.slice(0, 2)}
          </span>
          <Icon
            className={cn("relative h-10 w-10 text-accent", iconClassName)}
            strokeWidth={1.5}
          />
        </>
      )}
    </div>
  );
}
