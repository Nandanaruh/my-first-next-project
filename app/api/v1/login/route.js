import { NextResponse } from "next/server";

export const POST = async (req) => {
    const request = await req.json();
    console.log(request);

    //Bind database.
    //Find the user in database.
    //Check password validity.
    //Return the response with  token.
    //If password invalid return error response
    
    return NextResponse.json({ success: true, username: "Nandana" });
}