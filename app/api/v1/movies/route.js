import { NextResponse } from "next/server";

const MOVIES = [
  { id: 1, title: "Harry Potter" },
  { id: 2, title: "Titanic" },
  { id: 3, title: "Amaran" },
  { id: 4, title: "Sherlock Holmes" },
  { id: 5, title: "Escape Plan" },
  { id: 6, title: "Prison Break" },
  { id: 7, title: "Last Ship" },
  { id: 8, title: "X-Files" },
  { id: 9, title: "Ants" },
];

export const GET = async (req) => {
  return NextResponse.json({ success: true, movies: MOVIES });
};
