import { db } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const movies = await db
      .collection("movies_new")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();
    return NextResponse.json(movies);
  } catch (error) {
    console.log("Mongodb error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
  //return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};
