"use client";
import { useState, Suspense } from "react";
import { searchMovies } from "@/app/lib/actions/movies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LoaderCircle } from "lucide-react";
import SearchMovieData from "./search-movie-data";

export default function SearchMovieForm() {
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState({});

  const searchRegex = /^[a-zA-Z0-9\s]+$/;
  const validateForm = (search) => {
    let errors = {};
    if (!search) {
      errors.search = "Search text is required.";
    } else if (!searchRegex.test(search)) {
      errors.search =
        "Invalid characters. Only letters, numbers and spaces are allowed!";
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
    event?.preventDefault();
    setLoading(true);
    const formData = new FormData(event?.currentTarget);
    const search = formData.get("search").toString();

    const validationErrors = validateForm(search);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const results = await searchMovies(search);
      setMovies(results);
      console.log(results);
    } catch (error) {
      console.log("Search error ::", error);
      return (
        <div className="flex items-center justify-center h-[150px]">
          <p className="text-red-700 font-medium animate-pulse duration-1000">
            No Movies Available!
          </p>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center my-2">
            <Input
              className="mx-2"
              id="search"
              name="search"
              value={search}
              onChange={handleInputChange}
              placeholder="Search your movie here"
            />
            <div className="flex flex-col my-2">
              {errors.search && (
                <p className="text-red-500 text-sm">{errors.search}</p>
              )}
            </div>
            <div className="flex flex-col w-[120px]">
              <Button variant="outline" type="submit" disabled={isLoading}>
                <Search /> Search
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[186px]">
            <LoaderCircle className="animate-spin duration-1000 text-blue-500" />
          </div>
        }
      >
        <SearchMovieData movies={movies} />
      </Suspense>
    </div>
  );
}
