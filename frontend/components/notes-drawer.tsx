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
import { NoteViewModal } from "./note-view-modal";
import { fetchNotes, deleteNote } from "@/lib/api";
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
  const [hasLoaded, setHasLoaded] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const loadNotes = async () => {
    if (!hasLoaded) {
      setLoading(true);
    }
    try {
      const data = await fetchNotes();
      setNotes(data || []);
      setHasLoaded(true);
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

  const handleDeleteNote = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
      alert("Failed to delete note.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent className="flex w-[380px] flex-col gap-0 border-l border-white/10 bg-[#1c1c1c]/95 p-0 backdrop-blur-xl sm:max-w-[380px] text-white">
          <SheetHeader className="border-b border-white/10 px-5 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base text-white">Notes</SheetTitle>
              <Button
                id="new-note-btn"
                size="sm"
                onClick={() => setCreateOpen(true)}
                className="h-8 gap-1.5 text-xs bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                New Note
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
              </div>
            ) : notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-zinc-400">No notes yet</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Create your first note to start asking questions
                </p>
              </div>
            ) : (
              <div className="space-y-3 pb-8">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    onClick={() => setSelectedNoteId(note.id)}
                    onDelete={() => handleDeleteNote(note.id)}
                    isDeleting={deletingId === note.id}
                  />
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CreateNoteModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleNoteCreated}
      />

      <NoteViewModal
        noteId={selectedNoteId}
        onClose={() => setSelectedNoteId(null)}
      />
    </>
  );
}
