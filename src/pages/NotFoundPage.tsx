// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Shell from "../components/Shell";

export default function NotFoundPage() {
  return (
    <Shell>
      <section className="mx-auto flex max-w-[1200px] flex-col items-center justify-center px-6 py-32 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Big 404 display */}
          <p className="font-display text-[96px] font-medium leading-none text-sage-light sm:text-[128px]">
            404
          </p>

          <h1 className="mt-2 font-display text-[26px] font-medium text-forest">
            Page Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-[400px] text-sm leading-[1.7] text-text-mid">
            The page you're looking for doesn't exist. It may have been moved,
            or you may have mistyped the URL.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-[10px] bg-sage px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest"
            >
              Browse All Courses
            </Link>
            <Link
              to="/schedule"
              className="rounded-[10px] border border-border bg-card px-6 py-2.5 text-sm font-medium text-text-mid transition-colors hover:border-sage-light hover:text-forest"
            >
              Exam Schedule
            </Link>
          </div>
        </motion.div>
      </section>
    </Shell>
  );
}
