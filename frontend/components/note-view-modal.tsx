"use client";

import { useEffect, useState } from "react";
import { getNote } from "@/lib/api";
import { Loader2, X } from "lucide-react";

interface NoteViewModalProps {
  noteId: string | null;
  onClose: () => void;
}

interface NoteData {
  title: string;
  content: string;
}

export function NoteViewModal({ noteId, onClose }: NoteViewModalProps) {
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!noteId) {
      setNote(null);
      setError(null);
      return;
    }

    let isMounted = true;
    const fetchNoteDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNote(noteId);
        if (isMounted) {
          setNote(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load the note. It may have been deleted.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNoteDetail();

    return () => {
      isMounted = false;
    };
  }, [noteId]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && noteId) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [noteId, onClose]);

  if (!noteId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        {/* Minimal Chrome */}
        <div className="flex items-center justify-end p-4 absolute top-0 right-0 z-10 w-full bg-gradient-to-b from-[#111111] to-transparent pointer-events-none">
          <button
            onClick={onClose}
            className="rounded-full p-2 bg-black/40 text-zinc-400 hover:text-white hover:bg-black/60 transition-all pointer-events-auto backdrop-blur-sm group"
          >
            <X className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="mx-auto max-w-3xl w-full px-6 sm:px-12 py-16 sm:py-24">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-zinc-500 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                <p className="text-sm font-medium tracking-wide">
                  Reading note...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-red-400 mb-2 font-medium">
                  Unable to fetch note
                </p>
                <p className="text-zinc-500 text-sm mb-6 max-w-sm">{error}</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium"
                >
                  Return to Chat
                </button>
              </div>
            ) : note ? (
              <article className="max-w-none">
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-8 sm:mb-12 leading-tight px-4">
                  {note.title}
                </h1>
                <div
                  className="tiptap text-base sm:text-lg leading-relaxed text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
