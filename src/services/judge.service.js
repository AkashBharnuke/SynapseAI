import { getJudgeModel } from "../utils/getModels.js";
import { buildSynthesisPrompt } from "../prompts/synthesis.prompt.js";
import { JUDGE_SYSTEM_PROMPT } from '../prompts/judge.system.prompt.js';
import { generateOpenAICompletion } from "../providers/openai.provider.js";

import { parseJsonResponse } from '../utils/parseJsonResponse.js';

const synthesizeResponses = async (question, responses) => {
    const judgeModel = getJudgeModel();

    if (!judgeModel) {
        return {
            success: false,
            error: "Judge model not configured."
        };
    }

    const synthesisPrompt = buildSynthesisPrompt(question, responses);

    const messages = [
        {
            role: "system",
            content: JUDGE_SYSTEM_PROMPT
        },
        {
            role: "user",
            content: synthesisPrompt
        }
    ];


    const result = await generateOpenAICompletion(messages, judgeModel);
    
    if (!result.success) {
        return result;
    }
    
    const parsed = parseJsonResponse(result.answer);

    if(!parsed.success) {
        return {
            success: false,
            error: parsed.error,
            raw: parsed.raw
        }
    }


    return {
        success: true,
        consensus: parsed.data
    };
}

export { synthesizeResponses };
