"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import PageHeader from "@/components/ui/page-header";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+27 82 901 4577" },
  {
    icon: Mail,
    label: "Email",
    value: "TembisaBaptistChurchInd@gmail.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "1145 Umkhomazi St, Klipfontein View, Lethabong, 1685",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    if (!db) {
      setError("Messaging is temporarily unavailable. Please email us directly.");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "contact-us"), formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <PageHeader
        eyebrow="We'd Love to Hear From You"
        title="Contact Us"
        quote="Come to me, all you who are weary and burdened, and I will give you rest."
        reference="Matthew 11:28"
      />

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-8 md:p-10">
            <h2 className="text-2xl font-semibold">Get in touch</h2>
            <p className="mt-2 text-muted-foreground">
              Send us a message and we&apos;ll get back to you as soon as we can.
            </p>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {success && (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  <Check className="h-4 w-4" />
                  Message sent successfully!
                </div>
              )}
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </form>
          </Card>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <Card className="p-8 md:p-10">
              <h2 className="text-2xl font-semibold">Contact information</h2>
              <div className="mt-8 space-y-6">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{label}</h3>
                      <p className="mt-0.5 text-muted-foreground break-words">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-secondary/60 p-8 md:p-10">
              <h3 className="font-serif text-2xl font-semibold">
                Visit us this Sunday
              </h3>
              <p className="mt-3 text-muted-foreground text-pretty">
                Join us for worship, fellowship, and a powerful message. We&apos;d
                love to welcome you in person.
              </p>
              <Link
                href="https://www.bing.com/maps?osid=4b86770a-9da0-4a26-b80c-c470239a4763&cp=-26.054556~28.161725&lvl=17&pi=0&v=2&sV=2&form=S00027"
                target="_blank"
                className="mt-6 inline-block"
              >
                <Button variant="outline">
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
