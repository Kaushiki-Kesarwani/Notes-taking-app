import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};