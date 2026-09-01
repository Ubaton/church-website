import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Heart, Globe, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/page-header";
import SectionHeading from "@/components/ui/section-heading";

const values = [
  {
    icon: Users,
    title: "Community",
    description:
      "We believe in fostering a strong, supportive family of believers who carry one another's burdens.",
  },
  {
    icon: Heart,
    title: "Love",
    description:
      "We strive to reflect God's love in all our actions, welcoming everyone with grace and warmth.",
  },
  {
    icon: Globe,
    title: "Outreach",
    description:
      "We are committed to serving our local and global communities with the hope of the Gospel.",
  },
];

const About = () => {
  return (
    <main>
      <PageHeader
        eyebrow="Our Story"
        title="About Tembisa Independent Baptist Church"
        quote="And let us consider how we may spur one another on toward love and good deeds."
        reference="Hebrews 10:24"
      />

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty">
            Tembisa Independent Baptist Church is a vibrant community of
            believers dedicated to spreading God&apos;s love and grace. Founded
            in 2007, we have been serving our community for over 18 years —
            providing a place of worship, fellowship, and spiritual growth for
            all who seek it.
          </p>
        </div>

        <div className="mt-20">
          <SectionHeading eyebrow="What We Value" title="Our values" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card
                key={value.title}
                className="group p-8 text-center hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-premium-lg md:px-16">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-balance">
              Join our community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85 text-pretty">
              We welcome all who wish to join us in worship and fellowship. Come
              as you are and experience the love and grace of God.
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

export default About;
