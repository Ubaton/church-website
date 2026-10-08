export function formatAudioTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const value = Math.floor(seconds);
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const rest = String(value % 60).padStart(2, "0");
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${rest}`
    : `${minutes}:${rest}`;
}

const text = (value) => (typeof value === "string" ? value.trim() : "");

export function normalizeSermon(record) {
  const rawDate = record.date;
  const date =
    rawDate?.toDate instanceof Function
      ? rawDate.toDate()
      : typeof rawDate?.seconds === "number"
        ? new Date(rawDate.seconds * 1000)
        : rawDate instanceof Date
          ? rawDate
          : new Date(text(rawDate));
  const timestamp = Number.isFinite(date.getTime()) ? date.getTime() : 0;
  const audio = text(record.audio_sermon);
  const audioUrl = /^(https?:\/\/|\/(?!\/))/i.test(audio) ? audio : "";

  return {
    id: text(record.id),
    title: text(record.title) || "Untitled message",
    pastor: text(record.pastor) || "Tembisa Independent Baptist Church",
    category: text(record.category),
    scripture: text(record.scripture),
    audioUrl,
    timestamp,
    dateISO: timestamp ? date.toISOString() : "",
    dateLabel: timestamp
      ? new Intl.DateTimeFormat("en-ZA", {
          timeZone: "Africa/Johannesburg",
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(date)
      : text(rawDate) || "Date unavailable",
  };
}

export function filterSermons(sermons, search = "", category = "all") {
  const term = search.trim().toLowerCase();
  return sermons.filter(
    (sermon) =>
      (category === "all" || sermon.category === category) &&
      (!term ||
        `${sermon.title} ${sermon.pastor} ${sermon.scripture}`
          .toLowerCase()
          .includes(term)),
  );
}

export function paginateSermons(sermons, requestedPage, pageSize = 6) {
  const totalPages = Math.max(1, Math.ceil(sermons.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (page - 1) * pageSize;
  return {
    page,
    totalPages,
    items: sermons.slice(start, start + pageSize),
    start,
  };
}
