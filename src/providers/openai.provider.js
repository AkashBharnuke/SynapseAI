import { openai } from '../config/openai.js';

const generateOpenAICompletion = async (messages, modelConfig) => {
    const startAt = Date.now();
    
    try {
        const response = await openai.chat.completions.create({
            model: modelConfig.id,
            messages: messages,
        });
        
        const latency = Date.now() - startAt;
        console.log(`🤖 [${modelConfig.id}] ${latency}ms`);
        
        return {
            model: modelConfig.id,
            provider: modelConfig.provider,
            success: true,
            answer: response.choices?.[0]?.message?.content ?? "",
            latency: latency,
            usage: {
                input: response.usage?.prompt_tokens ?? 0,
                output: response.usage?.completion_tokens ?? 0,
                total: response.usage?.total_tokens ?? 0,
                finishReason: response.choices?.[0]?.finishReason,
                metadata: {
                    id: response.id,
                    created: response.created
                }
            }
        };

    }
    catch(error) {
        console.error(`[${modelConfig.id}] Failed:`, error.message);
        return {
            model: modelConfig.id,
            provider: modelConfig.provider,
            success: false,
                
            error: error?.message ?? "Failed to generate response."
        }
    }
}



export { generateOpenAICompletion }