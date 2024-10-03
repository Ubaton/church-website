"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Book, MapPin } from "lucide-react";
import Image from "next/image";
import Church from "../../../public/images/TIBChurch.jpg";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="container">
      <main>
        <section className="relative h-screen bg-cover bg-center flex items-center">
          <div className="absolute inset-0 bg-opacity-50">
            <Image
              src={Church}
              alt=""
              className="w-full h-full object-cover rounded-t-lg"
              priority={true}
            />
          </div>
          <div className="mx-auto z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to Tembisa Independent Baptist Church
            </h1>
            <p className="text-xl text-white mb-8">
              Join us in worship and community
            </p>

            <Link href={"/plan-your-visit"}>
              <Button className="bg-white text-zinc-800 hover:bg-zinc-100">
                Plan Your Visit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-zinc-900 rounded-b-lg shadow-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Verse of the Day
            </h2>
            <blockquote className="text-2xl text-center italic text-amber-800 max-w-3xl mx-auto">
              "For I know the thoughts that I think toward you, saith the LORD,
              thoughts of peace, and not of evil, to give you an expected end."
            </blockquote>
            <p className="text-center mt-4 text-zinc-600 dark:text-zinc-50">
              - Jeremiah 29:11 KJV
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Join Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md text-center">
                  <Calendar className="mx-auto h-12 w-12 text-amber-800 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Upcoming Events
                  </h3>
                  <p className="text-amber-800 mb-4">
                    Stay connected with our community events
                  </p>
                  <Link href={"/events"}>
                    <Button variant="outline">View Events</Button>
                  </Link>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md text-center">
                  <Book className="mx-auto h-12 w-12 text-amber-800 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Latest Sermons</h3>
                  <p className="text-amber-800 mb-4">
                    Listen to our recent messages
                  </p>
                  <Link href={"/sermons"}>
                    <Button variant="outline">Listen Now</Button>
                  </Link>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md text-center">
                  <MapPin className="mx-auto h-12 w-12 text-amber-800 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-amber-800 mb-4">
                    Join us for worship this Sunday
                  </p>

                  <Link
                    href={
                      "https://www.bing.com/maps?osid=4b86770a-9da0-4a26-b80c-c470239a4763&cp=-26.054556~28.161725&lvl=17&pi=0&v=2&sV=2&form=S00027"
                    }
                    target="_blank"
                  >
                    <Button variant="outline">Get Directions</Button>
                  </Link>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
