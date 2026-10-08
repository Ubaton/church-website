"use client";

import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";

import Church from "../../../public/images/TIBChurch.jpg";

import { ArrowRight, MapPin, Clock, BookOpen } from "lucide-react";
import Image from "next/image";

import { motion } from "framer-motion";
import Link from "next/link";

import NextService from "./NextService";
import VerseOfTheDay from "./VerseOfTheDay";
import JoinUs from "./JoinUs";
import UpcomingEvents from "./UpcomingEvents";
import OurCommunity from "./OurCommunity";
import StayConnected from "./StayConnected";
import ConnectWithUs from "./ConnectWithUs";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const HeroComponent = () => {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative -mt-[76px] min-h-[88svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={Church}
            alt="A cross overlooking mountains at sunrise"
            className="w-full h-full object-cover"
            priority
            sizes="100vw"
            quality={90}
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 pt-36 pb-20 md:pt-44 md:pb-28">
            <div className="mx-auto max-w-4xl text-center">
              <motion.span
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/80"
              >
                Independent · KJV · Tembisa
              </motion.span>

              <motion.h1
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-semibold text-white leading-[1.06] text-balance"
              >
                A place to belong, believe & be transformed
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mx-auto mt-6 max-w-2xl text-base md:text-xl text-white/85 leading-relaxed text-pretty"
              >
                Join our family at Tembisa Independent Baptist Church as we
                worship together, grow in the Word, and serve our community with
                the love of Christ.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.35, delay: 0.15 }}
                className="mt-9 flex flex-col sm:flex-row justify-center gap-3"
              >
                <Link href="/plan-your-visit">
                  <Button variant="gold" size="lg" className="w-full sm:w-auto">
                    Plan Your Visit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/sermons">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60"
                  >
                    Watch a Sermon
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.35, delay: 0.2 }}
                className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-xs md:text-sm text-white/80"
              >
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-300" />
                  Sundays at 10:00 AM
                </span>
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-300" />
                  Wednesday Bible Study · 6:30 PM
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  Klipfontein View, Tembisa
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <div className="container mx-auto px-6 space-y-20 md:space-y-28 py-16 md:py-24">
        <NextService />
        <VerseOfTheDay />
        <JoinUs />
        <UpcomingEvents />
        <OurCommunity />
        <StayConnected />
        <ConnectWithUs />
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <Suspense fallback={<div className="min-h-[88svh]" />}>
      <HeroComponent />
    </Suspense>
  );
};

export default Hero;
