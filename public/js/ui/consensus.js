import { renderConsensusCard }
  from '../components/consensusCard.js';

const consensusSection = document.getElementById('consensusSection');

function renderConsensus(consensus) {


  if (!consensus) {
    consensusSection.classList.add('hidden');
    consensusSection.innerHTML = '';

    return;
  }
  // console.log('Rendering consensus');

  consensusSection.innerHTML = renderConsensusCard(consensus);

  // Apply syntax highlighting to all code blocks
  if (window.hljs) {
    consensusSection.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightElement(block);
      });
  }

  consensusSection.classList.remove('hidden');
}

export { renderConsensus };