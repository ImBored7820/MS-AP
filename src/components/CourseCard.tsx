import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tag from "./Tag";
import type { Course } from "../data/categories";

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = memo(function CourseCard({ course, index }: CourseCardProps) {
  const delay = Math.min(index * 0.05, 0.35);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      <Link
        to={`/courses/${course.slug}`}
        className="group block rounded-[14px] border border-border bg-card p-[22px] transition-all duration-200 hover:-translate-y-0.5 hover:border-sage-light hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[16.5px] font-semibold text-forest">
            {course.title}
          </h3>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1 shrink-0 text-sage-soft transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>

        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-text-mid">
          {course.desc}
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          <Tag variant="accent">{course.examDate}</Tag>
          <Tag variant="muted">{course.examTime}</Tag>
          {course.units > 0 && (
            <Tag variant="default">
              {course.units} unit{course.units !== 1 && "s"}
            </Tag>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

export default CourseCard;
