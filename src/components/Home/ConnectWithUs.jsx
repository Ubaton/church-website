import { Facebook, Instagram, XTwitter, Youtube } from "@/components/ui/social-icons";
import Link from "next/link";
import React from "react";

const socials = [
  { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { name: "X", href: "https://twitter.com", Icon: XTwitter },
  { name: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

const ConnectWithUs = () => {
  return (
    <section className="text-center">
      <span className="eyebrow justify-center">
        <span className="h-px w-6 bg-primary/60" />
        Follow Along
      </span>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold">
        Connect with us
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Join the conversation and catch our latest moments across social media.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        {socials.map(({ name, href, Icon }) => (
          <Link
            key={name}
            href={href}
            target="_blank"
            aria-label={name}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/70 bg-card text-foreground/80 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Icon className="h-6 w-6" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ConnectWithUs;
