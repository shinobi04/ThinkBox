"use client";

import { Brain, User } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex gap-3 py-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#333]">
          <span className="text-[10px] font-medium text-white">Y</span>
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="mb-0.5 text-[10px] font-medium text-zinc-500">You</p>
          <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-start gap-3 rounded-2xl border border-white/10 bg-[#38383a] p-3 shadow-[0_8px_16px_rgba(0,0,0,0.4)] z-30 mb-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-purple-500/20">
        <Brain className="h-3.5 w-3.5 text-purple-400" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="mb-0.5 text-[10px] font-medium text-zinc-400">ThinkBox</p>
        <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
          {message.isStreaming && (
            <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-purple-400" />
          )}
        </div>
      </div>
    </div>
  );
}
