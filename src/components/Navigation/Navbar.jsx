"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Laptop, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          className={className}
        >
          <motion.div
            initial={false}
            animate={{
              rotate: theme === "dark" ? -90 : 0,
              scale: theme === "dark" ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-5 w-5" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{
              rotate: theme === "dark" ? 0 : 90,
              scale: theme === "dark" ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            <Moon className="h-5 w-5" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          "transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/70 shadow-premium"
            : "bg-transparent"
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
                theme === "light" && !overHero ? "invert" : ""
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
                  className={cn(
                    "group relative px-4 py-2 text-sm font-medium transition-colors",
                    overHero
                      ? cn(
                          "[text-shadow:0_1px_12px_rgb(0_0_0/0.6)]",
                          active
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                        )
                      : active
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-4 right-4 -bottom-0.5 h-px origin-left transition-transform duration-300",
                      overHero ? "bg-white" : "bg-primary",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
            <div
              className={cn(
                "mx-2 h-6 w-px",
                overHero ? "bg-white/30" : "bg-border"
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
              aria-label="Menu"
              className={
                overHero ? "text-white hover:bg-white/10 hover:text-white" : ""
              }
              onClick={() => setIsOpen((v) => !v)}
            >
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
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
