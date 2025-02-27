import { db } from "@/app/lib/mongodb";
import UserTable from "./user-table";
export default async function UserData() {
  try {
    const moviesQuery = await db
      .collection("user")
      .find({})
      .sort({ metacritic: -1 })
      .limit(5)
      .toArray();

    if (moviesQuery) {
      //Refine users query to an array
      const refinedMovies = moviesQuery.map((movie) => ({
        id: movie._id.toString(),
        name: movie.name,
        email: movie.email,
      }));
      //Pass users refined data to table
      //Return user table
      return <UserTable movies={refinedMovies} />;
    }
  } catch (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-[150px]">
        <p className="text-red-700 font-medium animate-pulse duration-1000">
          Users Not Found!
        </p>
      </div>
    );
  }
}
