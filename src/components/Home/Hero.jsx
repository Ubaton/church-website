"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Calendar,
  Book,
  MapPin,
  ChevronDown,
  Sun,
  Cloud,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Church from "../../../public/images/TIBChurch.jpg";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroComponent = () => {
  const [verse, setVerse] = useState({ text: "", reference: "" });
  const [showFullVerse, setShowFullVerse] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [weather, setWeather] = useState({ temp: 0, condition: "sunny" });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const bibleId = "de4e12af7f28f599-02";

  const verseIds = [
    "JHN.3.16",
    "ROM.8.28",
    "PSA.23.1",
    "ISA.41.10",
    "PHP.4.13",
    "MAT.11.28",
    "JOS.1.9",
    "HEB.11.1",
    "1COR.10.13",
    "PRO.3.5-6",
    "JAM.1.2-3",
    "GAL.5.22-23",
    "PSA.46.1",
    "ISA.40.31",
    "2TI.1.7",
    "HEB.12.2",
    "ROM.12.12",
    "PHP.2.3-4",
    "MAT.5.43-44",
    "JER.29.11",
    "PRO.22.6",
    "PSA.118.24",
    "ISA.55.6-7",
    "JHN.14.6",
    "ROM.5.8",
    "PSA.121.1-2",
    "2COR.5.17",
    "MAT.28.19",
    "1PET.5.7",
    "REV.21.4",
  ];

  useEffect(() => {
    const today = new Date().getDate();
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

    const timer = setInterval(() => {
      const now = new Date();
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + (7 - now.getDay()));
      nextSunday.setHours(10, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    setWeather({ temp: 25, condition: "sunny" });

    return () => clearInterval(timer);
  }, []);

  const upcomingEvents = [
    {
      title: "Sunday Service",
      time: "10:00 AM",
      image: Church,
      description: "Join us for worship and fellowship",
    },
    {
      title: "Bible Study",
      time: "Wednesday 6:00 PM",
      image: Church,
      description: "Dive deep into God's Word",
    },
    {
      title: "Youth Group",
      time: "Friday 6:30 PM",
      image: Church,
      description: "For young people ages 13-18",
    },
  ];

  const testimonials = [
    {
      name: "John D.",
      text: "This church has been a blessing to my family.",
      role: "Church Member",
    },
    {
      name: "Sarah M.",
      text: "I've grown so much in my faith here.",
      role: "Youth Leader",
    },
    {
      name: "David L.",
      text: "The community here is truly welcoming and supportive.",
      role: "Deacon",
    },
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      console.log("Email submitted:", email);
      setEmail("");
    }
  };

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

        <section className="py-8 border bg-popover rounded-lg shadow-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Next Service In:
                </h3>
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                  <div className="bg-background p-2 rounded-lg">
                    <span className="text-xl md:text-3xl font-bold block">
                      {countdown.days}
                    </span>
                    <p className="text-sm">Days</p>
                  </div>
                  <div className="bg-background p-2 rounded-lg">
                    <span className="text-xl md:text-3xl font-bold block">
                      {countdown.hours}
                    </span>
                    <p className="text-sm">Hours</p>
                  </div>
                  <div className="bg-background p-2 rounded-lg">
                    <span className="text-xl md:text-3xl font-bold block">
                      {countdown.minutes}
                    </span>
                    <p className="text-sm">Minutes</p>
                  </div>
                  <div className="bg-background p-2 rounded-lg">
                    <span className="text-xl md:text-3xl font-bold block">
                      {countdown.seconds}
                    </span>
                    <p className="text-sm">Seconds</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Current Weather
                </h3>
                <div className="flex items-center justify-center bg-background p-4 rounded-lg">
                  {weather.condition === "sunny" ? (
                    <Sun className="h-8 w-8 text-yellow-500 mr-4" />
                  ) : (
                    <Cloud className="h-8 w-8 text-gray-500 mr-4" />
                  )}
                  <span className="text-2xl md:text-3xl font-bold">
                    {weather.temp}°C
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 border rounded-lg shadow-md">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Verse of the Day
            </h2>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto px-4"
              >
                <blockquote className="text-xl md:text-2xl text-center italic text-amber-800">
                  {`"${verse.text}"`}
                </blockquote>
                <p className="text-center mt-4 text-zinc-600 dark:text-zinc-50">
                  - {verse.reference}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="py-12 md:py-16 border bg-popover rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Join Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Calendar,
                  title: "Upcoming Events",
                  description: "Stay connected with our community events",
                  link: "/events",
                  buttonText: "View Events",
                },
                {
                  icon: Book,
                  title: "Latest Sermons",
                  description: "Listen to our recent messages",
                  link: "/sermons",
                  buttonText: "Listen Now",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  description: "Join us for worship this Sunday",
                  link: "https://www.bing.com/maps?osid=4b86770a-9da0-4a26-b80c-c470239a4763&cp=-26.054556~28.161725&lvl=17&pi=0&v=2&sV=2&form=S00027",
                  buttonText: "Get Directions",
                  external: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="dark:bg-zinc-900 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between">
                    <div>
                      <item.icon className="mx-auto h-12 w-12 text-amber-800 mb-4" />
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-amber-800 mb-4">{item.description}</p>
                    </div>
                    <Link
                      href={item.link}
                      target={item.external ? "_blank" : "_self"}
                      className="inline-block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full hover:bg-amber-100 dark:hover:bg-zinc-800"
                      >
                        {item.buttonText}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 border rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Upcoming Events
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto px-4">
            <CarouselContent>
              {upcomingEvents.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 lg:basis-1/3 p-2"
                >
                  <Card className="h-full">
                    <div className="relative pt-[100%]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {event.title}
                      </h3>
                      <p className="text-amber-800 mb-2">{event.time}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </section>

        <section className="py-12 md:py-16 border bg-popover rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            What Our Community Says
          </h2>
          <Carousel className="w-full max-w-4xl mx-auto px-4">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="p-6 mx-2 md:mx-4">
                    <blockquote className="text-base md:text-lg italic mb-4">
                      {`"${testimonial.text}"`}
                    </blockquote>
                    <footer>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-amber-800">{testimonial.role}</p>
                    </footer>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </section>

        <section className="py-12 md:py-16 border rounded-lg shadow-md">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Stay Connected
            </h2>
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" className="text-white whitespace-nowrap">
                  Subscribe
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {emailError && (
                <p className="text-red-500 mt-2 text-center">{emailError}</p>
              )}
            </form>
          </div>
        </section>

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
