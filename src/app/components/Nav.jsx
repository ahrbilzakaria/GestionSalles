"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

// Helper function to get a cookie value by name
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

export default function Nav() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = getCookie("userToken"); // Check for userToken in cookies
    setIsAuthorized(!!token); // Update state based on token presence
  }, []); // Runs once on component mount

  const handleSignOut = () => {
    // Clear the token by setting an expired cookie
    document.cookie =
      "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
