"use client";

import AllSermons from "@/components/Sermons/AllSermons/AllSermons";
import React from "react";

const page = () => {
  const handleCategoryChange = (category) => {
    console.log("Selected Category:", category);
  };

  return (
    <div>
      <AllSermons onCategoryChange={handleCategoryChange} />
    </div>
  );
};

export default page;
