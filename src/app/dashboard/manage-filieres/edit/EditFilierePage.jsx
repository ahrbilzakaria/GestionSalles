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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getFilier, updateFiliere } from "@/app/api/filieres";
import { useToast } from "@/hooks/use-toast";
import { TextGenerateEffect } from "@/components/text-generate";

export default function EditFilierePage() {
  const [filiere, setFiliere] = useState();
  const [fetched, setFetched] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const words = `The filiere doesn't exist.`;

  const loadFilier = async (id) => {
    try {
      const filiereData = await getFilier(id);
      setFiliere(filiereData); // Set the fetched filieres to the state
    } catch (error) {
      console.error("Error fetching filieres:", error);
    } finally {
      setFetched(true);
    }
  };

  useEffect(() => {
    const id = searchParams.get("id") || null;

    loadFilier(Number(id));
    // setFiliere({ name, capacity: Number(capacity) });
  }, [searchParams, fetched]);

  const updateFiliereTo = async () => {
    const { id, name, capacity } = filiere;

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
      const result = await updateFiliere(id, {
        name: name.trim(),
        capacity: parseInt(capacity, 10),
      });

      toast({
        title: "Done!",
        description: "Filiere updated successfully!",
        variant: "",
      });
    } catch (error) {
      console.error("Failed to update filiere:", error);
      toast({
        title: "Error!",
        description: "Couldn't update filiere! Please try again later.",
        variant: "destructive",
      });
    }
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
  if (fetched && filiere) {
    return (
      <div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="font-bold text-3xl">Edit Filiere:</h1>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you are
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2 flex-wrap items-center">
                <div className="max-w-[20rem]">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={filiere?.name}
                    onChange={(e) =>
                      setFiliere((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="max-w-[20rem]">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    value={filiere?.capacity}
                    onChange={(e) =>
                      setFiliere((prev) => ({
                        ...prev,
                        capacity: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => updateFiliereTo()}>Save changes</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return;
}
