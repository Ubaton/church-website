import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Clock } from "lucide-react";
import TIBCLogo from "../../../public/assets/TIBC.png";
import {
  Facebook,
  Instagram,
  XTwitter,
  Youtube,
} from "@/components/ui/social-icons";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Sermons", href: "/sermons" },
  { label: "Plan Your Visit", href: "/plan-your-visit" },
  { label: "Contact", href: "/contact-us" },
];

const socials = [
  { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/tembisa_baptist_church/", Icon: Instagram },
  { name: "X", href: "https://x.com/ChurchTembisa", Icon: XTwitter },
  { name: "YouTube", href: "https://www.youtube.com/@tembisabaptistchurch2944", Icon: Youtube },
];

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border/70 bg-secondary/40">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Home" className="inline-flex">
              <Image
                src={TIBCLogo}
                alt="Tembisa Independent Baptist Church"
                width={120}
                height={120}
                className="h-16 w-auto object-contain dark:invert-0 invert"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An independent, KJV Baptist church in Tembisa — worshiping God,
              growing in the Word, and serving our community with the love of
              Christ.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ name, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Visit Us
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>1145 Umkhomazi St, Klipfontein View, Lethabong, 1685</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Sundays at 10:00 AM</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <Link
                  href="/contact-us"
                  className="transition-colors hover:text-primary"
                >
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Tembisa Independent Baptist Church.
            All rights reserved.
          </p>
          <p className="text-xs">
            Built with faith &amp; care · &ldquo;Let all things be done decently
            and in order.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
