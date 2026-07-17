import { modelStates } from '../state/state.js';
import { renderModelCard } from '../components/modelCard.js';

const modelsSection = document.getElementById('modelsSection');

function renderModels() {
  modelsSection.innerHTML = Object.values(modelStates).map(renderModelCard).join('');
}

export { renderModels };