import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConnectWithUs = () => {
  return (
    <>
      <section className="py-12 md:py-16 border bg-popover rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Connect With Us
        </h2>
        <div className="flex justify-center space-x-8">
          <Link
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform"
          >
            <Facebook className="w-8 h-8" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
            className="hover:scale-110 transition-transform"
          >
            <Twitter className="w-8 h-8" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <Instagram className="w-8 h-8" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ConnectWithUs;
