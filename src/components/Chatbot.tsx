"use client";

import Image from "next/image";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";
import { CHAT_API_URL } from "@/lib/chat-api";

const recommendations = [
  "Tell me about Linn's skills",
  "What projects has Linn built?",
  "What is Linn like outside coding?",
];

type Message = { role: "assistant" | "user"; content: string };

const UNAVAILABLE =
  "Linn's assistant is unavailable right now. Please try again in a moment.";

function parseChatError(text: string, contentType: string) {
  const looksLikeJson =
    contentType.includes("application/json") || text.trim().startsWith("{");
  if (looksLikeJson) {
    try {
      const data = JSON.parse(text) as { error?: string };
      if (typeof data.error === "string") return data.error;
    } catch {
      // Fall through to the plain-text error body.
    }
  }
  return text.trim() || UNAVAILABLE;
}

async function requestChat(message: string, onChunk: (chunk: string) => void) {
  if (!CHAT_API_URL) throw new Error("Chat assistant is not configured yet.");
  const response = await fetch(`${CHAT_API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal: AbortSignal.timeout(28000),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      parseChatError(text, response.headers.get("content-type") ?? ""),
    );
  }

  if (!response.body) throw new Error(UNAVAILABLE);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) onChunk(chunk);
    }
    const finalChunk = decoder.decode();
    if (finalChunk) onChunk(finalChunk);
  } finally {
    reader.releaseLock();
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi, I'm Linn's personal assistant. What would you like to know?" },
  ]);

  const sendMessage = async (message = input) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) return;

    setInput("");
    setMessages((current) => [
      ...current,
      { role: "user", content: trimmedMessage },
      { role: "assistant", content: "" },
    ]);
    setIsLoading(true);

    try {
      let receivedText = "";
      await requestChat(trimmedMessage, (chunk) => {
        receivedText += chunk;
        setMessages((current) => {
          const lastMessage = current[current.length - 1];
          if (lastMessage?.role !== "assistant") return current;
          return [
            ...current.slice(0, -1),
            { ...lastMessage, content: lastMessage.content + chunk },
          ];
        });
      });
      if (!receivedText) throw new Error(UNAVAILABLE);
    } catch (error) {
      const messageText =
        error instanceof Error &&
        error.message &&
        !error.message.includes("Failed to fetch") &&
        !error.message.includes("Unexpected token") &&
        !error.message.toLowerCase().includes("timeout") &&
        error.name !== "TimeoutError" &&
        error.name !== "AbortError"
          ? error.message
          : UNAVAILABLE;
      setMessages((current) => {
        const lastMessage = current[current.length - 1];
        if (lastMessage?.role !== "assistant") {
          return [...current, { role: "assistant", content: messageText }];
        }
        return [
          ...current.slice(0, -1),
          {
            ...lastMessage,
            content: lastMessage.content
              ? `${lastMessage.content}\n\n${messageText}`
              : messageText,
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-8 sm:right-8">
      {isOpen && (
        <section className="mb-4 flex h-[min(620px,calc(100vh-110px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-primary/15 bg-white/95 shadow-2xl backdrop-blur-xl" aria-label="Chat with Linn's assistant">
          <header className="flex items-center justify-between bg-gradient-to-r from-primary to-accent px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/70">
                <Image src="/images/linnmyatmaung.png" alt="Linn Myat Maung" fill className="object-cover" sizes="44px" />
              </div>
              <div><p className="font-semibold">Ask Linn</p><p className="text-xs text-white/75">Personal portfolio assistant</p></div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-full p-2 hover:bg-white/15"><X className="h-5 w-5" /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-secondary/45 p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "rounded-br-sm bg-primary text-white" : "rounded-bl-sm border border-primary/10 bg-white text-foreground shadow-sm"}`}>
                  {message.role === "assistant" && isLoading && index === messages.length - 1 && !message.content ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" aria-label="Generating reply" />
                  ) : message.content}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-primary/10 bg-white p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {recommendations.map((recommendation) => <button key={recommendation} onClick={() => sendMessage(recommendation)} disabled={isLoading} className="shrink-0 rounded-full border border-primary/20 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/10 disabled:opacity-50">{recommendation}</button>)}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); void sendMessage(); }} className="flex gap-2">
              <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Linn..." aria-label="Message" className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary" disabled={isLoading} />
              <button type="submit" aria-label="Send message" disabled={isLoading || !input.trim()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90 disabled:opacity-50"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </section>
      )}

      <button onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close chat" : "Open chat with Linn's assistant"} className="relative ml-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary text-white shadow-glow transition-transform hover:scale-105">
        {isOpen ? <X className="h-6 w-6" /> : <><Image src="/images/linnmyatmaung.png" alt="" fill className="rounded-full object-cover" sizes="56px" /></>}
      </button>
    </div>
  );
}