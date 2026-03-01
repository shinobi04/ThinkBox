const API_BASE = "http://localhost:3000/api";

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  return res;
}

export async function fetchNotes() {
  const res = await apiFetch("/content");
  if (!res.ok) throw new Error("Failed to fetch notes");
  const data = await res.json();
  return data.data;
}

export async function getNote(id: string) {
  const res = await apiFetch(`/content/${id}`);
  if (!res.ok) throw new Error("Failed to fetch note");
  const data = await res.json();
  // Assume the API returns { data: [{ title: string, content: string }] } based on the array indexing in Prisma
  return data.data[0];
}

export async function createNote(title: string, content: string) {
  const res = await apiFetch("/content", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function deleteNote(id: string) {
  const res = await apiFetch(`/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}

export async function searchNotes(
  query: string,
  onChunk: (text: string) => void,
  onDone: () => void,
) {
  const res = await apiFetch(`/search?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    throw new Error("Search failed");
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No readable stream");

  const decoder = new TextDecoder();
  let isFirstChunk = true;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    let text = decoder.decode(value, { stream: true });

    // The first chunk from the backend contains "NOTES: [...]\\n\\n"
    // We skip this metadata and only stream the AI response
    if (isFirstChunk) {
      const aiStart = text.indexOf("\n\n");
      if (aiStart !== -1) {
        text = text.slice(aiStart + 2);
      }
      isFirstChunk = false;
    }

    if (text) {
      onChunk(text);
    }
  }

  onDone();
}
