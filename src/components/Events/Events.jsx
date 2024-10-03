import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const Events = () => {
  return (
    <div>
      <main>
        <section className="py-16 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
              Upcoming Events
            </h1>
            <blockquote className="text-2xl text-center italic text-amber-800 dark:text-amber-700 max-w-3xl mx-auto mb-8">
              "For where two or three are gathered together in my name, there am
              I in the midst of them."
            </blockquote>
            <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
              - Matthew 18:20
            </p>
          </div>
        </section>

        <section className="py-16 bg-zinc-100 dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  Annual Church Picnic
                </h3>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>July 15, 2024</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>11:00 AM - 3:00 PM</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>City Park</span>
                </div>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  Join us for a day of fellowship, food, and fun at our annual
                  church picnic.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  Youth Summer Camp
                </h3>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>August 1-5, 2024</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>All Day</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Mountain Retreat Center</span>
                </div>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  A week-long adventure for our youth to grow in faith and
                  friendship.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  Community Outreach Day
                </h3>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>September 10, 2024</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Various Locations</span>
                </div>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  Serve our community through various outreach projects and
                  activities.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  Christmas Eve Service
                </h3>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>December 24, 2024</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>7:00 PM - 8:30 PM</span>
                </div>
                <div className="flex items-center text-amber-800 dark:text-amber-700 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Grace Church Sanctuary</span>
                </div>
                <p className="text-amber-800 dark:text-amber-700 mb-4">
                  Celebrate the birth of Christ with carols, candlelight, and
                  communion.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              Get Involved
            </h2>
            <p className="text-lg text-amber-800 dark:text-amber-700 max-w-2xl mx-auto mb-8">
              We have many opportunities for you to connect, serve, and grow in
              your faith. Check out our events calendar and join us!
            </p>
            <Button className="bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600">
              View Full Calendar
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Events;
