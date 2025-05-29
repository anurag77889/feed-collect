import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

// Handle POST requests
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const {name, feedback} = await req.json();

  if(!name||name.length<3||feedback||feedback.length <10){
    return NextResponse.json(
      {message: "Invalid Input"},
      {status: 400}
    )
  }

  await connectDB();

  const newFeedback = new Feedback({
    name,
    feedback,
    email: session.user?.email,
    createdAt: new Date(),
  })

  await newFeedback.save();

  return NextResponse.json({ message: "Feedback submitted", feedback });
}

// Handle GET requests
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const feedbacks = await Feedback.find({email: session.user?.email}).sort({
    createdAt: -1,
  })

  return NextResponse.json(feedbacks);
}
