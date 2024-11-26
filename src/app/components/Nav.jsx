"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Nav() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsAuthorized(!!token); // Update state based on token presence
  }, []); // Runs once on component mount

  const handleSignOut = () => {
    localStorage.removeItem("userToken"); // Clear token from storage
    window.location.reload(); // Trigger a full page reload
  };

  return (
    <div className="w-full flex justify-between px-4 py-2">
      <div className="font-bold text-xl">G-SALLES</div>
      <div className="flex gap-3">
        {isAuthorized ? (
          <>
            <Button
              onClick={handleSignOut}
              variant="secondary"
              className="text-xl"
            >
              <LogOut /> Sign out
            </Button>
            <Button asChild className="text-xl" size="default">
              <Link href="/dashboard/home">Dashboard</Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              asChild
              className="text-xl"
              size="default"
              variant="secondary"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="text-xl" size="default">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
