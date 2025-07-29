import { MongoClient } from "mongodb";

export const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
    return client.db();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}
