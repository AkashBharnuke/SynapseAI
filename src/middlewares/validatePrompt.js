const MIN_PROMPT_LENGTH = 3;
const MAX_PROMPT_LENGTH = 4000;

const validatePrompt = (req, res, next) => {
    const { prompt } = req.query

    if (!prompt) {
        return res.status(400).json({
            success: false,
            message: "Prompt is required"
        });
    }


    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
        return res.status(400).json({
            success: false,
            message: "Prompt cannot be empty"
        });
    }

    if (trimmedPrompt.length < MIN_PROMPT_LENGTH) {
        return res.status(400).json({
        success: false,
        message: `Prompt must be at least ${MIN_PROMPT_LENGTH} characters long.`
        });
    }

    if (trimmedPrompt.length > MAX_PROMPT_LENGTH) {
        return res.status(400).json({
        success: false,
        message: `Prompt cannot exceed ${MAX_PROMPT_LENGTH} characters.`
        });
    }

    req.query.prompt = trimmedPrompt;

    next();
}

export { validatePrompt };




