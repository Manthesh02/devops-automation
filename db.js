import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURL ='mongodb://admin-user:test123@54.85.70.87:27017/?tls=false';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectToMongoDB;
