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
              <div key={movie._id} className="h-96 bg-blue-400">
                {movie?.title}
                <Card></Card>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
