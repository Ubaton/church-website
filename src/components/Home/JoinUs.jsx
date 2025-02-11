import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { Book, Calendar, MapPin } from "lucide-react";

const JoinUs = () => {
  return (
    <>
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
                link: "https://www.google.com/maps/place/Tembisa+Baptist+Church+(Independent,+KJV)/@-26.0545357,28.1618867,17z/data=!4m6!3m5!1s0x1e956ce350e7adbd:0x7ad456bdbd22eef1!8m2!3d-26.0545357!4d28.1644616!16s%2Fg%2F11gfjshvjb?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D",
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
    </>
  );
};

export default JoinUs;
