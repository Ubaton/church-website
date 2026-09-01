"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { Card } from "../ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import { Calendar, MapPin } from "lucide-react";
import SectionHeading from "../ui/section-heading";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImage = {
    src: "/images/TIBChurch.jpg",
    blurDataURL: "/images/TIBChurch.jpg",
    width: 800,
    height: 600,
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const eventsCollection = collection(db, "events");
        const querySnapshot = await getDocs(eventsCollection);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpcomingEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section>
      <SectionHeading
        eyebrow="What's On"
        title="Upcoming events"
        subtitle="Mark your calendar and join us — there's always something to look forward to."
      />

      <div className="mt-14">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        ) : upcomingEvents.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No upcoming events right now — check back soon.
          </p>
        ) : (
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="px-2">
              {upcomingEvents.map((event, index) => (
                <CarouselItem
                  key={event.id}
                  className="sm:basis-1/2 lg:basis-1/3 p-2"
                >
                  <Card className="group h-full overflow-hidden hover:shadow-premium-lg transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={event.imageUrl || fallbackImage}
                        alt={event.title || "Event image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                        quality={80}
                        onError={(e) => {
                          e.currentTarget.src = fallbackImage.src;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                        <Calendar size={15} />
                        {event.date}
                        {event.time ? ` · ${event.time}` : ""}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                      {event.location && (
                        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </p>
                      )}
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
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
