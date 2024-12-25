import { NextResponse } from "next/server";

export const POST = async (req) => {
    console.log(req);
    return NextResponse.json({ success: true, username: "Nandana" });
}