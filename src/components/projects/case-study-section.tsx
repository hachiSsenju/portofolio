import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function CaseStudySection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      as="div"
      className={cn(
        "grid gap-4 border-t border-border py-10 sm:grid-cols-[200px_1fr] sm:gap-10",
        className
      )}
    >
      <h2 className="font-mono text-xs font-medium tracking-[0.15em] text-accent uppercase">
        {title}
      </h2>
      <div className="max-w-2xl text-base text-foreground-muted">
        {children}
      </div>
    </Reveal>
  );
}

export function CaseStudyList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
