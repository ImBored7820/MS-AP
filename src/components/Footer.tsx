import { C } from "../lib/colors";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "32px 28px", marginTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: C.forest, marginBottom: 2 }}>AP Learning Center</div>
          <div style={{ fontSize: 12, color: C.textLight }}>Exam dates and course info sourced from College Board. Not affiliated with or endorsed by College Board.</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: C.textLight }}>2026 AP Exams: May 4-15</div>
          <div style={{ fontSize: 11, color: C.textLight, marginTop: 4 }}>{"\u00A9"} Musa Ali 2026 <a href="https://github.com/ImBored7820/MS-AP" target="_blank" rel="noopener noreferrer" style={{ color: C.sage, marginLeft: 4, textDecoration: "underline", fontWeight: 500 }}>GitHub</a></div>
        </div>
      </div>
    </footer>
  );
}
