"use server";
import { db } from "@/app/lib/mongodb";

export const createMovie = async (movie) => {
  try {
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

//Update movie server action
export const updateMovie = async (movie) => {
  try {
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
