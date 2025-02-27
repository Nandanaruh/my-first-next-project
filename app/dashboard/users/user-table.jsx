"use client";
import { AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Avatar } from "@radix-ui/react-avatar";

export default function UserTable({ movies }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);
  const router = useRouter();
  //Update a movie
  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleEditSubmit = async (movie) => {
    const { id, name, email, plot, genres, rated, poster } = movie; //title = movie.title when destructuring in Java script ES6
    setIsSaving(true);
    const resp = await updateMovie(id, {
      name,
      email,
      plot,
      genres,
      rated,
      poster,
    });
    setIsSaving(false);
    if (resp?.success) {
      setEditingMovie(null);
      router.refresh();
    }
  };
  //Delete a movie
  const handleDelete = async (movie) => {
    setDeletingMovie(movie);
  };
  const handleDeleteConfirm = async (movieId) => {
    setDeleting(true);
    const resp = await deleteMovie(movieId);
    setDeleting(false);
    if (resp?.success) {
      setDeletingMovie(null);
      router.refresh();
    }
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold"># Cover</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    className="h-10 w-10 border-2 border-blue-500 rounded-full"
                    src="https://github.com/shadcn.png"
                  />
                </Avatar>
              </TableCell>
              <TableCell>{movie?.name ?? "N/A"}</TableCell>
              <TableCell>{movie?.email ?? "N/A"}</TableCell>
              <TableCell className="text-green-500">Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
