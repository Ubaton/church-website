"use client";

import { Cloud, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const NextService = () => {
  const [weather, setWeather] = useState({ temp: 0, condition: "sunny" });
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + (7 - now.getDay()));
      nextSunday.setHours(10, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    const FALLBACK_WEATHER = { temp: 20, condition: "sunny" };

    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) {
          throw new Error(`Weather request failed: ${response.status}`);
        }
        const data = await response.json();
        if (typeof data?.temp !== "number") {
          throw new Error("Weather response missing current conditions");
        }
        setWeather({ temp: data.temp, condition: data.condition });
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather(FALLBACK_WEATHER);
      }
    };

    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-secondary/60 border border-border/70 shadow-premium">
      <div className="absolute inset-0 bg-grain opacity-60" />
      <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">
            <span className="h-px w-6 bg-primary/60" />
            Next Gathering
          </span>
          <h3 className="mt-3 text-2xl md:text-3xl font-semibold">
            We&apos;d love to see you this Sunday
          </h3>
          <div className="mt-6 grid grid-cols-4 gap-3 md:gap-4">
            {units.map((u) => (
              <div
                key={u.label}
                className="rounded-2xl bg-card border border-border/70 py-4 text-center shadow-premium"
              >
                <span className="block text-2xl md:text-4xl font-serif font-semibold tabular-nums text-primary">
                  {String(u.value).padStart(2, "0")}
                </span>
                <p className="mt-1 text-[0.7rem] md:text-xs uppercase tracking-widest text-muted-foreground">
                  {u.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:border-l lg:border-border/70 lg:pl-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Currently in Tembisa
          </p>
          <div className="mt-4 flex items-center gap-4">
            {weather.condition === "sunny" ? (
              <Sun className="h-10 w-10 text-gold" />
            ) : (
              <Cloud className="h-10 w-10 text-muted-foreground" />
            )}
            <span className="text-4xl md:text-5xl font-serif font-semibold">
              {weather.temp}°C
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Service begins at 10:00 AM. Come as you are — everyone is welcome.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NextService;
