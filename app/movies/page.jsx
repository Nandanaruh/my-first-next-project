import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ChevronRight, ChevronLeft } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMovies } from "@/app/lib/server";

// export const revalidate = 60; // Revalidate in every 60 seconds
export const dynamic = "force-dynamic";

export default async function MoviesPublicPage({ searchParams = {} }) {
  const moviesQuery = await getMovies();
  const movies = moviesQuery || [];

  // Pagination setup
  const page = Number(searchParams?.page) || 1; // Get page number from URL
  const limit = 4; // Movies per page
  const totalPages = Math.ceil(movies.length / limit);

  // Get paginated movies
  const paginatedMovies = movies.slice((page - 1) * limit, page * limit);

  return (
    <div className="space-y-4 mx-8 mt-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-blue-500 text-2xl font-bold">Browse Movies</h1>
        <Link href="/dashboard/movies">
          <Button>
            <LayoutDashboard />
            Go to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedMovies.map((movie) => (
          <div key={movie._id} className="h-[480px]">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {movie?.title}
                  <span className="text-xs font-normal text-gray-500">
                    {" "}
                    - {movie?.year ?? "N/A"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center bg-black mb-2 w-full h-[220px] rounded">
                  {movie.poster && (
                    <Image
                      src={movie?.poster}
                      alt={movie?.title}
                      width={200}
                      height={400}
                      className="h-full w-auto object-contain brightness-90 transition-transform duration-300 hover:brightness-105 hover:scale-105 hover:shadow-lg"
                      priority="true"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between h-[154px]">
                  <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                  <div className="text-sm text-blue-900 font-semibold">
                    {movie?.genres?.join(" / ") || "N/A"}
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <Badge variant="success" className="font-medium">
                      Rated: {movie.rated ?? "N/A"}
                    </Badge>
                    <div
                      className="flex flex-row gap-1 items-center"
                      title="IMDb Rating"
                    >
                      <FaStar className="text-yellow-500" />
                      <span className="font-semibold text-sm">
                        {movie?.imdb?.rating ?? 0}/10
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        {page > 1 && (
          <Link href={`?page=${page - 1}`}>
            <Button className="bg-white" variant="outline">
              <ChevronLeft className="hover:text-blue-500" />
            </Button>
          </Link>
        )}
        <span className="text-sm font-semibold">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link href={`?page=${page + 1}`}>
            <Button className="bg-white" variant="outline">
              <ChevronRight className="hover:text-blue-500" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
