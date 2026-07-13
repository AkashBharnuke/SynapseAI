import express from "express";
import cors from "cors";

import routes from './routes/index.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SynapseAI"
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default app;