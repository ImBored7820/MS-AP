import type { ReactNode } from "react";

interface BlockProps {
  title: string;
  children: ReactNode;
}

export default function Block({ title, children }: BlockProps) {
  return (
    <section>
      <h2 className="mb-5 border-b border-border-soft pb-3 font-display text-[21px] font-medium text-forest">
        {title}
      </h2>
      {children}
    </section>
  );
}
