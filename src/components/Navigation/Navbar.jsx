"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TIBCLogo from "../../../public/assets/TIBC.png";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Sermons", href: "/sermons" },
];

const ThemeToggle = ({ className }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("relative", className)}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? -30 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.18 }}
      >
        <Sun className="h-5 w-5" aria-hidden="true" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 30,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.18 }}
        className="absolute"
      >
        <Moon className="h-5 w-5" aria-hidden="true" />
      </motion.div>
    </Button>
  );
};

const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile sheet on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Transparent navbar sits on top of the dark homepage hero: force
  // light-on-dark text there so the links stay legible in every theme.
  const overHero = pathname === "/" && !scrolled;

  if (!mounted) {
    return <div className="h-[76px]" aria-hidden />;
  }

  return (
    <div className="sticky top-0 z-50">
      <header
        className={cn(
          "transition-[background-color,border-color] duration-200",
          !overHero
            ? "bg-background/80 backdrop-blur-xl border-b border-border/70 shadow-premium"
            : "bg-black/10",
        )}
      >
        <nav className="container mx-auto px-4 h-[76px] flex justify-between items-center">
          <Link href="/" aria-label="Home" className="flex items-center">
            <Image
              src={TIBCLogo}
              alt="Tembisa Independent Baptist Church"
              width={104}
              height={104}
              priority
              className={cn(
                "h-14 w-auto object-contain",
                resolvedTheme === "light" && !overHero ? "invert" : "",
              )}
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    overHero
                      ? cn(
                          "[text-shadow:0_1px_12px_rgb(0_0_0/0.6)]",
                          active
                            ? "text-white"
                            : "text-white/80 hover:text-white",
                        )
                      : active
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-4 right-4 -bottom-0.5 h-px origin-left transition-transform duration-300",
                      overHero ? "bg-white" : "bg-primary",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
            <div
              className={cn(
                "mx-2 h-6 w-px",
                overHero ? "bg-white/30" : "bg-border",
              )}
            />
            <ThemeToggle
              className={
                overHero ? "text-white hover:bg-white/10 hover:text-white" : ""
              }
            />
            <Link href="/contact-us" className="ml-1">
              <Button size="sm">Contact</Button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle
              className={
                overHero ? "text-white hover:bg-white/10 hover:text-white" : ""
              }
            />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              ref={menuButtonRef}
              className={
                overHero ? "text-white hover:bg-white/10 hover:text-white" : ""
              }
              onClick={() => setIsOpen((v) => !v)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.18 }}
              >
                {isOpen ? <X /> : <Menu />}
              </motion.div>
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              id="mobile-navigation"
              className="md:hidden overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/contact-us" className="mt-2">
                  <Button className="w-full">Contact Us</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;
