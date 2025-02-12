"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditMovieForm from "./edit-movie-form";
import DeleteMovieForm from "./delete-movie";
import { deleteMovie } from "@/app/lib/actions/movies";
export default function MovieTable({ movies }) {
  const [editingMovie, setEditingMovie] = useState();
  const [deletingMovie, setDeletingMovie] = useState(null);

  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleDelete = async (movie) => {
    setDeletingMovie(movie);
    const response = await deleteMovie(movie);

    if (response.success) {
      console.log("Success: ", response);
    } else {
      console.log("Deleting error: ", response);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold"># Cover</TableHead>
            <TableHead className="font-bold">Movie Title</TableHead>
            <TableHead className="font-bold">Year</TableHead>
            <TableHead className="font-bold">Plot</TableHead>
            <TableHead className="font-bold">Rated</TableHead>
            <TableHead className="font-bold">Genres</TableHead>
            <TableHead className="font-bold text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>
                <Image
                  src={movie.poster ?? "/images/avatar.jpg"}
                  alt="Poster"
                  width={80}
                  height={160}
                  className="w-20 h-auto aspect-auto brightness-90 transition-transform duration-300 hover:brightness-105 hover:scale-105 hover:shadow-lg"
                  priority
                />
              </TableCell>
              <TableCell>{movie?.title ?? "N/A"}</TableCell>
              <TableCell>{movie?.year ?? "N/A"}</TableCell>
              <TableCell>{movie?.plot ?? "N/A"}</TableCell>
              <TableCell>{movie?.rated ?? "N/A"}</TableCell>
              <TableCell>{movie?.genres?.join(", ") ?? "N/A"}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="min-w-[100px]"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="min-w-[100px]"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSubmit={(updatedMovie) => console.log(updatedMovie)}
          onCancel={() => setEditingMovie(movies.id)}
        />
      )}
      {deletingMovie && (
        <DeleteMovieForm
          movie={deletingMovie}
          onSubmit={(deleteMovie) => console.log(deleteMovie)}
          onCancel={() => setEditingMovie(movies.id)}
        />
      )}
    </div>
  );
}
