"use client"; // Mark the component as client-side

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

import { getFilier } from "@/app/api/filieres";

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
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
            </CardHeader>

            <CardContent className="max-h-screen overflow-y-auto">
              <div class="parent grid grid-cols-[2fr_1fr] grid-rows-[1fr_1fr] gap-0">
                <div class="div1 col-start-2 col-end-3 row-start-1 row-end-2"></div>
                <div class="div2 col-start-1 col-end-2 row-start-1 row-end-3"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
