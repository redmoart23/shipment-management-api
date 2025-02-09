import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { envs } from "./config/envs";
import { dbConnection } from "./database/database";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Body parser
app.use(express.json());

// Connect to database
dbConnection();

// CORS
app.use(cors());

// Routes
// rutas crud
app.use("/auth", require("./routes/auth"));

// Start server
app.listen(envs.port || 3000, () => {
  console.log(`🔥 Server running on Port ${envs.port}`);
});
