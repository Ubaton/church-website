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

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define fallback image as an object with src property
  const fallbackImage = {
    src: "/images/TIBChurch.jpg",
    blurDataURL: "/images/TIBChurch.jpg",
    width: 800,
    height: 600,
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const querySnapshot = await getDocs(eventsCollection);
        const eventsData = querySnapshot.docs.map((doc) => {
          const eventData = doc.data();
          return {
            id: doc.id,
            ...eventData,
            // Ensure image is properly structured
            image: eventData.image
              ? {
                  src: eventData.image,
                  blurDataURL: eventData.image,
                  width: 800,
                  height: 600,
                }
              : fallbackImage,
          };
        });
        setUpcomingEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 border rounded-lg shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Upcoming Events
      </h2>
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent className="px-6">
          {upcomingEvents.map((event, index) => (
            <CarouselItem
              key={event.id}
              className="sm:basis-1/2 lg:basis-1/3 p-2"
            >
              <Card className="h-full">
                <div className="relative pt-[100%]">
                  <Image
                    src={event.image.src}
                    alt={event.title || "Event image"}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                    quality={80}
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage.src;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {event.title}
                  </h3>
                  <p className="flex items-center gap-2 text-amber-800 mb-2">
                    <Calendar size={20} />
                    <span>
                      {event.date} at {event.time}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                  {event.location && (
                    <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <MapPin size={20} />
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
    </section>
  );
};

export default UpcomingEvents;
