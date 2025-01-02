"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "postcss";
//Keep this as a client component
import { useState } from "react";

export default function RegisterForm({ title }) {
  const [email, setEmail] = useState("nandana@gmail.com");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email: email, password: password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-blue-50/90 w-[380px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your information to get start</CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <div>
              <div>
                <Label>Email</Label>
                <Input></Input>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center ">
            <Button className="flex-1" type="submit">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
