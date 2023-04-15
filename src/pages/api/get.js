import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const data = await db.collection("events").find({}).limit(20).toArray();

  res.status(200).json(data);
}
