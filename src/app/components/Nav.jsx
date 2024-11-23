import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="w-full flex justify-between px-4 py-2 ">
      <div className="font-bold text-xl">G-SALLES</div>
      <div className="flex gap-3">
        <Button asChild className="text-xl " size="default" variant="secondary">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild className="text-xl " size="default">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
