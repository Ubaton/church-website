import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sun, Moon, Book, Megaphone, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import { services } from "@/lib/services";

const serviceIcons = {
  "sunday-service": Sun,
  "bible-study": Moon,
  evangelism: Megaphone,
  awana: Book,
};

const Services = () => {
  return (
    <main>
      <PageHeader
        eyebrow="Gather With Us"
        title="Our Services"
        quote="Let every thing that hath breath praise the LORD. Praise ye the LORD."
        reference="Psalm 150:6 KJV"
      />

      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <Card
                key={service.title}
                className="flex flex-col gap-5 p-6 sm:flex-row sm:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">
                    {service.time}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            );
          })}
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
