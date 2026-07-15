import { askSynapse } from './js/api/chat.api.js';

import { renderConsensusCard } from './js/components/consensusCard.js';
import { renderModelCard } from './js/components/modelCard.js';

const promptInput = document.getElementById("promptInput");

const loadingSection = document.getElementById("loadingSection");

const consensusSection = document.getElementById("consensusSection");

const modelsSection = document.getElementById("modelsSection");

const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();
    
    if(!prompt) {
        return;
    }

    try {
        showLoading();

        const data = await askSynapse(prompt);

        if(data.consensus?.success) {
            consensusSection.innerHTML = renderConsensusCard(data.consensus);
            consensusSection.classList.remove("hidden");
        }

        modelsSection.innerHTML = data.models.map(renderModelCard).join("");

        // console.log(data);
    } catch (error) {
        console.error("API Error: ", error);
    } finally {
        hideLoading();
    }
  }
);


/**** Helper Functions */
function showLoading() {
  loadingSection.classList.remove("hidden");

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = "Analyzing...";
}

function hideLoading() {
  loadingSection.classList.add("hidden");

  analyzeBtn.disabled = false;
  analyzeBtn.textContent = "Analyze";
}