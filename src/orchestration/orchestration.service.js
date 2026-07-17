import { getEnabledModels } from '../utils/getModels.js';
import { buildMessages } from '../utils/messageBuilder.js';
import { generateOpenAICompletion } from '../providers/openai.provider.js';
import { generateDeepSeekResponse } from '../providers/deepseek.provider.js';
import { generatePhiResponse } from '../providers/phi.provider.js';

import { withTimeout} from '../utils/withTimeout.js'

import { buildSynthesisPrompt } from '../prompts/synthesis.prompt.js'


const providerMap = {
    openai: generateOpenAICompletion,
    deepseek: generateDeepSeekResponse,
    phi: generatePhiResponse
}

const orchestrateResponses = async(prompt, emitter = null) => {
    const models = getEnabledModels() ?? [];

    // console.log(`MODELS: ${models}`);

    const messages = buildMessages(prompt);

    const providerPromises = models.map((model) => {

        const provider = providerMap[model.provider];

        if (!provider) {
            emitter?.emit('provider_failed', {
                provider: model.provider,
                model: model.id,
                error: 'Provider not found',
                timedOut: false
            });

            return Promise.resolve({
                model: model.id,
                provider:
                model.provider,
                success: false,
                error:
                "Provider not found"
            });
        }

        // return withTimeout(provider(messages, model), 30000);

        return (async () => {

            try {
                emitter?.emit('provider_started',  {
                provider: model.provider,
                model: model.id
            });

            const result = await withTimeout(provider(messages, model), 30000);

            emitter?.emit('provider_completed',  result);

            // emitter?.emit('provider_completed',  {
            //     provider: model.provider,
            //     model: model.id,
            //     success: result.success
            // });

            return result;

            } catch (error) {
                emitter?.emit('provider_failed', {
                    provider: model.provider,
                    model: model.id,
                    error: error?.message ?? 'Request timed out',
                    timedOut: error?.timedOut ?? false
                });

                throw error;
            }
        })();

        // IIFE

    });

    const results = await Promise.allSettled(providerPromises);

    return results.map((result, index) => {
        if (result.status == "fulfilled") {
            return result.value;
        }

        const model = models[index];

        console.warn(`⏰ [${model.id}] Timed out`);

        return {
            model: model.id,
            provider: model.provider,
            timedOut: result.reason?.timedOut ?? false,
            success: false,
            erorr: result.reason?.message ?? "Unknown Error" 
        };
    });
}


export { orchestrateResponses };




