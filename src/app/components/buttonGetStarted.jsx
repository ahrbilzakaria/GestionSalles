"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ButtonGetStarted() {
  const [isAuthorized, setIsAuthorized] = useState(false); // Manage auth state

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      setIsAuthorized("true");
    }
  }, [localStorage.getItem("userToken")]);
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
