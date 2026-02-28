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
    <div className="border-t border-white/10 bg-[#1c1c1c]/50 p-4 backdrop-blur-md relative z-20">
      <div className="mx-auto flex max-w-2xl items-end gap-2">
        <div className="relative flex-1 rounded-xl border border-white/10 bg-black/20 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20 shadow-inner">
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your notes anything..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-transparent px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 outline-none disabled:opacity-50 transition-all"
          />
          <Button
            id="chat-send"
            size="icon"
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className="absolute bottom-1.5 right-1.5 h-7 w-7 rounded-lg bg-white/10 text-white hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-white/10 disabled:hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="mx-auto mt-2 max-w-2xl text-center text-[10px] text-zinc-500 font-medium">
        ThinkBox searches your notes and generates answers using AI
      </p>
    </div>
  );
}
