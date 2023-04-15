import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const item = req.body;

    const result = await db.collection("events").insertOne(item);
    res.status(200).json(result);
  } else {
    res.status(400).json({ success: false });
  }
}
