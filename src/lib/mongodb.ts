import { SurveyData } from "@/types";
import { MongoClient, Db, ObjectId } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db("form-wizard");
}

export async function saveSurvey(surveyData: SurveyData) {
  const db = await getDatabase();
  const collection = db.collection("surveys");

  const result = await collection.insertOne({
    ...surveyData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
}

export async function getSurvey(id: string) {
  const db = await getDatabase();
  const collection = db.collection("surveys");

  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function getAllSurveys() {
  const db = await getDatabase();
  const collection = db.collection("surveys");

  return await collection.find({}).sort({ createdAt: -1 }).toArray();
}
