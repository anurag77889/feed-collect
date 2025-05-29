import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongodb";

// Handle POST requests
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, message } = body;
  const feedback = {
    title,
    message,
    email: session.user?.email,
    createdAt: new Date(),
  };

  const client = await clientPromise;
  const db = client.db("feedback-app");
  await db.collection("feedbacks").insertOne(feedback);

  return NextResponse.json({ message: "Feedback submitted", feedback });
}

// Handle GET requests
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("feedback-app");

  const feedbacks = await db
    .collection("feedbacks")
    .find({ email: session.user?.email })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(feedbacks);
}
