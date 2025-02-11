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
    // Timer for countdown
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

    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Johannesburg&aqi=no`
        );
        const data = await response.json();

        setWeather({
          temp: Math.round(data.current.temp_c),
          condition: data.current.condition.text.toLowerCase().includes("sun")
            ? "sunny"
            : "cloudy",
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
        // Fallback to default values
        setWeather({ temp: 20, condition: "sunny" });
      }
    };

    // Initial weather fetch
    fetchWeather();

    // Fetch weather every 30 minutes
    const weatherTimer = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  return (
    <section className="py-8 border bg-popover rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Next Service In:
            </h3>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              <div className="bg-background p-2 rounded-lg">
                <span className="text-xl md:text-3xl font-bold block">
                  {countdown.days}
                </span>
                <p className="text-sm">Days</p>
              </div>
              <div className="bg-background p-2 rounded-lg">
                <span className="text-xl md:text-3xl font-bold block">
                  {countdown.hours}
                </span>
                <p className="text-sm">Hours</p>
              </div>
              <div className="bg-background p-2 rounded-lg">
                <span className="text-xl md:text-3xl font-bold block">
                  {countdown.minutes}
                </span>
                <p className="text-sm">Minutes</p>
              </div>
              <div className="bg-background p-2 rounded-lg">
                <span className="text-xl md:text-3xl font-bold block">
                  {countdown.seconds}
                </span>
                <p className="text-sm">Seconds</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Current Weather
            </h3>
            <div className="flex items-center justify-center bg-background p-4 rounded-lg">
              {weather.condition === "sunny" ? (
                <Sun className="h-8 w-8 text-yellow-500 mr-4" />
              ) : (
                <Cloud className="h-8 w-8 text-gray-500 mr-4" />
              )}
              <span className="text-2xl md:text-3xl font-bold">
                {weather.temp}°C
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextService;
