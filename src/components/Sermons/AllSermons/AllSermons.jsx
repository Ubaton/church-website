"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Play,
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
import { db } from "../../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function AllSermons({
  onSearch = () => {},
  onCategoryChange = () => {},
}) {
  const [sermons, setSermons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const sermonsPerPage = 5;

  useEffect(() => {
    const fetchSermons = async () => {
      const querySnapshot = await getDocs(collection(db, "sermons"));
      const sermonsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSermons(sermonsList);
    };

    fetchSermons();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onCategoryChange(value);
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
      // Stop any currently playing audio
      if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
      }

      // Create new audio instance
      const audio = new Audio(audioUrl);
      window.currentAudio = audio;

      // Add error handling
      audio.onerror = (error) => {
        console.error("Error loading audio:", error);
        alert(
          "Sorry, there was an error playing the sermon. Please try downloading instead."
        );
      };

      // Add loading state if needed
      setIsLoading(true);

      await audio.play();

      // Remove loading state if needed
      setIsLoading(false);

      console.log(`Now playing: ${title}`);
    } catch (error) {
      console.error("Error playing audio:", error);
      alert(
        "Sorry, there was an error playing the sermon. Please try downloading instead."
      );
      // Reset loading state if needed
      setIsLoading(false);
    }
  };

  const handleDownload = async (audioUrl, title) => {
    try {
      // Show loading state to user
      setIsDownloading(true);

      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the file type from the response headers or default to mp3
      const contentType = response.headers.get("content-type") || "audio/mpeg";
      const fileExtension = contentType.includes("mpeg") ? "mp3" : "m4a";

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a sanitized filename
      const sanitizedTitle = title
        ? title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
        : "sermon";
      const filename = `${sanitizedTitle}.${fileExtension}`;

      // Create and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Reset loading state
      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert(
        "Sorry, there was an error downloading the sermon. Please try again later."
      );
      // Reset loading state
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
          All Sermons
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
              <SelectTrigger placeholder="All Categories" className="w-full">
                <SelectContent>
                  <SelectItem value={null}>All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {currentSermons.map((sermon) => (
            <Card
              key={sermon.id}
              className="transition-transform transform hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-xl text-amber-800 font-semibold">
                  {sermon.title}
                </CardTitle>
                <CardDescription>{sermon.pastor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-gray-600 dark:text-zinc-400 mb-4">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{sermon.date}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleListen(sermon.audioUrl, sermon.title)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDownload(sermon.audioUrl, sermon.title)
                    }
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center space-x-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-gray-600 dark:text-zinc-400">
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
        </div>
      </main>
    </div>
  );
}
