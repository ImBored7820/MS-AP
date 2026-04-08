import { C } from "../lib/colors";

interface FCardProps {
  section: string;
  detail: string;
}

export default function FCard({ section, detail }: FCardProps) {
  return (
    <div style={{ padding: 16, background: C.bgWarm, borderRadius: 10 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 3 }}>{section}</div>
      <div style={{ fontSize: 13, color: C.textLight }}>{detail}</div>
    </div>
  );
}
