# SynapseAI v1.1 — Technical Reference

## Overview

**SynapseAI** is a Self-Consistency Answer Engine that improves the quality of AI-generated responses by querying multiple Large Language Models (LLMs), collecting their independent answers, and synthesizing a final consensus using a dedicated judge model.

Rather than relying on a single model, SynapseAI follows the **Self-Consistency** reasoning technique to reduce hallucinations, improve factual consistency, and provide greater confidence in the final response.

---

# Project Type

**Application Type:** Web Application (UI-Based)

* **Frontend**

  * Vanilla JavaScript (ES Modules)
  * Tailwind CSS
  * Marked.js (Markdown Rendering)
  * Highlight.js (Syntax Highlighting)

* **Backend**

  * Node.js
  * Express.js

* **Communication**

  * Server-Sent Events (SSE) for real-time streaming

---

# Core Philosophy

Traditional AI chat applications produce a response from a single model.

SynapseAI instead asks multiple independent models the same question and combines their reasoning into a single higher-quality answer.

```
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

This architecture follows the Self-Consistency prompting strategy commonly used for improving reasoning quality.

---

# Current Providers

The current implementation uses three independent providers.

| Provider      | Model                |
| ------------- | -------------------- |
| OpenAI        | GPT-4.1 Mini         |
| OpenRouter    | DeepSeek-R1          |
| GitHub Models | Phi-4 Mini Reasoning |

Each provider is queried independently and in parallel.

---

# Current Architecture

```
Frontend
│
├── Prompt Input
├── SSE Listener
├── Model Cards
└── Consensus Card

        │
        ▼

Express Backend
│
├── Controller
├── Orchestrator
├── Provider Layer
├── Judge Layer
└── SSE Event Stream
```

---

# Request Flow

1. User enters a prompt.
2. Frontend opens an SSE connection.
3. Backend begins orchestration.
4. All providers execute in parallel.
5. Each provider streams status updates.
6. Completed responses are collected.
7. Judge model synthesizes a final consensus.
8. Final consensus is streamed to the UI.

---

# Self-Consistency Pipeline

## Step 1 — User Prompt

A single prompt is received.

```
Explain SDLC
```

---

## Step 2 — Parallel Execution

The prompt is simultaneously sent to all configured providers.

```
OpenAI
DeepSeek
Phi
```

Each provider works independently.

---

## Step 3 — Individual Responses

Each provider returns:

* Generated answer
* Latency
* Token usage
* Success/failure status

---

## Step 4 — Consensus Generation

After all providers complete, their responses are passed to a judge model.

The judge analyzes:

* Agreement between models
* Missing information
* Contradictions
* Overall confidence

The judge returns:

* Final synthesized answer
* Confidence score
* Agreement level
* Contributing models
* Reasoning behind the decision

---

# Streaming Architecture

SynapseAI uses **Server-Sent Events (SSE)** instead of waiting for all providers to complete.

Current event sequence:

```
provider_started

provider_completed

provider_failed

judge_started

consensus_completed

done
```

This enables the frontend to update progressively as work completes.

---

# Frontend Architecture

```
public/

app.js

js/
│
├── api/
│     └── chat.api.js
│
├── components/
│     ├── modelCard.js
│     └── consensusCard.js
│
├── state/
│     └── state.js
│
└── ui/
      ├── models.js
      ├── consensus.js
      └── loading.js
```

### Responsibilities

### chat.api.js

* Opens SSE connection
* Listens for backend events
* Updates application state
* Triggers UI rendering

---

### state.js

Stores application state.

```
Model States

Consensus State
```

---

### modelCard.js

Responsible for rendering:

* Model name
* Status
* Latency
* Token usage
* Markdown answer

---

### consensusCard.js

Responsible for rendering:

* Confidence
* Agreement level
* Contributing models
* Judge reasoning
* Final synthesized answer

---

# Markdown Rendering

LLM responses are rendered using:

* Marked.js
* Highlight.js

This provides:

* Markdown support
* Lists
* Tables
* Code blocks
* Syntax highlighting

---

# Current Generation Configuration

A shared generation configuration is used across all providers.

```
temperature

max_tokens
```

This ensures every provider generates responses under comparable conditions.

---

# Current Features

* Multi-model orchestration
* Parallel provider execution
* Self-consistency synthesis
* Real-time SSE streaming
* Live model status updates
* Provider latency reporting
* Token usage reporting
* Markdown rendering
* Syntax highlighting
* Responsive card-based UI

---

# Future Roadmap

## v1.2

* Conversation history
* Session management
* Streaming markdown rendering
* Copy response functionality
* Better loading animations
* Advanced generation settings
* Prompt templates

---

## v1.3

* Langfuse Observability
* Prompt versioning
* Cost tracking
* Request tracing
* Analytics dashboard

---

## v1.4

* Additional providers

  * Claude
  * Gemini
  * Grok
  * Local LLMs (Ollama)

* Pluggable provider architecture

---

# Design Goals

* Provider-agnostic architecture
* Modular orchestration
* Extensible provider layer
* Clean UI updates via SSE
* Consistent generation configuration
* Production-oriented project structure

---

# Current Status

**Version:** v1.1

### Completed

* Multi-provider orchestration
* Self-consistency workflow
* Judge synthesis
* SSE streaming
* Real-time UI updates
* Markdown rendering
* Syntax highlighting
* Shared LLM generation configuration

The current implementation serves as the foundation for a production-grade AI answer synthesis platform that can be extended with observability, additional providers, evaluation pipelines, and advanced orchestration strategies.
