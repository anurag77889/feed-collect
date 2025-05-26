import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "../auth/[...nextauth]/route";



export async function GET(){
    const session = await getServerSession(authConfig);

    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    return NextResponse.json({
        name: session?.user?.name,
        email: session?.user?.email
    })
}