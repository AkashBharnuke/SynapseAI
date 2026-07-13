import OpenAI from "openai";
import { env } from "./env.js";

import dotenv from "dotenv";

dotenv.config();

const endpoint = "https://models.github.ai/inference";

export const phi = new OpenAI({
  baseURL: endpoint,
  apiKey: env.OPENAI_API_KEY,
});