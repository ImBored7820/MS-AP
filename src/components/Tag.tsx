interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
}

const VARIANT_CLASSES: Record<NonNullable<TagProps["variant"]>, string> = {
  default: "bg-sage-pale text-sage",
  accent: "bg-mint-soft text-forest",
  muted: "bg-bg-warm text-text-mid",
};

export default function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
