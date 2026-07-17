import { synthesizeResponses } from '../services/judge.service.js';
import { orchestrateResponses } from '../orchestration/orchestration.service.js'
import { sendEvent, closeStream } from '../streaming/sse.manager.js';

import EventEmitter from 'events';


const generateResponse = async (req, res) => {
    try {
        // const { prompt } = req.body;
        const { prompt } = req.query;

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const emitter = new EventEmitter();

        emitter.on('provider_started', (data) =>
            sendEvent(res, 'provider_started', data)
        );

        emitter.on('provider_completed', (data) =>
            sendEvent(res, 'provider_completed', data)
        );

        emitter.on('provider_failed', (data) =>
            sendEvent(res, 'provider_failed', data)
        );

        const models = await orchestrateResponses(
            prompt,
            emitter
        );

        sendEvent(res, 'judge_started');

        // const models = await orchestrateResponses(prompt);

        const consensus = await synthesizeResponses(prompt, models);

        sendEvent(res, 'consensus_completed', consensus);

        // console.log("========== JUDGE ==========");

        // console.log(consensus.answer);


        // return res.json({
        //     sucess: true,
        //     models,
        //     consensus
        // });

        sendEvent(res, 'done');

        res.end();

    } catch(error) {
        console.error(error);

        console.error('STREAM ERROR:', error);

        sendEvent(res, 'error', {
            message: error.message
        });

        res.end();
    }
}



export {
    generateResponse
};