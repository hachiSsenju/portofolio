"use client";

import { useTranslations } from "next-intl";
import { stats } from "@/data/site";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function Stats() {
  const t = useTranslations("stats");

  return (
    <RevealGroup className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
      {stats.map((stat) => (
        <RevealItem key={stat.key} className="border-l-2 border-border pl-4">
          <div className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            <AnimatedCounter value={stat.value} />
          </div>
          <div className="mt-1 text-sm text-foreground-muted">
            {t(stat.key)}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
