import { synthesizeResponses } from '../services/judge.service.js';
import { orchestrateResponses } from '../services/orchestration.service.js'

const generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        const models = await orchestrateResponses(prompt);

        const consensus = await synthesizeResponses(prompt, models);

        // console.log("========== JUDGE ==========");

        // console.log(consensus.answer);


        return res.json({
            sucess: true,
            models,
            consensus
        });
    } catch(error) {
        console.error(error);
    }
}



export {
    generateResponse
};