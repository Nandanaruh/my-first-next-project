"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "../lib/auth-client";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
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
      setLoading(true);
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
              setError(ctx.error.message);
              setLoading(false);
            }
          },
        },
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-white w-[380px]">
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* title */}
            <h3 className="text-center text-xl font-semibold text-gray-900">
              {title}
            </h3>
            {/* email */}
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {passwordError && (
                <div className="text-red-600 text-xs mt-1 ml-1 animate-pulse duration-1000">
                  {passwordError}
                </div>
              )}
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
