import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Book, MapPin } from "lucide-react";
import Image from "next/image";
import Church from "../../../public/images/TIBChurch.jpg";

const Hero = () => {
  return (
    <div>
      <main>
        <section className="relative h-screen bg-cover bg-center flex items-center">
          <div className="absolute inset-0 bg-opacity-50">
            <Image
              src={Church}
              alt=""
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to Tembisa Independent Baptist Church
            </h1>
            <p className="text-xl text-white mb-8">
              Join us in worship and community
            </p>
            <Button className="bg-white text-zinc-800 hover:bg-zinc-100">
              Plan Your Visit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="py-16 bg-white rounded-b-lg shadow-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Verse of the Day
            </h2>
            <blockquote className="text-2xl text-center italic text-amber-800 max-w-3xl mx-auto">
              "For I know the plans I have for you," declares the LORD, "plans
              to prosper you and not to harm you, plans to give you hope and a
              future."
            </blockquote>
            <p className="text-center mt-4 text-zinc-600">- Jeremiah 29:11</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Join Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Calendar className="mx-auto h-12 w-12 text-amber-800 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
                <p className="text-amber-800 mb-4">
                  Stay connected with our community events
                </p>
                <Button variant="outline">View Events</Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Book className="mx-auto h-12 w-12 text-amber-800 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Latest Sermons</h3>
                <p className="text-amber-800 mb-4">
                  Listen to our recent messages
                </p>
                <Button variant="outline">Listen Now</Button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <MapPin className="mx-auto h-12 w-12 text-amber-800 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-amber-800 mb-4">
                  Join us for worship this Sunday
                </p>
                <Button variant="outline">Get Directions</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
