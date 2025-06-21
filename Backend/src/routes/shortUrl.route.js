import express from 'express';
import { createShortUrl } from '../controller/shortUrl.controller.js';
import { urlCreationRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post("/", urlCreationRateLimiter, createShortUrl);

export default router;