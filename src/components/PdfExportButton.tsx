import { useState } from "react";
import { C } from "../lib/colors";
import { exportUnitAsPdf } from "../lib/pdfExport";

interface PdfExportButtonProps {
  courseSlug: string;
  unitNumber: string;
  unitTitle: string;
  files: string[];
}

export default function PdfExportButton({
  courseSlug,
  unitNumber,
  unitTitle,
  files,
}: PdfExportButtonProps) {
  const [generating, setGenerating] = useState(false);

  const handleExport = async () => {
    if (generating || files.length === 0) return;
    setGenerating(true);
    try {
      await exportUnitAsPdf(courseSlug, unitNumber, unitTitle, files);
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={generating}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: C.sage,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "9px 20px",
        cursor: generating ? "not-allowed" : "pointer",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        fontSize: 14,
        transition: "all 0.2s",
        opacity: generating ? 0.7 : 1,
      }}
    >
      {generating ? (
        <>
          <span
            style={{
              width: 14,
              height: 14,
              border: "2px solid #fff",
              borderTopColor: "transparent",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.8s linear infinite",
            }}
          />
          Generating PDF...
        </>
      ) : (
        <>
          <span style={{ fontSize: 16 }}>&#8595;</span>
          Download Unit PDF
        </>
      )}
    </button>
  );
}
