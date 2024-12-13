"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Clover, Edit, Pen, Plus, Search, Timer, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getFilier } from "@/app/api/filieres";
import { RoomCounter } from "@/app/components/ui/room-counter";
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
import { Label } from "@/components/ui/label";
import { getAllMatieres } from "@/app/api/matieres";
import {
  addChargeHoraire,
  deleteChargeHoraire,
  getAllChargesHoraires,
} from "@/app/api/chargeHoraire";
import { Input } from "@/components/ui/input";
import { ChargeHoraireCard } from "./ChargeHoraireCard";
import { TableFiliere } from "./TableFiliere";
import { getAllEmploisDuTemps } from "@/app/api/emploi";
import { ManageTable } from "./ManageTable";

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

export default function ViewFilierPage() {
  const [fetched, setFetched] = useState(false);
  const [filiere, setFiliere] = useState({
    name: "",
    capacity: 0,
  });
  const searchParams = useSearchParams();
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [chargesHoraires, setChargeHoraires] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [matieres, setMatieres] = useState([]);
  const [matiere, setMatiere] = useState({
    id: "",
    courseHours: "",
    tpHours: "",
    tdHours: "",
  });
  const [show, isShow] = useState(false);
  const [manage, isManage] = useState(false);
  const [seanceAdded, setSeanceAdded] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState();
  const [timeTable, setTimeTable] = useState();
  const loadTimeTable = async (id) => {
    try {
      const filiereTimeTable = await getAllEmploisDuTemps(id);
      setTimeTable(filiereTimeTable); // Set the fetched filieres to the state
      console.log(filiereTimeTable);
    } catch (error) {
      console.error("Error fetching filiere's time table:", error);
    } finally {
      setFetched(true);
    }
  };
  const loadFilier = async (id) => {
    try {
      const filiereData = await getFilier(id);
      setFiliere(filiereData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching filiere:", error);
    } finally {
      setFetched(true);
    }
  };
  const loadMatieres = async () => {
    try {
      const matieresData = await getAllMatieres();
      setMatieres(matieresData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching matieres:", error);
    }
  };
  const loadCharges = async () => {
    try {
      const chargesData = await getAllChargesHoraires(id);
      console.log(chargesData);
      setChargeHoraires(chargesData);
      setFilteredCharges(chargesData);
    } catch (error) {
      console.error("Error fetching charges:", error);
    }
  };

  const [chargeHoraire, setChargeHoraire] = useState();
  const addCharge = async () => {
    if (
      !selectedStatus ||
      !matiere.courseHours ||
      !matiere.tpHours ||
      !matiere.tdHours
    ) {
      toast({
        title: "Validation Error!",
        description: "Please fill all fields.",
        variant: "destructive",
      });
      return;
    }
    const payload = {
      heuresCours: matiere.courseHours,
      heuresTP: matiere.tpHours,
      heuresTD: matiere.tdHours,
    };

    try {
      const chargeData = await addChargeHoraire(payload, id, selectedStatus.id);
      setChargeHoraire(chargeData); // Set the fetched filieres to the state
      toast({
        title: "Done!",
        description: "Matiere added successfully!",
        variant: "",
      });
      setIsAdded(true);
      setMatiere({
        id: "",
        courseHours: "",
        tpHours: "",
        tdHours: "",
      });
      setSelectedStatus();
    } catch (error) {
      if (error.status === 409) {
        toast({
          title: "Error!",
          description: "Matiere already exists...",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error!",
          description: "Error adding matiere.",
          variant: "destructive",
        });
      }
    }
  };
  const [id, setId] = useState();
  useEffect(() => {
    setId(Number(searchParams.get("id") || null));
    if (id) {
      loadFilier(Number(id));
      loadTimeTable(Number(id));
      loadCharges();
      setIsAdded(false);
      setIsDeleted(false);
    }

    if (fetched) {
      loadMatieres();
    }

    // setFiliere({ name, capacity: Number(capacity) });
  }, [searchParams, fetched, id, isAdded, isDeleted]);
  useEffect(() => {
    loadTimeTable(Number(id));
    loadCharges();
  }, [seanceAdded]);

  const [filteredCharges, setFilteredCharges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCharges(
      chargesHoraires.filter((charge) =>
        charge.matiere.name.toLowerCase().includes(query)
      )
    );
  };

  if (fetched && !filiere) {
    return (
      <div className="   ">
        <TextGenerateEffect
          className={"p-4"}
          duration={2}
          filter={false}
          words={words}
        />
      </div>
    );
  }

  if (!fetched && !filiere) {
    <div
      role="status"
      className="w-screen h-screen flex justify-center items-center"
    >
      <svg
        aria-hidden="true"
        className="w-12 h-12 text-black animate-spin dark:text-gray-600 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>;
  }

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Manage Filiere:</h1>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <Card className="mt-8 p-2 pr-6 md:p-6  w-full ">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-normal text-start">
                {filiere.name} :
              </CardTitle>
              <Sheet>
                <SheetTrigger className="w-fit" asChild>
                  <Button variant="outline">
                    <Plus /> Add Matiere
                  </Button>
                </SheetTrigger>
                <SheetContent side={"top"}>
                  <SheetHeader>
                    <SheetTitle>Add Matiere:</SheetTitle>
                    <SheetDescription>
                      Click add when you are done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[150px] justify-start"
                          >
                            {selectedStatus ? (
                              <>{selectedStatus.name}</>
                            ) : (
                              <>+ Matiere</>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0"
                          side="right"
                          align="start"
                        >
                          <Command>
                            <CommandInput placeholder="Change matiere..." />
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {matieres.map((status) => (
                                  <CommandItem
                                    key={status.id}
                                    value={status.name}
                                    onSelect={(value) => {
                                      setSelectedStatus(
                                        matieres.find(
                                          (priority) => priority.name === value
                                        ) || null
                                      );
                                      setOpen(false);
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
                      <Label htmlFor="name" className="text-right">
                        Course hours
                      </Label>
                      <Input
                        className="max-w-[8rem]"
                        id="courseHours"
                        type="number"
                        value={matiere.courseHours}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow only positive integers or empty string
                          if (/^\d*$/.test(value)) {
                            setMatiere({ ...matiere, courseHours: value });
                          }
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Tp hours
                      </Label>
                      <Input
                        className="max-w-[8rem]"
                        id="tpHours"
                        type="number"
                        value={matiere.tpHours}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setMatiere({ ...matiere, tpHours: value });
                          }
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Td hours
                      </Label>
                      <Input
                        className="max-w-[8rem]"
                        id="tdHours"
                        type="number"
                        value={matiere.tdHours}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setMatiere({ ...matiere, tdHours: value });
                          }
                        }}
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        onClick={() => {
                          addCharge();
                        }}
                        type="submit"
                      >
                        <Plus /> Add
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardHeader>

            <CardContent className="">
              <div className="mt-4 relative max-w-sm mb-6 ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground " />
                <Input
                  type="text"
                  placeholder="Search Matieres..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-12 w-full py-6"
                />
              </div>
              <div className="parent sm:block md:grid grid-cols-[2fr_1fr] grid-rows-[1fr_1fr] gap-4">
                <div className="div1 col-start-2 max-h-[14rem] col-end-3 row-start-1 row-end-2 md:block hidden">
                  <RoomCounter
                    title={"Capacity"}
                    totalRooms={filiere.capacity}
                  ></RoomCounter>
                </div>
                <div className="div1 col-start-2 max-h-[14rem] col-end-3 row-start-2 row-end-3 flex flex-col gap-4 md:-mt-4">
                  <div className=" ">
                    <Button
                      variant={show ? "destructive" : "outline"}
                      className="w-full -mt-6"
                      onClick={() => {
                        isShow(!show);
                        manage ? isManage(!manage) : null;
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
                  </div>
                  <div className=" ">
                    <Button
                      variant={manage ? "destructive" : "outline"}
                      className="w-full -mt-6 mb-4 md:mb-0"
                      onClick={() => {
                        isManage(!manage);
                        show ? isShow(!show) : null;
                      }}
                    >
                      {manage ? (
                        <span className="flex gap-2 items-center">
                          <X></X>Manage Timetable
                        </span>
                      ) : (
                        <span className="flex gap-2 items-center">
                          <Pen></Pen>Manage Timetable
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="div2 col-start-1 col-end-2 row-start-1 row-end-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light text-start mb-6">
                        Matieres :
                      </CardTitle>
                      <CardContent className="flex flex-wrap gap-2 h-[25rem] overflow-y-auto  ">
                        {filteredCharges.length > 0 ? (
                          filteredCharges.map((charge) => (
                            <ChargeHoraireCard
                              matieres={matieres}
                              key={charge.id}
                              id={charge.id}
                              title={charge.matiere.name}
                              charge={{
                                heuresCours: charge.heuresCours,
                                heuresTP: charge.heuresTP,
                                heuresTD: charge.heuresTD,
                              }}
                              setIsDeleted={setIsDeleted}
                            />
                          ))
                        ) : (
                          <div className="text-2xl font-semibold text-destructive flex gap-2">
                            <Clover className="h-8 w-8" /> No Matieres Found
                          </div>
                        )}
                      </CardContent>
                    </CardHeader>
                  </Card>
                </div>
              </div>
              {show ? (
                <TableFiliere timeTableData={timeTable}></TableFiliere>
              ) : (
                ""
              )}
              {manage && (
                <ManageTable
                  id={id}
                  timeTable={timeTable}
                  setSeanceAdded={setSeanceAdded}
                ></ManageTable>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
