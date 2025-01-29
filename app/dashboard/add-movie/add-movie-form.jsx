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
import { Textarea } from "@/components/ui/textarea";

export default function AddMovieForm() {
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-900">
          Add Movie
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-400 inline-block">
          Add a movie to Mflix Dashboard.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Movie Title</Label>
            <Input id="title" name="title" placeholder="Enter movie title" />
          </div>
          <div>
            <Label htmlFor="title">Movie Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              placeholder="Enter the year"
            />
          </div>
          <div>
            <Label htmlFor="plot">Movie Plot</Label>
            <Textarea
              id="plot"
              name="plot"
              placeholder="Enter the movie plot"
            />
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-end space-x-2"></CardFooter>
      </form>
    </Card>
  );
}
