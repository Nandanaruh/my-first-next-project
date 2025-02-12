"use server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export const createMovie = async (movie) => {
  try {
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    // Check if movie already exists
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

//Delete movie

export const deleteMovie = async (movieId) => {
  try {
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    // Delete movie by ID
    const result = await db.collection("movies_new").deleteOne({
      _id: new ObjectId(movieId),
    });

    if (result.deletedCount === 1) {
      console.log(`Movie with ID ${movieId} deleted successfully.`);
      return { success: true, message: "Movie deleted successfully." };
    } else {
      return { success: false, message: "Movie not found." };
    }
  } catch (error) {
    console.error("MongoDB delete failed!", error);
    return { success: false, message: "Database delete failed." };
  }
};
// Update movie
export const updateMovie = async (movieId, updatedData) => {
  try {
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    // Update movie by ID
    const result = await db.collection("movies_new").updateOne(
      { _id: new ObjectId(movieId) }, // Find movie by ID
      { $set: updatedData }, // Update with new data
    );

    if (result.matchedCount === 0) {
      return { success: false, message: "Movie not found." };
    }

    if (result.modifiedCount === 0) {
      return { success: false, message: "No changes made to the movie." };
    }

    console.log(`Movie with ID ${movieId} updated successfully.`);
    return { success: true, message: "Movie updated successfully." };
  } catch (error) {
    console.error("MongoDB update failed!", error);
    return { success: false, message: "Database update failed." };
  }
};
