"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { Book, Calendar, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "../ui/section-heading";

const items = [
  {
    icon: Calendar,
    title: "Upcoming Events",
    description:
      "From fellowship dinners to outreach — stay connected with everything happening in our community.",
    link: "/events",
    buttonText: "View Events",
  },
  {
    icon: Book,
    title: "Latest Sermons",
    description:
      "Be encouraged and equipped through the Word. Listen to our most recent messages any time.",
    link: "/sermons",
    buttonText: "Listen Now",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description:
      "Join us for worship this Sunday. We can't wait to welcome you and your family in person.",
    link: "https://www.google.com/maps/place/Tembisa+Baptist+Church+(Independent,+KJV)/@-26.0545357,28.1618867,17z/data=!4m6!3m5!1s0x1e956ce350e7adbd:0x7ad456bdbd22eef1!8m2!3d-26.0545357!4d28.1644616!16s%2Fg%2F11gfjshvjb?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D",
    buttonText: "Get Directions",
    external: true,
  },
];

const JoinUs = () => {
  return (
    <section>
      <SectionHeading
        eyebrow="Get Involved"
        title="There's a place for you here"
        subtitle="However you'd like to connect, we'd love to walk alongside you on the journey of faith."
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group h-full flex flex-col p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 flex-1 text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              <Link
                href={item.link}
                target={item.external ? "_blank" : "_self"}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                {item.buttonText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JoinUs;
