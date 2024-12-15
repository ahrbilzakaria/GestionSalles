"use client"; // Mark the component as client-side

import { getAllFiliers } from "@/app/api/filieres";
import { getCurrentDay, getCurrentWeek } from "@/app/api/reservations";
import {
  getAllSalles,
  getFreeSallePerDayAndWeekAndSceance,
  getFreeSallePerDayAndWeekAndSeance,
} from "@/app/api/rooms";
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
import { PackageOpenIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { current } from "tailwindcss/colors";

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
  const [totalRooms, setTotalRooms] = useState(null);
  const [totalSpecialties, setTotalSpecialties] = useState(null);
  const [dayLoaded, setDayLoaded] = useState(false);
  const [weekLoaded, setWeekLoaded] = useState(false);

  const [rooms1, setRooms1] = useState();
  const [rooms2, setRooms2] = useState();
  const [rooms3, setRooms3] = useState();
  const [rooms4, setRooms4] = useState();

  const [currentWeek, setCurrentWeek] = useState();
  const [currentDay, setCurrentDay] = useState();

  const loadWeek = async () => {
    try {
      // Get the current week string, e.g., "WEEK_1"
      const currentWeek = await getCurrentWeek();
      setCurrentWeek(currentWeek);
      setWeekLoaded(true);
    } catch (error) {
      console.error("Error loading the week:", error);
    }
  };

  const loadDay = async () => {
    try {
      // Get the current week string, e.g., "WEEK_1"
      const currentDay = await getCurrentDay();
      setCurrentDay(currentDay);
      setDayLoaded(true);
    } catch (error) {
      console.error("Error loading the week:", error);
    }
  };

  const getTotalRooms = async () => {
    try {
      const rooms = await getAllSalles();
      setTotalRooms(rooms.length);
    } catch (e) {
      console.error("Error fetching rooms:", e);
    }
  };

  const getFreeRooms = async (currentDay, currentWeek) => {
    try {
      if (!currentWeek || !currentDay) {
        return;
      }
      console.log(currentDay, currentWeek);
      const payload1 = {
        day: currentDay,
        week: currentWeek,
        seance: "SEANCE_1",
      };

      const rooms1 = await getFreeSallePerDayAndWeekAndSceance(payload1);
      setRooms1(rooms1);
      const payload2 = {
        day: currentDay,
        week: currentWeek,
        seance: "SEANCE_2",
      };
      const rooms2 = await getFreeSallePerDayAndWeekAndSceance(payload2);
      setRooms2(rooms2);
      const payload3 = {
        day: currentDay,
        week: currentWeek,
        seance: "SEANCE_3",
      };
      const rooms3 = await getFreeSallePerDayAndWeekAndSceance(payload3);
      setRooms3(rooms3);
      const payload4 = {
        day: currentDay,
        week: currentWeek,
        seance: "SEANCE_4",
      };
      const rooms4 = await getFreeSallePerDayAndWeekAndSceance(payload4);
      setRooms4(rooms4);
    } catch (e) {
      console.error("Error fetching free rooms:", e);
    }
  };

  // const getFreeRooms = async (currentDay, currentWeek) => {
  //   try {
  //     // if (!currentWeek || !currentDay) {
  //     //   return;
  //     // }
  //     console.log(currentDay, currentWeek);
  //     const payload1 = {
  //       day: "LUNDI",
  //       week: currentWeek,
  //       seance: "SEANCE_1",
  //     };

  //     const rooms1 = await getFreeSallePerDayAndWeekAndSceance(payload1);
  //     setRooms1(rooms1);
  //     const payload2 = {
  //       day: "LUNDI",
  //       week: currentWeek,
  //       seance: "SEANCE_2",
  //     };
  //     const rooms2 = await getFreeSallePerDayAndWeekAndSceance(payload2);
  //     setRooms2(rooms2);
  //     const payload3 = {
  //       day: "LUNDI",
  //       week: currentWeek,
  //       seance: "SEANCE_3",
  //     };
  //     const rooms3 = await getFreeSallePerDayAndWeekAndSceance(payload3);
  //     setRooms3(rooms3);
  //     const payload4 = {
  //       day: "LUNDI",
  //       week: currentWeek,
  //       seance: "SEANCE_4",
  //     };
  //     const rooms4 = await getFreeSallePerDayAndWeekAndSceance(payload4);
  //     setRooms4(rooms4);
  //   } catch (e) {
  //     console.error("Error fetching free rooms:", e);
  //   }
  // };
  const getTotalSpecialties = async () => {
    try {
      const specialties = await getAllFiliers();
      setTotalSpecialties(specialties.length);
    } catch (e) {
      console.error("Error fetching filieres:", e);
    }
  };

  useEffect(() => {
    // Retrieve the token from cookies after the component has mounted
    const storedToken = getCookie("userToken");
    if (storedToken) {
      setToken(storedToken); // Parse the token if it's a JSON string
    }
    getTotalRooms();
    getTotalSpecialties();
    loadWeek();
    loadDay();
    if (dayLoaded && weekLoaded) {
      getFreeRooms(currentDay, currentWeek);
    }
  }, [dayLoaded, weekLoaded]); // The empty dependency array ensures this runs only once

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
            totalRooms={totalRooms}
            comment={""}
          ></RoomCounter>

          <RoomCounter
            title={"Specialties"}
            totalRooms={totalSpecialties}
          ></RoomCounter>
        </div>
        <SidebarSeparator></SidebarSeparator>
        <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min">
          <Card className="h-full w-full bg-muted/50">
            <CardHeader>
              <CardTitle className="text-2xl  font-normal text-start">
                Free Rooms Today :
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 items-start px-10">
              <div className="flex flex-col gap-2 justify-start items-start">
                <h1>08:00 - 10:00</h1>
                {rooms1 ? (
                  <div className="flex gap-4 flex-wrap">
                    {rooms1?.map((room) => {
                      return (
                        <Card
                          className="p-6 flex gap-3  items-start flex-col"
                          key={room.id}
                        >
                          <CardTitle>
                            <h2 className="text-xl uppercase font-bold">
                              {room.name}
                            </h2>
                          </CardTitle>
                          <CardContent>
                            Room size:
                            <span className="font-medium">
                              {" "}
                              {room.numberOfSeats}
                            </span>
                            <br></br>Departement:
                            <span className="font-medium">
                              {" "}
                              {room.location}
                            </span>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <span className="flex gap-2 items-center font-bold pl-4 py-4">
                    <PackageOpenIcon></PackageOpenIcon>No free rooms at this
                    time.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 justify-start items-start">
                <h1>10:00 - 12:00</h1>
                {rooms2 ? (
                  <div className="flex gap-4 flex-wrap">
                    {rooms2?.map((room) => {
                      return (
                        <Card
                          className="p-6 flex gap-3  items-start flex-col"
                          key={room.id}
                        >
                          <CardTitle>
                            <h2 className="text-xl uppercase font-bold">
                              {room.name}
                            </h2>
                          </CardTitle>
                          <CardContent>
                            Room size:
                            <span className="font-medium">
                              {" "}
                              {room.numberOfSeats}
                            </span>
                            <br></br>Departement:
                            <span className="font-medium">
                              {" "}
                              {room.location}
                            </span>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <span className="flex gap-2 items-center font-bold pl-4 py-4">
                    <PackageOpenIcon></PackageOpenIcon>No free rooms at this
                    time.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 justify-start items-start">
                <h1>14:00 - 16:00</h1>
                {rooms3 ? (
                  <div className="flex gap-4 flex-wrap">
                    {rooms3?.map((room) => {
                      return (
                        <Card
                          className="p-6 flex gap-3  items-start flex-col"
                          key={room.id}
                        >
                          <CardTitle>
                            <h2 className="text-xl uppercase font-bold">
                              {room.name}
                            </h2>
                          </CardTitle>
                          <CardContent>
                            Room size:
                            <span className="font-medium">
                              {" "}
                              {room.numberOfSeats}
                            </span>
                            <br></br>Departement:
                            <span className="font-medium">
                              {" "}
                              {room.location}
                            </span>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <span className="flex gap-2 items-center font-bold pl-4 py-4">
                    <PackageOpenIcon></PackageOpenIcon>No free rooms at this
                    time.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 justify-start items-start">
                <h1>16:00 - 18:00</h1>
                {rooms4 ? (
                  <div className="flex gap-4 flex-wrap">
                    {rooms4?.map((room) => {
                      return (
                        <Card
                          className="p-6 flex gap-3  items-start flex-col"
                          key={room.id}
                        >
                          <CardTitle>
                            <h2 className="text-xl uppercase font-bold">
                              {room.name}
                            </h2>
                          </CardTitle>
                          <CardContent>
                            Room size:
                            <span className="font-medium">
                              {" "}
                              {room.numberOfSeats}
                            </span>
                            <br></br>Departement:
                            <span className="font-medium">
                              {" "}
                              {room.location}
                            </span>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <span className="flex gap-2 items-center font-bold pl-4 py-4">
                    <PackageOpenIcon></PackageOpenIcon>No free rooms at this
                    time.
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
