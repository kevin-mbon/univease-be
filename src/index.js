import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import dbConnector from "./app.js";
<<<<<<< HEAD
import morgan from "morgan";
import cors from "cors";
=======
import cors from "cors"
dotenv.config();
>>>>>>> 4b8ecdc (cleaning code)

const app = express();
dotenv.config();

// Configurations
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: false }));

=======
app.use(express.json());
app.use(cors());
>>>>>>> 4b8ecdc (cleaning code)
// Routes
app.use("/api/v1/", router);
dbConnector;    
const PORT = process.env.PORT || 4200;

app.listen(process.env.PORT, () => {
  console.log(`🚀Server running on port: http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    author: "Kevin && theyCallMeDeSaint",
    message: "Welcome to the UnivEase API!",
  });
});
