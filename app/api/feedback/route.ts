import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";



const feedbackSchema = z.object({
    name: z.string().min(3),
    feedback: z.string().min(10),
});

const feedbacks: {
    name: string;
    feedback: string;
    email: string;
    date: string;
}[] = [];

export async function POST(req: Request){
    const session = await getServerSession(authOptions);

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

export async function GET(){
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const userEmail = session.user?.email;

    const userFeedbacks = feedbacks.filter(
        (fb) => fb.email === userEmail
    );

    return NextResponse.json({feedbacks: userFeedbacks});
}