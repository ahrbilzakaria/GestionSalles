"use client";
import { deleteEmploiDuTemps, updateEmploiDuTemps } from "@/app/api/emploi";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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

import { Button } from "@/components/ui/button"; // Import your button component
import { useToast } from "@/hooks/use-toast";
import { Edit, RefreshCcw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { getAllProfesseurs } from "@/app/api/user";
import { getAllSalles } from "@/app/api/rooms";
import { getAllChargesHoraires } from "@/app/api/chargeHoraire";

const ActionsCell = ({ filiere }) => {
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

  const handleEdit = async () => {
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
        jour: seance.jour,
        seance: seance.seance,
        typeSeance: seance.typeSeance,
        chargeHoraireId: selectedStatus1.id,
        professeurId: selectedStatus2.id,
        salleId: selectedStatus3.id,
      };
      const addedSeance = await updateEmploiDuTemps(filiere.id, payload);

      // Handle successful response
      if (addedSeance) {
        toast({
          title: "Success!",
          description: "Seance updated successfully.",
          variant: "",
        });

        // Optionally reset the seance form
        setSeance({});
        setSelectedStatus1(null);
        setSelectedStatus2(null);
        setSelectedStatus3(null);
        location.reload();
      }
    } catch (error) {
      // Log the error and show a toast notification
      console.error("Error updating seance:", error);

      // Display appropriate error message
      toast({
        title: "Error",
        description:
          error.response.data.message ||
          "Failed to update seance. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadMatieres = async () => {
    try {
      if (filiere.chargeHoraire.filiere.id) {
        const matieresData = await getAllChargesHoraires(
          filiere.chargeHoraire.filiere.id
        );
        setMatieres(matieresData); // Set the fetched filieres to the state
      }
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

  useEffect(() => {
    loadMatieres();
    loadProfesseurs();
    loadSalles();
    setSeance(filiere); // Set the fetched filieres to the state
    setSelectedStatus1(filiere.chargeHoraire);
    setSelectedStatus2(filiere.user);
    setSelectedStatus3(filiere.salle);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteEmploiDuTemps(filiere.id); // Call the delete API function
      toast({
        title: "Done!",
        description: "Seance deleted successfully!",
      });
      location.reload();
    } catch (error) {
      console.error("Error deleting seance:", error);
      toast({
        title: "Error!",
        description: "Couldn't delete seance! Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2 w-[100px] mr-2">
      <Sheet>
        <SheetTrigger className="w-fit" asChild>
          <Button variant="secondary" className="">
            <Edit></Edit> Edit
          </Button>
        </SheetTrigger>
        <SheetContent side={"top"}>
          <SheetHeader>
            <SheetTitle>Update Seance:</SheetTitle>
            <SheetDescription>Click update when you are done.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jour" className="text-right">
                Day
              </Label>
              <Select
                value={seance?.jour}
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
                    <SelectItem value="MERCREDI">Wednesday</SelectItem>
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
                value={seance?.seance}
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
                    <SelectItem value="SEANCE_1">08:00-10:00</SelectItem>
                    <SelectItem value="SEANCE_2">10:00-12:00</SelectItem>
                    <SelectItem value="SEANCE_3">14:00-16:00</SelectItem>
                    <SelectItem value="SEANCE_4">16:00-18:00</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="seance" className="text-right">
                Type
              </Label>
              <Select
                value={seance?.typeSeance}
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
                  <Button variant="outline" className="w-[150px] justify-start">
                    {selectedStatus2 ? (
                      <>{selectedStatus2?.username}</>
                    ) : (
                      <>+ Professeur</>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
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
                                  (priority) => priority.username === value
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
                  <Button variant="outline" className="w-[150px] justify-start">
                    {selectedStatus3 ? (
                      <>{selectedStatus3?.name}</>
                    ) : (
                      <>+ Salle</>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
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
                                  (priority) => priority.name === value
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
                  <Button variant="outline" className="w-[150px] justify-start">
                    {selectedStatus1 ? (
                      <>{selectedStatus1?.matiere?.name}</>
                    ) : (
                      <>+ Matiere</>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
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
                                  (priority) => priority.matiere.name === value
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
              <Button
                onClick={() => {
                  handleEdit();
                }}
                type="submit"
              >
                <RefreshCcw /> Update
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="" variant="destructive" size="sm">
            <Trash /> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              seance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const columns = [
  {
    accessorKey: "jour",
    header: "Jour",
  },
  {
    accessorKey: "seance",
    header: "Séance",
  },
  {
    accessorKey: "typeSeance",
    header: "Type",
  },
  {
    accessorKey: "chargeHoraire.matiere.name",
    header: "Matière",
  },
  {
    accessorKey: "user.username",
    header: "Professeur",
  },
  {
    accessorKey: "salle.name",
    header: "Salle",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell filiere={row.original} />,
  },
];
