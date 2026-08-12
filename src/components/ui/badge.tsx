import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border text-xs font-medium tracking-wide px-3 py-1",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-foreground-muted",
        accent: "border-accent/30 bg-accent-soft text-accent",
        outline: "border-border-strong text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
