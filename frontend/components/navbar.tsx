"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Brain, StickyNote, LogOut } from "lucide-react";

interface NavbarProps {
  onToggleNotes: () => void;
}

export function Navbar({ onToggleNotes }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#1a1a1a]/80 px-4 backdrop-blur-md relative z-20">
      <div className="flex items-center gap-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <Brain className="h-3.5 w-3.5 text-white" />
        </div>
        <h1 className="text-base font-semibold tracking-tight text-white">
          ThinkBox
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleNotes}
          className="gap-2 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <StickyNote className="h-4 w-4" />
          <span className="hidden sm:inline">Notes</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2 text-zinc-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
