import type { ReactNode } from "react";
import { C } from "../lib/colors";

interface BlockProps {
  title: string;
  children: ReactNode;
}

export default function Block({ title, children }: BlockProps) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 500, color: C.forest, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${C.border}` }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
