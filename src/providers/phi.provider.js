import { phi } from "../config/phi.js";
import { LLM_CONFIG } from "../config/llm.config.js";

const generatePhiResponse = async (
    messages,
    modelConfig
  ) => {
    const startedAt = Date.now();
      
    try {
      const response =
      await phi.chat.completions.create({
        model: modelConfig.id,
        messages,
        temperature: LLM_CONFIG.temperature,
        max_tokens: LLM_CONFIG.max_tokens
      });
      
      const latency = Date.now() - startedAt;
      console.log(`🤖 [${modelConfig.id}] ${latency}ms`);
        
      return {
        model: modelConfig.id,
        provider: modelConfig.provider,
        success: true,

        answer:
          response.choices?.[0]?.message
            ?.content ?? "",

        latency: latency,

        usage: {
          input:
            response.usage?.prompt_tokens ??
            0,

          output:
            response.usage
              ?.completion_tokens ?? 0,

          total:
            response.usage?.total_tokens ??
            0
        },

        finishReason:
          response.choices?.[0]
            ?.finish_reason,

        metadata: {
          id: response.id
        }
      };
    } catch (error) {
     
      console.error(`[${modelConfig.id}] Failed:`, error.message);

      return {
        model: modelConfig.id,
        provider: modelConfig.provider,
        success: false,
        error:
          error?.message ??
          "Failed to generate response."
      };
    }
  };


  export { generatePhiResponse }