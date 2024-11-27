"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

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

export default function ButtonGetStarted() {
  const [isAuthorized, setIsAuthorized] = useState(false); // Manage auth state

  useEffect(() => {
    const token = getCookie("userToken"); // Check for userToken in cookies
    setIsAuthorized(!!token); // Update auth state based on token presence
  }, []); // Runs once on component mount

  if (isAuthorized) {
    return (
      <Button asChild className="text-2xl" size="lg">
        <Link href="/dashboard/home">Go to Dashboard</Link>
      </Button>
    );
  }
  return (
    <Button asChild className="text-2xl" size="lg">
      <Link href="/signup">Get Started</Link>
    </Button>
  );
}
