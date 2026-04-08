import { useParams, Link, Navigate } from "react-router-dom";
import Shell from "../components/Shell";
import { CATEGORIES, ALL_COURSES } from "../data/categories";
import { COURSE_UNITS } from "../data/courseContent";
import { useUnitIndex } from "../hooks/useUnitIndex";
import { C } from "../lib/colors";

export default function UnitPage() {
  const { courseSlug = "", unitSlug = "" } = useParams<{
    courseSlug: string;
    unitSlug: string;
  }>();

  const unitNumber = unitSlug.replace(/^Unit-/, "");
  const course = ALL_COURSES.find((c) => c.slug === courseSlug);
  const category = CATEGORIES.find((ct) =>
    ct.courses.some((c) => c.slug === courseSlug),
  );
  const units = COURSE_UNITS[courseSlug] ?? [];
  const unitIdx = parseInt(unitNumber, 10) - 1;
  const unit = units[unitIdx];

  const { files, status } = useUnitIndex(courseSlug, unitNumber);

  // If content exists, redirect to first module
  if (status === "success" && files.length > 0) {
    const firstModule = files[0].replace(/\.md$/, "");
    return (
      <Navigate
        replace
        to={`/${courseSlug}/Unit-${unitNumber}/${firstModule}`}
      />
    );
  }

  // Not found
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
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
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

  const unitTitle = unit ? unit.name : `Unit ${unitNumber}`;

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
        <span style={{ color: C.text }}>Unit {unitNumber}</span>
      </div>

      {/* Content */}
      <section
        style={{
          padding: "24px 28px 80px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 32,
            fontWeight: 500,
            color: C.forest,
            marginBottom: 24,
          }}
        >
          Unit {unitNumber}: {unitTitle}
        </h1>

        {/* Coming Soon card */}
        {(status === "error" ||
          (status === "success" && files.length === 0) ||
          status === "loading") && (
          <div
            style={{
              background: C.sagePale,
              border: `1px solid ${C.sageLight}`,
              borderRadius: 14,
              padding: "48px 32px",
              textAlign: "center",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            {status === "loading" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    border: `2px solid ${C.sage}`,
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <span
                  style={{
                    color: C.textMid,
                    fontSize: 14,
                  }}
                >
                  Loading...
                </span>
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 32,
                    marginBottom: 12,
                  }}
                >
                  &#x1F4CB;
                </div>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: C.forest,
                    marginBottom: 8,
                  }}
                >
                  Content Coming Soon
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: C.textMid,
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  Notes for this unit haven't been uploaded yet. Check back
                  later.
                </p>
                <Link
                  to={`/${courseSlug}`}
                  style={{
                    display: "inline-block",
                    padding: "9px 20px",
                    background: C.sage,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  &larr; Back to Course Overview
                </Link>
              </>
            )}
          </div>
        )}
      </section>
    </Shell>
  );
}
