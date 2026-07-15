const renderModelCard = (model) => {
  const status = model.success ? "🟢 Success" : model.timedOut ? "⏰ Timed Out" : "❌ Failed";

  const totalTokens = model.usage?.total ?? 0;

  return `
    <div
      class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full"
    >
      <div class="mb-4">
        <h3
          class="font-semibold text-lg break-words"
        >
          🤖 ${model.model}
        </h3>

        <p
          class="text-sm text-slate-400 mt-2"
        >
          ${status}
        </p>
      </div>

      ${
        model.success
          ? `
          <div class="flex gap-4 text-sm text-slate-400 mb-4">
            <span>
              ⏱️(Latency) ${model.latency}ms
            </span>

            <span>
              🎟️ (Total Tokens) ${totalTokens}
            </span>
          </div>

          <div
            class="text-slate-300 whitespace-pre-wrap text-sm leading-7"
          >
            ${model.answer}
          </div>
          `
          : `
          <div
            class="text-red-400"
          >
            ${model.error}
          </div>
          `
      }
    </div>
  `;
};

export { renderModelCard };