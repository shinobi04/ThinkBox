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
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">Ask your notes anything</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
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
              className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground"
            >
              <Sparkles className="h-3 w-3" />
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
