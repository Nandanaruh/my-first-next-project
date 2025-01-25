"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "../lib/auth-client";
import { redirect } from "next/navigation";

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

export default function LoginForm({ title }) {
  const [email, setEmail] = useState("yourname@example.com");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const validateForm = () => {
    setLoading(false);
    if (!email) {
      setEmailError("Email is required!");
      return false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required!");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(); //Check validation

    if (isValid) {
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            setLoading(true);
            redirect("/dashboard");
          },
          onError: (ctx) => {
            if (ctx.error.status === 401) {
              setError("You are not registered!");
            }
          },
        },
      );
    }
  };

  return (
    <div className="w-[380px] mx-auto">
      <Card className="bg-blue-50/90 w-[380px]">
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* title */}
            <h3 className="text-center text-xl font-semibold text-gray-900">
              {title}
            </h3>
            {/* email */}
            {/* <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 border-gray-400 rounded-lg text-gray-900 focus:ring-1 ring-offset-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="yourname@email.com"
              />
              {emailError && (
                <div className="text-red-600 text-xs mt-1 ml-1 animate-pulse duration-1000">
                  {emailError}
                </div>
              )}
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@example.com"
              />
              {emailError && (
                <div className="text-red-600 text-xs mt-1 ml-1 animate-pulse duration-1000">
                  {emailError}
                </div>
              )}
            </div>

            {/* password */}
            {/* <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 border-gray-400 rounded-lg text-gray-900 focus:ring-1 ring-offset-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="*********"
              />
              {passwordError && (
                <div className="text-red-600 text-xs mt-1 ml-1 animate-pulse duration-1000">
                  {passwordError}
                </div>
              )}
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            {/* remember me */}
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="remember"
                    className="bg-gray-50 border-gray-400 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                  />
                </div>
                <div className="text-sm ml-3">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900 block mb-2"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="/forget-password"
                className="text-xs text-blue-700 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
            {/* not registered error */}
            {error && (
              <div className="text-red-600 text-xs text-center animate-pulse duration-1000 flex items-center justify-center">
                {error}
              </div>
            )}
            {/* submit button */}
            <div>
              {/* <button
              type="submit"
              className="w-full text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Sign in
            </button> */}
              <Button
                className="flex-1 w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="animate-spin" />}
                Login
              </Button>
            </div>
            <div className="text-xs text-gray-500 font-medium flex justify-center space-x-1">
              <span>Not registered?</span>
              <a
                href="/register"
                className="text-xs text-blue-700 hover:underline"
              >
                Create an account
              </a>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
