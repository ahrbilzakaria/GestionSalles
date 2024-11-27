"use client"; // Mark the component as client-side

import { DateDisplay } from "@/app/components/ui/date-display";
import { RoomOccupancyChart } from "@/app/components/ui/room-chart";
import { RoomCounter } from "@/app/components/ui/room-counter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { useState, useEffect } from "react";

// Helper function to retrieve a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(";").shift();
    try {
      return JSON.parse(cookieValue); // Parse the cookie value as JSON
    } catch (e) {
      return null; // In case the cookie is not a valid JSON
    }
  }
  return null;
};

export default function Home() {
  const [token, setToken] = useState(null);

  const freeRooms = [
    {
      Title: "k01",
      size: "40",
      departement: "C",
    },
    {
      Title: "k02",
      size: "50",
      departement: "C",
    },
    {
      Title: "it01",
      size: "25",
      departement: "B",
    },
    {
      Title: "it02",
      size: "35",
      departement: "B",
    },
    {
      Title: "m01",
      size: "40",
      departement: "A",
    },
    {
      Title: "m02",
      size: "30",
      departement: "A",
    },
  ];

  useEffect(() => {
    // Retrieve the token from cookies after the component has mounted
    const storedToken = getCookie("userToken");
    if (storedToken) {
      setToken(storedToken); // Parse the token if it's a JSON string
    }
  }, []); // The empty dependency array ensures this runs only once

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">
          <span className="font-medium">Welcome,</span> {token?.username}
        </h1>
        <div className="grid h-fit auto-rows-min gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
          <DateDisplay></DateDisplay>

          <RoomCounter
            title={"Total Rooms"}
            totalRooms={56}
            comment={"2 rooms currently unavailable"}
          ></RoomCounter>

          <RoomCounter title={"Specialties"} totalRooms={12}></RoomCounter>
        </div>
        <SidebarSeparator></SidebarSeparator>
        <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min">
          <Card className="h-full w-full bg-muted/50">
            <CardHeader>
              <CardTitle className="text-2xl  font-normal text-start">
                Free Rooms This Week :
              </CardTitle>
            </CardHeader>

            <CardContent className="flex gap-4 flex-wrap">
              {freeRooms.map((room) => {
                return (
                  <Card
                    className="p-6 flex gap-3  items-start flex-col"
                    key={room.Title}
                  >
                    <CardTitle>
                      <h2 className="text-xl uppercase font-bold">
                        {room.Title}
                      </h2>
                    </CardTitle>
                    <CardContent>
                      Room size:{" "}
                      <span className="font-medium">{room.size}</span>
                      <br></br>Departement:{" "}
                      <span className="font-medium">{room.departement}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
