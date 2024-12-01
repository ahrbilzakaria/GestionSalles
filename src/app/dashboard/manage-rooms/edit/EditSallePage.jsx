"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { TextGenerateEffect } from "@/components/text-generate";
import { getSalleById, updateSalle } from "@/app/api/rooms";

export default function EditsallePage() {
  const [salle, setsalle] = useState();
  const [fetched, setFetched] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const words = `The salle doesn't exist.`;

  const [id, setId] = useState();

  const loadsalle = async (id) => {
    try {
      const salleData = await getSalleById(id);
      setsalle(salleData);
    } catch (error) {
      console.error("Error fetching salle:", error);
    } finally {
      setFetched(true);
    }
  };

  useEffect(() => {
    setId(Number(searchParams.get("id")) || null);
    if (id) {
      loadsalle(id);
    }
  }, [id]);

  const updatesalleTo = async () => {
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
      await updateSalle(id, {
        name: name.trim(),
        location: location.trim(),
        numberOfSeats: parseInt(numberOfSeats),
        type: type.trim(),
      });

      toast({
        title: "Done!",
        description: "Salle updated successfully!",
      });
    } catch (error) {
      console.error("Failed to update salle:", error);
      toast({
        title: "Error!",
        description: "Couldn't update salle! Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (fetched && !salle) {
    return (
      <div className="p-4">
        <TextGenerateEffect duration={2} filter={false} words={words} />
      </div>
    );
  }
  if (fetched && salle) {
    return (
      <div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="font-bold text-3xl">Edit salle:</h1>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <Card>
              <CardHeader>
                <CardTitle>salle</CardTitle>
                <CardDescription>
                  Make changes to your salle here. Click save when you are done.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 flex-row items-start">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="w-[180px]"
                    id="name"
                    value={salle?.name}
                    onChange={(e) =>
                      setsalle((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={salle?.location}
                    onValueChange={(value) =>
                      setsalle((prev) => ({ ...prev, location: value }))
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Location</SelectLabel>
                        <SelectItem value="department 1">
                          Department 1
                        </SelectItem>
                        <SelectItem value="department 2">
                          Department 2
                        </SelectItem>
                        <SelectItem value="department 3">
                          Department 3
                        </SelectItem>
                        <SelectItem value="department 4">
                          Department 4
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="numberOfSeats">Number of Seats</Label>
                  <Input
                    type="number"
                    id="numberOfSeats"
                    value={salle?.numberOfSeats}
                    onChange={(e) =>
                      setsalle((prev) => ({
                        ...prev,
                        numberOfSeats: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={salle?.type}
                    onValueChange={(value) =>
                      setsalle((prev) => ({ ...prev, type: value }))
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
              </CardContent>
              <CardFooter>
                <Button onClick={updatesalleTo}>Save changes</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return;
}
