"use server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const createMovie = async (movie) => {
  try {
    const existingMovie = await db.collection("movies_new").findOne({
      title: movie.title,
      year: movie.year,
    });

    if (existingMovie) {
      console.log("Movie already exists in the database.");
      return {
        success: false,
        message: `${movie.title} movie already exists in the database.`,
      };
    }

    // Insert the new movie
    const result = await db.collection("movies_new").insertOne(movie);
    console.log(`A movie was added with _id:${result.insertedId}`);

    return {
      success: true,
      message: "Movie added successfully.",
      movieId: result.insertedId.toString(),
    };
  } catch (error) {
    console.log("Mongodb insert failed!", error);
    return { success: false, message: "Database insert failed." };
  }
};

//Update movie server action
export const updateMovie = async (id, movie) => {
  try {
    const result = await db
      .collection("movies_new")
      .updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: movie },
        { upsert: true },
      );

    console.log(`A movie was updated with _id:${result.upsertedId}`);
    if (result.acknowledged) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Mongodb update failed!", error);
    return { success: false, error };
  }
};

//Delete movie
export const deleteMovie = async (id) => {
  try {
    const result = await db
      .collection("movies_new")
      .deleteOne({ _id: ObjectId.createFromHexString(id) });

    console.log(`Movie was deleted :${result.deletedCount}`);
    if (result.acknowledged) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Mongodb delete failed!", error);
    return { success: false, error };
  }
};
//Search movie
export const searchMovies = async (search) => {
  console.log(search);
  try {
    const searchResults = await db
      .collection("movies_new")
      .find({
        $or: [
          { title: { $regex: new RegExp(search, "i") } },
          { plot: { $regex: new RegExp(search, "i") } },
          { genres: { $regex: new RegExp(search, "i") } },
          { rated: { $regex: new RegExp(search, "i") } },
          { year: { $regex: new RegExp(`^${search}`, "i") } }, // Searches by prefix match
        ],
      })
      .limit(10)
      .toArray();

    console.log(searchResults);
    return searchResults;
  } catch (error) {
    console.log("Error searching movie: ", error);
  }
};
