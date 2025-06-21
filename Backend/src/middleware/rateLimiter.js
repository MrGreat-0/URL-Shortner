import rateLimit from "express-rate-limit";

export const urlCreationRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: (req) => (req.user ? 6 : 3),
    keyGenerator: (req) => (req.user ? String(req.user._id) : req.ip),
    message: {
        status: 429,
        message: "Too many URL creations. Please try again after 24 hours.",
    },
});
