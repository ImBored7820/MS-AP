interface DRowProps {
  label: string;
  value: string | number;
}

export default function DRow({ label, value }: DRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft py-2.5 text-sm">
      <span className="text-text-light">{label}</span>
      <span className="font-medium text-text-main">{value}</span>
    </div>
  );
}
