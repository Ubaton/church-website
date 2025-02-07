import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const VerseOfTheDay = () => {
  const [verse, setVerse] = useState({ text: "", reference: "" });
  const [showFullVerse, setShowFullVerse] = useState(false);

  const bibleId = "de4e12af7f28f599-02";

  const verseIds = [
    "JHN.3.16",
    "ROM.8.28",
    "PSA.23.1",
    "ISA.41.10",
    "PHP.4.13",
    "MAT.11.28",
    "JOS.1.9",
    "HEB.11.1",
    "1COR.10.13",
    "PRO.3.5-6",
    "JAM.1.2-3",
    "GAL.5.22-23",
    "PSA.46.1",
    "ISA.40.31",
    "2TI.1.7",
    "HEB.12.2",
    "ROM.12.12",
    "PHP.2.3-4",
    "MAT.5.43-44",
    "JER.29.11",
    "PRO.22.6",
    "PSA.118.24",
    "ISA.55.6-7",
    "JHN.14.6",
    "ROM.5.8",
    "PSA.121.1-2",
    "2COR.5.17",
    "MAT.28.19",
    "1PET.5.7",
    "REV.21.4",
  ];

  useEffect(() => {
    const today = new Date().getDate();
    const verseId = verseIds[(today - 1) % verseIds.length];

    const fetchVerseOfTheDay = async () => {
      try {
        const response = await fetch(
          `https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}?content-type=text`,
          {
            headers: {
              "api-key": process.env.NEXT_PUBLIC_BIBLE_API_KEY,
            },
          }
        );
        const data = await response.json();
        setVerse({ text: data.data.content, reference: data.data.reference });
      } catch (error) {
        console.error("Error fetching verse of the day:", error);
      }
    };

    fetchVerseOfTheDay();
  }, []);

  return (
    <>
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
              <blockquote className="text-xl md:text-2xl text-center italic text-amber-800">
                {`"${verse.text}"`}
              </blockquote>
              <p className="text-center mt-4 text-zinc-600 dark:text-zinc-50">
                - {verse.reference}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default VerseOfTheDay;
