export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border px-7 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-[15px] font-semibold text-forest">
            AP Learning Center
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-light">
            Not affiliated with or endorsed by the College Board. AP is a
            registered trademark of the College Board.
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
