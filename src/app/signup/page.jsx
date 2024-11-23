import { SignUpForm } from "@/components/signup-form";
import React from "react";

export default function page() {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center pt-20">
      <div className="font-bold text-3xl">
        G-SALLES
        <span className="font-light text-sm text-muted-foreground">
          {" "}
          platform
        </span>
      </div>
      <SignUpForm></SignUpForm>
    </div>
  );
}
