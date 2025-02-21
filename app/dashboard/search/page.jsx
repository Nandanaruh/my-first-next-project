"use client";

import { useState, Suspense } from "react";
import { Search, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { searchMovies } from "./search-movie-data";
import MovieTable from "./movie-table";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const searchRegex = /^[a-zA-Z0-9\s]+$/;
  const validateForm = (search) => {
    let errors = {};
    if (!search) {
      errors.search = "Search text is required.";
    } else if (!searchRegex.test(search)) {
      errors.search =
        "Invalid characters. Only letters, numbers, and spaces are allowed.";
    }
    return errors;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearch(value);

    if (value === "" || searchRegex.test(value)) {
      setErrors({ search: "" });
    } else {
      setErrors({
        search:
          "Invalid characters. Only letters, numbers, and spaces are allowed.",
      });
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validateForm(search);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const results = await searchMovies(search);
      setMovies(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center my-2">
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div>
            <Input
              className="mx-2"
              id="search"
              name="search"
              value={search}
              onChange={handleInputChange}
              placeholder="Search your movie here"
            />
          </div>
          <div className="flex justify-center items-center my-1">
            {errors.search && (
              <p className="text-red-500 text-sm">{errors.search}</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              type="submit"
              disabled={isLoading}
              className="w-[120px]"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Search />
              )}
              Search
            </Button>
          </div>
        </form>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[186px]">
                <LoaderCircle className="animate-spin duration-1000 text-blue-500" />
              </div>
            }
          >
            {!errors.search && <MovieTable movies={movies} />}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
