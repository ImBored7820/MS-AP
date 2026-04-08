import { useState } from "react";
import type { RevisionWeek } from "../data/courseContent";
import { C } from "../lib/colors";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Weekend"] as const;

interface RevisionPlanProps {
  weeks: RevisionWeek[];
}

export default function RevisionPlan({ weeks }: RevisionPlanProps) {
  const [active, setActive] = useState(0);

  if (weeks.length === 0) return null;

  const week = weeks[active];

  return (
    <div>
      <div style={{ display: "flex", gap: 6, borderBottom: `1px solid ${C.borderSoft}`, paddingBottom: 0 }}>
        {weeks.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              position: "relative",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 0.2s",
              background: i === active ? C.sagePale : "transparent",
              color: i === active ? C.forest : C.textMid,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (i !== active) e.currentTarget.style.background = C.bgWarm;
            }}
            onMouseLeave={(e) => {
              if (i !== active) e.currentTarget.style.background = "transparent";
            }}
          >
            Week {i + 1}
            {i === active && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: C.sage }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ paddingTop: 20 }}>
        {week.theme && (
          <p style={{ marginBottom: 16, fontSize: 14, fontWeight: 500, color: C.sage }}>{week.theme}</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {week.days.map((task, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, borderRadius: 8, background: C.bgWarm, padding: "12px 16px" }}
            >
              <span style={{ width: 70, flexShrink: 0, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: C.textLight }}>
                {DAY_LABELS[i] ?? `Day ${i + 1}`}
              </span>
              <span style={{ fontSize: 13.5, lineHeight: 1.6, color: C.text }}>
                {task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
