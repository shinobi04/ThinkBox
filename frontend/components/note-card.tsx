"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

interface NoteCardProps {
  title: string;
  content: string;
}

export function NoteCard({ title, content }: NoteCardProps) {
  // Strip HTML tags for preview
  const plainText = content.replace(/<[^>]*>/g, "").trim();
  const preview =
    plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;

  return (
    <Card className="border-white/5 bg-black/20 transition-all hover:border-white/20 hover:bg-black/40 cursor-pointer shadow-inner relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-white">
          <StickyNote className="h-3.5 w-3.5 text-purple-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-xs leading-relaxed text-zinc-400">
          {preview || "No content"}
        </p>
      </CardContent>
    </Card>
  );
}
