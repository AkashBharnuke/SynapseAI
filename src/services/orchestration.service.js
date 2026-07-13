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

const orchestrateResponses = async(prompt) => {
    const models = getEnabledModels() ?? [];

    // console.log(`MODELS: ${models}`);

    const messages = buildMessages(prompt);

    const promises = models.map((model) => {

        const provider = providerMap[model.provider];

        if (!provider) {
            return Promise.resolve({
                model: model.id,
                provider:
                model.provider,
                success: false,
                error:
                "Provider not found"
            });
        }

        return withTimeout(provider(messages, model), 30000);
    });

    const results = await Promise.allSettled(promises);

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




