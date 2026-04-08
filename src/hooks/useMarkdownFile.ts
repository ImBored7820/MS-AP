import { useState, useEffect } from "react";

const cache = new Map<string, string>();

interface MarkdownFile {
  content: string;
  status: "idle" | "loading" | "success" | "error";
}

export function useMarkdownFile(
  courseSlug: string,
  unitNumber: string,
  moduleId: string,
): MarkdownFile {
  const [state, setState] = useState<MarkdownFile>({
    content: "",
    status: "idle",
  });

  useEffect(() => {
    let cancelled = false;
    const key = `${courseSlug}/Unit-${unitNumber}/${moduleId}.md`;

    const cached = cache.get(key);
    if (cached !== undefined) {
      setState({ content: cached, status: "success" });
      return;
    }

    setState({ content: "", status: "loading" });

    fetch(`/content/${key}`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        cache.set(key, text);
        setState({ content: text, status: "success" });
      })
      .catch(() => {
        if (!cancelled) setState({ content: "", status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [courseSlug, unitNumber, moduleId]);

  return state;
}
