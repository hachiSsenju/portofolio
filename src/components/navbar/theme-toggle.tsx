"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("theme");

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={t("toggle")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-alt/60 text-foreground-muted transition-colors hover:text-accent hover:border-accent/40",
        className
      )}
    >
      {mounted && (
        <>
          <Sun
            className={cn(
              "absolute h-4 w-4 transition-all duration-300",
              isDark
                ? "scale-0 -rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            )}
          />
          <Moon
            className={cn(
              "absolute h-4 w-4 transition-all duration-300",
              isDark
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 rotate-90 opacity-0"
            )}
          />
        </>
      )}
    </button>
  );
}
