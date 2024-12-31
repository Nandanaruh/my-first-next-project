import { Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovies } from "../lib/apis/server";

export default async function DashboardPage() {
  const moviesQuery = await getMovies();
  console.log(moviesQuery);
  return (
    <main>
      <nav className="bg-blue-300 w-full h-16 flex justify-start items-center">
        <div className="container">
          <h1 className="text-black font-bold text-xl">Mflix Dashboard</h1>
        </div>
      </nav>
      <div className="container mt-8">
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
                      <Image
                        src={movie?.poster}
                        alt={movie?.title}
                        width={200}
                        height={400}
                        className="h-full w-auto object-contain"
                        loading="lazy"
                        priority="true"
                      />
                    </div>
                    <div className="flex flex-col justify-between h-[154px]">
                      <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                      <div className="text-sm text-blue-900 font-semibold">
                        {movie?.genres?.length && movie?.genres.join(" / ")}
                      </div>
                      <div>
                        <Badge variant="success" className="font-medium">
                          Rated: {movie.rated ?? "N/A"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
