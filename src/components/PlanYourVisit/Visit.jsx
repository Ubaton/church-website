"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, MapPin, Users, Check, ArrowRight } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import { Label } from "../ui/label";
import PageHeader from "@/components/ui/page-header";

const expectations = [
  {
    icon: Clock,
    title: "Service Times",
    description: "Sundays at 10:00 AM and 12:00 PM",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "1145 Umkhomazi St, Klipfontein View, Lethabong, 1685",
  },
  // {
  //   icon: Users,
  //   title: "What to Wear",
  //   description: "Come as you are! We have no dress code.",
  // },
];

const faqs = [
  {
    q: "Is there parking available?",
    a: "Yes, we have ample parking available in our church lot, free of charge.",
  },
  {
    q: "Do you have programs for children?",
    a: "We offer Sunday School for children ages 3-12 during our 12:00 PM service. Nursery care is available for infants and toddlers during both services.",
  },
  {
    q: "How long are your services?",
    a: "Our services typically last about 75 minutes, including worship and the sermon.",
  },
];

export default function PlanYourVisitPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const visitData = {
      name: formData.get("name"),
      email: formData.get("email"),
      date: formData.get("date"),
      service: formData.get("service"),
      message: formData.get("message"),
      submittedAt: new Date(),
    };

    if (!db) {
      setError("Submissions are temporarily unavailable. Please contact us directly.");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "plannedVisits"), visitData);
      setFormSubmitted(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="We'd Love to Meet You"
        title="Plan Your Visit"
        quote="For where two or three gather in my name, there am I with them."
        reference="Matthew 18:20"
      />

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: what to expect + FAQ */}
          <div>
            <h2 className="text-2xl font-semibold">What to expect</h2>
            <div className="mt-6 space-y-4">
              {expectations.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-0.5 text-muted-foreground">{description}</p>
                  </div>
                </Card>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-semibold">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="mt-4 w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right: form */}
          <div>
            <Card className="p-8 md:p-10">
              <h2 className="text-2xl font-semibold">
                Let us know you&apos;re coming
              </h2>
              {formSubmitted ? (
                <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-semibold">
                    Thank you for planning your visit!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    We look forward to seeing you at Tembisa Independent Baptist
                    Church.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Planned visit date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Select service</Label>
                    <Select name="service" required>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Any questions or special needs?
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Let us know how we can make your visit more comfortable."
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Plan My Visit"}
                  </Button>
                  {error && (
                    <p className="text-sm text-destructive text-center">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-premium-lg md:px-16">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-balance">
              We can&apos;t wait to meet you
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85 text-pretty">
              If you have any questions that weren&apos;t answered here, please
              don&apos;t hesitate to reach out.
            </p>
            <Link href="/contact-us" className="mt-8 inline-block">
              <Button variant="gold" size="lg">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
