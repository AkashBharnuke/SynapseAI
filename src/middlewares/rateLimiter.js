import ratelimit from 'express-rate-limit';

const chatLimitter = ratelimit({
    windowMs: 60* 1000,
    limit: 10,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many request. Please try again aftre a minute"
    }
});

export { chatLimitter };


