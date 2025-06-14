import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";


export async function GET(){
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    return NextResponse.json({
        name: session?.user?.name,
        email: session?.user?.email
    })
}