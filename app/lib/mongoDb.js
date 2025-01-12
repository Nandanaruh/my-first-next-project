import { MongoClient } from "mongodb";

const clientPromise = () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  const options = {
    // serverApi: {
    //   version: ServerApiVersion.v1,
    //   strict: true,
    //   deprecationErrors: true,
    // },
  };

  if (!MONGODB_URI) {
    throw new Error("Invalid/missing environment variable");
  }

  const client = new MongoClient(MONGODB_URI, options);
  return client.connect();
};

export default clientPromise;
