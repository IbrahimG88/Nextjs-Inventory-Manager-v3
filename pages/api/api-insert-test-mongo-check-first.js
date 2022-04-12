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

async function handler(req, res) {
  if (req.method === "POST") {
    await cors(req, res);
    const client = await connectToDatabase();
    const db = client.db();
    const testsList = req.body;

    for (const key in testsList) {
      const addItem = await db.collection("inventory").updateOne(
        { id: testsList[key].id, testName: testsList[key].testName },
        {
          $set: { id: testsList[key].id, testName: testsList[key].testName },
        },
        { upsert: true }
      );
    }
  }
  res.status(201).json({ message: "All Items Saved" });
}

export default handler;
