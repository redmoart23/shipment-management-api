import express from "express";
import cors from "cors";
import { envs } from "./config/envs";

// Create Express app
const app = express();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/api/v1/clients", require("./routes/clients"));
app.use("/api/v1/orders", require("./routes/orders"));

// Start server
app.listen(envs.port || 3000, () => {
  console.log(`🔥 Server running on Port ${envs.port}`);
});
