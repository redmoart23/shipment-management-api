import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { envs } from "./config/envs";
import connectionPool from "./database/database";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Body parser
app.use(express.json());

// Connect to database
connectionPool
  .getConnection()
  .then((connection) => {
    console.log("Database connected");
    connection.release();
  })
  .catch((error) => {
    console.log(error);
  });

// CORS
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(envs.port || 3000, () => {
  console.log(`🔥 Server running on http://localhost:${envs.port}`);
});
