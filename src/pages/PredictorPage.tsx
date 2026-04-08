import { useState } from "react";
import Shell from "../components/Shell";
import { CATEGORIES } from "../data/categories";
import { SCORING } from "../data/scoring";
import { C } from "../lib/colors";

const scoreLabels: Record<number, string> = {
  5: "Extremely well qualified",
  4: "Well qualified",
  3: "Qualified",
  2: "Possibly qualified",
  1: "No recommendation",
};

function sliderBg(val: number) {
  return `linear-gradient(90deg, ${C.sage} 0%, ${C.sage} ${val}%, ${C.borderSoft} ${val}%, ${C.borderSoft} 100%)`;
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
      <section style={{ padding: "40px 28px", maxWidth: 680, margin: "0 auto" }}>
        <div className="fu">
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 500, color: C.forest, marginBottom: 4 }}>
            AP Score Predictor
          </h2>
          <p style={{ fontSize: 14, color: C.textLight, marginBottom: 28 }}>
            Estimate your AP score using subject-specific MC/FRQ weightings from College Board course descriptions. Cutoffs are approximate and shift each year.
          </p>
        </div>

        <div className="fu" style={{ animationDelay: "0.06s", background: C.card, border: `1px solid ${C.borderSoft}`, borderRadius: 14, padding: 28, boxShadow: C.shadow }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.textMid, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Select Course
          </label>
          <select
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setResult(null);
            }}
            style={{ width: "100%", padding: "10px 12px", background: C.bgWarm, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", marginBottom: 24, cursor: "pointer" }}
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
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                {scoring.mcWeight > 0 && (
                  <div style={{ flex: scoring.mcWeight, background: C.sagePale, borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: C.forest }}>{scoring.mcWeight}%</div>
                    <div style={{ fontSize: 11, color: C.textLight, fontWeight: 500 }}>Multiple Choice</div>
                  </div>
                )}
                <div style={{ flex: scoring.frqWeight, background: C.mintSoft, borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 600, color: C.forest }}>{scoring.frqWeight}%</div>
                  <div style={{ fontSize: 11, color: C.textLight, fontWeight: 500 }}>Free Response</div>
                </div>
              </div>

              {/* MC Slider */}
              {scoring.mcWeight > 0 && (
                <div style={{ marginBottom: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Multiple Choice Accuracy</label>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.sage }}>{mcVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mcVal}
                    onChange={(e) => setMcVal(+e.target.value)}
                    style={{ width: "100%", background: sliderBg(mcVal) }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginTop: 4 }}>
                    <span>0%</span><span>50%</span><span>100%</span>
                  </div>
                </div>
              )}

              {/* FRQ Slider */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Free Response Score</label>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.sage }}>{frqVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={frqVal}
                  onChange={(e) => setFrqVal(+e.target.value)}
                  style={{ width: "100%", background: sliderBg(frqVal) }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLight, marginTop: 4 }}>
                  <span>0%</span><span>50%</span><span>100%</span>
                </div>
              </div>

              <button
                onClick={predict}
                style={{ width: "100%", padding: "11px 22px", background: C.sage, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}
              >
                Predict My Score
              </button>

              {/* Result */}
              {result && (
                <div className="fu" style={{ marginTop: 22, padding: 26, background: C.sagePale, borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                    Estimated Score
                  </div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 64, fontWeight: 500, color: C.forest, lineHeight: 1 }}>
                    {result.score}
                  </div>
                  <div style={{ fontSize: 14, color: C.sage, fontWeight: 600, marginTop: 6 }}>
                    {scoreLabels[result.score]}
                  </div>
                  <div style={{ fontSize: 13, color: C.textMid, marginTop: 4 }}>
                    Weighted Composite: {result.compositePct}%
                  </div>
                  <div style={{ display: "flex", gap: 4, marginTop: 16, justifyContent: "center" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} style={{ width: 44, height: 6, borderRadius: 3, background: s <= result.score ? C.sage : C.borderSoft, transition: "background 0.3s" }} />
                    ))}
                  </div>
                  <div style={{ marginTop: 14, fontSize: 12, color: C.textLight, lineHeight: 1.5 }}>
                    {result.score >= 3
                      ? "A score of 3+ is generally considered qualifying for college credit at many institutions."
                      : "Keep studying! Focus on your weaker section to bring up your composite."}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="fu" style={{ marginTop: 16, padding: 18, background: C.sagePale, borderRadius: 12, fontSize: 13, color: C.textMid, lineHeight: 1.65, animationDelay: "0.12s" }}>
          <strong style={{ color: C.forest }}>How this works:</strong> Each AP exam weights MC and FRQ sections differently. For example, History exams weight FRQ at 60% while Economics exams weight MC at 67%. Your percentage scores are weighted accordingly to produce a composite, then compared against approximate cutoffs derived from historical exam data. The College Board does not publish exact cutoffs and they shift yearly, so treat this as a rough guide only.
        </div>

        <div className="fu" style={{ marginTop: 12, padding: 18, background: C.borderSoft, borderRadius: 12, fontSize: 12, color: C.textMid, lineHeight: 1.65, animationDelay: "0.18s", border: `1px solid ${C.sage}` }}>
          <strong style={{ color: C.forest }}>⚠️ Disclaimer:</strong> This predictor is not affiliated with or endorsed by the College Board. Predictions are approximate and subject to annual variation. Students near score boundaries should treat results with a ±5-10% margin of error. See our <a href="/privacy" style={{ color: C.sage, textDecoration: "underline", fontWeight: 500 }}>Privacy & Policies</a> page for more details.
        </div>
      </section>
    </Shell>
  );
}
