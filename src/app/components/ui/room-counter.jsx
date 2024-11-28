"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RoomCounter({ comment, title, totalRooms, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = totalRooms;
    const incrementTime = duration / end;
    let timer;

    const updateCount = () => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    };

    timer = setInterval(updateCount, incrementTime);

    return () => clearInterval(timer);
  }, [totalRooms, duration]);

  return (
    <Card className="md:aspect-video md:h-full  w-full overflow-hidden md:min-h-[12rem]">
      <CardHeader>
        <CardTitle className="text-2xl font-normal text-start">
          {title} :
        </CardTitle>
      </CardHeader>
      <CardContent className="flex  items-center justify-center">
        <p className="text-5xl  md:text-7xl font-bold text-primary ">
          <span className="font-light"></span>
          {count}
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground md:text-sm font-light text-center w-full">
          {comment}
        </p>
      </CardFooter>
    </Card>
  );
}
