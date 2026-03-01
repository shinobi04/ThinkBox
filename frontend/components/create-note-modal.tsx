"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNote } from "@/lib/api";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Code,
  Loader2,
} from "lucide-react";

interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateNoteModal({
  open,
  onClose,
  onCreated,
}: CreateNoteModalProps) {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "tiptap min-h-[200px] max-h-[400px] overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none placeholder:text-zinc-500 shadow-inner",
      },
    },
  });

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const content = editor?.getHTML() || "";
    if (!editor?.getText().trim()) {
      setError("Content is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await createNote(title.trim(), content.trim());
      setTitle("");
      editor?.commands.clearContent();
      onCreated();
    } catch (err) {
      setError("Failed to save note");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg border border-white/10 bg-[#1c1c1c]/95 backdrop-blur-3xl sm:max-w-xl text-white shadow-[0_30px_60px_rgba(0,0,0,0.6)] rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-white">New Note</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            id="note-title"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black/20 text-base font-medium text-white border-white/10 focus-visible:border-white/20 focus-visible:ring-1 focus-visible:ring-white/20 placeholder:text-zinc-500 shadow-inner rounded-xl"
          />

          {/* Toolbar */}
          <div className="flex flex-wrap gap-0.5 rounded-xl border border-white/5 bg-black/40 p-1">
            <ToolbarButton
              icon={<Bold className="h-3.5 w-3.5" />}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              active={editor?.isActive("bold")}
            />
            <ToolbarButton
              icon={<Italic className="h-3.5 w-3.5" />}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              active={editor?.isActive("italic")}
            />
            <ToolbarButton
              icon={<Heading2 className="h-3.5 w-3.5" />}
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor?.isActive("heading", { level: 2 })}
            />
            <ToolbarButton
              icon={<List className="h-3.5 w-3.5" />}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              active={editor?.isActive("bulletList")}
            />
            <ToolbarButton
              icon={<ListOrdered className="h-3.5 w-3.5" />}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              active={editor?.isActive("orderedList")}
            />
            <ToolbarButton
              icon={<Quote className="h-3.5 w-3.5" />}
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              active={editor?.isActive("blockquote")}
            />
            <ToolbarButton
              icon={<Code className="h-3.5 w-3.5" />}
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              active={editor?.isActive("codeBlock")}
            />
          </div>

          {/* Editor */}
          <EditorContent editor={editor} />

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-full px-4"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="bg-white text-black hover:bg-zinc-200 rounded-full px-5 hover:scale-105 active:scale-95 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Note"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ToolbarButton({
  icon,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg p-1.5 transition-colors hover:bg-white/10 hover:text-white ${
        active ? "bg-white/10 text-white" : "text-zinc-400"
      }`}
    >
      {icon}
    </button>
  );
}
