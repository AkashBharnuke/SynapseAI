import { modelStates } from '../state/state.js';
import { renderModelCard } from '../components/modelCard.js';

const modelsSection = document.getElementById('modelsSection');

function renderModels() {
  modelsSection.innerHTML = Object.values(modelStates).map(renderModelCard).join('');

  // Apply syntax highlighting to all code blocks
  if (window.hljs) {
    modelsSection.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightElement(block);
      });
  }

}

export { renderModels };