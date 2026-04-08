import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Courses", to: "/" },
  { label: "Schedule", to: "/schedule" },
  { label: "Score Predictor", to: "/predictor" },
] as const;

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-bg/[0.93] backdrop-blur-[12px] border-b border-border">
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-7">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-sage">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <span className="font-display text-[17px] font-semibold text-forest">
            AP Learning Center
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ label, to }) => {
            const active =
              to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link key={to} to={to}>
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center rounded-lg px-3.5 py-1.5 text-[13.5px] transition-colors ${
                    active
                      ? "bg-sage-pale font-semibold text-forest"
                      : "bg-transparent text-text-mid hover:bg-bg-warm"
                  }`}
                >
                  {label}
                </motion.span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
