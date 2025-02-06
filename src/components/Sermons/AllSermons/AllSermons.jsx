"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { db } from "../../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const SkeletonCard = () => (
  <Card className="transition-transform transform hover:scale-105">
    <CardHeader>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="flex items-center mb-4">
        <Skeleton className="h-5 w-5 mr-2" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </CardContent>
  </Card>
);

export default function AllSermons() {
  const [sermons, setSermons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const sermonsPerPage = 5;

  useEffect(() => {
    const fetchSermons = async () => {
      setIsDataLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "sermons"));

        const sermonsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Find audio_sermon in the data
        const audioSermons = sermonsList
          .map((sermon) => sermon.audio_sermon)
          .filter(Boolean);

        setSermons(sermonsList);
      } catch (error) {
        console.error("Error fetching sermons:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchSermons();

    // Create audio element on client-side only
    audioRef.current = new Audio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const filteredSermons = sermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null || sermon.category === selectedCategory)
  );

  const indexOfLastSermon = currentPage * sermonsPerPage;
  const indexOfFirstSermon = indexOfLastSermon - sermonsPerPage;
  const currentSermons = filteredSermons.slice(
    indexOfFirstSermon,
    indexOfLastSermon
  );

  const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage);

  const categories = [...new Set(sermons.map((sermon) => sermon.category))];

  const handleListen = async (audioUrl, title) => {
    try {
      setIsLoading(true);
      if (currentAudio === audioUrl) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        await audioRef.current.play();
        setCurrentAudio(audioUrl);
        setIsPlaying(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error playing audio:", error);
      alert(
        "Sorry, there was an error playing the sermon. Please try downloading instead."
      );
      setIsLoading(false);
    }
  };

  const handleDownload = async (audioUrl, title) => {
    try {
      setIsDownloading(true);

      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "audio/mpeg";
      const fileExtension = contentType.includes("mpeg") ? "mp3" : "m4a";

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const sanitizedTitle = title
        ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
        : "sermon";
      const filename = `${sanitizedTitle}.${fileExtension}`;

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert(
        "Sorry, there was an error downloading the sermon. Please try again later."
      );
      setIsDownloading(false);
    }
  };

  const formatTime = (time) => {
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

  const handleSeek = (newValue) => {
    const [newTime] = newValue;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
          All Sermons
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {isDataLoading ? (
            <>
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-full md:w-48" />
            </>
          ) : (
            <>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search sermons..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-48">
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          {isDataLoading
            ? Array.from({ length: sermonsPerPage }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : currentSermons.map((sermon) => (
                <Card
                  key={sermon.id}
                  className="transition-transform transform hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-primary font-semibold">
                      {sermon.title}
                    </CardTitle>
                    <CardDescription>{sermon.pastor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{sermon.date}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleListen(sermon.audio_sermon, sermon.title)
                        }
                        disabled={isLoading}
                      >
                        {isPlaying && currentAudio === sermon.audio_sermon ? (
                          <Pause className="h-4 w-4 mr-2" />
                        ) : (
                          <Play className="h-4 w-4 mr-2" />
                        )}
                        {isLoading ? "Loading..." : "Listen"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDownload(sermon.audio_sermon, sermon.title)
                        }
                        disabled={isDownloading}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {isDownloading ? "Downloading..." : "Download"}
                      </Button>
                    </div>
                    {currentAudio === sermon.audio_sermon && (
                      <div className="mt-4">
                        <Slider
                          value={[currentTime]}
                          max={duration}
                          step={1}
                          onValueChange={handleSeek}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
        </div>

        <div className="mt-8 flex justify-center items-center space-x-4">
          {isDataLoading ? (
            <>
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-24" />
            </>
          ) : (
            <>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                variant="outline"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
