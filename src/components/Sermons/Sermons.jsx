"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Download, Calendar, Pause } from "lucide-react";
import { db } from "@/firebase/FirebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const SermonCard = ({
  title,
  pastor,
  date,
  audio_sermon,
  onPlay,
  isPlaying,
}) => (
  <div className="border p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-2 text-amber-800">{title}</h3>
    <p className="text-gray-600 dark:text-zinc-400 mb-4">{pastor}</p>
    <div className="flex items-center text-gray-600 dark:text-zinc-400 mb-4">
      <Calendar className="h-5 w-5 mr-2" />
      <span>{date}</span>
    </div>
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={onPlay}>
        {isPlaying ? (
          <Pause className="h-4 w-4 mr-2" />
        ) : (
          <Play className="h-4 w-4 mr-2" />
        )}
        {isPlaying ? "Pause" : "Listen"}
      </Button>
      <Button variant="secondary" size="sm" className="text-white">
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  </div>
);

const Sermons = () => {
  const [sermonsData, setSermonsData] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = (audioUrl) => {
    if (currentAudio === audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setCurrentAudio(audioUrl);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    "use cache";
    const fetchSermons = async () => {
      try {
        const sermonCollection = collection(db, "sermons");
        const q = query(sermonCollection, orderBy("date", "desc"), limit(4));
        const sermonSnapshot = await getDocs(q);
        const sermonList = sermonSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSermonsData(sermonList);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      }
    };

    fetchSermons();
  }, []);

  return (
    <div>
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
              Our Sermons
            </h1>
            <blockquote className="text-2xl text-center italic text-gray-700 dark:text-amber-700 max-w-3xl mx-auto mb-8">
              {"Thy word is a lamp unto my feet, and a light unto my path."}
            </blockquote>
            <p className="text-center text-gray-600 dark:text-zinc-400 mb-12">
              - Psalm 119:105 KJV
            </p>
          </div>
        </section>

        <section className="py-16 border rounded-2xl  bg-popover">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sermonsData.map((sermon) => (
                <SermonCard
                  key={sermon.title}
                  {...sermon}
                  onPlay={() => handlePlay(sermon.audio_sermon)}
                  isPlaying={isPlaying && currentAudio === sermon.audio_sermon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              Grow in Your Faith
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto mb-8">
              Our sermons are designed to inspire, challenge, and encourage you
              in your spiritual journey. Listen online or download to listen on
              the go.
            </p>
            <Link href={"/sermons/all-sermons"}>
              <Button className="text-white">View All Sermons</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Sermons;
