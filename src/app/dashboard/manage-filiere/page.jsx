"use client"; // Mark the component as client-side

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState, useEffect } from "react";

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
    // Retrieve the token from localStorage after the component has mounted
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
      console.log(JSON.parse(storedToken));
    }
  }, []); // The empty dependency array ensures this runs only once

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Manage Filiere :</h1>

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
