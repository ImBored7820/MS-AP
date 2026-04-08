import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import { C } from "../lib/colors";
import type { Course } from "../data/categories";

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = memo(function CourseCard({ course, index }: CourseCardProps) {
  const [hovered, setHovered] = useState(false);
  const delay = Math.min(index * 0.025, 0.35);

  return (
    <div className="fu" style={{ animationDelay: `${delay}s` }}>
      <Link
        to={`/${course.slug}`}
        style={{ textDecoration: "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            background: C.card,
            border: `1px solid ${hovered ? C.sageLight : C.borderSoft}`,
            borderRadius: 14,
            padding: 22,
            cursor: "pointer",
            boxShadow: hovered ? C.shadowMd : C.shadow,
            transition: "all 0.2s ease",
            transform: hovered ? "translateY(-2px)" : "none",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 500, lineHeight: 1.3, color: C.forest, flex: 1, marginRight: 10 }}>
              {course.title}
            </h3>
            <svg
              style={{ opacity: hovered ? 0.7 : 0.2, transition: "opacity 0.2s", flexShrink: 0, marginTop: 3 }}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.sage}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
          <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.55, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {course.desc}
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Tag variant="accent">{course.examDate}</Tag>
            <Tag variant="muted">{course.examTime}</Tag>
            {course.units > 0 && <Tag>{course.units} Units</Tag>}
          </div>
        </div>
      </Link>
    </div>
  );
});

export default CourseCard;
