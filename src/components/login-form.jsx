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
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { login } from "@/app/api/user";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [userCreated, setUserCreated] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // Validation
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

    console.log("User Payload:", formData);
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const result = await login(formData);
      setFormData({
        email: "",
        password: "",
      });
      toast({
        title: "Done!",
        description: "You are logged in!",
        variant: "",
      });
      setUserCreated(true);
      localStorage.setItem("user", result); // Set state to true when user is created
    } catch (error) {
      toast({
        title: "Error!",
        description: "Couldn't login!",
        variant: "destructive",
      });
    }
  };

  // Use useEffect to navigate after the user is created
  useEffect(() => {
    if (userCreated) {
      router.push("/dashboard/home"); // Redirect to home page if user is created
    }
  }, [userCreated, router]); // Dependency on userCreated and router to trigger effect

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              onChange={handleInputChange}
              id="password"
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
