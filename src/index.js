import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
   
app.use(bodyParser.json());
app.use(express.json());
// Routes
app.use("/api/v1/", router);
dbConnector;    
app.listen(port, () => {
  console.log(`🚀Server is running on port ${port}...`);
});
