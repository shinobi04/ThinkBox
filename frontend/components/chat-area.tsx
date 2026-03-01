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
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] ring-1 ring-white/5 backdrop-blur-xl mb-2">
          <Brain className="h-10 w-10 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        </div>

        <div className="text-center relative z-10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
            Ask your notes anything
          </h2>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-400">
            Your AI assistant searches through your saved notes to give you
            accurate, contextual answers.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 relative z-10">
          {[
            "Summarize my recent notes",
            "What did I write about React?",
            "Find my project ideas",
          ].map((suggestion) => (
            <div
              key={suggestion}
              className="group flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-zinc-400 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-zinc-200 hover:bg-white/[0.06] hover:border-white/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400/70 transition-colors group-hover:text-purple-400" />
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="mx-auto max-w-2xl space-y-1 px-4 pt-6 pb-48">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
