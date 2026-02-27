"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteCard } from "./note-card";
import { CreateNoteModal } from "./create-note-modal";
import { fetchNotes } from "@/lib/api";
import { Plus, Loader2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
}

interface NotesDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function NotesDrawer({ open, onClose }: NotesDrawerProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      setNotes(data || []);
    } catch (err) {
      console.error("Failed to load notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadNotes();
    }
  }, [open]);

  const handleNoteCreated = () => {
    setCreateOpen(false);
    loadNotes();
  };

  return (
    <>
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent className="flex w-[380px] flex-col gap-0 border-border/30 bg-card/95 p-0 backdrop-blur-md sm:max-w-[380px]">
          <SheetHeader className="border-b border-border/30 px-5 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">Notes</SheetTitle>
              <Button
                id="new-note-btn"
                size="sm"
                onClick={() => setCreateOpen(true)}
                className="h-8 gap-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                New Note
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4 py-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-muted-foreground">No notes yet</p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  Create your first note to start asking questions
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    content={note.content}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <CreateNoteModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleNoteCreated}
      />
    </>
  );
}
