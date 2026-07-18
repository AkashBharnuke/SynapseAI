const renderModelCard = (model) => {
  let status = "⚪ Waiting";

  switch (model.streamStatus) {
    case "thinking":
      status = "🟡 Thinking...";
      break;

    case "completed":
      status = "🟢 Success";
      break;

    case "failed":
      status = model.timedOut
        ? "⏰ Timed Out"
        : "❌ Failed";
      break;
  }

  const totalTokens = model.usage?.total ?? 0;

  return `
    <div
      class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col"
    >
      <div class="mb-4">
        <h3 class="font-semibold text-lg break-words">
          🤖 ${model.model}
        </h3>

        <p class="text-sm text-slate-400 mt-2">
          ${status}
        </p>
      </div>

      ${
        model.streamStatus === "idle"
          ? `
            <div class="text-slate-500">
              Waiting for model...
            </div>
          `
          : model.streamStatus === "thinking"
          ? `
            <div class="animate-pulse text-slate-400">
              Model is thinking...
            </div>
          `
          : model.success
          ? `
            <div class="flex gap-4 text-sm text-slate-400 mb-4">
              <span>
                ⏱️ ${model.latency ?? 0}ms
              </span>

              <span>
                🎟️ ${totalTokens} tokens
              </span>
            </div>

            <div class="mt-4 border-t border-slate-800 pt-4">
              <div class="prose prose-sm prose-invert max-w-none leading-8 prose-p:my-4 prose-li:my-2 prose-pre:my-6 prose-headings:mb-4 prose-headings:mt-8">
                  ${marked.parse(model.answer ?? "")}
              </div>
          </div>
          `
          : `
            <div class="text-red-400">
              ${model.error ?? "Request failed"}
            </div>
          `
      }
    </div>
  `;
};

export { renderModelCard };