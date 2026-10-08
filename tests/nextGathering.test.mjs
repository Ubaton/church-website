import test from "node:test";
import assert from "node:assert/strict";
import { getNextGathering } from "../src/lib/nextGathering.js";

test("Sunday before 10 AM SAST counts down to the same day's service", () => {
  const next = getNextGathering(new Date("2026-10-11T07:59:59Z"));
  assert.equal(next.service.id, "sunday-service");
  assert.equal(next.startsAt.toISOString(), "2026-10-11T08:00:00.000Z");
  assert.deepEqual(next.countdown, {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 1,
  });
});

test("Sunday's start switches to Wednesday at 6:30 PM SAST", () => {
  const next = getNextGathering(new Date("2026-10-11T08:00:00Z"));
  assert.equal(next.service.id, "bible-study");
  assert.equal(next.startsAt.toISOString(), "2026-10-14T16:30:00.000Z");
  assert.equal(next.service.time, "Wednesdays · 6:30 PM");
});

test("Wednesday before Bible Study counts down to that evening", () => {
  const next = getNextGathering(new Date("2026-10-14T16:29:59Z"));
  assert.equal(next.service.id, "bible-study");
  assert.equal(next.countdown.seconds, 1);
});

test("Wednesday's start switches to Sunday's 10 AM service", () => {
  const next = getNextGathering(new Date("2026-10-14T16:30:00Z"));
  assert.equal(next.service.id, "sunday-service");
  assert.equal(next.startsAt.toISOString(), "2026-10-18T08:00:00.000Z");
  assert.deepEqual(next.countdown, {
    days: 3,
    hours: 15,
    minutes: 30,
    seconds: 0,
  });
});

test("visitor timezone does not change the church's next gathering", () => {
  const utc = getNextGathering(new Date("2026-10-10T23:00:00Z"));
  const visitor = getNextGathering(new Date("2026-10-10T16:00:00-07:00"));
  assert.equal(utc.startsAt.getTime(), visitor.startsAt.getTime());
  assert.equal(utc.startsAt.toISOString(), "2026-10-11T08:00:00.000Z");
});

test("schedule rolls correctly into the next year", () => {
  const next = getNextGathering(new Date("2026-12-30T16:30:00Z"));
  assert.equal(next.service.id, "sunday-service");
  assert.equal(next.startsAt.toISOString(), "2027-01-03T08:00:00.000Z");
});
