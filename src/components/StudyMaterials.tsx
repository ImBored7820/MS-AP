import type { StudyMaterial } from "../data/courseContent";

const TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> =
  {
    "Khan Academy": {
      bg: "bg-orange-100",
      text: "text-orange-700",
      label: "Khan Academy",
    },
    YouTube: {
      bg: "bg-red-100",
      text: "text-red-700",
      label: "YouTube",
    },
    Official: {
      bg: "bg-sage-pale",
      text: "text-sage",
      label: "Official",
    },
    Fiveable: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      label: "Fiveable",
    },
    "Albert.io": {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Albert.io",
    },
    Resource: {
      bg: "bg-gray-100",
      text: "text-gray-600",
      label: "Resource",
    },
  };

function getTypeStyle(type: string) {
  return (
    TYPE_STYLES[type] ?? {
      bg: "bg-gray-100",
      text: "text-gray-600",
      label: type,
    }
  );
}

interface StudyMaterialsProps {
  materials: StudyMaterial[];
}

export default function StudyMaterials({ materials }: StudyMaterialsProps) {
  if (materials.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {materials.map((m, i) => {
        const style = getTypeStyle(m.type);
        return (
          <a
            key={i}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2.5 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sage-light hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${style.bg} ${style.text}`}
              >
                {style.label}
              </span>
            </div>

            <p className="text-sm font-medium text-forest group-hover:text-sage">
              {m.name}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-100"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </p>

            {m.description && (
              <p className="line-clamp-1 text-xs leading-relaxed text-text-light">
                {m.description}
              </p>
            )}
          </a>
        );
      })}
    </div>
  );
}
