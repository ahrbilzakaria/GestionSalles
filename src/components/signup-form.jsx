"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/app/api/user";
import { TextGenerateEffect } from "./text-generate";

const words = `Your account has been created successfully, please check your email to verify your account.`;

export function SignUpForm() {
  const { toast } = useToast();

  const roles = ["COORDINATEUR", "RESPONSABLE_SALLES", "PROFESSEUR"];

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [userCreated, setUserCreated] = useState(false); // State to track if the user is created

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prevData) => ({
      ...prevData,
      role,
    }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.username) {
      toast({
        title: "Data error",
        description: "Username is required!",
        variant: "destructive",
      });
      return;
    }
    if (!formData.email || !formData.email.includes("@")) {
      toast({
        title: "Data error",
        description: "A valid email is required!",
        variant: "destructive",
      });
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      toast({
        title: "Data error",
        description: "Password must be at least 8 characters long!",
        variant: "destructive",
      });
      return;
    }
    if (!formData.role) {
      toast({
        title: "Data error",
        description: "Please select a role!",
        variant: "destructive",
      });
      return;
    }

    console.log("User Payload:", formData);
    handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      const result = await signUp(formData);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
      });
      toast({
        title: "Done!",
        description: "You are signed up!",
        variant: "",
      });
      setUserCreated(true); // Set state to true when user is created
    } catch (error) {
      console.error("Failed to send data:", error);
      toast({
        title: "Error!",
        description: "Couldn't sign up!",
        variant: "destructive",
      });
    }
  };

  if (userCreated) {
    return (
      <div className="w-screen h-screen flex justify-center items-start">
        <TextGenerateEffect
          className={"p-10"}
          duration={2}
          filter={false}
          words={words}
        />
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Enter your email below to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="user_256"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="role">Roles</Label>
            </div>
            <Select id="role" onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Sign up
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          You have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
