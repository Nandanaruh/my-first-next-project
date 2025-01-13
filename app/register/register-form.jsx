"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
//import { ToastAction } from "@/components/ui/toast";
//import { useToast } from "@/hooks/use-toast";
//import { registerUser } from "@/app/lib/server";
import { signUp } from "@/app/lib/auth-client";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

export default function RegisterForm() {
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setLoading] = useState(false);
  //const { toast } = useToast();

  const handleSubmitForm = async (event) => {
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget);
    // const name = formData.get("name") ?? "";
    // const email = formData.get("email") ?? "";
    // const password = formData.get("password") ?? "";
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword") ?? "";
    //Basic validation only
    //if (name && email && password && confirmPassword) {
    if (password === confirmPassword) {
      setError(DEFAULT_ERROR);
      // setLoading(true);
      // const registerResponse = await registerUser({
      //   name,
      //   email,
      //   password,
      // });
      // setLoading(false);
      // if (registerResponse?.error) {
      //   setError({ error: true, message: registerResponse.error });
      // } else {
      //   toast({
      //     variant: "success",
      //     title: "Registration successful.",
      //     description: "Please continue with Login.",
      //     action: (
      //       <ToastAction altText="Login" className="hover:bg-green-700/90">
      //         Login
      //       </ToastAction>
      //     ),
      //   });
      // }
      const { data, error } = await signUp.email(
        {
          email: email,
          password: password,
          name: name,
          image: undefined,
        },
        {
          onRequest: () => {},
          onSuccess: (ctx) => {
            console.log("onSuccess", ctx);
          },
          onError: (ctx) => {
            if (ctx) {
              setError({ error: true, message: ctx.error.message });
            }
          },
        },
      );
      if (data) {
        console.log("Data", data);
      }
    } else {
      setError({ error: true, message: "Password doesn't match." });
    }
    //}
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-blue-50/90 w-[380px]">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-gray-900">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-sm text-gray-400 inline-block">
            Enter your information to get start
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitForm}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Jone Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="yourname@example.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter password again to confirm"
                />
              </div>
              {/* form errors */}
              <div className="flex justify-center">
                {error.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-1000">
                    {error.message}
                  </span>
                )}
              </div>
              <div className="flex justify-center gap text-xs">
                Already have an account ?
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="flex-1" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
