import { useState, useEffect } from "react";

interface UnitIndex {
  files: string[];
  status: "idle" | "loading" | "success" | "error";
}

export function useUnitIndex(courseSlug: string, unitNumber: string): UnitIndex {
  const [state, setState] = useState<UnitIndex>({ files: [], status: "idle" });

  useEffect(() => {
    let cancelled = false;
    setState({ files: [], status: "loading" });

    fetch(`/content/${courseSlug}/Unit-${unitNumber}/index.json`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data: { files: string[] }) => {
        if (cancelled) return;
        const sorted = [...data.files].sort((a, b) => {
          const na = parseFloat(a.replace(/\.md$/, ""));
          const nb = parseFloat(b.replace(/\.md$/, ""));
          return na - nb;
        });
        setState({ files: sorted, status: "success" });
      })
      .catch(() => {
        if (!cancelled) setState({ files: [], status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [courseSlug, unitNumber]);

  return state;
}
