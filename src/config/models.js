const MODELS = [
    {
        id: 'openai/gpt-4.1-mini',
        provider: 'openai',
        enabled: true,
        judge: false
    },
    {
        id: 'deepseek/DeepSeek-R1',
        provider: 'deepseek',
        enabled: true,
        judge: false
    },
    {
        id: 'microsoft/Phi-4-mini-reasoning',
        provider: 'phi',
        enabled: true,
        judge: false
    },
    {
        id: 'openai/gpt-4o',
        provider: 'openai',
        enabled: true,
        judge: true
    }
]




export { MODELS };