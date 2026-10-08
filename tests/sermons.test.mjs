import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeSermon,
  filterSermons,
  paginateSermons,
  formatAudioTime,
} from "../src/lib/sermonData.js";
import { createSermonCache } from "../src/lib/sermonCache.js";
const records = Array.from({ length: 13 }, (_, index) => ({
  id: String(index),
  title: `Message ${index}`,
  pastor: index === 8 ? "James" : "Peter",
  scripture: "John 3:16",
  category: index % 2 ? "Faith" : "Hope",
  date: `2026-09-${String(index + 1).padStart(2, "0")}`,
  audio_sermon: "/recording.mp3",
}));
test("normalizes missing fields, timestamps, and rejects unsafe audio URLs", () => {
  assert.equal(normalizeSermon({}).title, "Untitled message");
  assert.equal(
    normalizeSermon({ audio_sermon: "javascript:alert(1)" }).audioUrl,
    "",
  );
  assert.equal(
    normalizeSermon({ date: { seconds: 1700000000 } }).dateISO,
    "2023-11-14T22:13:20.000Z",
  );
  assert.equal(
    normalizeSermon({ date: { toDate: () => new Date("2026-09-01") } }).dateISO,
    "2026-09-01T00:00:00.000Z",
  );
});
test("searches speaker and Scripture and combines topic filters", () => {
  const sermons = records.map(normalizeSermon);
  assert.equal(filterSermons(sermons, "  JAMES ").length, 1);
  assert.equal(filterSermons(sermons, "John", "Faith").length, 6);
  assert.equal(filterSermons(sermons, "missing").length, 0);
});
test("pagination clamps after filters and handles empty results", () => {
  assert.equal(paginateSermons(records, 3).items.length, 1);
  assert.equal(paginateSermons(records.slice(0, 2), 3).page, 1);
  assert.deepEqual(paginateSermons([], 5).items, []);
});
test("formats finite audio times including hour-long messages", () => {
  assert.equal(formatAudioTime(Infinity), "0:00");
  assert.equal(formatAudioTime(-5), "0:00");
  assert.equal(formatAudioTime(3661), "1:01:01");
});
test("deduplicates requests, sorts latest first, and reuses library cache", async () => {
  let calls = 0;
  const cache = createSermonCache(async () => {
    calls++;
    return records;
  });
  const [first, second] = await Promise.all([
    cache.load("archive"),
    cache.load("archive"),
  ]);
  assert.equal(calls, 1);
  assert.equal(first, second);
  assert.equal(first[0].id, "12");
  assert.equal((await cache.load("latest")).length, 4);
  assert.equal(calls, 1);
  await cache.load("archive", { force: true });
  assert.equal(calls, 2);
});
test("failed requests can retry and expired results reload", async () => {
  let calls = 0;
  const cache = createSermonCache(async () => {
    if (++calls === 1) throw Error("offline");
    return records;
  }, 0);
  await assert.rejects(cache.load());
  await cache.load();
  await cache.load();
  assert.equal(calls, 3);
});
