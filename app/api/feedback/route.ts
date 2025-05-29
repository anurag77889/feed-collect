import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const { title, message } = req.body;
    const feedback = {
      title,
      message,
      email: session.user?.email,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("feedback-app");
    await db.collection("feedbacks").insertOne(feedback);

    res.status(200).json({ message: "Feedback submitted", feedback });
  }
  if (req.method === "GET") {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const client = await clientPromise;
  const db = client.db("feedback-app");

  const feedbacks = await db
    .collection("feedbacks")
    .find({ email: session.user?.email })
    .sort({ createdAt: -1 })
    .toArray();

  res.status(200).json(feedbacks);
}else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

