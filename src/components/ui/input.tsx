import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-border bg-background-alt px-4 text-sm text-foreground placeholder:text-foreground-muted/70 transition-colors outline-none focus:border-accent focus:ring-2 focus:ring-accent/25",
        "aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:focus:ring-red-500/25",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full min-h-32 resize-y rounded-xl border border-border bg-background-alt px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/70 transition-colors outline-none focus:border-accent focus:ring-2 focus:ring-accent/25",
        "aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:focus:ring-red-500/25",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-xl border border-border bg-background-alt px-4 text-sm text-foreground transition-colors outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22 fill=%22none%22><path d=%22M1 1L6 6L11 1%22 stroke=%22%2356605c%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-no-repeat bg-[right_1rem_center]",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
