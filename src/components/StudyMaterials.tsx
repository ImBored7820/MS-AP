import type { StudyMaterial } from "../data/courseContent";
import { C } from "../lib/colors";

const TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> =
  {
    "Khan Academy": {
      bg: "#FED7AA",
      text: "#C2410C",
      label: "Khan Academy",
    },
    YouTube: {
      bg: "#FECACA",
      text: "#DC2626",
      label: "YouTube",
    },
    Official: {
      bg: C.sagePale,
      text: C.sage,
      label: "Official",
    },
    Fiveable: {
      bg: "#E9D5FF",
      text: "#9333EA",
      label: "Fiveable",
    },
    "Albert.io": {
      bg: "#DBEAFE",
      text: "#2563EB",
      label: "Albert.io",
    },
    Resource: {
      bg: "#F3F4F6",
      text: "#4B5563",
      label: "Resource",
    },
  };

function getTypeStyle(type: string) {
  return (
    TYPE_STYLES[type] ?? {
      bg: "#F3F4F6",
      text: "#4B5563",
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
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
      {materials.map((m, i) => {
        const style = getTypeStyle(m.type);
        return (
          <a
            key={i}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              borderRadius: 14,
              border: `1px solid ${C.border}`,
              background: C.card,
              padding: 16,
              transition: "all 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.sageLight;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = C.shadowMd;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = C.shadow;
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  display: "inline-block",
                  borderRadius: 6,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontWeight: 600,
                  background: style.bg,
                  color: style.text,
                }}
              >
                {style.label}
              </span>
            </div>

            <p style={{ fontSize: 14, fontWeight: 500, color: C.forest, display: "flex", alignItems: "center" }}>
              {m.name}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.sage}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: 4, opacity: 0, transition: "opacity 0.2s" }}
                className="external-icon"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </p>

            {m.description && (
              <p style={{ fontSize: 12, lineHeight: 1.6, color: C.textLight, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {m.description}
              </p>
            )}
          </a>
        );
      })}
    </div>
  );
}
