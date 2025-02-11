"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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

export default function EditMovieForm({
  movie,
  onSubmit,
  onCancel,
  isLoading,
}) {
  const [title, setTitle] = useState(movie?.title);
  const [year, setYear] = useState(movie?.year);
  const [plot, setPlot] = useState(movie?.plot);
  const [genres, setGenres] = useState(movie?.genres || []);
  const [rated, setRated] = useState(movie?.rated);
  const [poster, setPoster] = useState(movie?.poster);
  const [errors, setErrors] = useState({});

  const genresList = GENRES.map((genre) => ({
    label: genre,
    value: genre,
  }));
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    onSubmit({
      ...movie,
      id,
      title,
      year,
      genres,
      poster,
      rated,
    });
    const response = await updateMovie(movie);
    console.log(response);
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
              <Input
                id="title"
                name="title"
                placeholder="Enter movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
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
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
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
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
              />
              {errors.plot && (
                <p className="text-red-500 text-sm">{errors.plot}</p>
              )}
            </div>
            <div>
              <Label htmlFor="genres">Movie Genres</Label>
              <MultiSelect
                list={genresList}
                placeholder="Select movie genres"
                value={genres}
                selectedItems={genres}
                onValueChange={setGenres}
              />
              {errors.genres && (
                <p className="text-red-500 text-sm">{errors.genres}</p>
              )}
            </div>
            <div>
              <Label htmlFor="rated">Movie Rated</Label>
              <Select value={rated} onValueChange={(val) => setRated(val)}>
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
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                type="text"
              />
              {errors.poster && (
                <p className="text-red-500 text-sm">{errors.poster}</p>
              )}
            </div>
            <div className="w-full flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />} Save Changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
