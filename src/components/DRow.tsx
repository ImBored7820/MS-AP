import { C } from "../lib/colors";

interface DRowProps {
  label: string;
  value: string | number;
}

export default function DRow({ label, value }: DRowProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.borderSoft}`, fontSize: 13 }}>
      <span style={{ color: C.textLight }}>{label}</span>
      <span style={{ fontWeight: 500, color: C.text }}>{value}</span>
    </div>
  );
}
