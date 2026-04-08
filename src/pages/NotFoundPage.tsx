// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import { C } from "../lib/colors";

export default function NotFoundPage() {
  return (
    <Shell>
      <section style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "128px 28px", textAlign: "center" }}>
        <div className="fu">
          {/* Big 404 display */}
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 128, fontWeight: 500, lineHeight: 1, color: C.sageLight }}>
            404
          </p>

          <h1 style={{ marginTop: 8, fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 500, color: C.forest }}>
            Page Not Found
          </h1>

          <p style={{ maxWidth: 400, margin: "12px auto 0", fontSize: 14, lineHeight: 1.7, color: C.textMid }}>
            The page you're looking for doesn't exist. It may have been moved,
            or you may have mistyped the URL.
          </p>

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link
              to="/"
              style={{ borderRadius: 10, background: C.sage, padding: "10px 24px", fontSize: 14, fontWeight: 600, color: "#fff", transition: "background 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.background = C.forest}
              onMouseLeave={(e) => e.currentTarget.style.background = C.sage}
            >
              Browse All Courses
            </Link>
            <Link
              to="/schedule"
              style={{ borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, padding: "10px 24px", fontSize: 14, fontWeight: 500, color: C.textMid, transition: "all 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.sageLight;
                e.currentTarget.style.color = C.forest;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.color = C.textMid;
              }}
            >
              Exam Schedule
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
