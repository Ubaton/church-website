"use client";

import { Cloud, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CHURCH_TIME_ZONE, getNextGathering } from "@/lib/nextGathering";

const NextService = () => {
  const [weather, setWeather] = useState({ temp: 0, condition: "sunny" });
  const [nextGathering, setNextGathering] = useState(null);

  useEffect(() => {
    const updateGathering = () => setNextGathering(getNextGathering());
    updateGathering();
    const timer = setInterval(updateGathering, 1000);

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

  const countdown = nextGathering?.countdown;
  const units = [
    { label: "Days", value: countdown?.days },
    { label: "Hours", value: countdown?.hours },
    { label: "Minutes", value: countdown?.minutes },
    { label: "Seconds", value: countdown?.seconds },
  ];
  const dateLabel =
    nextGathering &&
    new Intl.DateTimeFormat("en-ZA", {
      timeZone: CHURCH_TIME_ZONE,
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(nextGathering.startsAt);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-secondary/60 border border-border/70 shadow-premium">
      <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">
            <span className="h-px w-6 bg-primary/60" />
            Next Gathering
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold">
            {nextGathering?.service.title || "Finding the next gathering"}
          </h2>
          {nextGathering && (
            <p className="mt-3 text-sm text-muted-foreground">
              <time dateTime={nextGathering.startsAt.toISOString()}>
                {dateLabel}
              </time>
              {" · "}
              {nextGathering.service.time.split(" · ")[1]} (SAST)
            </p>
          )}
          <div className="mt-6 grid grid-cols-4 gap-2 md:gap-4">
            {units.map((u) => (
              <div
                key={u.label}
                className="rounded-2xl bg-card py-4 text-center"
              >
                <span className="block text-2xl md:text-4xl font-sans font-semibold tabular-nums text-foreground">
                  {u.value == null ? ".." : String(u.value).padStart(2, "0")}
                </span>
                <p className="mt-1 text-[0.625rem] md:text-xs text-muted-foreground">
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
            <span className="text-4xl md:text-5xl font-sans font-semibold">
              {weather.temp}°C
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {nextGathering
              ? `${nextGathering.service.title} begins at ${nextGathering.service.time.split(" · ")[1]}. `
              : ""}
            Come as you are. Everyone is welcome.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NextService;
