import clientPromise from "@/app/lib/apis/mongodb";
import { NextResponse } from "next/server";

//need json body to postman api
export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse(
        {
          error: "Name, email and password are required.",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise();
    const db = client.db("sample_mflix");
    const existingUser = await db.collection("users").findOne({ email });
    console.log("Is existing user", existingUser);
    return NextResponse.json({ success: true, username: name, email: email });
  } catch (error) {
    console.log("Mongodb error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
