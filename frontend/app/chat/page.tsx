"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { searchNotes } from "@/lib/api";
import { Navbar } from "@/components/navbar";
import { ChatArea } from "@/components/chat-area";
import { ChatInput } from "@/components/chat-input";
import { NotesDrawer } from "@/components/notes-drawer";
import type { Message } from "@/components/chat-message";

export default function ChatPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  const handleSend = useCallback(
    async (query: string) => {
      if (isSearching) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: query,
      };

      // Add empty assistant message that will be streamed into
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsSearching(true);

      try {
        await searchNotes(
          query,
          (chunk) => {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last && last.role === "assistant") {
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + chunk,
                };
              }
              return updated;
            });
          },
          () => {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last && last.role === "assistant") {
                updated[updated.length - 1] = {
                  ...last,
                  isStreaming: false,
                };
              }
              return updated;
            });
            setIsSearching(false);
          },
        );
      } catch (error) {
        console.error("Search error:", error);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content:
                "Sorry, I couldn't search your notes right now. Please make sure you have notes saved and try again.",
              isStreaming: false,
            };
          }
          return updated;
        });
        setIsSearching(false);
      }
    },
    [isSearching],
  );

  if (isPending) {
    return (
      <main className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    );
  }

  if (!session) return null;

  return (
    <div className="flex h-screen flex-col bg-[#111111] text-white selection:bg-white/10 relative overflow-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 flex h-full flex-col">
        <Navbar onToggleNotes={() => setNotesOpen(true)} />

        <div className="relative flex-1 min-h-0 flex flex-col">
          <ChatArea messages={messages} />

          <ChatInput onSend={handleSend} disabled={isSearching} />
        </div>
      </div>

      <NotesDrawer open={notesOpen} onClose={() => setNotesOpen(false)} />
    </div>
  );
}
