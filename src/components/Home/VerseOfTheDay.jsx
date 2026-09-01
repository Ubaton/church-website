"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { getVerseForDate, FALLBACK_VERSE } from "@/lib/verseData";

const VerseOfTheDay = () => {
  const [verse, setVerse] = useState({ text: "", reference: "", theme: "" });
  const [isLoading, setIsLoading] = useState(true);

  const fetchVerse = useCallback(async () => {
    setIsLoading(true);
    const today = getVerseForDate();

    try {
      const res = await fetch(
        `https://bible-api.com/${encodeURIComponent(
          today.reference
        )}?translation=kjv`
      );
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      if (!data?.text) throw new Error("No verse text returned");

      // Collapse the API's line breaks / leading spaces into clean prose.
      const cleanText = data.text.replace(/\s+/g, " ").trim();

      setVerse({
        text: cleanText,
        reference: data.reference || today.reference,
        theme: today.theme,
      });
    } catch (err) {
      console.error("Error fetching verse of the day:", err);
      setVerse({
        text: FALLBACK_VERSE.text,
        reference: FALLBACK_VERSE.reference,
        theme: FALLBACK_VERSE.theme,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVerse();

    // Refresh at midnight so the verse rolls over without a reload.
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timer = setTimeout(fetchVerse, midnight - now);
    return () => clearTimeout(timer);
  }, [fetchVerse]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-secondary/50 shadow-premium">
      <div className="absolute inset-0 bg-grain opacity-60" />
      <div className="relative px-6 py-14 md:px-16 md:py-20 text-center">
        <span className="eyebrow justify-center">
          <span className="h-px w-6 bg-primary/60" />
          Verse of the Day
          <span className="h-px w-6 bg-primary/60" />
        </span>

        <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen className="h-7 w-7" />
        </div>

        {isLoading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          </div>
        ) : (
          <motion.div
            key={verse.reference}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-3xl"
          >
            {verse.theme && (
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                {verse.theme}
              </p>
            )}
            <blockquote className="mt-4 font-serif text-2xl md:text-3xl leading-relaxed italic text-foreground text-balance">
              &ldquo;{verse.text}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {verse.reference} · KJV
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VerseOfTheDay;
