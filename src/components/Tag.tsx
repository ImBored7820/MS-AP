import { C } from "../lib/colors";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
}

export default function Tag({ children, variant = "default" }: TagProps) {
  const styles = {
    default: { background: C.sagePale, color: C.sage },
    accent: { background: C.mintSoft, color: C.forest },
    muted: { background: C.bgWarm, color: C.textMid },
  };
  return (
    <span style={{ ...styles[variant], padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}
