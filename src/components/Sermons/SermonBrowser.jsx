"use client";
import { useDeferredValue, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Search,
  Play,
  Pause,
  Headphones,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { filterSermons, paginateSermons } from "@/lib/sermonData";
import useSermons from "./useSermons";
const SermonPlayer = dynamic(() => import("./SermonPlayer"), {
  loading: () => (
    <p role="status" className="rounded-2xl border p-6">
      Opening audio player…
    </p>
  ),
});

export default function SermonBrowser({ archive = false }) {
  const state = useSermons(archive ? "archive" : "latest");
  return <SermonCollection {...state} archive={archive} />;
}
export function SermonCollection({
  sermons,
  loading = false,
  error = "",
  retry,
  archive = false,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [playRequest, setPlayRequest] = useState(0);
  const deferredSearch = useDeferredValue(search);
  const categories = useMemo(
    () => [...new Set(sermons.map((s) => s.category).filter(Boolean))].sort(),
    [sermons],
  );
  const filtered = useMemo(
    () => filterSermons(sermons, deferredSearch, category),
    [sermons, deferredSearch, category],
  );
  const pagination = paginateSermons(filtered, page);
  const items = archive ? pagination.items : filtered;
  const clear = () => {
    setSearch("");
    setCategory("all");
    setPage(1);
  };
  const listen = (sermon) => {
    setActive(sermon);
    setPlayRequest((value) => value + 1);
  };
  return (
    <section
      aria-label={archive ? "Browse sermons" : "Latest sermons"}
      className="container mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12"
    >
      {archive ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-[1fr_220px]">
          <div>
            <label
              htmlFor="sermon-search"
              className="mb-2 block text-sm font-medium"
            >
              Search messages
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground"
              />
              <input
                id="sermon-search"
                type="search"
                placeholder="Title, speaker, or Scripture"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="sermon-category"
              className="mb-2 block text-sm font-medium"
            >
              Topic
            </label>
            <select
              id="sermon-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">All topics</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Latest messages
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A moment to listen. A message to carry with you.
          </p>
        </div>
      )}
      {active && (
        <div className="mb-6">
          <SermonPlayer
            sermon={active}
            playRequest={playRequest}
            onPlaybackChange={setPlaying}
            onClose={() => {
              setActive(null);
              setPlaying(false);
            }}
          />
        </div>
      )}
      {loading ? (
        <div aria-label="Loading sermons" role="status" className="space-y-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="rounded-2xl border p-6">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="mt-3 h-4 w-1/3" />
              <Skeleton className="mt-5 h-10 w-24" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div role="alert" className="rounded-2xl border p-8 text-center">
          <h2 className="text-lg font-semibold">Messages couldn't load</h2>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <Button className="mt-5" onClick={retry}>
            Try again
          </Button>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-secondary/20 px-6 py-14 text-center">
          <Headphones
            className="mx-auto h-8 w-8 text-primary"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-xl font-semibold">
            {sermons.length
              ? "No matching messages"
              : "Messages are on the way"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {sermons.length
              ? "Try another title, speaker, or topic."
              : "New recordings will appear here when they're available. Join us in person for worship and Bible study."}
          </p>
          {sermons.length > 0 && (
            <Button variant="outline" className="mt-5" onClick={clear}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <p role="status" className="mb-4 text-xs text-muted-foreground">
            {archive
              ? `${filtered.length} ${filtered.length === 1 ? "message" : "messages"}${search || category !== "all" ? " found" : " in the library"}`
              : "Listen online, or open an audio file to save it for later."}
          </p>
          <div className="space-y-3">
            {items.map((sermon, index) => {
              const selected = active?.id === sermon.id;
              const featured = !archive && index === 0;
              return (
                <article
                  key={sermon.id}
                  className={`rounded-2xl border p-5 transition-colors md:p-6 ${selected ? "border-primary/40 bg-secondary/60" : featured ? "border-primary/20 bg-secondary/30" : "border-border bg-card"}`}
                >
                  {featured && (
                    <p className="eyebrow mb-3">Most recent message</p>
                  )}
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <time dateTime={sermon.dateISO || undefined}>
                          {sermon.dateLabel}
                        </time>
                        {sermon.category && (
                          <span className="rounded-full bg-secondary px-2 py-1">
                            {sermon.category}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`break-words font-semibold tracking-tight ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}
                      >
                        {sermon.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {sermon.pastor}
                        {sermon.scripture && (
                          <span className="mt-1 block">{sermon.scripture}</span>
                        )}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Button
                        aria-label={`${selected && playing ? "Pause" : "Listen to"} ${sermon.title}`}
                        onClick={() => listen(sermon)}
                        disabled={!sermon.audioUrl}
                        variant={featured || selected ? "default" : "outline"}
                      >
                        {selected && playing ? (
                          <Pause className="mr-2 h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                        )}
                        {sermon.audioUrl
                          ? selected && playing
                            ? "Pause"
                            : "Listen"
                          : "Coming soon"}
                      </Button>
                      {sermon.audioUrl && (
                        <Button asChild variant="ghost" size="sm">
                          <a
                            href={sermon.audioUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open audio file for ${sermon.title}`}
                          >
                            Audio file
                            <ArrowUpRight
                              className="ml-1 h-4 w-4"
                              aria-hidden="true"
                            />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
      {!loading &&
        !error &&
        archive &&
        filtered.length > 0 &&
        pagination.totalPages > 1 && (
          <nav
            aria-label="Sermon pages"
            className="mt-6 flex items-center justify-between gap-3"
          >
            <Button
              variant="outline"
              onClick={() => setPage(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </nav>
        )}
    </section>
  );
}
