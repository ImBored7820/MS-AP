import Shell from "../components/Shell";
import { SCHEDULE } from "../data/schedule";
import { C } from "../lib/colors";

export default function SchedulePage() {
  return (
    <Shell>
      <section style={{ padding: "40px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="fu">
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 500, color: C.forest, marginBottom: 4 }}>
            2026 AP Exam Schedule
          </h2>
          <p style={{ fontSize: 14, color: C.textLight, marginBottom: 28 }}>
            All exams administered May 4--15, 2026. Morning sessions at 8:00 AM, afternoon sessions at 12:00 PM local time.
          </p>
        </div>

        <div className="fu" style={{ animationDelay: "0.08s", background: C.card, border: `1px solid ${C.borderSoft}`, borderRadius: 14, overflow: "hidden", boxShadow: C.shadow }}>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", background: C.sage, padding: "12px 22px", gap: 14 }}>
            {["Date", "Morning (8 AM)", "Afternoon (12 PM)"].map((h) => (
              <div key={h} style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {h}
              </div>
            ))}
          </div>
          {SCHEDULE.map((row, i) => (
            <div key={i}>
              {(i === 0 || i === 5) && (
                <div style={{ padding: "8px 22px", background: C.sagePale, fontSize: 11, fontWeight: 700, color: C.sage, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {i === 0 ? "Week 1" : "Week 2"}
                </div>
              )}
              <div className="fu" style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", padding: "14px 22px", gap: 14, borderBottom: i < SCHEDULE.length - 1 ? `1px solid ${C.borderSoft}` : "none", animationDelay: `${i * 0.03}s` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.forest }}>{row.day}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {row.morning.map((e) => (
                    <span key={e} style={{ fontSize: 13, color: C.textMid }}>{e}</span>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {row.afternoon.map((e) => (
                    <span key={e} style={{ fontSize: 13, color: C.textMid }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fu" style={{ marginTop: 16, padding: 18, background: C.sagePale, borderRadius: 12, fontSize: 13, color: C.textMid, lineHeight: 1.6, animationDelay: "0.16s" }}>
          <strong style={{ color: C.forest }}>Late Testing:</strong> Available May 18--22, 2026 for students with qualifying circumstances. Contact your AP Coordinator. Source: College Board AP Central.
        </div>
      </section>
    </Shell>
  );
}
