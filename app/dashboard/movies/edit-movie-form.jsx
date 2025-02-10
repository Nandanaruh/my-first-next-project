import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditMovieForm({ open, onCancel }) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>Update the selected movie</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
