import { NextResponse } from "next/server";

// Server-side proxy for weatherapi.com so WEATHER_API_KEY (a server-only env
// var) never reaches the browser. Cached for 30 minutes.
export const revalidate = 1800;

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Weather API key is not configured" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Johannesburg&aqi=no`,
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Weather request failed: ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const current = data?.current;

    if (typeof current?.temp_c !== "number") {
      return NextResponse.json(
        { error: "Weather response missing current conditions" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      temp: Math.round(current.temp_c),
      condition: current.condition?.text?.toLowerCase().includes("sun")
        ? "sunny"
        : "cloudy",
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "Weather request failed" },
      { status: 502 }
    );
  }
}
