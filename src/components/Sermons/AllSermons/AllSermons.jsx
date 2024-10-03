"use client";

import Link from "next/link";
import { useState } from "react";
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

const sermons = [
  {
    id: 1,
    title: "The Power of Faith",
    pastor: "Pastor John Doe",
    date: "June 4, 2024",
    category: "Faith",
  },
  {
    id: 2,
    title: "Living with Purpose",
    pastor: "Pastor Jane Smith",
    date: "May 28, 2024",
    category: "Purpose",
  },
  {
    id: 3,
    title: "The Grace of Forgiveness",
    pastor: "Pastor John Doe",
    date: "May 21, 2024",
    category: "Forgiveness",
  },
  {
    id: 4,
    title: "Walking in Love",
    pastor: "Pastor Jane Smith",
    date: "May 14, 2024",
    category: "Love",
  },
  {
    id: 5,
    title: "Overcoming Adversity",
    pastor: "Pastor John Doe",
    date: "May 7, 2024",
    category: "Perseverance",
  },
  {
    id: 6,
    title: "The Power of Prayer",
    pastor: "Pastor Jane Smith",
    date: "April 30, 2024",
    category: "Prayer",
  },
  {
    id: 7,
    title: "Understanding God's Will",
    pastor: "Pastor John Doe",
    date: "April 23, 2024",
    category: "Guidance",
  },
  {
    id: 8,
    title: "The Fruit of the Spirit",
    pastor: "Pastor Jane Smith",
    date: "April 16, 2024",
    category: "Spiritual Growth",
  },
];

export default function AllSermons({
  onSearch = () => {},
  onCategoryChange = () => {},
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const sermonsPerPage = 5;

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
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  <Button variant="outline" size="sm">
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
