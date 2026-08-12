"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  en: "EN",
  fr: "FR",
  wo: "WO",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-border bg-background-alt/60 p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={locale === l ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide transition-colors",
            locale === l
              ? "bg-accent text-accent-foreground"
              : "text-foreground-muted hover:text-foreground"
          )}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
