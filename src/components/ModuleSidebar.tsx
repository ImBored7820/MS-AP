import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { C } from "../lib/colors";
import type { Heading } from "../lib/parseHeadings";

interface ModuleSidebarProps {
  courseSlug: string;
  unitNumber: string;
  files: string[];
  activeModuleId: string;
  headings: Heading[];
}

export default function ModuleSidebar({
  courseSlug,
  unitNumber,
  files,
  activeModuleId,
  headings,
}: ModuleSidebarProps) {
  const location = useLocation();
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active heading via intersection observer
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings, location.pathname]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  }, []);

  const moduleIds = files.map((f) => f.replace(/\.md$/, ""));

  const sidebarContent = (
    <div
      style={{
        width: 260,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Module list */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: C.textLight,
            marginBottom: 8,
            padding: "0 12px",
          }}
        >
          Modules
        </div>
        {moduleIds.map((id) => {
          const isActive = id === activeModuleId;
          const isOverview = id.endsWith(".0");
          return (
            <Link
              key={id}
              to={`/${courseSlug}/Unit-${unitNumber}/${id}`}
              style={{
                display: "block",
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? C.forest : C.textMid,
                background: isActive ? C.sagePale : "transparent",
                textDecoration: "none",
                transition: "all 0.2s",
                marginBottom: 2,
              }}
              onClick={() => setMobileOpen(false)}
            >
              <span>{id}</span>
              {isOverview && (
                <span
                  style={{
                    display: "block",
                    fontSize: 11,
                    color: C.textLight,
                    fontWeight: 400,
                    marginTop: 1,
                  }}
                >
                  Overview
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Headings */}
      {headings.length > 0 && (
        <div>
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              paddingTop: 12,
              marginTop: 4,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: C.textLight,
                marginBottom: 8,
                padding: "0 12px",
              }}
            >
              On This Page
            </div>
            {headings.map((h) => {
              const isActive = h.id === activeHeadingId;
              return (
                <button
                  key={h.id}
                  onClick={() => scrollToHeading(h.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: "5px 12px",
                    paddingLeft: h.level === 3 ? 24 : 12,
                    fontSize: 13,
                    color: isActive ? C.forest : C.textLight,
                    fontWeight: isActive ? 500 : 400,
                    fontFamily: "'Outfit', sans-serif",
                    transition: "color 0.15s",
                    borderRadius: 4,
                  }}
                >
                  {h.text}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{
          position: "sticky",
          top: 60,
          height: "calc(100vh - 60px)",
          overflowY: "auto",
          flexShrink: 0,
          paddingTop: 8,
          paddingBottom: 24,
        }}
        className="module-sidebar-desktop"
      >
        {sidebarContent}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="module-sidebar-mobile-btn"
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 50,
          background: C.sage,
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "10px 16px",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "'Outfit', sans-serif",
          cursor: "pointer",
          boxShadow: C.shadowMd,
          transition: "all 0.2s",
        }}
      >
        {mobileOpen ? "✕ Close" : "☰ Modules"}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="module-sidebar-mobile-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            background: "rgba(0,0,0,0.3)",
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}
      {mobileOpen && (
        <div
          className="module-sidebar-mobile-panel"
          style={{
            position: "fixed",
            bottom: 64,
            left: 20,
            zIndex: 51,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: 16,
            maxHeight: "60vh",
            overflowY: "auto",
            boxShadow: C.shadowLg,
          }}
        >
          {sidebarContent}
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .module-sidebar-desktop { display: block !important; }
          .module-sidebar-mobile-btn { display: none !important; }
          .module-sidebar-mobile-overlay { display: none !important; }
          .module-sidebar-mobile-panel { display: none !important; }
        }
        @media (max-width: 1023px) {
          .module-sidebar-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
