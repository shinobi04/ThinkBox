"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="absolute bottom-0 w-full z-40 pb-8 pt-12 px-4 bg-gradient-to-t from-[#111111] via-[#111111] to-transparent pointer-events-none">
      <div className="mx-auto max-w-2xl pointer-events-auto">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1c1c1f]/80 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/30 transition-all duration-300">
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your notes anything..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-transparent px-6 py-4 pr-16 text-[15px] text-zinc-200 placeholder:text-zinc-500 outline-none disabled:opacity-50 transition-all leading-[24px] min-h-[56px] no-scrollbar"
          />
          <div className="absolute right-2 bottom-2 flex items-center justify-center">
            <Button
              id="chat-send"
              size="icon"
              onClick={handleSubmit}
              disabled={!input.trim() || disabled}
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-30 disabled:bg-white/5 disabled:text-zinc-500 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-zinc-500 font-medium tracking-wide">
          ThinkBox searches your notes and generates answers using AI.
        </p>
      </div>
    </div>
  );
}
