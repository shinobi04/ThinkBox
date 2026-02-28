"use client";

import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, type Message } from "./chat-message";
import { Brain, Sparkles } from "lucide-react";

interface ChatAreaProps {
  messages: Message[];
}

export function ChatArea({ messages }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">
            Ask your notes anything
          </h2>
          <p className="mt-1 max-w-sm text-sm text-zinc-400">
            Your AI assistant searches through your saved notes to give you
            accurate, contextual answers.
          </p>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            "Summarize my recent notes",
            "What did I write about React?",
            "Find my project ideas",
          ].map((suggestion) => (
            <div
              key={suggestion}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1c1c1c] px-3 py-1.5 text-xs text-zinc-400 shadow-sm transition-colors hover:text-white hover:bg-white/5 cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-purple-400" />
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto max-w-2xl space-y-1 px-4 py-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
