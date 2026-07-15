import { askSynapse } from './js/api/chat.api.js';


const promptInput = document.getElementById("promptInput");

const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();
    
    if(!prompt) {
        return;
    }

    try {
        const data = await askSynapse(prompt);
        console.log(data);
    } catch (error) {
        console.error("API Error: ", error);
    }
  }
);