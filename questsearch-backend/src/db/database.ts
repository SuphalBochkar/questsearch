import mongoose from "mongoose";

export async function DBConnection() {
  try {
    const db = process.env.MONGO_URI;
    if (!db) {
      console.error("Missing DB URI");
      return;
    }
    await mongoose.connect(db);
    console.log("DB connected");
  } catch (error) {
    console.error("DB Failed:", error as Error);
  }
}
