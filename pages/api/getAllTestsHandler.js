/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../lib/db";
//working
export default async (req, res) => {
  const client = await connectToDatabase();
  const db = client.db();
  const items = await db.collection("inventory").find({}).toArray();
  return res.json(items);
};
