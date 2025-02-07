import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";

const OurCommunity = () => {
  const testimonials = [
    {
      name: "John D.",
      text: "This church has been a blessing to my family.",
      role: "Church Member",
    },
    {
      name: "Sarah M.",
      text: "I've grown so much in my faith here.",
      role: "Youth Leader",
    },
    {
      name: "David L.",
      text: "The community here is truly welcoming and supportive.",
      role: "Deacon",
    },
  ];

  return (
    <>
      <section className="py-12 md:py-16 border bg-popover rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What Our Community Says
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto px-4">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="p-6 mx-2 md:mx-4">
                  <blockquote className="text-base md:text-lg italic mb-4">
                    {`"${testimonial.text}"`}
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
