"use client"; // Mark the component as client-side

import { getAllFiliers } from "@/app/api/filieres";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Timer, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StudyWeekPicker } from "./studyWeekPicker";
import { getCurrentWeek } from "@/app/api/reservations";
import { TableProf } from "./TableProf";
import { getEmploisDuTempsByProfesseurId } from "@/app/api/emploi";
import {
  addLiberation,
  getLiberationsByProfesseurId,
} from "@/app/api/liberation";

// Utility function to get cookies by name
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
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();
  const [filteredLiberations, setFilteredLiberations] = useState([]);
  const [weekDate, setWeekDate] = useState();
  const [currentWeek, setCurrentWeek] = useState();
  const [show, isShow] = useState(false);
  const [timeTable, setTimeTable] = useState();
  const [liberations, setLiberations] = useState();
  const [seanceId, setSeanceId] = useState();
  const loadTimeTable = async (id) => {
    try {
      const profTimeTable = await getEmploisDuTempsByProfesseurId(id);
      setTimeTable(profTimeTable); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching professeur's time table:", error);
    } finally {
    }
  };

  const handleWeekSelect = (week) => {
    const weekdata = "WEEK_" + week;
    setWeekDate(weekdata);
  };

  const loadWeek = async () => {
    try {
      // Get the current week string, e.g., "WEEK_1"
      const currentWeek = await getCurrentWeek();

      // Extract just the week number from "WEEK_1" -> "1"
      const weekNumber = currentWeek.split("_")[1];

      // Set the current week state with the extracted week number
      setCurrentWeek(weekNumber);
    } catch (error) {
      console.error("Error loading the week:", error);
    }
  };

  const handleLiberation = async () => {
    // Validation: Ensure all fields are filled
    if (!seanceId || !weekDate) {
      toast({
        title: "Missing Information",
        description: "Please complete all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    const requestData = {
      week: weekDate,
    };

    try {
      // Replace with your API endpoint
      const response = await addLiberation(requestData, seanceId);
      toast({
        title: "Liberation Created",
        description: "Your liberation has been successfully created.",
        variant: "",
      });
      setSeanceId(null);
      setIsAdded((prev) => !prev); // Trigger re-fetch of reservations
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const loadLiberations = async (id) => {
    try {
      const liberationsData = await getLiberationsByProfesseurId(id);
      setLiberations(liberationsData); // Set the fetched filieres to the state
      setFilteredLiberations(liberationsData); // Set the filtered liberations to the state
      console.log(liberationsData);
    } catch (error) {
      console.error("Error fetching professeur's liberations:", error);
    } finally {
    }
  };

  // Check if user is logged in by reading the token from cookies
  useEffect(() => {
    const token = getCookie("userToken");
    if (token.id) {
      loadTimeTable(token.id);
      loadLiberations(token.id);
    }
    loadWeek();
  }, [isAdded]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="w-full gap-2 flex justify-between items-baseline">
          <h1 className="font-bold text-3xl">Liberations:</h1>
          {currentWeek && (
            <div>
              Current Week:{" "}
              <span className="p-2  bg-black text-white">{currentWeek}</span>
            </div>
          )}
        </div>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          {/* DataTable for Filiere */}
          <Card className="mt-8 p-2 pr-6 md:p-6  w-full ">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-normal text-start">
                Liberations List:
              </CardTitle>
              <div className="flex gap-2 items-center">
                <Button
                  variant={show ? "destructive" : "outline"}
                  className="w-full "
                  onClick={() => {
                    isShow(!show);
                  }}
                >
                  {show ? (
                    <span className="flex gap-2 items-center">
                      <X></X>Timetable
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">
                      <Timer></Timer>Timetable
                    </span>
                  )}
                </Button>
                <Sheet>
                  <SheetTrigger className="w-fit" asChild>
                    <Button variant="outline">
                      <Plus /> Liberation
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={"top"}>
                    <SheetHeader>
                      <SheetTitle>Liberation:</SheetTitle>
                      <SheetDescription>
                        Click free when you are done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="studyWeekPicker" className="text-right">
                          Week
                        </Label>
                        <StudyWeekPicker
                          id="studyWeekPicker"
                          onWeekSelect={handleWeekSelect}
                        ></StudyWeekPicker>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Seance Id
                        </Label>
                        <Input
                          className="max-w-[12rem]"
                          id="seanceId"
                          type="number"
                          onChange={(e) => {
                            setSeanceId(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button onClick={handleLiberation} type="submit">
                          <Plus /> Liberer
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </CardHeader>

            <CardContent className=" overflow-y-auto">
              <DataTable columns={columns} data={filteredLiberations} />
              {show ? <TableProf timeTableData={timeTable}></TableProf> : ""}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
