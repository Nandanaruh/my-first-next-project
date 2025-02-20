import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function SearchMovieData({ movies }) {
  if (movies.length < 1) {
    return (
      <div className="flex items-center justify-center h-[150px]">
        <p className="text-red-700 font-medium animate-pulse duration-1000">
          No Movies Available!
        </p>
      </div>
    );
  } else {
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
