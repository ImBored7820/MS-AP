interface FCardProps {
  section: string;
  detail: string;
}

export default function FCard({ section, detail }: FCardProps) {
  return (
    <div className="rounded-[10px] bg-bg-warm p-4">
      <p className="text-sm font-bold text-text-main">{section}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-text-light">
        {detail}
      </p>
    </div>
  );
}
