import { SYSTEM_PROMPT } from "../prompts/system.prompt.js"; 


const buildMessages = (prompt) => [
    {
      role: "system",
      content: SYSTEM_PROMPT
    },
    {
      role: "user",
      content: prompt
    }
  ];

export { buildMessages };  