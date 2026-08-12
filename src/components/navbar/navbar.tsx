"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  function sectionHref(id: string) {
    return isHome ? `#${id}` : `/${locale}#${id}`;
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = SECTION_IDS.map((id) => ({
    id,
    label: t(id),
  }));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border transition-all duration-300",
            scrolled
              ? "glass border-border px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
              : "border-transparent px-2 py-2"
          )}
        >
          <a
            href={sectionHref("home")}
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-mono text-sm font-bold">
              M
            </span>
            <span className="hidden sm:inline">Mahdi Ibrahim</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={sectionHref(item.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isHome && active === item.id
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {isHome && active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-muted"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={sectionHref("contact")}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:brightness-110"
            >
              {t("letsTalk")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden"
          >
            <Container className="mt-2">
              <div className="glass rounded-2xl border border-border p-4 shadow-xl">
                <nav className="flex flex-col" aria-label="Mobile">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={sectionHref(item.id)}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-xl px-3 py-3 text-base font-medium transition-colors",
                        isHome && active === item.id
                          ? "bg-muted text-foreground"
                          : "text-foreground-muted hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <a
                  href={sectionHref("contact")}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 flex h-12 items-center justify-center gap-1.5 rounded-full bg-accent text-sm font-medium text-accent-foreground"
                >
                  {t("letsTalk")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
