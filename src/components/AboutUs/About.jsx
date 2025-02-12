import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Heart, Globe } from "lucide-react";

const About = () => {
  return (
    <div>
      <main>
        <section className="py-16  dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
              About Tembisa Independent Baptist Church
            </h1>
            <blockquote className="text-2xl text-center italic text-amber-800 dark:text-amber-700  max-w-3xl mx-auto mb-8">
              {`And let us consider how we may spur one another on toward love
              and good deeds.`}
            </blockquote>
            <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
              - Hebrews 10:24
            </p>
            <p className="text-lg text-amber-800 dark:text-amber-700  max-w-3xl mx-auto text-center">
              Tembisa Independent Baptist Church is a vibrant community of
              believers dedicated to spreading God&apos;s love and grace.
              Founded in 2007, we have been serving our community for over 18
              years, providing a place of worship, fellowship, and spiritual
              growth for all who seek it.
            </p>
          </div>
        </section>

        <section className="py-16 border rounded-2xl bg-popover">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border p-6 rounded-lg shadow-md text-center">
                <Users className="mx-auto h-12 w-12 text-amber-800 dark:text-amber-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Community
                </h3>
                <p className="text-amber-800 dark:text-amber-700 ">
                  We believe in fostering a strong, supportive community of
                  believers.
                </p>
              </div>
              <div className="border p-6 rounded-lg shadow-md text-center">
                <Heart className="mx-auto h-12 w-12 text-amber-800 dark:text-amber-700  mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Love
                </h3>
                <p className="text-amber-800 dark:text-amber-700 ">
                  We strive to show God&apos;s love in all our actions and
                  interactions.
                </p>
              </div>
              <div className="border p-6 rounded-lg shadow-md text-center">
                <Globe className="mx-auto h-12 w-12 text-amber-800 dark:text-amber-700  mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Outreach
                </h3>
                <p className="text-amber-800 dark:text-amber-700 ">
                  We are committed to serving our local and global communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16  dark:bg-zinc-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              Join Our Community
            </h2>
            <p className="text-lg text-amber-800 dark:text-amber-700  max-w-2xl mx-auto mb-8">
              We welcome all who wish to join us in worship and fellowship. Come
              as you are and experience the love and grace of God in our
              community.
            </p>
            <Link href={"/plan-your-visit"}>
              <Button className=" text-white">Plan Your Visit</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
