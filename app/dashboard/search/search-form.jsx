"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchMovieForm() {
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const searchRegex = /^[a-zA-Z0-9]+$/;
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

    if (searchRegex.test(value) || value === "") {
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
    const formData = new FormData(event?.currentTarget);
    const search = formData.get("search").toString();
    console.log("SEARCH TEXT::", search);
    const validationErrors = validateForm(search);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
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
              <Button variant="outline" type="submit">
                <Search /> Search
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
