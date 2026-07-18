# 🧠 SynapseAI

<div align="center">

### **Multiple Minds. One Answer.**

*A Self-Consistency AI Engine that orchestrates multiple LLMs to generate higher-quality answers through consensus.*

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-5-black?logo=express)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![SSE](https://img.shields.io/badge/Streaming-SSE-orange)

</div>

---

## 📖 Overview

Most AI applications rely on a **single language model** to answer a user's question.

SynapseAI explores a different approach.

It asks multiple independent LLMs the same question, collects their responses, and synthesizes a final answer using a dedicated **Judge Model**.

This follows the **Self-Consistency** reasoning technique, helping improve response quality, reduce hallucinations, and provide greater confidence in the final output.

---

## ✨ Features

- 🚀 Multi-model orchestration
- ⚡ Parallel execution
- 🧠 Self-Consistency answer synthesis
- 🤖 Dedicated Judge Model
- 📡 Real-time streaming using Server-Sent Events (SSE)
- 📊 Live model status updates
- ⏱️ Latency reporting
- 🎟️ Token usage reporting
- 📝 Markdown rendering
- 💻 Syntax highlighted code blocks
- 📱 Responsive UI

---

## 🏗️ Architecture

```text
                    User Prompt
                         │
                         ▼
                Parallel Model Calls
         ┌─────────┬─────────┬─────────┐
         ▼         ▼         ▼
      OpenAI   DeepSeek      Phi
         │         │         │
         └─────────┴─────────┘
                 Individual Answers
                         │
                         ▼
                Judge / Consensus Model
                         │
                         ▼
              Final Synthesized Response
```

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | Vanilla JavaScript |
| Styling | Tailwind CSS |
| Backend | Express.js |
| Runtime | Node.js |
| Streaming | Server-Sent Events (SSE) |
| Markdown | Marked.js |
| Syntax Highlighting | Highlight.js |

---

## 🤖 AI Models

| Role | Model |
|------|-------|
| Provider | GPT-4.1 Mini |
| Provider | DeepSeek-R1 |
| Provider | Phi-4 Mini Reasoning |
| Judge | GPT-4o |

---

## ⚙️ How It Works

1. User submits a prompt.
2. SynapseAI sends the prompt to multiple LLMs in parallel.
3. Each provider independently generates a response.
4. Responses are streamed to the frontend in real time.
5. The Judge Model analyzes all responses.
6. A synthesized consensus is generated and displayed.

---

## 📂 Project Structure

```text
public/
│
├── js/
│   ├── api/
│   ├── components/
│   ├── state/
│   └── ui/
│
src/
│
├── controllers/
├── providers/
├── services/
├── routes/
├── middleware/
├── prompts/
├── config/
└── utils/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/synapse-ai.git

cd synapse-ai
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

```env
OPENAI_API_KEY=
GITHUB_TOKEN=
OPENROUTER_API_KEY=
```

### Start the application

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## 🐳 Deployment

SynapseAI is designed to be deployed using:

- Docker
- Docker Compose
- Nginx Reverse Proxy
- SSL via Certbot

Detailed deployment instructions are available in the `/docs` directory.

---

## 🛣️ Roadmap

### v1.2

- Conversation history
- Prompt templates
- Copy responses
- Better loading animations

### v1.3

- Langfuse integration
- Prompt versioning
- Cost tracking
- Analytics dashboard

### v1.4

- Claude
- Gemini
- Grok
- Ollama
- Pluggable provider architecture

---

## 📸 Screenshots

> *(Add screenshots or a demo GIF here after deployment.)*

---

## 📝 Technical Documentation

A detailed technical reference covering the architecture, orchestration flow, and implementation decisions is available in:

```text
docs/
└── SynapseAI-v1.1-Technical-Reference.md
```

---

## 💡 Why SynapseAI?

SynapseAI is an exploration of **AI orchestration** rather than simple AI integration.

Instead of trusting a single model, it demonstrates how multiple specialized LLMs can collaborate to produce stronger, more reliable answers through consensus.

The project also serves as a foundation for future experimentation with evaluation pipelines, observability, provider benchmarking, and advanced orchestration strategies.

---

<div align="center">

**Built with ❤️ using Node.js, Express, and Multiple LLMs**

*"Multiple Minds. One Answer."*

</div>