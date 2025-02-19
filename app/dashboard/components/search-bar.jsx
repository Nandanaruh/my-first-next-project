import { Dialog } from "@/components/ui/dialog";

export default function SearchBar() {
  return (
    <div>
      <Dialog open={open} onOpenChange={onCancel}>
        Search
      </Dialog>
    </div>
  );
}
