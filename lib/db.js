import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb://Ibrahim2222:Ibrahim2222@cluster0-shard-00-00.r1pn0.mongodb.net:27017,cluster0-shard-00-01.r1pn0.mongodb.net:27017,cluster0-shard-00-02.r1pn0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-3l371a-shard-0&authSource=admin&retryWrites=true&w=majority`
  );

  return client;
}
