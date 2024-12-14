"use client";

import { getAllSalles, addSalle } from "@/app/api/rooms";
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
import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(";").shift();
    try {
      return JSON.parse(cookieValue);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export default function Home() {
  const [salles, setSalles] = useState([]);
  const [filteredSalles, setFilteredSalles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [salle, setSalle] = useState({
    name: "",
    location: "",
    numberOfSeats: "",
    type: "",
  });
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const loadSalles = async () => {
    try {
      const sallesData = await getAllSalles();
      setSalles(sallesData);
      setFilteredSalles(sallesData);
    } catch (error) {
      console.error("Error fetching salles:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredSalles(
      salles.filter((salle) => salle.name.toLowerCase().includes(query))
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSalle((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSelectChange = (key, value) => {
    setSalle((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const addSalleTo = async () => {
    const { name, location, numberOfSeats, type } = salle;
    if (!name.trim() || !location.trim() || !type.trim()) {
      toast({
        title: "Validation Error!",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }
    if (isNaN(parseInt(numberOfSeats)) || numberOfSeats <= 0) {
      toast({
        title: "Validation Error!",
        description: "Number of seats must be a positive number.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addSalle({
        name: name.trim(),
        location: location.trim(),
        numberOfSeats: parseInt(numberOfSeats),
        type: type.trim(),
      });
      setIsAdded(true);
      toast({
        title: "Done!",
        description: "Salle added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const token = getCookie("userToken");
    if (!token) {
      router.push("/login");
    } else {
      loadSalles();
    }
  }, [isAdded, router]);

  useEffect(() => {
    setFilteredSalles(
      salles.filter((salle) =>
        salle.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [salles, searchQuery]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Manage Salles:</h1>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <Card className="mt-8 p-2 pr-6 md:p-6 w-full">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-normal text-start">
                Salles List:
              </CardTitle>
              <Sheet>
                <SheetTrigger className="w-fit" asChild>
                  <Button variant="outline">
                    <Plus /> Add Salle
                  </Button>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>Add Salle:</SheetTitle>
                    <SheetDescription>
                      Click add when you are done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        placeholder="e.g., K1"
                        id="name"
                        className="w-[180px]"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("location", value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Location</SelectLabel>
                            <SelectItem value="Department 1">
                              Department 1
                            </SelectItem>
                            <SelectItem value="Department 2">
                              Department 2
                            </SelectItem>
                            <SelectItem value="Department 3">
                              Department 3
                            </SelectItem>
                            <SelectItem value="Department 4">
                              Department 4
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="numberOfSeats" className="text-right">
                        Number of Seats
                      </Label>
                      <Input
                        type="number"
                        placeholder="e.g., 50"
                        id="numberOfSeats"
                        className="w-[180px]"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("type", value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="COURS">Cours</SelectItem>
                            <SelectItem value="TP">TP</SelectItem>
                            <SelectItem value="TD">TD</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button onClick={addSalleTo} type="submit">
                        <Plus /> Add
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardHeader>
            <CardContent className="max-h-screen overflow-y-auto">
              <div className="mt-4 max-w-sm mb-6">
                <div className="flex items-center bg-white border  ">
                  <Search className="ml-3 mr-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search Salle..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full py-3 pl-3 border-none shadow-none"
                  />
                </div>
              </div>
              <DataTable columns={columns} data={filteredSalles} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
