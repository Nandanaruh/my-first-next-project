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

export default function DeleteMovieForm({
  movie = {}, // Default empty object to prevent errors
  onSubmit = () => {}, // Default empty function
  onCancel = () => {}, // Default empty function
  isLoading = false,
}) {
  const [open, setOpen] = useState(true); // Fix: Track Dialog state

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
    setOpen(false); // Close modal after submitting
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="items-center">Delete Movie</DialogTitle>
          <DialogDescription className="items-center text-red-500">
            Are you sure the selected movie delete?
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
