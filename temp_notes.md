res shape:

{
  model: "gpt-4.1-mini",
  provider: "openai",
  success: true,
  answer: "...",
  latency: 1234,
  usage: {
    input: 120,
    output: 350,
    total: 470
  }
}



err shape:

{
  model: "gpt-4.1-mini",
  provider: "openai",
  success: false,
  error: "Rate limit exceeded"
}



====

## Proposed Events

connected

provider_started
provider_completed
provider_failed

judge_started
judge_completed

consensus_completed

done

---

E>G>

event: provider_started
data: {"provider":"gpt-4.1-mini"}

event: provider_completed
data: {"provider":"gpt-4.1-mini"}

event: judge_started
data: {}

event: consensus_completed
data: {...}

event: done
data: {}

---

