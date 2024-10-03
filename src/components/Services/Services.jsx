import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Music, Book, Home } from "lucide-react";
import Image from "next/image";
import ManParying from "../../../public/images/Man.jpeg";

const Services = () => {
  return (
    <div>
      <main>
        <section className="py-16 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
              Our Services
            </h1>
            <blockquote className="text-2xl text-center italic text-amber-800 dark:text-amber-700 max-w-3xl mx-auto mb-8">
              "Let every thing that hath breath praise the LORD. Praise ye the
              LORD."
            </blockquote>
            <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
              - Psalm 150:6 KJV
            </p>
          </div>
        </section>

        <section className="py-16 bg-zinc-100 dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <Sun className="h-12 w-12 text-amber-800 dark:text-amber-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Sunday Morning Service
                </h3>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  Join us every Sunday at 10:00 AM for worship, prayer, and
                  teaching.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <Moon className="h-12 w-12 text-amber-800 dark:text-amber-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Wednesday Evening Bible Study
                </h3>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  Dive deeper into God's Word every Wednesday at 7:00 PM.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <Home className="h-12 w-12 text-amber-800 dark:text-amber-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Home Visit
                </h3>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  Experience the power of praise every first Friday of the month
                  at 15:00 PM.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <Book className="h-12 w-12 text-amber-800 dark:text-amber-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Children's Ministry
                </h3>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  We offer age-appropriate teachings for children during Sunday
                  services.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              Join Us in Worship
            </h2>
            <p className="text-lg text-amber-800 dark:text-amber-700 max-w-2xl mx-auto mb-8">
              We invite you to experience the love and grace of God through our
              various services. All are welcome to join us in worship and
              fellowship.
            </p>
            <Button className="bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600">
              Plan Your Visit
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
