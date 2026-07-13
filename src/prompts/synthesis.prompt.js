import { response } from "express"

const buildSynthesisPrompt  = (question, responses) => {
    const successfulResponses = responses.filter((response) => response.success);

    const formattedResponse = successfulResponses.map((response, index) => `
    Model: --- ${response.model} ---

    Response:
    ${response.answer}
    `).join("\n======================\n");

    return `
    User Question:
    ${question}

    Model Respnses:
    ${formattedResponse}

    Your task:

    1. Compare the responses.
    2. Identify agreements and disagreemenst.
    3. Determine the strongest reasoning.
    4. Create a single approved answer.
    5. Assign a confidence score from 0-100.
    6. Explain why the final answer was selected.

    Return ONLY Valid JSON in this format:

    {
        "confidence": number,
        "reasoning": [
            "string"
        ],
        "finalAnswer": string"
    }
    `;
}


export { buildSynthesisPrompt }