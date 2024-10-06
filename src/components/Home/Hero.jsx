"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Book, MapPin } from "lucide-react";
import Image from "next/image";
import Church from "../../../public/images/TIBChurch.jpg";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const [verse, setVerse] = useState({ text: "", reference: "" });
  const bibleId = "de4e12af7f28f599-02"; // Example Bible ID for King James Version

  // Array of 30 verse IDs
  const verseIds = [
    "JHN.3.16", // John 3:16
    "ROM.8.28", // Romans 8:28
    "PSA.23.1", // Psalm 23:1
    "ISA.41.10", // Isaiah 41:10
    "PHP.4.13", // Philippians 4:13
    "MAT.11.28", // Matthew 11:28
    "JOS.1.9", // Joshua 1:9
    "HEB.11.1", // Hebrews 11:1
    "1COR.10.13", // 1 Corinthians 10:13
    "PRO.3.5-6", // Proverbs 3:5-6
    "JAM.1.2-3", // James 1:2-3
    "GAL.5.22-23", // Galatians 5:22-23
    "PSA.46.1", // Psalm 46:1
    "ISA.40.31", // Isaiah 40:31
    "2TI.1.7", // 2 Timothy 1:7
    "HEB.12.2", // Hebrews 12:2
    "ROM.12.12", // Romans 12:12
    "PHP.2.3-4", // Philippians 2:3-4
    "MAT.5.43-44", // Matthew 5:43-44
    "JER.29.11", // Jeremiah 29:11
    "PRO.22.6", // Proverbs 22:6
    "PSA.118.24", // Psalm 118:24
    "ISA.55.6-7", // Isaiah 55:6-7
    "JHN.14.6", // John 14:6
    "ROM.5.8", // Romans 5:8
    "PSA.121.1-2", // Psalm 121:1-2
    "2COR.5.17", // 2 Corinthians 5:17
    "MAT.28.19", // Matthew 28:19
    "1PET.5.7", // 1 Peter 5:7
    "REV.21.4", // Revelation 21:4
  ];

  useEffect(() => {
    // Get the current day of the month (1 through 30)
    const today = new Date().getDate();
    // Use the day as the index for the verseIds array (0-based index)
    const verseId = verseIds[(today - 1) % verseIds.length];

    const fetchVerseOfTheDay = async () => {
      try {
        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}?content-type=text`,
          {
            headers: {
              "api-key": process.env.NEXT_PUBLIC_BIBLE_API_KEY,
            },
          }
        );
        const data = await response.json();
        setVerse({ text: data.data.content, reference: data.data.reference });
      } catch (error) {
        console.error("Error fetching verse of the day:", error);
      }
    };

    fetchVerseOfTheDay();
  }, []);

  return (
    <div className="container">
      <main>
        {/* Hero Section */}
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

        {/* Verse of the Day Section */}
        <section className="py-16 bg-white dark:bg-zinc-900 rounded-b-lg shadow-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Verse of the Day
            </h2>
            <blockquote className="text-2xl text-center italic text-amber-800 max-w-3xl mx-auto">
              "{verse.text}"
            </blockquote>
            <p className="text-center mt-4 text-zinc-600 dark:text-zinc-50">
              - {verse.reference}
            </p>
          </div>
        </section>

        {/* Additional Sections */}
        <section className="py-16">
          <div className="mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Join Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
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

              {/* Card 2 */}
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

              {/* Card 3 */}
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
                    href="https://www.bing.com/maps?osid=4b86770a-9da0-4a26-b80c-c470239a4763&cp=-26.054556~28.161725&lvl=17&pi=0&v=2&sV=2&form=S00027"
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
