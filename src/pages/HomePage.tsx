import { useState } from "react";
import Shell from "../components/Shell";
import CourseCard from "../components/CourseCard";
import { CATEGORIES, ALL_COURSES } from "../data/categories";
import { C } from "../lib/colors";

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
      <section style={{ padding: "56px 28px 48px", background: `linear-gradient(180deg, ${C.sagePale} 0%, ${C.bg} 100%)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div className="fu">
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.sage, marginBottom: 12 }}>
                2025-2026 Academic Year
              </p>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: C.forest, marginBottom: 14 }}>
                Your guide to<br />Advanced Placement
              </h1>
              <p style={{ fontSize: 16, color: C.textMid, maxWidth: 480, lineHeight: 1.65, marginBottom: 28 }}>
                Browse all 38 AP courses, check the 2026 exam schedule, and estimate your scores. Everything sourced from College Board.
              </p>
            </div>
            <div className="fu" style={{ display: "flex", gap: 12, flexWrap: "wrap", animationDelay: "0.08s" }}>
              {[
                { val: "38", lbl: "Courses" },
                { val: daysLeft.toString(), lbl: "Days to Exams" },
                { val: "May 4-15", lbl: "Exam Window" },
              ].map((s) => (
                <div key={s.lbl} style={{ padding: "16px 22px", background: C.card, borderRadius: 12, boxShadow: C.shadow, minWidth: 120 }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500, color: C.forest }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: C.textLight, fontWeight: 500, marginTop: 2 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fu" style={{ flex: "1 1 500px", animationDelay: "0.12s", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: C.shadowLg,
              background: "#fff",
              border: `1px solid ${C.border}`,
              width: "100%"
            }}>
              <iframe
                src="https://wroc.musaserver.org"
                title="Embedded Website"
                sandbox="allow-scripts allow-same-origin allow-forms"
                style={{
                  width: "100%",
                  height: "450px",
                  border: "none",
                  display: "block",
                  background: "#FFFFFF"
                }}
              />
            </div>
            <p style={{ marginTop: 16, fontSize: 14, color: C.textMid, fontFamily: "'Outfit', sans-serif" }}>
              My Game Demo,{" "}
              <a
                href="https://wroc.musaserver.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.sage, textDecoration: "underline", fontWeight: 500 }}
              >
                Website
              </a>
              {" | "}
              <a
                href="https://github.com/ImBored7820/WRoC"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.sage, textDecoration: "underline", fontWeight: 500 }}
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Course listing */}
      <section style={{ padding: "40px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 500, color: C.forest, marginBottom: 4 }}>
          Browse Courses
        </h2>
        <p style={{ fontSize: 14, color: C.textLight, marginBottom: 24 }}>
          Select a category or search to find your AP course.
        </p>

        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 320 }}>
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.textLight} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px 9px 36px",
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                color: C.text,
                fontSize: 14,
                fontFamily: "'Outfit', sans-serif",
                outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = C.sage}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {["All", ...CATEGORIES.map((c) => c.name)].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "'Outfit', sans-serif",
                  background: cat === c ? C.sage : C.card,
                  color: cat === c ? "#fff" : C.textMid,
                  border: `1px solid ${cat === c ? C.sage : C.border}`,
                  transition: "all 0.2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
          {filtered.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: C.textLight, fontSize: 14 }}>
            No courses match your search.
          </div>
        )}
      </section>
    </Shell>
  );
}
