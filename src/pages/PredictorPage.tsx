import { useState } from "react";
import { motion } from "framer-motion";
import Shell from "../components/Shell";
import { CATEGORIES } from "../data/categories";
import { SCORING } from "../data/scoring";

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

const scoreLabels: Record<number, string> = {
  5: "Extremely well qualified",
  4: "Well qualified",
  3: "Qualified",
  2: "Possibly qualified",
  1: "No recommendation",
};

function sliderBg(val: number) {
  return `linear-gradient(90deg, var(--color-sage) 0%, var(--color-sage) ${val}%, var(--color-border-soft) ${val}%, var(--color-border-soft) 100%)`;
}

export default function PredictorPage() {
  const [slug, setSlug] = useState("");
  const [mcVal, setMcVal] = useState(50);
  const [frqVal, setFrqVal] = useState(50);
  const [result, setResult] = useState<{
    score: number;
    compositePct: number;
  } | null>(null);

  const scoring = SCORING[slug];

  const predict = () => {
    if (!scoring) return;
    const mcPct = mcVal / 100;
    const frqPct = frqVal / 100;
    const composite =
      (mcPct * scoring.mcWeight + frqPct * scoring.frqWeight) / 100;
    const compositePct = Math.round(composite * 100);
    const [c5, c4, c3, c2] = scoring.cutoffs;
    const score =
      compositePct >= c5
        ? 5
        : compositePct >= c4
          ? 4
          : compositePct >= c3
            ? 3
            : compositePct >= c2
              ? 2
              : 1;
    setResult({ score, compositePct });
  };

  return (
    <Shell>
      <section className="mx-auto flex max-w-[680px] flex-col items-center px-7 py-10 text-center">
        <motion.div {...fade} className="flex flex-col items-center">
          <h2 className="mb-1 font-display text-[26px] font-medium text-forest">
            AP Score Predictor
          </h2>
          <p className="mb-7 text-sm text-text-light">
            Estimate your AP score using subject-specific MC/FRQ weightings from
            College Board course descriptions. Cutoffs are approximate and shift
            each year.
          </p>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="rounded-[14px] border border-border-soft bg-card p-7 shadow-sm"
        >
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-text-mid">
            Select Course
          </label>
          <select
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setResult(null);
            }}
            className="mb-6 w-full cursor-pointer rounded-[10px] border border-border bg-bg-warm px-3 py-2.5 text-sm text-text-main outline-none"
          >
            <option value="">-- Select a course --</option>
            {CATEGORIES.map((ct) => (
              <optgroup key={ct.name} label={ct.name}>
                {ct.courses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {scoring && (
            <>
              {/* Weight bars */}
              <div className="mb-6 flex gap-2">
                {scoring.mcWeight > 0 && (
                  <div
                    className="rounded-lg bg-sage-pale p-2.5 text-center"
                    style={{ flex: scoring.mcWeight }}
                  >
                    <div className="text-xl font-semibold text-forest">
                      {scoring.mcWeight}%
                    </div>
                    <div className="text-[11px] font-medium text-text-light">
                      Multiple Choice
                    </div>
                  </div>
                )}
                <div
                  className="rounded-lg bg-mint-soft p-2.5 text-center"
                  style={{ flex: scoring.frqWeight }}
                >
                  <div className="text-xl font-semibold text-forest">
                    {scoring.frqWeight}%
                  </div>
                  <div className="text-[11px] font-medium text-text-light">
                    Free Response
                  </div>
                </div>
              </div>

              {/* MC Slider */}
              {scoring.mcWeight > 0 && (
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-[13px] font-semibold text-text-main">
                      Multiple Choice Accuracy
                    </label>
                    <span className="text-sm font-bold text-sage">
                      {mcVal}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mcVal}
                    onChange={(e) => setMcVal(+e.target.value)}
                    className="w-full"
                    style={{ background: sliderBg(mcVal) }}
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-text-light">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              {/* FRQ Slider */}
              <div className="mb-7">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[13px] font-semibold text-text-main">
                    Free Response Score
                  </label>
                  <span className="text-sm font-bold text-sage">
                    {frqVal}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={frqVal}
                  onChange={(e) => setFrqVal(+e.target.value)}
                  className="w-full"
                  style={{ background: sliderBg(frqVal) }}
                />
                <div className="mt-1 flex justify-between text-[11px] text-text-light">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <button
                onClick={predict}
                className="w-full rounded-[10px] bg-sage py-3 text-[15px] font-semibold text-white transition-colors hover:bg-forest"
              >
                Predict My Score
              </button>

              {/* Result */}
              {result && (
                <motion.div
                  {...fade}
                  className="mt-6 rounded-xl bg-sage-pale p-6 text-center"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.05em] text-text-light">
                    Estimated Score
                  </div>
                  <div className="font-display text-[64px] font-medium leading-none text-forest">
                    {result.score}
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-sage">
                    {scoreLabels[result.score]}
                  </div>
                  <div className="mt-1 text-[13px] text-text-mid">
                    Weighted Composite: {result.compositePct}%
                  </div>
                  <div className="mt-4 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 w-11 rounded-full transition-colors ${
                          s <= result.score ? "bg-sage" : "bg-border-soft"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-3.5 text-xs leading-relaxed text-text-light">
                    {result.score >= 3
                      ? "A score of 3+ is generally considered qualifying for college credit at many institutions."
                      : "Keep studying! Focus on your weaker section to bring up your composite."}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.12 }}
          className="mt-4 rounded-xl bg-sage-pale p-[18px] text-[13px] leading-[1.65] text-text-mid"
        >
          <strong className="text-forest">How this works:</strong> Each AP exam
          weights MC and FRQ sections differently. For example, History exams
          weight FRQ at 60% while Economics exams weight MC at 67%. Your
          percentage scores are weighted accordingly to produce a composite, then
          compared against approximate cutoffs derived from historical exam data.
          The College Board does not publish exact cutoffs and they shift yearly,
          so treat this as a rough guide only.
        </motion.div>
      </section>
    </Shell>
  );
}
