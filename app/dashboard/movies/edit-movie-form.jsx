"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export default function EditMovieForm({ open, onCancel, isLoading }) {
  const [genres, setGenres] = useState([]);
  const [rated, setRated] = useState("");
  const [errors, setErrors] = useState({});
  const genresList = GENRES.map((genre) => ({
    label: genre,
    value: genre,
  }));
  const handleSubmitForm = () => {
    //
  };
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>Update the selected movie</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitForm}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Movie Title</Label>
              <Input id="title" name="title" placeholder="Enter movie title" />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div>
              <Label htmlFor="year">Movie Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="Enter the year"
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>
            <div>
              <Label htmlFor="plot">Movie Plot</Label>
              <Textarea
                id="plot"
                name="plot"
                placeholder="Enter the movie plot"
              />
              {errors.plot && (
                <p className="text-red-500 text-sm">{errors.plot}</p>
              )}
            </div>
            <div>
              <Label htmlFor="genres">Movie Genres</Label>
              <MultiSelect
                list={genresList}
                placeholder="Select Movie Genres"
                onValueChange={setGenres}
              />
              {errors.genres && (
                <p className="text-red-500 text-sm">{errors.genres}</p>
              )}
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
              {errors.rated && (
                <p className="text-red-500 text-sm">{errors.rated}</p>
              )}
            </div>
            <div>
              <Label htmlFor="poster">Poster URL</Label>
              <Input
                id="poster"
                name="poster"
                placeholder="Enter image URL"
                defaultValue="https://m.media-amazon.com/images/I/51WXHxGf7CL._AC_SR300,300.jpg"
                type="text"
              />
              {errors.poster && (
                <p className="text-red-500 text-sm">{errors.poster}</p>
              )}
            </div>
            <div className="w-full flex justify-end space-x-2">
              <Button
                type="reset"
                variant="outline"
                onClick={() => setErrors({})}
              >
                Clear Form
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                Add Movie
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
