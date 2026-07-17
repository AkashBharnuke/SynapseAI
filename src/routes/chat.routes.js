import { Router } from 'express';
import { generateResponse } from '../controllers/chat.controller.js';
import { validatePrompt } from '../middlewares/validatePrompt.js'
import { chatLimitter } from '../middlewares/rateLimiter.js'

const router = Router();

router.post("/", chatLimitter, validatePrompt, generateResponse);

router.get("/stream", chatLimitter, validatePrompt, generateResponse);

export default router;





