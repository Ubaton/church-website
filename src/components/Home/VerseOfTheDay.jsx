import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getVerseIds, getVerseDescription } from "../../lib/verseData";

const VerseOfTheDay = () => {
  const [verse, setVerse] = useState({
    text: "",
    reference: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const bibleId = "de4e12af7f28f599-02";
  const verseIds = getVerseIds();

  const getVerseForToday = useCallback(() => {
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${now.getMonth() + 1}`;
    const dayOfMonth = now.getDate();
    const dateNumber = parseInt(`${yearMonth}${dayOfMonth}`);
    const index = dateNumber % verseIds.length;
    return verseIds[index];
  }, [verseIds]);

  useEffect(() => {
    const fetchVerseOfTheDay = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const verseId = getVerseForToday();
        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}?content-type=text`,
          {
            headers: {
              "api-key": process.env.NEXT_PUBLIC_BIBLE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch verse");
        }

        const data = await response.json();
        const cleanText = data.data.content.replace(/<\/?[^>]+(>|$)/g, "");

        setVerse({
          text: cleanText,
          reference: data.data.reference,
          description: getVerseDescription(verseId),
        });
      } catch (err) {
        setError("Unable to load verse of the day");
        console.error("Error fetching verse of the day:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerseOfTheDay();

    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timeUntilMidnight = tomorrow - now;

    const refreshTimer = setTimeout(() => {
      fetchVerseOfTheDay();
    }, timeUntilMidnight);

    return () => clearTimeout(refreshTimer);
  }, []);

  if (error) {
    return (
      <section className="py-12 md:py-16 border rounded-lg shadow-md bg-red-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 border rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Verse of the Day
        </h2>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto px-4"
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="w-6 h-6 border-t-2 border-b-2 border-amber-800 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {verse.description && (
                  <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                    {verse.description}
                  </p>
                )}
                <blockquote className="text-xl md:text-2xl text-center italic text-amber-800">
                  {verse.text && `"${verse.text}"`}
                </blockquote>
                <p className="text-center mt-4 text-zinc-600 dark:text-zinc-50">
                  {verse.reference && `- ${verse.reference}`}
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VerseOfTheDay;
