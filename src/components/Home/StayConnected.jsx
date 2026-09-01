"use client";

import { Mail, Check } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const StayConnected = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-premium-lg">
      <div className="absolute inset-0 bg-grain opacity-30" />
      <div className="relative px-6 py-14 md:px-16 md:py-20 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
          <span className="h-px w-6 bg-primary-foreground/50" />
          Stay Connected
          <span className="h-px w-6 bg-primary-foreground/50" />
        </span>
        <h2 className="mt-4 font-serif text-3xl md:text-4xl font-semibold text-balance">
          Weekly encouragement, straight to your inbox
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85 text-pretty">
          Subscribe for service updates, upcoming events, and reflections from
          the Word — no spam, just what matters.
        </p>

        {submitted ? (
          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-6 py-3 font-medium">
            <Check className="h-5 w-5" />
            Thank you — you&apos;re on the list!
          </div>
        ) : (
          <form
            onSubmit={handleEmailSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow border-transparent bg-primary-foreground text-foreground placeholder:text-muted-foreground"
              aria-label="Email for newsletter"
            />
            <Button
              type="submit"
              variant="gold"
              className="whitespace-nowrap"
            >
              Subscribe
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </form>
        )}
        {emailError && (
          <p className="mt-3 text-sm text-primary-foreground">{emailError}</p>
        )}
      </div>
    </section>
  );
};

export default StayConnected;
