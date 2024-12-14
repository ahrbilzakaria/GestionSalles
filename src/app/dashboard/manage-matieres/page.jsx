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
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { addMatiere, getAllMatieres } from "@/app/api/matieres";

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
  const [matieres, setMatieres] = useState([]);
  const [matiere, setMatiere] = useState({
    id: "",
    name: "",
  });
  const [isAdded, setIsAdded] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [filteredMatieres, setFilteredMatieres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredMatieres(
      matieres.filter((matiere) => matiere.name.toLowerCase().includes(query))
    );
  };

  // Function to load filieres data
  const loadMatieres = async () => {
    try {
      const matieresData = await getAllMatieres();
      setMatieres(matieresData); // Set the fetched matieres
      setFilteredMatieres(matieresData); // Initialize the filtered matieres
    } catch (error) {
      console.error("Error fetching matieres:", error);
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setMatiere((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Add Filiere to the database
  const addMatiereTo = async () => {
    const { name } = matiere;

    // Validation checks
    if (!name.trim()) {
      toast({
        title: "Validation Error!",
        description: "Name cannot be empty. Please provide a valid name.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Proceed to add the filiere
      const result = await addMatiere({
        name: name.trim(),
      });

      setIsAdded(true); // Trigger reloading of the filieres list
      toast({
        title: "Done!",
        description: "Matiere created successfully!",
        variant: "",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  // Check if user is logged in by reading the token from cookies
  useEffect(() => {
    const token = getCookie("userToken"); // Check cookies for the userToken (as a JSON)

    if (!token) {
      router.push("/login"); // Redirect unauthorized users
    } else {
      loadMatieres();
    }
  }, [isAdded, router]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <h1 className="font-bold text-3xl">Manage Matieres:</h1>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          {/* DataTable for Filiere */}
          <Card className="mt-8 p-2 pr-6 md:p-6  w-full ">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-2xl font-normal text-start">
                Matieres List:
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
                      <Input
                        placeholder="History"
                        id="name"
                        className="col-span-3"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button onClick={addMatiereTo} type="submit">
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
              <DataTable columns={columns} data={filteredMatieres} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
