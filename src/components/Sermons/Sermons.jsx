"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Download, Calendar, Pause, ArrowRight } from "lucide-react";
import { db } from "@/firebase/FirebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import PageHeader from "@/components/ui/page-header";

const formatTime = (time) => {
  if (!time || Number.isNaN(time)) return "0:00";
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const SermonCard = ({
  title,
  pastor,
  date,
  audio_sermon,
  onPlay,
  isPlaying,
  currentTime,
  duration,
}) => (
  <Card className="flex flex-col p-6 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
      Message
    </p>
    <h3 className="mt-2 text-xl font-semibold">{title}</h3>
    <p className="mt-1 text-muted-foreground">{pastor}</p>
    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
      <Calendar className="h-4 w-4" />
      <span>{date}</span>
    </div>

    <div className="mt-5 space-y-4">
      {isPlaying && (
        <>
          <Slider value={[currentTime]} max={duration || 100} step={1} />
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </>
      )}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={onPlay}>
          {isPlaying ? (
            <Pause className="mr-2 h-4 w-4" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {isPlaying ? "Pause" : "Listen"}
        </Button>
        {audio_sermon && (
          <a href={audio_sermon} download target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </a>
        )}
      </div>
    </div>
  </Card>
);

const SkeletonSermonCard = () => (
  <Card className="p-6 md:p-8">
    <Skeleton className="mb-2 h-6 w-3/4" />
    <Skeleton className="mb-4 h-4 w-1/2" />
    <div className="mb-4 flex items-center">
      <Skeleton className="mr-2 h-5 w-5" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="flex space-x-2">
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-28" />
    </div>
  </Card>
);

const Sermons = () => {
  const [sermonsData, setSermonsData] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  const handlePlay = (audioUrl) => {
    if (!audioUrl) return;
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

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));

      setCurrentAudio(audioUrl);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const fetchSermons = async () => {
      if (!db) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchSermons();
  }, []);

  return (
    <main>
      <PageHeader
        eyebrow="Listen & Grow"
        title="Our Sermons"
        quote="Thy word is a lamp unto my feet, and a light unto my path."
        reference="Psalm 119:105 KJV"
      />

      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <SkeletonSermonCard />
              <SkeletonSermonCard />
              <SkeletonSermonCard />
              <SkeletonSermonCard />
            </>
          ) : sermonsData.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              Sermons will appear here soon.
            </p>
          ) : (
            sermonsData.map((sermon) => (
              <SermonCard
                key={sermon.id || sermon.title}
                {...sermon}
                onPlay={() => handlePlay(sermon.audio_sermon)}
                isPlaying={isPlaying && currentAudio === sermon.audio_sermon}
                currentTime={currentTime}
                duration={duration}
              />
            ))
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground shadow-premium-lg md:px-16">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-balance">
              Grow in your faith
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85 text-pretty">
              Our messages are designed to inspire, challenge, and encourage you
              on your spiritual journey. Listen online or download for later.
            </p>
            <Link href="/sermons/all-sermons" className="mt-8 inline-block">
              <Button variant="gold" size="lg">
                View All Sermons
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sermons;
