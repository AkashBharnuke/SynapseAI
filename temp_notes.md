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