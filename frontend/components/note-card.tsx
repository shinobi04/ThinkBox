"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, Trash2, X, Check, Loader2 } from "lucide-react";

interface NoteCardProps {
  title: string;
  content: string;
  onClick?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export function NoteCard({
  title,
  content,
  onClick,
  onDelete,
  isDeleting,
}: NoteCardProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Strip HTML tags for preview
  const plainText = content.replace(/<[^>]*>/g, "").trim();
  const preview =
    plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;

  return (
    <Card
      onClick={onClick}
      className="border-white/5 bg-black/20 transition-all hover:border-white/20 hover:bg-black/40 cursor-pointer shadow-inner relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="pb-2 relative z-10 flex flex-row items-start justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-white">
          <StickyNote className="h-3.5 w-3.5 text-purple-400" />
          {title}
        </CardTitle>
        {onDelete && (
          <div className="flex items-center gap-2">
            {isDeleting ? (
              <div className="flex items-center gap-2 z-20">
                <Loader2 className="h-4 w-4 animate-spin text-red-400" />
                <span className="text-xs font-medium text-red-400/80 animate-pulse">
                  Deleting...
                </span>
              </div>
            ) : isConfirmingDelete ? (
              <div className="flex items-center gap-1 bg-red-500/10 rounded-full px-2 py-1 z-20 animate-in fade-in slide-in-from-right-2 duration-200">
                <span className="text-[10px] uppercase font-bold text-red-400 mr-1 tracking-wider">
                  Sure?
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                    setIsConfirmingDelete(false);
                  }}
                  disabled={isDeleting}
                  className="h-5 w-5 rounded-full flex items-center justify-center bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                >
                  <Check className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsConfirmingDelete(false);
                  }}
                  disabled={isDeleting}
                  className="h-5 w-5 rounded-full flex items-center justify-center bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsConfirmingDelete(true);
                }}
                disabled={isDeleting}
                className="text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50 z-20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent
        className="relative z-10 transition-opacity duration-300"
        style={{ opacity: isDeleting ? 0.5 : 1 }}
      >
        <p className="text-xs leading-relaxed text-zinc-400">
          {preview || "No content"}
        </p>
      </CardContent>
    </Card>
  );
}
