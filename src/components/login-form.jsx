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

  const [loading, setLoading] = useState(false); // Loading state
  const [userCreated, setUserCreated] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${JSON.stringify(
      value
    )}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
  };

  const handleSubmit = async () => {
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

    setLoading(true); // Set loading to true when login starts
    try {
      const result = await login(formData); // Assuming `login` throws errors on failure

      // Save token and user info in cookies
      setCookie("userToken", result, 7); // Expires in 7 days
      setCookie("userEmail", result.email, 7);
      setCookie("authToken", result.verificationToken, 7);

      setFormData({
        email: "",
        password: "",
      });

      toast({
        title: "Done!",
        description: "You are logged in!",
        variant: "",
      });

      setUserCreated(true); // Set state to navigate
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast({
            title: "Invalid Credentials",
            description:
              "Either your email or password is incorrect. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error!",
            description:
              error.response.data?.message ||
              "An unknown error occurred. Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error!",
          description:
            "Couldn't connect to the server. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false); // Reset loading state after login attempt
    }
  };

  useEffect(() => {
    if (userCreated) {
      router.push("/dashboard/home");
    }
  }, [userCreated, router]);

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

          {loading ? (
            <Button type="button" className="w-full" disabled={loading} loading>
              Login
            </Button>
          ) : (
            <Button type="button" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          )}
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
