import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://sgnoo:1234@cluster0.vyjx2fo.mongodb.net/?retryWrites=true&w=majority";
const dbName = "ethglobal";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
