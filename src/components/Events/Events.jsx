import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

// Separate component for event cards to improve reusability
const EventCard = ({ title, date, time, location, description }) => (
  <div className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold mb-4 dark:text-white">{title}</h3>
    <div className="space-y-2 mb-4">
      <div className="flex items-center text-amber-800 dark:text-amber-700">
        <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
        <span>{date}</span>
      </div>
      <div className="flex items-center text-amber-800 dark:text-amber-700">
        <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
        <span>{time}</span>
      </div>
      <div className="flex items-center text-amber-800 dark:text-amber-700">
        <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
        <span>{location}</span>
      </div>
    </div>
    <p className="text-amber-800 dark:text-amber-700 mb-4">{description}</p>
    <Link href="/events/details" className="inline-block">
      <Button variant="outline">Learn More</Button>
    </Link>
  </div>
);

// Event data separated for better maintainability
const EVENTS_DATA = [
  {
    id: 1,
    title: "Annual Church Picnic",
    date: "July 15, 2024",
    time: "11:00 AM - 3:00 PM",
    location: "City Park",
    description:
      "Join us for a day of fellowship, food, and fun at our annual church picnic.",
  },
  {
    id: 2,
    title: "Youth Summer Camp",
    date: "August 1-5, 2024",
    time: "All Day",
    location: "Mountain Retreat Center",
    description:
      "A week-long adventure for our youth to grow in faith and friendship.",
  },
  {
    id: 3,
    title: "Community Outreach Day",
    date: "September 10, 2024",
    time: "9:00 AM - 2:00 PM",
    location: "Various Locations",
    description:
      "Serve our community through various outreach projects and activities.",
  },
  {
    id: 4,
    title: "Christmas Eve Service",
    date: "December 24, 2024",
    time: "7:00 PM - 8:30 PM",
    location: "Grace Church Sanctuary",
    description:
      "Celebrate the birth of Christ with carols, candlelight, and communion.",
  },
];

// Section components for better organization
const HeroSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
        Upcoming Events
      </h1>
      <blockquote className="text-2xl text-center italic text-amber-800 dark:text-amber-700 max-w-3xl mx-auto mb-8">
        For where two or three are gathered together in my name, there am I in
        the midst of them.
      </blockquote>
      <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
        - Matthew 18:20
      </p>
    </div>
  </section>
);

const GetInvolvedSection = () => (
  <section className="py-16 dark:bg-zinc-900">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">Get Involved</h2>
      <p className="text-lg text-amber-800 dark:text-amber-700 max-w-2xl mx-auto mb-8">
        We have many opportunities for you to connect, serve, and grow in your
        faith. Check out our events calendar and join us!
      </p>
      <Link href="/calendar">
        <Button className="text-white">View Full Calendar</Button>
      </Link>
    </div>
  </section>
);

const Events = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />

        <section className="py-16 border bg-popover rounded-2xl">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EVENTS_DATA.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        </section>

        <GetInvolvedSection />
      </main>
    </div>
  );
};

export default Events;
