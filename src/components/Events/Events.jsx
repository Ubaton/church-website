import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  HandHeart,
  Users,
} from "lucide-react";
import PageHeader from "@/components/ui/page-header";

const EventCard = ({ title, date, time, location, description }) => (
  <Card className="group flex flex-col p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300">
    <h3 className="text-xl font-semibold">{title}</h3>
    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 shrink-0 text-primary" />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 shrink-0 text-primary" />
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
        <span>{location}</span>
      </div>
    </div>
    <p className="mt-4 flex-1 text-muted-foreground leading-relaxed">
      {description}
    </p>
    <Link
      href="/calendar"
      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
    >
      Learn More
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  </Card>
);

const MISSIONS_TRIP = {
  title: "Youth Missions Trip",
  date: "18 September - 5 October 2026",
  time: "3 Sundays and two full weeks",
  location: "George (18 - 28 Sept) & The Strand (28 Sept - 5 Oct)",
  description:
    "We are taking 22 young people (ages 15 - 20) from the school on a missions trip to the Western Cape. The team will be involved in tract drives, door to door evangelism, children and youth outreach programmes, special music and, Lord willing, some sightseeing. Our pastor will be serving alongside the youth and preaching at various churches.",
  involvement: [
    "Pray with and for us, and for our transport.",
    "Sponsor us financially, with meals or toiletries, or give directly towards accommodation at the allocated hostel.",
    "Pray that we would be a blessing and an encouragement to everyone we meet, and that we have a wonderful time.",
    "Pray that the Lord would speak to our young people and burden them for missions.",
    "Pray for safety and for plenty of ministry opportunities.",
  ],
};

const FeaturedEvent = ({ title, date, time, location, description, involvement }) => (
  <Card className="overflow-hidden p-8 md:p-12 shadow-premium-lg">
    <span className="eyebrow">
      <span className="h-px w-6 bg-primary/60" />
      Featured
    </span>
    <h2 className="mt-4 font-serif text-3xl md:text-4xl font-semibold text-balance">
      {title}
    </h2>

    <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 shrink-0 text-primary" />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 shrink-0 text-primary" />
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
        <span>{location}</span>
      </div>
    </div>

    <div className="mt-8 grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Users className="h-5 w-5 text-primary" />
          Trip details
        </h3>
        <p className="mt-3 text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
      </div>
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <HandHeart className="h-5 w-5 text-primary" />
          How you can be involved
        </h3>
        <ul className="mt-3 space-y-2 text-muted-foreground leading-relaxed">
          {involvement.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <Link href="/contact-us" className="mt-8 inline-block">
      <Button size="lg">
        Support the trip
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </Card>
);

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

const Events = () => {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="What's On"
        title="Upcoming Events"
        quote="For where two or three are gathered together in my name, there am I in the midst of them."
        reference="Matthew 18:20"
      />

      <section className="container mx-auto px-4 pt-20 md:pt-28">
        <FeaturedEvent {...MISSIONS_TRIP} />
      </section>

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS_DATA.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-premium-lg md:px-16">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-balance">
              Get involved
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85 text-pretty">
              We have many opportunities for you to connect, serve, and grow in
              your faith. Explore our full calendar and join us.
            </p>
            <Link href="/calendar" className="mt-8 inline-block">
              <Button variant="gold" size="lg">
                View Full Calendar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Events;
