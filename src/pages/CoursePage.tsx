import { useParams, Link } from "react-router-dom";
import Shell from "../components/Shell";
import Tag from "../components/Tag";
import Block from "../components/Block";
import FCard from "../components/FCard";
import DRow from "../components/DRow";
import StudyMaterials from "../components/StudyMaterials";
import RevisionPlan from "../components/RevisionPlan";
import { CATEGORIES, ALL_COURSES } from "../data/categories";
import { SCORING } from "../data/scoring";
import {
  COURSE_UNITS,
  COURSE_OVERVIEWS,
  STUDY_MATERIALS,
  REVISION_PLANS,
} from "../data/courseContent";
import { C } from "../lib/colors";

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const course = ALL_COURSES.find((c) => c.slug === slug);

  if (!course) {
    return (
      <Shell>
        <div style={{ padding: "100px 28px", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: C.forest }}>Course not found</h2>
          <Link
            to="/"
            style={{ marginTop: 16, display: "inline-block", padding: "9px 20px", background: C.sage, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontWeight: 500, textDecoration: "none" }}
          >
            Back to Courses
          </Link>
        </div>
      </Shell>
    );
  }

  const category = CATEGORIES.find((ct) =>
    ct.courses.some((c) => c.slug === slug),
  );
  const scoring = slug ? SCORING[slug] : undefined;
  const units = slug ? COURSE_UNITS[slug] ?? [] : [];
  const overview = slug ? COURSE_OVERVIEWS[slug] : undefined;
  const materials = slug ? STUDY_MATERIALS[slug] ?? [] : [];
  const revisionPlan = slug ? REVISION_PLANS[slug] ?? [] : [];

  return (
    <Shell>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textLight, padding: "14px 28px" }}>
        <Link to="/" style={{ cursor: "pointer", color: C.sage, fontWeight: 500, textDecoration: "none" }}>
          Courses
        </Link>
        <span style={{ opacity: 0.4 }}>/</span>
        {category && (
          <>
            <span>{category.name}</span>
            <span style={{ opacity: 0.4 }}>/</span>
          </>
        )}
        <span style={{ color: C.text }}>{course.title}</span>
      </div>

      {/* Header */}
      <section style={{ padding: "24px 28px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="fu">
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <Tag variant="accent">{course.examDate}</Tag>
            <Tag variant="muted">{course.examTime} Session</Tag>
            {course.units > 0 && <Tag>{course.units} Units</Tag>}
            {scoring && scoring.mcWeight > 0 && <Tag>MC {scoring.mcWeight}% / FRQ {scoring.frqWeight}%</Tag>}
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em", color: C.forest, marginBottom: 12 }}>
            {course.title}
          </h1>
          <p style={{ fontSize: 16, color: C.textMid, lineHeight: 1.65, maxWidth: 640 }}>
            {course.desc}
          </p>
        </div>
      </section>

      {/* Content grid */}
      <section style={{ padding: "0 28px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
          {/* Main content */}
          <div>
            {/* Course Overview */}
            <div className="fu">
              <Block title="Course Overview">
                {overview ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {overview.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        style={{ fontSize: 14.5, lineHeight: 1.7, color: C.textMid }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p style={{ marginTop: 14, fontSize: 13, color: C.textLight, fontStyle: "italic" }}>
                    Detailed course description, prerequisites, and recommended preparation will be added here. Content verified against the official College Board course framework.
                  </p>
                )}
              </Block>
            </div>

            {/* Exam Format */}
            <div className="fu" style={{ animationDelay: "0.05s" }}>
              <Block title="Exam Format">
                {scoring && scoring.mcWeight > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <FCard
                      section="Multiple Choice"
                      detail={`${scoring.mcWeight}% of composite score`}
                    />
                    <FCard
                      section="Free Response"
                      detail={`${scoring.frqWeight}% of composite score`}
                    />
                  </div>
                ) : (
                  <FCard
                    section="Performance Tasks / Portfolio"
                    detail="100% of composite score"
                  />
                )}
              </Block>
            </div>

            {/* Units & Topics */}
            <div className="fu" style={{ animationDelay: "0.1s" }}>
              <Block title="Units & Topics">
                {units.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {units.map((unit, i) => (
                      <div
                        key={i}
                        style={{ padding: "12px 16px", background: C.bgWarm, borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}
                      >
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: C.sageLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.sage }}>
                          {i + 1}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>
                            {unit.name}
                          </div>
                          <div style={{ fontSize: 12, color: C.textLight }}>
                            {unit.summary}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: C.textLight, fontSize: 14 }}>
                    This course uses a portfolio-based assessment.
                  </p>
                )}
              </Block>
            </div>

            {/* Study Resources */}
            {materials.length > 0 && (
              <div className="fu" style={{ animationDelay: "0.15s" }}>
                <Block title="Study Resources">
                  <StudyMaterials materials={materials} />
                </Block>
              </div>
            )}

            {/* 4-Week Revision Plan */}
            {revisionPlan.length > 0 && (
              <div className="fu" style={{ animationDelay: "0.2s" }}>
                <Block title="4-Week Revision Plan">
                  <RevisionPlan weeks={revisionPlan} />
                </Block>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 76, display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Exam Details */}
            <div style={{ background: C.card, border: `1px solid ${C.borderSoft}`, borderRadius: 14, padding: 22, boxShadow: C.shadow }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500, color: C.forest, marginBottom: 14 }}>
                Exam Details
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <DRow label="Date" value={course.examDate} />
                <DRow label="Session" value={course.examTime} />
                <DRow label="Units" value={course.units > 0 ? course.units : "Portfolio"} />
                <DRow label="Duration" value="~3 hours" />
                <DRow label="Score Range" value="1 -- 5" />
                {scoring && scoring.mcWeight > 0 && (
                  <DRow label="MC / FRQ" value={`${scoring.mcWeight}% / ${scoring.frqWeight}%`} />
                )}
              </div>
            </div>

            {/* Score Predictor CTA */}
            <div style={{ background: C.sagePale, border: `1px solid ${C.sageLight}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500, color: C.forest, marginBottom: 6 }}>
                Score Predictor
              </h3>
              <p style={{ fontSize: 13, color: C.textMid, marginBottom: 14 }}>
                Estimate your AP score based on practice performance.
              </p>
              <Link
                to="/predictor"
                style={{ display: "block", width: "100%", padding: "9px 18px", background: C.sage, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'Outfit', sans-serif", textAlign: "center", textDecoration: "none" }}
              >
                Try Score Predictor
              </Link>
            </div>

            {/* Related Courses */}
            <div style={{ background: C.card, border: `1px solid ${C.borderSoft}`, borderRadius: 14, padding: 22, boxShadow: C.shadow }}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500, color: C.forest, marginBottom: 10 }}>
                Related Courses
              </h3>
              {category?.courses
                .filter((c) => c.slug !== slug)
                .slice(0, 4)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/${c.slug}`}
                    style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderSoft}`, cursor: "pointer", fontSize: 13, color: C.textMid, transition: "color 0.15s", textDecoration: "none", display: "block" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = C.sage}
                    onMouseLeave={(e) => e.currentTarget.style.color = C.textMid}
                  >
                    {c.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
