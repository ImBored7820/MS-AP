import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = ALL_COURSES.find((c) => c.slug === slug);

  if (!course) {
    return (
      <Shell>
        <div className="px-7 py-24 text-center">
          <h2 className="font-display text-[28px] text-forest">
            Course not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg bg-sage px-5 py-2.5 font-medium text-white"
          >
            Back to Courses
          </button>
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
      <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-7 pt-3.5 text-[13px] text-text-light">
        <Link to="/" className="font-medium text-sage hover:text-forest">
          Courses
        </Link>
        <span className="opacity-40">/</span>
        {category && (
          <>
            <span>{category.name}</span>
            <span className="opacity-40">/</span>
          </>
        )}
        <span className="text-text-main">{course.title}</span>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-[1200px] px-7 pb-10 pt-6">
        <motion.div {...fade}>
          <div className="mb-3.5 flex flex-wrap gap-2">
            <Tag variant="accent">{course.examDate}</Tag>
            <Tag variant="muted">{course.examTime} Session</Tag>
            {course.units > 0 && <Tag>{course.units} Units</Tag>}
            {scoring && scoring.mcWeight > 0 && (
              <Tag>
                MC {scoring.mcWeight}% / FRQ {scoring.frqWeight}%
              </Tag>
            )}
          </div>
          <h1 className="mb-3 font-display text-[36px] font-medium leading-[1.15] tracking-tight text-forest">
            {course.title}
          </h1>
          <p className="max-w-[640px] text-base leading-[1.65] text-text-mid">
            {course.desc}
          </p>
        </motion.div>
      </section>

      {/* Content grid */}
      <section className="mx-auto max-w-[1200px] px-7 pb-12">
        <div className="grid items-start gap-7" style={{ gridTemplateColumns: "1fr 320px" }}>
          {/* Main content */}
          <div className="flex flex-col gap-7">
            {/* Course Overview */}
            <motion.div {...fade}>
              <Block title="Course Overview">
                {overview ? (
                  <div className="flex flex-col gap-4">
                    {overview.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[14.5px] leading-[1.7] text-text-mid"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm italic text-text-light">
                    Course overview coming soon.
                  </p>
                )}
              </Block>
            </motion.div>

            {/* Exam Format */}
            <motion.div {...fade} transition={{ ...fade.transition, delay: 0.05 }}>
              <Block title="Exam Format">
                {scoring && scoring.mcWeight > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5">
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
            </motion.div>

            {/* Units & Topics */}
            <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }}>
              <Block title="Units & Topics">
                {units.length > 0 ? (
                  <div className="flex flex-col gap-1.5">
                    {units.map((unit, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-[10px] bg-bg-warm px-4 py-3"
                      >
                        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-sage-light text-xs font-bold text-sage">
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-main">
                            {unit.name}
                          </div>
                          <div className="text-xs text-text-light">
                            {unit.summary}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-light">
                    This course uses a portfolio-based assessment.
                  </p>
                )}
              </Block>
            </motion.div>

            {/* Study Resources */}
            {materials.length > 0 && (
              <motion.div {...fade} transition={{ ...fade.transition, delay: 0.15 }}>
                <Block title="Study Resources">
                  <StudyMaterials materials={materials} />
                </Block>
              </motion.div>
            )}

            {/* 4-Week Revision Plan */}
            {revisionPlan.length > 0 && (
              <motion.div {...fade} transition={{ ...fade.transition, delay: 0.2 }}>
                <Block title="4-Week Revision Plan">
                  <RevisionPlan weeks={revisionPlan} />
                </Block>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sticky top-[76px] flex flex-col gap-3.5">
            {/* Exam Details */}
            <div className="rounded-[14px] border border-border-soft bg-card p-[22px] shadow-sm">
              <h3 className="mb-3.5 font-display text-[17px] font-medium text-forest">
                Exam Details
              </h3>
              <div className="flex flex-col gap-2.5">
                <DRow label="Date" value={course.examDate} />
                <DRow label="Session" value={course.examTime} />
                <DRow
                  label="Units"
                  value={course.units > 0 ? course.units : "Portfolio"}
                />
                <DRow label="Duration" value="~3 hours" />
                <DRow label="Score Range" value="1 – 5" />
                {scoring && scoring.mcWeight > 0 && (
                  <DRow
                    label="MC / FRQ"
                    value={`${scoring.mcWeight}% / ${scoring.frqWeight}%`}
                  />
                )}
              </div>
            </div>

            {/* Score Predictor CTA */}
            <div className="rounded-[14px] border border-sage-light bg-sage-pale p-[22px]">
              <h3 className="mb-1.5 font-display text-[17px] font-medium text-forest">
                Score Predictor
              </h3>
              <p className="mb-3.5 text-[13px] text-text-mid">
                Estimate your AP score based on practice performance.
              </p>
              <Link
                to="/predictor"
                className="block w-full rounded-lg bg-sage py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-forest"
              >
                Try Score Predictor
              </Link>
            </div>

            {/* Related Courses */}
            <div className="rounded-[14px] border border-border-soft bg-card p-[22px] shadow-sm">
              <h3 className="mb-2.5 font-display text-[17px] font-medium text-forest">
                Related Courses
              </h3>
              {category?.courses
                .filter((c) => c.slug !== slug)
                .slice(0, 4)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/courses/${c.slug}`}
                    className="block border-b border-border-soft py-2 text-[13px] text-text-mid transition-colors hover:text-sage"
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
