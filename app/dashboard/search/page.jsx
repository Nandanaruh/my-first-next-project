import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-row my-2">
        <Input
          className="mx-2"
          id="search"
          name="search"
          placeholder="Search your movie here"
        />
        <Button variant="outline">
          <Search /> Search
        </Button>
      </div>
    </div>
  );
}
