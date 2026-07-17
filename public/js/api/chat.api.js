import { consensusState, modelStates } from "../state/state.js";
import { renderModels } from "../ui/models.js";
import { renderConsensus } from "../ui/consensus.js";
import { hideLoading } from '../ui/loading.js'

const URL = "/api/v1/chat/stream";
const HEADERS = {
    "Content-Type": "application/json"
}


// const askSynapse = async (prompt) => {
//     const response = await fetch(URL, 
//         { 
//             method: "POST", 
//             headers: HEADERS, 
//             body: JSON.stringify({ prompt })
//         });

//     const data = await response.json();
    
//     return data;
// }

const streamChat = async (prompt) => {
    
    initializeModelStates();
    renderModels();
    
    const source = new EventSource(
        `${URL}?prompt=${encodeURIComponent(prompt)}`
    );

    

    source.addEventListener('provider_started', 
        (event) => {
            const data = JSON.parse(event.data);

            modelStates[data.provider] = {
                model: data.model,
                provider: data.provider,
                streamStatus: 'thinking'
            };

            // console.log(modelStates);
            renderModels();
        }
    );

    source.addEventListener('provider_completed', 
        (event) => {
            const data = JSON.parse(event.data);
            
            modelStates[data.provider] = {
                ...data,
                streamStatus: 'completed'
            };


            // console.log(modelStates);
            renderModels();
        }
    );

    source.addEventListener('provider_failed', 
        (event) => {
            const data = JSON.parse(event.data);

            modelStates[data.provider] = {
                ...modelStates[data.provider],
                error: data.error,
                timedOut: data.timedOut,
                streamStatus: 'failed'
            };

            // console.log(modelStates);
            renderModels();
        }
    );


    source.addEventListener(
        'judge_started',
        () => {
            // console.log('Judge is synthesizing...');
        }
    );


    source.addEventListener('consensus_completed', 
        (event) => {
            const data = JSON.parse(event.data);
            // console.log('CONSENSUS', data);

            consensusState.data = data;

            renderConsensus(consensusState.data);
        }
    );

    

    source.addEventListener('done', 
        () => {
            // console.log('All MODELS DONE');
            hideLoading();
            source.close();
        }
    );


    source.onerror = (error) => {
        console.error(error);
        source.close();
    }
}

function initializeModelStates() {
  Object.keys(modelStates).forEach(
    key => delete modelStates[key]
  );

  modelStates.openai = {
    model: 'openai/gpt-4.1-mini',
    provider: 'openai',
    streamStatus: 'idle'
  };

  modelStates.deepseek = {
    model: 'deepseek/DeepSeek-R1',
    provider: 'deepseek',
    streamStatus: 'idle'
  };

  modelStates.phi = {
    model: 'microsoft/Phi-4-mini-reasoning',
    provider: 'phi',
    streamStatus: 'idle'
  };
}

export { streamChat };