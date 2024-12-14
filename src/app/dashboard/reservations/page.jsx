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
import { Plus, Search, Timer, Trash, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { StudyWeekPicker } from "./studyWeekPicker";
import { getAllSalles } from "@/app/api/rooms";
import { addReservation, getAllReservations } from "@/app/api/reservations";
import { TableProf } from "./TableProf";
import { getEmploisDuTempsByProfesseurId } from "@/app/api/emploi";

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
  const [filieres, setFilieres] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reservation, setReservation] = useState();
  const [reservations, setReservations] = useState();
  const [open3, setOpen3] = useState(false);
  const [selectedStatus3, setSelectedStatus3] = useState();
  const [open4, setOpen4] = useState(false);
  const [selectedStatus4, setSelectedStatus4] = useState();
  const [salles, setSalles] = useState([]);
  const [weekDate, setWeekDate] = useState();
  const [show, isShow] = useState(false);
  const [timeTable, setTimeTable] = useState();
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

  const loadSalles = async () => {
    try {
      const sallesData = await getAllSalles();
      setSalles(sallesData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching salles:", error);
    }
  };

  // Function to load filieres data
  const loadFiliers = async () => {
    try {
      const filieresData = await getAllFiliers();
      setFilieres(filieresData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching filieres:", error);
    }
  };

  const loadReservations = async (id) => {
    try {
      const reservationsData = await getAllReservations(id);
      setReservations(reservationsData); // Set the fetched filieres to the state
      console.log(reservationsData);
      setFilteredReservations(reservationsData); // Set the initial filtered filieres
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredReservations(
      reservations.filter((reservation) => {
        return Object.values(reservation).some((value) =>
          String(value).toLowerCase().includes(query)
        );
      })
    );
  };

  const handleCreateReservation = async () => {
    if (!reservation) {
      toast({
        title: "Error",
        description:
          "Please fill out all fields before creating a reservation.",
        variant: "destructive",
      });
      return;
    }

    // Extract reservation details
    const { jour, seance, filiere, salle, week } = reservation;

    // Validation: Ensure all fields are filled
    if (!jour || !seance || !selectedStatus4 || !selectedStatus3 || !weekDate) {
      toast({
        title: "Missing Information",
        description: "Please complete all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    const requestData = {
      jour: jour,
      seance: seance,
      filiereId: selectedStatus4?.id,
      salleId: selectedStatus3?.id,
      week: weekDate,
    };

    try {
      // Replace with your API endpoint
      const response = await addReservation(requestData);
      toast({
        title: "Reservation Created",
        description: "Your reservation has been successfully created.",
        variant: "",
      });

      setReservation(null); // Clear form
      setSelectedStatus3(null); // Reset salle selection
      setSelectedStatus4(null); // Reset filiere selection
      setIsAdded((prev) => !prev); // Trigger re-fetch of reservations
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  // Check if user is logged in by reading the token from cookies
  useEffect(() => {
    const token = getCookie("userToken");
    console.log(token); // Check cookies for the userToken (as a JSON)
    if (token.id) {
      loadReservations(token.id); // Fetch reservations when user is logged in
      loadTimeTable(token.id);
    }
    if (!token) {
      router.push("/login"); // Redirect unauthorized users
    } else {
      loadFiliers();
      loadSalles();
    }
  }, [isAdded, router]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Reservations:</h1>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          {/* DataTable for Filiere */}
          <Card className="mt-8 p-2 pr-6 md:p-6  w-full ">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-normal text-start">
                Reservations List:
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
                      <Plus /> Create Reservation
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={"top"}>
                    <SheetHeader>
                      <SheetTitle>Create Reservation:</SheetTitle>
                      <SheetDescription>
                        Click create when you are done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jour" className="text-right">
                          Day
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setReservation((prev) => ({ ...prev, jour: value }))
                          }
                          id="jour"
                        >
                          <SelectTrigger className="max-w-[12rem]">
                            <SelectValue placeholder="Select a day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>School Days</SelectLabel>
                              <SelectItem value="LUNDI">Monday</SelectItem>
                              <SelectItem value="MARDI">Tuesday</SelectItem>
                              <SelectItem value="MERCREDI">
                                Wednesday
                              </SelectItem>
                              <SelectItem value="JEUDI">Thursday</SelectItem>
                              <SelectItem value="VENDREDI">Friday</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
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
                        <Label htmlFor="seance" className="text-right">
                          Hour
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setReservation((prev) => ({
                              ...prev,
                              seance: value,
                            }))
                          }
                          id="seance"
                        >
                          <SelectTrigger className="max-w-[12rem]">
                            <SelectValue placeholder="Select a seance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Seances</SelectLabel>
                              <SelectItem value="SEANCE_1">
                                08:00-10:00
                              </SelectItem>
                              <SelectItem value="SEANCE_2">
                                10:00-12:00
                              </SelectItem>
                              <SelectItem value="SEANCE_3">
                                14:00-16:00
                              </SelectItem>
                              <SelectItem value="SEANCE_4">
                                16:00-18:00
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="salle" className="text-right">
                          Filiere
                        </Label>
                        <Popover open={open4} onOpenChange={setOpen4}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="max-w-[12rem]  justify-start"
                            >
                              {selectedStatus4 ? (
                                <>{selectedStatus4.name}</>
                              ) : (
                                <>+ Filiere</>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0"
                            side="right"
                            align="start"
                          >
                            <Command>
                              <CommandInput placeholder="Change salle..." />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                  {filieres.map((status) => (
                                    <CommandItem
                                      key={status.id}
                                      value={status.name}
                                      onSelect={(value) => {
                                        setSelectedStatus4(
                                          filieres.find(
                                            (priority) =>
                                              priority.name === value
                                          ) || null
                                        );

                                        setOpen4(false);
                                      }}
                                    >
                                      {status.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="salle" className="text-right">
                          Salle
                        </Label>
                        <Popover open={open3} onOpenChange={setOpen3}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="max-w-[12rem] justify-start"
                            >
                              {selectedStatus3 ? (
                                <>{selectedStatus3.name}</>
                              ) : (
                                <>+ Salle</>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0"
                            side="right"
                            align="start"
                          >
                            <Command>
                              <CommandInput placeholder="Change salle..." />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                  {salles.map((status) => (
                                    <CommandItem
                                      key={status.id}
                                      value={status.name}
                                      onSelect={(value) => {
                                        setSelectedStatus3(
                                          salles.find(
                                            (priority) =>
                                              priority.name === value
                                          ) || null
                                        );

                                        setOpen3(false);
                                      }}
                                    >
                                      {status.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button onClick={handleCreateReservation} type="submit">
                          <Plus /> Create
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </CardHeader>

            <CardContent className=" overflow-y-auto">
              <div className="mt-4 max-h-screen max-w-sm mb-6">
                <div className="flex items-center bg-white border  ">
                  <Search className="ml-3 mr-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search Reservation..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full py-3 pl-3 border-none shadow-none"
                  />
                </div>
              </div>
              <DataTable columns={columns} data={filteredReservations} />
              {show ? <TableProf timeTableData={timeTable}></TableProf> : ""}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
