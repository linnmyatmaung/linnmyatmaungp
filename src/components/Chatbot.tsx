"use client";

import Image from "next/image";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

const recommendations = [
  "Tell me about Linn's skills",
  "What projects has Linn built?",
  "What is Linn like outside coding?",
];

type Message = { role: "assistant" | "user"; content: string };

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
    setMessages((current) => [...current, { role: "user", content: trimmedMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: error instanceof Error ? error.message : "Something went wrong." },
      ]);
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
                <p className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "rounded-br-sm bg-primary text-white" : "rounded-bl-sm border border-primary/10 bg-white text-foreground shadow-sm"}`}>{message.content}</p>
              </div>
            ))}
            {isLoading && <div className="flex justify-start"><div className="rounded-2xl rounded-bl-sm border border-primary/10 bg-white px-4 py-3"><Loader2 className="h-4 w-4 animate-spin text-primary" /></div></div>}
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