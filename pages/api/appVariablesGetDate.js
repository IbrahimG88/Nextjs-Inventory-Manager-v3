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
  const date = new Date();
  const client = await connectToDatabase();
  const db = client.db();

  const item = await db.collection("appVariables").find({}).toArray();

  return res.json(item);
};

//sets a new Date put it down at the end
