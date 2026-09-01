import React from "react";
import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";

const page = () => {
  return (
    <main className="min-h-screen">
      <PageHeader
        eyebrow="Church Calendar"
        title="A full calendar is on the way"
        quote="To every thing there is a season, and a time to every purpose under the heaven."
        reference="Ecclesiastes 3:1 KJV"
      />
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CalendarDays className="h-10 w-10" />
        </div>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground text-pretty">
          We&apos;re putting the finishing touches on our interactive calendar.
          In the meantime, take a look at our upcoming events.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/events">
            <Button>View Upcoming Events</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back Home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;
