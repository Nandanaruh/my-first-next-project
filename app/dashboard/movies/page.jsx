import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovies } from "@/app/lib/server";

export default async function MoviesPage() {
  const moviesQuery = await getMovies();
  console.log(moviesQuery);
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {moviesQuery?.length &&
          moviesQuery.map((movie) => (
            <div key={movie._id} className="h-[480px]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {movie?.title}
                    <span className="text-xs font-normal text-gray-500">
                      {" - "}
                      {movie?.year ?? "N/A"}
                    </span>
                  </CardTitle>
                  <CardDescription className="text-center"></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center bg-black mb-2 w-full h-[220px] rounded">
                    {movie.poster && (
                      <Image
                        src={movie?.poster}
                        alt={movie?.title}
                        width={200}
                        height={400}
                        className="h-full w-auto object-contain"
                        priority="true"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between h-[154px]">
                    <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                    <div className="text-sm text-blue-900 font-semibold">
                      {movie?.genres?.length && movie?.genres.join(" / ")}
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <Badge variant="success" className="font-medium">
                        Rated: {movie.rated ?? "N/A"}
                      </Badge>
                      <div
                        className="flex flex-row gap-1 items-center"
                        title="IMBb Rating"
                      >
                        <FaStar className="text-yellow-500" />
                        <span className="font-semibold text-sm">
                          {movie?.imdb?.rating ?? 0}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
