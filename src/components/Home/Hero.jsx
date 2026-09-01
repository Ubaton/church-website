"use client";

import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";

import Church from "../../../public/images/TIBChurch.jpg";

import { ArrowRight, ChevronDown, MapPin, Clock } from "lucide-react";
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
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const HeroComponent = () => {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative -mt-[76px] min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={Church}
            alt="Tembisa Independent Baptist Church"
            className="w-full h-full object-cover"
            priority
            sizes="100vw"
            quality={90}
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
          <div className="absolute inset-0 bg-grain opacity-40 mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 pt-24 pb-16">
            <div className="max-w-3xl">
              <motion.span
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100 backdrop-blur-sm"
              >
                Independent · KJV · Tembisa
              </motion.span>

              <motion.h1
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] text-balance"
              >
                A place to belong, believe & be transformed
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-6 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed text-pretty"
              >
                Join our family at Tembisa Independent Baptist Church as we
                worship together, grow in the Word, and serve our community with
                the love of Christ.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-9 flex flex-col sm:flex-row gap-4"
              >
                <Link href="/plan-your-visit">
                  <Button size="lg" className="w-full sm:w-auto">
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
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75"
              >
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-300" />
                  Sundays at 10:00 AM
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  Tembisa, Gauteng
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <ChevronDown className="h-7 w-7 text-white/70 animate-bounce" />
        </motion.div>
      </section>

      {/* Content sections */}
      <div className="container mx-auto px-4 space-y-20 md:space-y-28 py-20 md:py-28">
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
    <Suspense fallback={<div className="min-h-[92vh]" />}>
      <HeroComponent />
    </Suspense>
  );
};

export default Hero;
