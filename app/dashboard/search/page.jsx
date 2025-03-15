"use client";

import { useState, useEffect } from "react";
import { Search, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { searchMovies } from "./search-movie-data";
import MovieTable from "./movie-table";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [typingTimeout, setTypingTimeout] = useState(null);

  const searchRegex = /^[a-zA-Z0-9\s]+$/;

  const validateForm = (search) => {
    let errors = {};
    if (!search.trim()) {
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

    // Reset validation errors on valid input
    if (value === "" || searchRegex.test(value)) {
      setErrors({ search: "" });
    } else {
      setErrors({
        search:
          "Invalid characters. Only letters, numbers, and spaces are allowed.",
      });
    }

    // Debounce search: clear previous timeout and set a new one
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (value.trim() && searchRegex.test(value)) {
          handleSearch(value);
        } else {
          setMovies([]);
        }
      }, 500), // Delay search by 500ms
    );
  };

  const handleSearch = async (query) => {
    setLoading(true);

    try {
      const results = await searchMovies(query);
      if (results.length > 0) {
        setMovies(results);
      } else {
        return (
          <div className="flex flex-row justify-center items-center">
            <p className="text-red-700 font-medium animate-pulse duration-1000">
              No movies found for this search.
            </p>
          </div>
        );
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center my-2">
        <div className="w-full max-w-md px-2">
          <Input
            className="max-w-2xl mx-2 text-green-500"
            id="search"
            name="search"
            value={search}
            onChange={handleInputChange}
            placeholder="Search your movie here..."
            title="Search your movie here..."
          />
          {/* search icon - position with css */}
          <div className="flex justify-center items-center">
            {errors.search && (
              <p className="text-red-500 text-sm">{errors.search}</p>
            )}
          </div>
        </div>
        <div className="-mt-7 ml-96 text-gray-300">
          <Search />
        </div>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center h-[186px]">
          <LoaderCircle className="animate-spin text-blue-500" />
        </div>
      )}
      {!isLoading && movies.length > 0 ? ( //should be remove
        <Card>
          <CardContent>
            <MovieTable movies={movies} />
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center text-green-500 my-8">
          Search your movie here...
        </div>
      )}
    </div>
  );
}
