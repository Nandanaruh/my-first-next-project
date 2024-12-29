import { NextResponse } from "next/server";

//need json body to postman api
export const POST = async (req) => {
  const request = await req.json();
  console.log(request);
  return NextResponse.json({ success: true, username: "Nandana" });
};
