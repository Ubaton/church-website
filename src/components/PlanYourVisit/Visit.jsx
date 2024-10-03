"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, MapPin, Users } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";

export default function PlanYourVisitPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

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
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <main>
        <section className="py-16 bg-white dark:bg-zinc-800">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
              Plan Your Visit
            </h1>
            <blockquote className="text-2xl text-center italic text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              "For where two or three gather in my name, there am I with them."
            </blockquote>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              - Matthew 18:20
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-100 dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  What to Expect
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold dark:text-white">
                        Service Times
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sundays at 9:00 AM and 12:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold dark:text-white">
                        Location
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Mawwethu Street, Klipfontein View, Ext 1, 1459
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-gray-600 dark:text-gray-300 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold dark:text-white">
                        What to Wear
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Come as you are! We have no dress code.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="dark:text-white">
                      Is there parking available?
                    </AccordionTrigger>
                    <AccordionContent className="dark:text-gray-300">
                      Yes, we have ample parking available in our church lot,
                      free of charge.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="dark:text-white">
                      Do you have programs for children?
                    </AccordionTrigger>
                    <AccordionContent className="dark:text-gray-300">
                      We offer Sunday School for children ages 3-12 during our
                      12:00 AM service. Nursery care is available for infants
                      and toddlers during both services.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="dark:text-white">
                      How long are your services?
                    </AccordionTrigger>
                    <AccordionContent className="dark:text-gray-300">
                      Our services typically last about 75 minutes, including
                      worship and the sermon.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Let Us Know You're Coming
                </h2>
                {formSubmitted ? (
                  <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">
                      Thank you for planning your visit!
                    </strong>
                    <p className="block sm:inline">
                      We look forward to seeing you at Grace Church.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Planned Visit Date
                      </label>
                      <Input id="date" name="date" type="date" required />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Any questions or special needs?
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Let us know how we can make your visit more comfortable."
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Plan My Visit"}
                    </Button>
                    {error && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-zinc-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              We Can't Wait to Meet You!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              We're excited that you're planning to visit Grace Church. If you
              have any questions that weren't answered here, please don't
              hesitate to contact us.
            </p>
            <Button asChild>
              <Link href="/contact-us">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
