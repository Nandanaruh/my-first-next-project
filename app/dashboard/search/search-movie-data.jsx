"use server";
// import { db } from "@/app/lib/mongodb";
import { db } from "../../../lib/mongodb";
export async function searchMovies(query) {
  if (!query) return []; // when empty query fetch all movies

  const searchResults = await db
    .collection("movies_new")
    .find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { plot: { $regex: new RegExp(query, "i") } },
        { genres: { $regex: new RegExp(query, "i") } },
        { rated: { $regex: new RegExp(query, "i") } },
        { year: Number(query) },
      ],
    })
    .limit(10)
    .toArray();

  return searchResults.map((movie) => ({
    id: movie._id.toString(),
    title: movie.title,
    year: movie.year,
    plot: movie.plot,
    rated: movie.rated,
    genres: movie.genres,
    poster: movie.poster ?? "/images/avatar.jpg",
  }));
}
