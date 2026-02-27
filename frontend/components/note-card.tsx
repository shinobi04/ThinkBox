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
    <Card className="border-border/30 bg-background/50 transition-colors hover:border-border/60 hover:bg-background/80">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <StickyNote className="h-3.5 w-3.5 text-primary/70" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {preview || "No content"}
        </p>
      </CardContent>
    </Card>
  );
}
