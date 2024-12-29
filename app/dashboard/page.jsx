import { getMovies } from "../lib/apis/server";

export default async function DashboardPage() {
  //1. Add shadcn card
  //2. Create movies get end point
  //3. Read dummy data
  //4. Render the result

  //const movies = await getMovies();
  const { movies } = await getMovies();

  console.log("MOVIES::", movies);
  return (
    <main>
      <nav className="bg-blue-300 w-full h-16 flex justify-start items-center">
        <div className="container">
          <h1 className="text-black font-bold text-xl">Mflix Dashboard</h1>
        </div>
      </nav>
      <div className="container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {movies?.length &&
            movies.map((movie) => (
              <div key={movie.id} className="h-96 bg-blue-400">
                {movie?.title}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
