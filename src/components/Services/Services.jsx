import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sun, Moon, Book, Home, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/page-header";

const services = [
  {
    icon: Sun,
    title: "Sunday Morning Service",
    time: "Sundays · 10:00 AM",
    description:
      "Join us every Sunday for worship, prayer, and the faithful teaching of God's Word.",
  },
  {
    icon: Moon,
    title: "Wednesday Bible Study",
    time: "Wednesdays · 18:00",
    description:
      "Dive deeper into Scripture midweek as we study God's Word together in fellowship.",
  },
  {
    icon: Home,
    title: "Home Visits",
    time: "First Friday · 15:00",
    description:
      "Experience the power of praise and personal prayer through our monthly home visits.",
  },
  {
    icon: Book,
    title: "Children's Ministry",
    time: "During Sunday Service",
    description:
      "Age-appropriate teaching that helps children know and love the Lord from an early age.",
  },
];

const Services = () => {
  return (
    <main>
      <PageHeader
        eyebrow="Gather With Us"
        title="Our Services"
        quote="Let every thing that hath breath praise the LORD. Praise ye the LORD."
        reference="Psalm 150:6 KJV"
      />

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group flex gap-6 p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {service.time}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-premium-lg md:px-16">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-balance">
              Join us in worship
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85 text-pretty">
              Experience the love and grace of God through our various services.
              All are welcome to worship and grow with us.
            </p>
            <Link href="/plan-your-visit" className="mt-8 inline-block">
              <Button variant="gold" size="lg">
                Plan Your Visit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
