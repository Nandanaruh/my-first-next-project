import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovies } from "../lib/apis/server";
import { Image } from "lucide-react";

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
              <div key={movie._id} className="h-96">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{movie?.title}</CardTitle>
                    <CardDescription className="sr-only">
                      {movie?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center bg-black mb-2 w-full h-[180px] rounded">
                      <Image
                        src={movie?.poster}
                        alt={movie?.title}
                        width={200}
                        height={400}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {movie?.plot}
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
