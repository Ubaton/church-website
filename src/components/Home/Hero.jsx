"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Church from "../../../public/images/TIBChurch.jpg";

import { ArrowRight, ChevronDown } from "lucide-react";
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

const HeroComponent = () => {
  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8">
      <main className="space-y-8">
        <section className="relative min-h-[60vh] md:h-screen bg-cover bg-center flex items-center">
          <div className="absolute inset-0">
            <Image
              src={Church}
              alt="Tembisa Independent Baptist Church"
              className="w-full h-full object-cover rounded-lg"
              priority={true}
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
          </div>
          <div className="relative z-10 text-center px-4 w-full">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              Welcome to Tembisa Independent Baptist Church
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto"
            >
              Join us in worship and community
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link href="/plan-your-visit">
                <Button className="text-white transition-colors duration-300 text-lg px-6 py-3">
                  Plan Your Visit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <ChevronDown className="h-8 w-8 text-white animate-bounce" />
          </motion.div>
        </section>

        <NextService />

        {/* <VerseOfTheDay /> */}

        <JoinUs />

        <UpcomingEvents />

        <OurCommunity />

        <StayConnected />

        <ConnectWithUs />
      </main>
    </div>
  );
};

const Hero = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroComponent />
    </Suspense>
  );
};

export default Hero;
