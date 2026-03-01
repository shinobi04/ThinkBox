"use client";

import { Brain, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
      <div className="flex gap-4 py-4 px-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-sm border border-white/5">
          <User className="h-4 w-4 text-zinc-300" />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <p className="mb-1 text-xs font-medium text-zinc-500">You</p>
          <div className="text-[15px] text-zinc-200 leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-start gap-4 rounded-3xl border border-white/[0.08] bg-[#1a1a1c]/80 backdrop-blur-xl px-5 py-5 shadow-2xl mb-6">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/10">
        <Brain className="h-4 w-4 text-purple-400" />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <p className="mb-1 text-xs font-semibold text-purple-300/80 tracking-wide uppercase">
          ThinkBox
        </p>
        <div className="text-[15px] text-zinc-300 leading-relaxed whitespace-pre-wrap break-words prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:my-3 prose-pre:rounded-xl prose-p:my-2 prose-headings:my-4 prose-headings:font-semibold prose-headings:text-white prose-ul:my-2 prose-ul:pl-5 prose-li:my-0.5 prose-li:marker:text-zinc-600 prose-strong:text-white prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-white/10 prose-code:text-purple-300 prose-code:font-mono prose-code:text-[13.5px] prose-code:before:content-none prose-code:after:content-none prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown>{message.content}</ReactMarkdown>
          {message.isStreaming && (
            <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-purple-400 rounded-full align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}
