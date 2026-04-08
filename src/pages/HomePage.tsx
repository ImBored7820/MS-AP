import { useState } from "react";
import { motion } from "framer-motion";
import Shell from "../components/Shell";
import CourseCard from "../components/CourseCard";
import { CATEGORIES, ALL_COURSES } from "../data/categories";

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = ALL_COURSES.filter((c) => {
    const ms = c.title.toLowerCase().includes(search.toLowerCase());
    const mc =
      cat === "All" ||
      CATEGORIES.find((ct) => ct.name === cat)?.courses.some(
        (cc) => cc.slug === c.slug,
      );
    return ms && mc;
  });

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date("2026-05-04").getTime() - Date.now()) / 86_400_000,
    ),
  );

  return (
    <Shell>
      {/* Hero */}
      <section
        className="px-6 pb-12 pt-14 md:px-10"
        style={{
          background: "linear-gradient(180deg, var(--color-sage-pale) 0%, var(--color-bg) 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <motion.div {...fade} className="flex flex-col items-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-sage">
              2025&ndash;2026 Academic Year
            </p>
            <h1 className="mb-3.5 font-display text-3xl font-medium leading-[1.15] tracking-tight text-forest sm:text-[44px]">
              Your guide to
              <br />
              Advanced Placement
            </h1>
            <p className="mx-auto mb-7 max-w-[480px] text-base leading-[1.65] text-text-mid">
              Browse all 38 AP courses, check the 2026 exam schedule, and
              estimate your scores. Everything sourced from College Board.
            </p>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.08 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { val: "38", lbl: "Courses" },
              { val: daysLeft.toString(), lbl: "Days to Exams" },
              { val: "May 4\u201315", lbl: "Exam Window" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="min-w-[120px] rounded-xl bg-card px-[22px] py-4 shadow-sm"
              >
                <div className="font-display text-2xl font-medium text-forest">
                  {s.val}
                </div>
                <div className="mt-0.5 text-xs font-medium text-text-light">
                  {s.lbl}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course listing */}
      <section className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-10 text-center md:px-10">
        <h2 className="mb-1 font-display text-[26px] font-medium text-forest">
          Browse Courses
        </h2>
        <p className="mb-6 text-sm text-text-light">
          Select a category or search to find your AP course.
        </p>

        <div className="mb-6 flex w-full flex-wrap justify-center items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[220px] max-w-[320px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[10px] border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-text-main outline-none transition-colors focus:border-sage"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1">
            {["All", ...CATEGORIES.map((c) => c.name)].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-lg border px-3.5 py-1.5 text-[13px] font-medium transition-all ${
                  cat === c
                    ? "border-sage bg-sage text-white"
                    : "border-border bg-card text-text-mid hover:border-sage-light"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Course grid */}
        <div className="w-full grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-text-light">
            No courses match your search.
          </div>
        )}
      </section>
    </Shell>
  );
}
