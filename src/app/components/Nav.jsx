import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="w-full flex justify-between px-4 py-2 ">
      <div className="font-bold text-xl">G-SALLES</div>
      <Button asChild className="text-xl " size="default">
        <Link href="/dashboard/home">Get Started</Link>
      </Button>
    </div>
  );
}
