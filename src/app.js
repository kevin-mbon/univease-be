import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnector = mongoose
.connect(process.env.DB_URL)
.then(() => {
  console.log(`DB connected ✅`);
}) 
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

export default dbConnector;
