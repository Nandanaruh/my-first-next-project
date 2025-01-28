"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddMovieForm() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-900">
          Add Movie
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-400 inline-block">
          Add a movie to Mflix Dashboard
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
