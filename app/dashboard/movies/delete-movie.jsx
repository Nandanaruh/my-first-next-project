"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteMovieForm({ open, movie, onCancel, isLoading }) {
  const [id] = useState(movie?.id);
  const [title, setTitle] = useState(movie?.title || "");
  const [errors, setErrors] = useState({});
  const handleSubmitForm = (event) => {
    event?.preventDefault();

    if (!title) {
      setErrors({ title: "Title is required" });
      return;
    }
    onSubmit({
      id,
      title,
    });
  };
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="items-center">Delete Movie</DialogTitle>
          <DialogDescription className="items-center text-red-500">
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitForm}>
          <div className="space-y-4">
            <div className="w-full flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />} Delete
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
