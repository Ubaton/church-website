import { Mail } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const StayConnected = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      console.log("Email submitted:", email);
      setEmail("");
    }
  };
  return (
    <>
      <section className="py-12 md:py-16 border rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Stay Connected
          </h2>
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="text-white whitespace-nowrap">
                Subscribe
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {emailError && (
              <p className="text-red-500 mt-2 text-center">{emailError}</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default StayConnected;
