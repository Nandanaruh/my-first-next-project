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
} from "@/components/ui/dialog";
const handleSubmitForm = (e) => {
  e.preventDefault();

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

  const handleSubmitForm = (e) => {
    e.preventDefault();

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
          <DialogTitle className="justify-center items-center">
            Delete Movie
          </DialogTitle>
          <DialogDescription className="justify-center items-center text-red-500">
            Are you sure the selected movie delete
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitForm}>
          <div className="space-y-4">
            <div className="w-full flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
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
