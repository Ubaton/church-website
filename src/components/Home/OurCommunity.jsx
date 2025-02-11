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

const OurCommunity = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
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

  return (
    <>
      <section className="py-12 md:py-16 border bg-popover rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What Our Community Says
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto px-4">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <Card className="p-6 mx-2 md:mx-4">
                  <blockquote className="text-base md:text-lg italic mb-4">
                    {`"${testimonial.quote}"`}
                  </blockquote>
                  <footer>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-amber-800">{testimonial.role}</p>
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
    </>
  );
};

export default OurCommunity;
