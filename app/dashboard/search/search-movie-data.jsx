"use server";

import { db } from "@/app/lib/mongodb";

export async function searchMovies(query) {
  if (!query) return [];

  const searchResults = await db
    .collection("movies_new")
    .find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { plot: { $regex: new RegExp(query, "i") } },
        { genres: { $regex: new RegExp(query, "i") } },
        { rated: { $regex: new RegExp(query, "i") } },
        { year: { $regex: new RegExp(`^${query}`, "i").toString() } },
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
