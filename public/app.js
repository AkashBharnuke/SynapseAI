import { streamChat } from './js/api/chat.api.js';

import { showLoading } from './js/ui/loading.js';

const promptInput = document.getElementById('promptInput');

const analyzeBtn = document.getElementById('analyzeBtn');

analyzeBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();

    if (!prompt) {
      return;
    }

    try {
      showLoading();

      await streamChat(prompt);
    } catch (error) {
      console.error('Streaming Error:', error);
    }
  }
);