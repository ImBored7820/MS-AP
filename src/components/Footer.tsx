export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-[15px] font-semibold text-forest">
            AP Learning Center
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-light">
            Exam dates and course info sourced from College Board. Not
            affiliated with or endorsed by College Board.
          </p>
        </div>

        <div className="text-right text-xs text-text-light">
          <p className="font-medium text-text-mid">
            2026 AP Exams: May 4&ndash;15
          </p>
          <p className="mt-1">&copy; Musa Ali 2026</p>
        </div>
      </div>
    </footer>
  );
}
