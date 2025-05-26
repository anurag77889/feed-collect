import { getServerSession } from "next-auth";
import { z } from "zod";
import { authConfig } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


const feedbackSchema = z.object({
    name: z.string().min(3),
    feedback: z.string().min(10),
});

let feedbacks: {
    name: string;
    feedback: string;
    email: string;
    date: string;
}[] = [];

export async function POST(req: Request){
    const session = await getServerSession(authConfig);

    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const body = await req.json();

    const result = feedbackSchema.safeParse(body);
    if(!result.success){
        return NextResponse.json({error: "Invalid data", details: result.error.format()}, {status: 400})
    }

    const feedback = {
        ...result.data,
        email: session?.user?.email || "unknown",
        date: new Date().toISOString(),
    }

    feedbacks.push(feedback);

    return NextResponse.json({success: true, feedback})
}

export function GET(){
    return NextResponse.json({feedbacks});
}