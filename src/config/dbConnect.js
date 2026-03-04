import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    if (!process.env.CONNECTION_STRING) {
      throw new Error("CONNECTION_STRING is missing in .env file");
    }

    const conn = await mongoose.connect(process.env.CONNECTION_STRING);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
