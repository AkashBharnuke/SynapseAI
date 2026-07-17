const renderConsensusCard = (consensus) => {
  const data = consensus?.consensus;

  if (!data) {
    return '';
  }

  return `
    <div
      class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">
          🧠 SynapseAI Consensus
        </h2>

        <span
          class="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-sm"
        >
          Confidence:
          ${data.confidence}%
        </span>
      </div>

      <div class="mb-4">
        <p class="text-slate-400 text-sm mb-1">
          Agreement Level
        </p>

        <span
          class="px-3 py-1 rounded-lg bg-slate-800"
        >
          ${data.agreementLevel}
        </span>
      </div>

      <div class="mb-6">
        <p class="text-slate-400 text-sm mb-2">
          Contributing Models
        </p>

        <div class="flex flex-wrap gap-2">
          ${(data.contributingModels ?? []).map(
              (model) => `
                <span
                  class="bg-slate-800 px-3 py-1 rounded-lg text-sm"
                >
                  ${model}
                </span>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="mb-6">
        <p class="text-slate-400 text-sm mb-2">
          Why this answer?
        </p>

        <ul
          class="space-y-2 list-disc list-inside text-slate-300"
        >
          ${(data.reasoning ?? []).map((item) =>
                `<li>${item}</li>`
            )
            .join("")}
        </ul>
      </div>

      <div>
        <p class="text-slate-400 text-sm mb-2">
          Final Answer
        </p>

        <div
          class="bg-slate-950 rounded-2xl p-5 leading-7 text-slate-200 whitespace-pre-wrap"
        >
          ${marked.parse(data.finalAnswer)}
        </div>
      </div>
    </div>
  `;
};

export { renderConsensusCard };