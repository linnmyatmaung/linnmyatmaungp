export const CHAT_API_URL = (
  process.env.NEXT_PUBLIC_CHAT_API_URL ||
  "https://generative-ai-chatbot-v8pg.onrender.com"
).replace(/\/+$/, "");
