"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "../ui/card";
import { Calendar, MapPin } from "lucide-react";
import SectionHeading from "../ui/section-heading";
import { services } from "@/lib/services";

const ServiceImage = ({ service }) => {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/images/TIBChurch.jpg" : service.imageUrl}
      alt={failed ? "A cross against the sunrise" : service.imageAlt}
      fill
      className="object-cover"
      sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
      quality={80}
      onError={() => setFailed(true)}
    />
  );
};

const UpcomingEvents = () => {
  return (
    <section>
      <SectionHeading
        eyebrow="What's On"
        title="Upcoming events"
        subtitle="Gather with us for worship, Bible study, evangelism, and Awana children's ministry."
      />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((event) => (
          <Card
            key={event.id}
            className="group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <ServiceImage service={event} />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                <Calendar size={15} className="shrink-0" aria-hidden="true" />
                {event.time}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{event.title}</h3>
              <p className="mt-2 mb-6 text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              <p className="mt-auto flex items-start gap-2 border-t border-border/50 pt-5 text-xs leading-relaxed text-muted-foreground">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>Mawwethu Street, Klipfontein View, Ext 1, 1459</span>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
