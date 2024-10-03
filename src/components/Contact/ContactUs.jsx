import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const ContactUs = () => {
  return (
    <div>
      <main>
        <section className="py-16 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
              Contact Us
            </h1>
            <blockquote className="text-2xl text-center italic text-gray-700 dark:text-amber-700 max-w-3xl mx-auto mb-8">
              "Come to me, all you who are weary and burdened, and I will give
              you rest."
            </blockquote>
            <p className="text-center text-gray-600 dark:text-zinc-400 mb-12">
              - Matthew 11:28
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-100 dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                    >
                      Name
                    </label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
                    >
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message here..." />
                  </div>
                  <Button className="w-full bg-gray-800 dark:bg-zinc-800 text-white hover:bg-gray-700 dark:hover:bg-zinc-700">
                    Send Message
                  </Button>
                </form>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-gray-600 dark:text-white mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600 dark:text-white">
                        +27 82 901 4577
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-gray-600 dark:text-white mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600 dark:text-white">
                        TembisaBaptistChurchInd@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-gray-600 dark:text-white mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600 dark:text-white">
                        Mawwethu Street, Klipfontein View, Ext 1, 1459
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              Visit Us This Sunday
            </h2>
            <p className="text-lg text-gray-700 dark:text-white max-w-2xl mx-auto mb-8">
              We'd love to see you at our Sunday service. Join us for worship,
              fellowship, and a powerful message.
            </p>
            <Link
              href={
                "https://www.bing.com/maps?osid=4b86770a-9da0-4a26-b80c-c470239a4763&cp=-26.054556~28.161725&lvl=17&pi=0&v=2&sV=2&form=S00027"
              }
              target="_blank"
            >
              {" "}
              <Button className="bg-gray-800 dark:bg-zinc-800 text-white hover:bg-gray-700 dark:hover:bg-zinc-700">
                Get Directions
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;
