//Movie data server component
import { getMovies } from "@/app/lib/server";
export default async function MovieData() {
  const moviesQuery = await getMovies();
  console.log(moviesQuery);
  return <div>Movie Data</div>;
}
