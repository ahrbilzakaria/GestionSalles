"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function StudyWeekPicker({ onWeekSelect }) {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const weeks = Array.from({ length: 36 }, (_, i) => i + 1); // Generate weeks 1 to 36

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    if (onWeekSelect) {
      onWeekSelect(week); // Call the parent callback if provided
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="max-w-[12rem] justify-start ">
          {selectedWeek ? `Week ${selectedWeek}` : "Select a Week"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-6 gap-2 p-2">
          {weeks.map((week) => (
            <button
              key={week}
              className={`px-2 py-1 text-center flex justify-center items-center ${
                selectedWeek === week
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
              onClick={() => handleWeekSelect(week)}
            >
              {week}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
