/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../lib/db";
//working
export default async (req, res) => {
  const date = new Date();
  const client = await connectToDatabase();
  const db = client.db();
  const item = await db
    .collection("appVariables")
    .updateOne(
      { variableType: "date" },
      { $set: { date: date } },
      { upsert: true }
    );
  return res.json(item);
};

//sets a new Date put it down at the end
