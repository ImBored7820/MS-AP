import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { C } from "../lib/colors";

const NAV_ITEMS = [
  { label: "Courses", to: "/" },
  { label: "Schedule", to: "/schedule" },
  { label: "Score Predictor", to: "/predictor" },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/" || pathname === "";

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: `${C.bg}EE`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, padding: "0 28px" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.sage, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 500, color: C.forest, letterSpacing: "-0.01em" }}>AP Learning Center</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "none", gap: 4 }} className="desktop-nav">
          {NAV_ITEMS.map((item) => {
            const active = (item.to === "/" && isHome) || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link key={item.to} to={item.to} style={{ textDecoration: "none" }}>
                <button style={{ background: active ? C.sagePale : "transparent", border: "none", color: active ? C.forest : C.textMid, padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: active ? 600 : 400, fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}>
                  {item.label}
                </button>
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: "transparent", border: "none", cursor: "pointer", color: C.textMid }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ borderTop: `1px solid ${C.borderSoft}`, background: C.bg, padding: "12px 28px" }} className="mobile-menu">
          {NAV_ITEMS.map((item) => {
            const active = (item.to === "/" && isHome) || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none", display: "block", padding: "8px 12px", borderRadius: 8, fontSize: 14, color: active ? C.forest : C.textMid, fontWeight: active ? 600 : 400, marginBottom: 4 }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
