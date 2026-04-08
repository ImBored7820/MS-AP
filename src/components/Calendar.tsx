import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import type { ScheduleDay } from "../data/schedule";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

interface Popover {
  exam: string;
  session: "Morning" | "Afternoon";
  date: string;
  x: number;
  y: number;
  slug: string | null;
}

function guessSlug(name: string): string | null {
  const cleaned = name
    .replace(/[^a-zA-Z0-9 :&]/g, "")
    .replace(/\s+/g, "-");
  return `AP-${cleaned}`;
}

interface CalendarProps {
  schedule: ScheduleDay[];
  month: Date;
}

export default function Calendar({ schedule, month }: CalendarProps) {
  const [popover, setPopover] = useState<Popover | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const scheduleByDate = new Map<number, ScheduleDay>();
  for (const s of schedule) {
    scheduleByDate.set(s.date, s);
  }

  const handlePillClick = useCallback(
    (
      e: React.MouseEvent,
      exam: string,
      session: "Morning" | "Afternoon",
      date: string,
    ) => {
      e.stopPropagation();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      setPopover({
        exam,
        session,
        date,
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height + 6,
        slug: guessSlug(exam),
      });
    },
    [],
  );

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setPopover(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Legend */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-sage-light" />
          <span className="text-xs text-text-mid">Morning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm bg-mint-soft" />
          <span className="text-xs text-text-mid">Afternoon</span>
        </div>
      </div>

      {/* Month header */}
      <h3 className="mb-3 font-display text-lg font-semibold text-forest">
        {format(month, "MMMM yyyy")}
      </h3>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-px">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="pb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-text-light"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px rounded-xl border border-border bg-border">
        {days.map((day) => {
          const inMonth = isSameMonth(day, month);
          const dayOfMonth = parseInt(format(day, "d"), 10);
          const entry = inMonth ? scheduleByDate.get(dayOfMonth) : undefined;
          const isToday = isSameDay(day, new Date());
          const formattedDate = format(day, "EEEE, MMMM d, yyyy");

          return (
            <div
              key={day.toISOString()}
              className={`relative min-h-[90px] bg-card p-1.5 ${
                !inMonth ? "bg-bg-warm/60" : ""
              }`}
            >
              <span
                className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  isToday
                    ? "bg-sage text-white"
                    : inMonth
                      ? "text-text-main"
                      : "text-text-light/50"
                }`}
              >
                {format(day, "d")}
              </span>

              {entry && (
                <div className="flex flex-col gap-0.5">
                  {entry.morning.map((exam) => (
                    <button
                      key={`m-${exam}`}
                      onClick={(e) =>
                        handlePillClick(e, exam, "Morning", formattedDate)
                      }
                      className="w-full truncate rounded-md bg-sage-light px-1.5 py-0.5 text-left text-[10px] font-medium leading-tight text-forest transition-colors hover:bg-sage-pale"
                    >
                      {exam}
                    </button>
                  ))}
                  {entry.afternoon.map((exam) => (
                    <button
                      key={`a-${exam}`}
                      onClick={(e) =>
                        handlePillClick(e, exam, "Afternoon", formattedDate)
                      }
                      className="w-full truncate rounded-md bg-mint-soft px-1.5 py-0.5 text-left text-[10px] font-medium leading-tight text-forest transition-colors hover:bg-mint"
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Popover */}
      <AnimatePresence>
        {popover && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-56 rounded-xl border border-border bg-card p-4 shadow-lg"
            style={{ left: popover.x, top: popover.y, transform: "translateX(-50%)" }}
          >
            <p className="font-display text-sm font-semibold text-forest">
              AP {popover.exam}
            </p>
            <p className="mt-1 text-xs text-text-mid">{popover.date}</p>
            <p className="mt-0.5 text-xs text-text-light">
              {popover.session} session
            </p>
            {popover.slug && (
              <a
                href={`/${popover.slug}`}
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-sage hover:text-forest"
              >
                View Course
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
