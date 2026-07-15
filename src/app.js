import express from "express";
import cors from "cors";

import routes from './routes/index.js';

import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

app.use(
  express.static(
    path.join(
      __dirname,
      "..",
      "public"
    )
  )
);  

export default app;