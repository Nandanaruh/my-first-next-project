//Movie related server actions

"use server";
import clientPromise from "@/app/lib/mongodb";
export const createMovie = async (movie) => {
  try {
    const client = await clientPromise();
    const db = client.db("sample_mflix");
    const result = await db.collection("movies_new").insertOne(movie);

    console.log(`A movie was added with _id:${result.insertedId}`);
  } catch (error) {
    console.log("Mongodb insert failed!");
  }
};
