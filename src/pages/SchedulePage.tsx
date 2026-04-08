import { motion } from "framer-motion";
import Shell from "../components/Shell";
import Calendar from "../components/Calendar";
import { SCHEDULE } from "../data/schedule";

const MAY_2026 = new Date(2026, 4, 1); // May 2026

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export default function SchedulePage() {
  return (
    <Shell>
      <section className="mx-auto max-w-[1200px] px-7 py-10">
        <motion.div {...fade}>
          <h2 className="mb-1 font-display text-[26px] font-medium text-forest">
            2026 AP Exam Schedule
          </h2>
          <p className="mb-7 text-sm text-text-light">
            All exams administered May 4&ndash;15, 2026. Morning sessions at
            8:00 AM, afternoon sessions at 12:00 PM local time.
          </p>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.08 }}
          className="rounded-[14px] border border-border-soft bg-card p-6 shadow-sm"
        >
          <Calendar schedule={SCHEDULE} month={MAY_2026} />
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.16 }}
          className="mt-4 rounded-xl bg-sage-pale p-[18px] text-[13px] leading-relaxed text-text-mid"
        >
          <strong className="text-forest">Late Testing:</strong> Available May
          18&ndash;22, 2026 for students with qualifying circumstances. Contact
          your AP Coordinator. Source: College Board AP Central.
        </motion.div>
      </section>
    </Shell>
  );
}
