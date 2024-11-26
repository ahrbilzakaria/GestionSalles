"use client"; // Mark the component as client-side

import { getAllFiliers, addFiliere } from "@/app/api/filieres";
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
import { Plus } from "lucide-react"; // Make sure toast is imported correctly
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [filieres, setFilieres] = useState([]);
  const [filiere, setFiliere] = useState({
    name: "",
    capacity: 0,
  });
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();

  // Function to load filieres data
  const loadFiliers = async () => {
    try {
      const filieresData = await getAllFiliers();
      setFilieres(filieresData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching filieres:", error);
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFiliere((prevData) => ({
      ...prevData,
      [id]: id === "capacity" ? parseInt(value, 10) || 0 : value, // Ensure capacity is a number
    }));
  };

  // Add Filiere to the database
  const addFiliereTo = async () => {
    const { name, capacity } = filiere;

    // Validation checks
    if (!name.trim()) {
      toast({
        title: "Validation Error!",
        description: "Name cannot be empty. Please provide a valid name.",
        variant: "destructive",
      });
      return;
    }

    if (
      !capacity ||
      isNaN(parseInt(capacity, 10)) ||
      parseInt(capacity, 10) <= 0
    ) {
      toast({
        title: "Validation Error!",
        description: "Capacity must be a valid positive number.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Proceed to add the filiere
      const result = await addFiliere({
        name: name.trim(),
        capacity: parseInt(capacity, 10),
      });

      setIsAdded(true); // Trigger reloading of the filieres list
      toast({
        title: "Done!",
        description: "Filiere created successfully!",
        variant: "",
      });
    } catch (error) {
      console.error("Failed to add filiere:", error);
      toast({
        title: "Error!",
        description: "Couldn't add filiere! Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Load filieres when the component mounts or when a filiere is added
  useEffect(() => {
    loadFiliers();
  }, [isAdded]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Manage Filiere:</h1>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          {/* DataTable for Filiere */}
          <Card className="mt-8 p-2 pr-6 md:p-6  w-full ">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-normal text-start">
                Filiere List:
              </CardTitle>
              <Sheet>
                <SheetTrigger className="w-fit" asChild>
                  <Button variant="outline">
                    <Plus></Plus>Add Filiere
                  </Button>
                </SheetTrigger>
                <SheetContent side={"top"}>
                  <SheetHeader>
                    <SheetTitle>Add Filiere:</SheetTitle>
                    <SheetDescription>
                      Click add when you're done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="capacity" className="text-right">
                        Capacity
                      </Label>
                      <Input
                        id="capacity"
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button onClick={addFiliereTo} type="submit">
                        <Plus></Plus>Add
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardHeader>

            <CardContent className="max-h-screen overflow-y-auto">
              <DataTable columns={columns} data={filieres} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
