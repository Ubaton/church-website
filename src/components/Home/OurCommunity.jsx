"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import { Quote } from "lucide-react";
import SectionHeading from "../ui/section-heading";

const OurCommunity = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!db) return;
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const fetchedTestimonials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section>
      <SectionHeading
        eyebrow="Our Family"
        title="What our community says"
        subtitle="Real stories from the people who call Tembisa Independent Baptist Church home."
      />
      <Carousel className="mx-auto mt-14 w-full max-w-4xl px-4">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <Card className="mx-2 p-8 md:p-12 text-center">
                <Quote className="mx-auto h-10 w-10 text-primary/30" />
                <blockquote className="mt-6 font-serif text-xl md:text-2xl italic leading-relaxed text-balance">
                  {`"${testimonial.quote}"`}
                </blockquote>
                <footer className="mt-6">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </footer>
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

export default OurCommunity;
