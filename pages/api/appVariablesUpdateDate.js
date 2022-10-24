/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../lib/db";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

//working
export default async (req, res) => {
  await cors(req, res);

 
  
  const d = new Date();
  const s = d.toLocaleString(undefined,{timeZone:"Africa/Cairo"});
  const client = await connectToDatabase();
  const db = client.db();
  const item = await db
    .collection("appVariables")
    .updateOne(
      { variableType: "date" },
      { $set: { date: s } },
      { upsert: true }
    );
  return res.json(item);
};
