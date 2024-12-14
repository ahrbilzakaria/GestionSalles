"use client";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllProfesseurs } from "@/app/api/user";
import { getAllSalles } from "@/app/api/rooms";
import {
  addEmploiDuTemps,
  deleteEmploiDuTempsByFiliereId,
} from "@/app/api/emploi";
import { getAllChargesHoraires } from "@/app/api/chargeHoraire";

export function ManageTable({ timeTable, id, setSeanceAdded }) {
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();
  const [seance, setSeance] = useState();
  const [open1, setOpen1] = useState(false);
  const [selectedStatus1, setSelectedStatus1] = useState();
  const [open2, setOpen2] = useState(false);
  const [selectedStatus2, setSelectedStatus2] = useState();
  const [open3, setOpen3] = useState(false);
  const [selectedStatus3, setSelectedStatus3] = useState();
  const [matieres, setMatieres] = useState([]);
  const [matiere, setMatiere] = useState({});
  const [professeurs, setProfesseurs] = useState([]);
  const [professeur, setProfesseur] = useState({});
  const [salles, setSalles] = useState([]);
  const [salle, setSalle] = useState({});

  const loadMatieres = async () => {
    try {
      const matieresData = await getAllChargesHoraires(id);
      setMatieres(matieresData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching matieres:", error);
    }
  };
  const loadProfesseurs = async () => {
    try {
      const professeursData = await getAllProfesseurs();
      setProfesseurs(professeursData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching professeurs:", error);
    }
  };
  const loadSalles = async () => {
    try {
      const sallesData = await getAllSalles();
      setSalles(sallesData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching salles:", error);
    }
  };
  const addSeance = async () => {
    try {
      // Validate required fields
      if (
        !seance?.jour ||
        !seance?.seance ||
        !seance?.typeSeance ||
        !selectedStatus1 ||
        !selectedStatus2 ||
        !selectedStatus3
      ) {
        toast({
          title: "Error!",
          description: "Please fill in all the fields.",
          variant: "destructive",
        });
        return;
      }

      const payload = {
        ...seance,
        chargeHoraireId: selectedStatus1.id,
        professeurId: selectedStatus2.id,
        salleId: selectedStatus3.id,
      };

      // Call the API to add the seance
      const addedSeance = await addEmploiDuTemps(payload, id);

      // Handle successful response
      if (addedSeance) {
        setIsAdded(true);
        toast({
          title: "Success!",
          description: "Seance added successfully to the timetable.",
          variant: "",
        });

        setSeanceAdded(true);

        // Optionally reset the seance form
        setSeance({});
        setSelectedStatus1(null);
        setSelectedStatus2(null);
        setSelectedStatus3(null);
      }
    } catch (error) {
      // Log the error and show a toast notification
      console.error("Error adding seance:", error);

      // Display appropriate error message
      toast({
        title: "Error",
        description:
          error.response.data.message ||
          "Failed to add seance. Please try again.",
        variant: "destructive",
      });
    }
  };
  const deleteAllSeances = async () => {
    try {
      const deletedSeances = await deleteEmploiDuTempsByFiliereId(id);
      if (deletedSeances) {
        toast({
          title: "Success!",
          description: "All seances deleted successfully from the timetable.",
          variant: "",
        });
        setSeanceAdded(true);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to delete all seances. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadMatieres();
    loadProfesseurs();
    loadSalles();
  }, [open1, open2, open3]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4  mt-8">
        <h1 className="text-2xl font-normal text-start">Manage Timetable :</h1>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <Card className="mt-8 p-2 pr-6 md:p-6  w-full ">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-normal text-start">
                Seances List:
              </CardTitle>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger className="w-fit" asChild>
                    <Button variant="outline">
                      <Plus /> Add Seance
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={"top"}>
                    <SheetHeader>
                      <SheetTitle>Add Sceance:</SheetTitle>
                      <SheetDescription>
                        Click add when you are done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jour" className="text-right">
                          Day
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setSeance((prev) => ({ ...prev, jour: value }))
                          }
                          id="jour"
                        >
                          <SelectTrigger className="max-w-[10rem]">
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="seance" className="text-right">
                          Hour
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setSeance((prev) => ({ ...prev, seance: value }))
                          }
                          id="seance"
                        >
                          <SelectTrigger className="max-w-[10rem]">
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
                        <Label htmlFor="seance" className="text-right">
                          Type
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setSeance((prev) => ({
                              ...prev,
                              typeSeance: value,
                            }))
                          }
                          id="typeSeance"
                        >
                          <SelectTrigger className="max-w-[10rem]">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Seance Type</SelectLabel>
                              <SelectItem value="COURS">Cours</SelectItem>
                              <SelectItem value="TP">Tp</SelectItem>
                              <SelectItem value="TD">Td</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="professeur" className="text-right">
                          Professeur
                        </Label>
                        <Popover open={open2} onOpenChange={setOpen2}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[150px] justify-start"
                            >
                              {selectedStatus2 ? (
                                <>{selectedStatus2.username}</>
                              ) : (
                                <>+ Professeur</>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0"
                            side="right"
                            align="start"
                          >
                            <Command>
                              <CommandInput placeholder="Change professeur..." />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                  {professeurs.map((status) => (
                                    <CommandItem
                                      key={status.id}
                                      value={status.username}
                                      onSelect={(value) => {
                                        setSelectedStatus2(
                                          professeurs.find(
                                            (priority) =>
                                              priority.username === value
                                          ) || null
                                        );

                                        setOpen2(false);
                                      }}
                                    >
                                      {status.username}
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
                              className="w-[150px] justify-start"
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Matiere
                        </Label>
                        <Popover open={open1} onOpenChange={setOpen1}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[150px] justify-start"
                            >
                              {selectedStatus1 ? (
                                <>{selectedStatus1.matiere.name}</>
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
                                      value={status.matiere.name}
                                      onSelect={(value) => {
                                        setSelectedStatus1(
                                          matieres.find(
                                            (priority) =>
                                              priority.matiere.name === value
                                          ) || null
                                        );

                                        setOpen1(false);
                                      }}
                                    >
                                      {status.matiere.name}
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
                        <Button onClick={addSeance} type="submit">
                          <Plus /> Add
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="" variant="destructive" size="sm">
                      <Trash /> Delete All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-destructive">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete all seances.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={deleteAllSeances}
                        className="bg-destructive"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>

            <CardContent className="max-h-screen overflow-y-auto">
              <DataTable columns={columns} data={timeTable} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
