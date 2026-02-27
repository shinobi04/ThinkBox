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
          "tiptap min-h-[200px] max-h-[400px] overflow-y-auto rounded-lg border border-border/50 bg-background/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
      },
    },
  });

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const content = editor?.getText() || "";
    if (!content.trim()) {
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
      <DialogContent className="max-w-lg border-border/30 bg-card/95 backdrop-blur-md sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            id="note-title"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background/50 text-base font-medium"
          />

          {/* Toolbar */}
          <div className="flex flex-wrap gap-0.5 rounded-lg border border-border/30 bg-background/30 p-1">
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

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
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
      className={`rounded-md p-1.5 transition-colors hover:bg-accent ${
        active ? "bg-accent text-foreground" : "text-muted-foreground"
      }`}
    >
      {icon}
    </button>
  );
}
