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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/multi-select";
import { GENRES, RATINGS } from "@/app/lib/constants";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createMovie } from "@/app/lib/actions/movies";

export default function AddMovieForm() {
  const [genres, setGenres] = useState([]);
  const [rated, setRated] = useState("");
  const [isLoading, setLoading] = useState(false);
  const genresList = GENRES.map((genre) => ({
    label: genre,
    value: genre,
  }));

  const handleSubmitForm = async (event) => {
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const title = formData.get("title").toString();
    const plot = formData.get("plot").toString();
    const year = Number(formData.get("year"));

    if (title && year && plot) {
      setLoading(true);
      await createMovie({ title, year, plot, genres, rated });
      setLoading(false);
    }
  };
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-900">
          Add Movie
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-400 inline-block">
          Add a movie to Mflix Dashboard.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmitForm}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Movie Title</Label>
            <Input id="title" name="title" placeholder="Enter movie title" />
          </div>
          <div>
            <Label htmlFor="year">Movie Year</Label>
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
          <div>
            <Label htmlFor="genres">Movie Genres</Label>
            <MultiSelect
              list={genresList}
              placeholder="Select Movie Genres"
              onValueChange={setGenres}
            />
          </div>
          <div>
            <Label htmlFor="rated">Movie Rated</Label>
            <Select onValueChange={(val) => setRated(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                {RATINGS.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-end space-x-2">
          <Button type="reset" variant="outline">
            Clear Form
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Add Movie
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
