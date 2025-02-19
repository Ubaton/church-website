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

  // Helper to format verse ID into API-compatible format
  const formatVerseIdForApi = (verseId) => {
    if (!verseId.includes('-')) {
      return verseId; // Single verse, no change needed
    }
    
    // For verse ranges, convert "BOOK.CHAPTER.START-END" to "BOOK.CHAPTER.START-BOOK.CHAPTER.END"
    const parts = verseId.split('.');
    if (parts.length !== 3) return verseId; // Unexpected format
    
    const book = parts[0];
    const chapter = parts[1];
    const verseRange = parts[2];
    
    if (!verseRange.includes('-')) return verseId; // Not a range after all
    
    const [start, end] = verseRange.split('-');
    // Format: BOOK.CHAPTER.START-BOOK.CHAPTER.END
    return `${book}.${chapter}.${start}-${book}.${chapter}.${end}`;
  };

  useEffect(() => {
    const fetchVerseOfTheDay = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const verseId = getVerseForToday();
        if (!verseId) {
          throw new Error("No verse ID available for today");
        }

        const isRange = verseId.includes('-');
        const formattedVerseId = formatVerseIdForApi(verseId);
        
        // Reference parameter for passages endpoint
        // For chapter/verse format, use 'id' query param
        const url = isRange 
          ? `https://api.scripture.api.bible/v1/bibles/${bibleId}/passages?id=${formattedVerseId}&content-type=text`
          : `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}?content-type=text`;
        
        const response = await fetch(url, {
          headers: {
            "api-key": process.env.NEXT_PUBLIC_BIBLE_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch verse: ${response.status}`);
        }

        const data = await response.json();
        
        let cleanText, reference;
        
        if (isRange) {
          // For passages endpoint, data structure is slightly different
          if (!data || !data.data || !data.data[0] || !data.data[0].content) {
            throw new Error("Invalid passage data received");
          }
          cleanText = data.data[0].content.replace(/<\/?[^>]+(>|$)/g, "");
          reference = data.data[0].reference;
        } else {
          if (!data || !data.data || !data.data.content) {
            throw new Error("Invalid verse data received");
          }
          cleanText = data.data.content.replace(/<\/?[^>]+(>|$)/g, "");
          reference = data.data.reference;
        }

        const description = getVerseDescription(verseId);

        setVerse({
          text: cleanText,
          reference: reference,
          description: description,
        });
      } catch (err) {
        console.error("Error fetching verse of the day:", err);
        setError("Unable to load verse of the day. Please try again later.");
        
        // Fallback verse when API fails
        setVerse({
          text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          reference: "Proverbs 3:5-6",
          description: getVerseDescription(getVerseForToday()) || "Trust in the Lord",
        });
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
  }, [getVerseForToday, bibleId]);

  if (error) {
    return (
      <section className="py-12 md:py-16 border rounded-lg shadow-md bg-red-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-red-600">{error}</p>
          {verse.text && (
            <div className="mt-6">
              <p className="text-center text-lg text-zinc-600 mb-4">
                {verse.description}
              </p>
              <blockquote className="text-xl md:text-2xl text-center italic text-amber-800">
                "{verse.text}"
              </blockquote>
              <p className="text-center mt-4 text-zinc-600">
                - {verse.reference}
              </p>
            </div>
          )}
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