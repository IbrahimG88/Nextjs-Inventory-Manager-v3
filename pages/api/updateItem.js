/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../lib/db";
//working
export default async (req, res) => {
  const client = await connectToDatabase();
  const db = client.db();
  const { id, stocksAdded } = req.body;
  console.log("body id", Number(id));
  console.log("body stocksAdded", Number(stocksAdded));
  console.log("body object", req.body);
  const item = await db
    .collection("inventory")
    .updateOne(
      { id: Number(id) },
      { $inc: { TotalStocks: Number(stocksAdded) } }
    );
  console.log("item", item);
  res.json(item);
};
// try to move function back to db-utils
