import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import Shell from "../components/Shell";
import ModuleSidebar from "../components/ModuleSidebar";
import MarkdownRenderer from "../components/MarkdownRenderer";
import PdfExportButton from "../components/PdfExportButton";
import { CATEGORIES, ALL_COURSES } from "../data/categories";
import { COURSE_UNITS } from "../data/courseContent";
import { useUnitIndex } from "../hooks/useUnitIndex";
import { useMarkdownFile } from "../hooks/useMarkdownFile";
import { parseHeadings } from "../lib/parseHeadings";
import { C } from "../lib/colors";

export default function ModulePage() {
  const {
    courseSlug = "",
    unitSlug = "",
    moduleId = "",
  } = useParams<{
    courseSlug: string;
    unitSlug: string;
    moduleId: string;
  }>();

  const unitNumber = unitSlug.replace(/^Unit-/, "");
  const navigate = useNavigate();
  const course = ALL_COURSES.find((c) => c.slug === courseSlug);
  const category = CATEGORIES.find((ct) =>
    ct.courses.some((c) => c.slug === courseSlug),
  );
  const units = COURSE_UNITS[courseSlug] ?? [];
  const unitIdx = parseInt(unitNumber, 10) - 1;
  const unit = units[unitIdx];
  const unitTitle = unit ? unit.name : `Unit ${unitNumber}`;

  const { files, status: indexStatus } = useUnitIndex(courseSlug, unitNumber);
  const { content, status: mdStatus } = useMarkdownFile(
    courseSlug,
    unitNumber,
    moduleId,
  );

  const headings = useMemo(() => parseHeadings(content), [content]);

  // Module navigation helpers
  const moduleIds = files.map((f) => f.replace(/\.md$/, ""));
  const currentIdx = moduleIds.indexOf(moduleId);
  const prevModule = currentIdx > 0 ? moduleIds[currentIdx - 1] : null;
  const nextModule =
    currentIdx < moduleIds.length - 1 ? moduleIds[currentIdx + 1] : null;

  // Scroll to top on module change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [moduleId]);

  if (!course) {
    return (
      <Shell>
        <div
          style={{
            padding: "100px 28px",
            maxWidth: 1200,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 28,
              color: C.forest,
            }}
          >
            Course not found
          </h2>
          <Link
            to="/"
            style={{
              marginTop: 16,
              display: "inline-block",
              padding: "9px 20px",
              background: C.sage,
              color: "#fff",
              borderRadius: 8,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Back to Courses
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          color: C.textLight,
          padding: "14px 28px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            cursor: "pointer",
            color: C.sage,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Courses
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        {category && (
          <>
            <span>{category.name}</span>
            <span style={{ opacity: 0.4 }}>/</span>
          </>
        )}
        <Link
          to={`/${courseSlug}`}
          style={{
            cursor: "pointer",
            color: C.sage,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          {course.title}
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        <Link
          to={`/${courseSlug}/Unit-${unitNumber}`}
          style={{
            cursor: "pointer",
            color: C.sage,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Unit {unitNumber}
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ color: C.text }}>{moduleId}</span>
      </div>

      {/* Main layout */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 28px 48px",
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar */}
        {indexStatus === "success" && files.length > 0 && (
          <ModuleSidebar
            courseSlug={courseSlug}
            unitNumber={unitNumber}
            files={files}
            activeModuleId={moduleId}
            headings={headings}
          />
        )}

        {/* Content area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* PDF export button */}
          {indexStatus === "success" && files.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 16,
              }}
            >
              <PdfExportButton
                courseSlug={courseSlug}
                unitNumber={unitNumber}
                unitTitle={unitTitle}
                files={files}
              />
            </div>
          )}

          {/* Loading state */}
          {mdStatus === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[1, 0.8, 0.6, 0.9, 0.5].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: i === 0 ? 32 : 16,
                    width: `${w * 100}%`,
                    background: C.bgWarm,
                    borderRadius: 8,
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              ))}
              <style>{`
                @keyframes pulse {
                  0%, 100% { opacity: 0.4; }
                  50% { opacity: 0.8; }
                }
              `}</style>
            </div>
          )}

          {/* Error / not found */}
          {mdStatus === "error" && (
            <div
              style={{
                background: C.sagePale,
                border: `1px solid ${C.sageLight}`,
                borderRadius: 14,
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: C.forest,
                  marginBottom: 8,
                }}
              >
                This module doesn't exist yet
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: C.textMid,
                  marginBottom: 20,
                }}
              >
                The content for module {moduleId} hasn't been added.
              </p>
              <Link
                to={`/${courseSlug}/Unit-${unitNumber}`}
                style={{
                  display: "inline-block",
                  padding: "9px 20px",
                  background: C.sage,
                  color: "#fff",
                  borderRadius: 8,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                &larr; Back to Unit Overview
              </Link>
            </div>
          )}

          {/* Rendered content */}
          {mdStatus === "success" && (
            <div className="fu">
              <MarkdownRenderer content={content} />
            </div>
          )}

          {/* Prev / Next navigation */}
          {mdStatus === "success" && moduleIds.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 40,
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 16,
              }}
            >
              {prevModule ? (
                <button
                  onClick={() =>
                    navigate(
                      `/${courseSlug}/Unit-${unitNumber}/${prevModule}`,
                    )
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: C.forest,
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = C.sage)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = C.forest)
                  }
                >
                  <span style={{ color: C.sage, fontSize: 16 }}>&larr;</span>
                  {prevModule}
                </button>
              ) : (
                <div />
              )}
              {nextModule ? (
                <button
                  onClick={() =>
                    navigate(
                      `/${courseSlug}/Unit-${unitNumber}/${nextModule}`,
                    )
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: C.forest,
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = C.sage)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = C.forest)
                  }
                >
                  {nextModule}
                  <span style={{ color: C.sage, fontSize: 16 }}>&rarr;</span>
                </button>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}
