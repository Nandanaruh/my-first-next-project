import { db } from "@/app/lib/mongodb";
import MovieTable from "./movie-table";

export default async function MovieData() {
  try {
    const randomDoc = await db
      .collection("movies_new")
      .aggregate([{ $sample: { size: 4 } }])
      .toArray();

    if (randomDoc) {
      //Refine movies query to an array
      const refinedMovies = randomDoc.map((movie) => ({
        id: movie._id.toString(),
        title: movie.title,
        year: movie.year,
        plot: movie.plot,
        rated: movie.rated,
        genres: movie.genres,
        poster: movie.poster,
      }));
      //Pass movies refined data to table
      //Return movie table
      return <MovieTable movies={refinedMovies} />;
    }
  } catch (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-[150px]">
        <p className="text-red-700 font-medium animate-pulse duration-1000">
          No Movies Available!
        </p>
      </div>
    );
  }
}
