import { services } from "./services.js";

export const CHURCH_TIME_ZONE = "Africa/Johannesburg";

// South African Standard Time is UTC+2 year-round, without daylight saving.
const SAST_OFFSET = 2 * 60 * 60 * 1000;
const WEEK = 7 * 24 * 60 * 60 * 1000;

export function getNextGathering(now = new Date()) {
  const churchDate = new Date(now.getTime() + SAST_OFFSET);
  const candidates = services
    .filter((service) => service.gatheringSchedule)
    .map((service) => {
      const { weekday, hour, minute } = service.gatheringSchedule;
      const daysAhead = (weekday - churchDate.getUTCDay() + 7) % 7;
      let timestamp =
        Date.UTC(
          churchDate.getUTCFullYear(),
          churchDate.getUTCMonth(),
          churchDate.getUTCDate() + daysAhead,
          hour,
          minute,
        ) - SAST_OFFSET;

      if (timestamp <= now.getTime()) timestamp += WEEK;
      return { service, startsAt: new Date(timestamp) };
    });

  const next = candidates.sort((a, b) => a.startsAt - b.startsAt)[0];
  const remaining = Math.max(0, next.startsAt.getTime() - now.getTime());
  return {
    ...next,
    countdown: {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000),
    },
  };
}
