"use client"; // Mark the component as client-side

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
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [filiere, setFiliere] = useState({
    name: "Default Name", // Default value
    capacity: 10, // Default value
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  let id = null;

  useEffect(() => {
    const name = searchParams.get("name") || filiere.name;
    const capacity = searchParams.get("capacity") || filiere.capacity;
    id = searchParams.get("id") || null;

    setFiliere({ name, capacity });
  }, [searchParams]);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Edit Filiere:</h1>

        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className=" flex gap-2 flex-wrap items-center">
              <div className="max-w-[20rem]">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={filiere.name}
                  onChange={(e) =>
                    setFiliere((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="max-w-[20rem]">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  value={filiere.capacity}
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
              <Button onClick={() => console.log(filiere)}>Save changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
