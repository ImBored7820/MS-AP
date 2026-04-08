import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RevisionWeek } from "../data/courseContent";

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
      <div className="flex gap-1.5 border-b border-border-soft pb-0">
        {weeks.map((w, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative rounded-t-lg px-4 py-2 text-[13px] font-medium transition-colors ${
              i === active
                ? "bg-sage-pale text-forest"
                : "text-text-mid hover:bg-bg-warm"
            }`}
          >
            Week {i + 1}
            {i === active && (
              <motion.div
                layoutId="revision-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage"
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pt-5"
        >
          {week.theme && (
            <p className="mb-4 text-sm font-medium text-sage">{week.theme}</p>
          )}

          <div className="grid gap-2.5">
            {week.days.map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg bg-bg-warm px-4 py-3"
              >
                <span className="w-[70px] shrink-0 text-xs font-semibold uppercase tracking-wider text-text-light">
                  {DAY_LABELS[i] ?? `Day ${i + 1}`}
                </span>
                <span className="text-[13.5px] leading-relaxed text-text-main">
                  {task}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
