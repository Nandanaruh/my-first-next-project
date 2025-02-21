"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MovieTable({ movies }) {
  if (movies.length > 0) {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>
                    <Image
                      src={movie.poster}
                      alt="Poster"
                      width={80}
                      height={160}
                      className="w-20 h-auto aspect-auto brightness-90 transition-transform duration-300 hover:brightness-105 hover:scale-105 hover:shadow-lg"
                      priority
                    />
                  </TableCell>
                  <TableCell>{movie.title ?? "N/A"}</TableCell>
                  <TableCell>{movie.year ?? "N/A"}</TableCell>
                  <TableCell>{movie.plot ?? "N/A"}</TableCell>
                  <TableCell>{movie.rated ?? "N/A"}</TableCell>
                  <TableCell>{movie.genres?.join(", ") ?? "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No movies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center mt-1">
        <h4 className="flex items-center justify-center text-green-600 text-sm mt-1">
          Enter search text!
        </h4>
      </div>
    );
  }
}
