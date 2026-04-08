import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportUnitAsPdf(
  courseSlug: string,
  unitNumber: string,
  unitTitle: string,
  files: string[],
): Promise<void> {
  // Fetch all markdown files
  const contents: string[] = [];
  for (const file of files) {
    const res = await fetch(`/content/${courseSlug}/Unit-${unitNumber}/${file}`);
    if (res.ok) {
      contents.push(await res.text());
    }
  }

  if (contents.length === 0) return;

  // Create off-screen container
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "800px";
  container.style.padding = "40px";
  container.style.background = "#F7F6F1";
  container.style.fontFamily = "'Outfit', sans-serif";
  container.style.color = "#2C3A1E";
  container.style.fontSize = "15px";
  container.style.lineHeight = "1.75";
  document.body.appendChild(container);

  // Title page section
  const titleDiv = document.createElement("div");
  titleDiv.style.marginBottom = "32px";
  titleDiv.innerHTML = `
    <h1 style="font-family: 'Fraunces', serif; color: #40531B; font-size: 28px; font-weight: 500; margin-bottom: 8px;">
      ${courseSlug.replace(/-/g, " ")}
    </h1>
    <h2 style="font-family: 'Fraunces', serif; color: #40531B; font-size: 20px; font-weight: 500; margin-bottom: 16px;">
      Unit ${unitNumber}: ${unitTitle}
    </h2>
    <hr style="border: none; border-top: 2px solid #D4E4CC; margin: 0;" />
  `;
  container.appendChild(titleDiv);

  // Render each markdown file's content as HTML
  for (let idx = 0; idx < contents.length; idx++) {
    if (idx > 0) {
      const divider = document.createElement("hr");
      divider.style.border = "none";
      divider.style.borderTop = "1px solid #D4E4CC";
      divider.style.margin = "24px 0";
      container.appendChild(divider);
    }

    const section = document.createElement("div");
    section.innerHTML = markdownToHtml(contents[idx]);
    container.appendChild(section);
  }

  // Render to canvas then to PDF
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#F7F6F1",
    windowWidth: 800,
  });

  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pdf = new jsPDF("p", "mm", "a4");

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${courseSlug}-Unit-${unitNumber}.pdf`);

  // Cleanup
  document.body.removeChild(container);
}

function markdownToHtml(md: string): string {
  let html = "";
  const lines = md.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++;
      html += `<pre style="background:#F0EFE7;border:1px solid #DDE5D6;border-radius:12px;padding:16px;font-size:13px;font-family:'Courier New',monospace;overflow-x:auto;margin:16px 0;line-height:1.6"><code>${codeLines.join("\n")}</code></pre>`;
      continue;
    }

    // Headings
    const h3 = line.match(/^###\s+(.+)/);
    if (h3) {
      html += `<h3 style="font-family:'Outfit',sans-serif;color:#40531B;font-size:16px;font-weight:600;margin-bottom:8px;margin-top:24px">${inlineMarkdown(h3[1])}</h3>`;
      i++;
      continue;
    }
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      html += `<h2 style="font-family:'Fraunces',serif;color:#40531B;font-size:22px;font-weight:500;margin-bottom:12px;margin-top:32px;padding-bottom:8px;border-bottom:1px solid #DDE5D6">${inlineMarkdown(h2[1])}</h2>`;
      i++;
      continue;
    }
    const h1 = line.match(/^#\s+(.+)/);
    if (h1) {
      html += `<h1 style="font-family:'Fraunces',serif;color:#40531B;font-size:32px;font-weight:500;margin-bottom:16px;margin-top:0">${inlineMarkdown(h1[1])}</h1>`;
      i++;
      continue;
    }

    // HR
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
      html += `<hr style="border:none;border-top:1px solid #DDE5D6;margin:32px 0" />`;
      i++;
      continue;
    }

    // Blockquote
    if (line.trimStart().startsWith("> ")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("> ")) {
        bqLines.push(inlineMarkdown(lines[i].trimStart().slice(2)));
        i++;
      }
      html += `<blockquote style="border-left:3px solid #D4E4CC;padding-left:16px;color:#5A6B4D;font-style:italic;margin:16px 0">${bqLines.map((l) => `<p>${l}</p>`).join("")}</blockquote>`;
      continue;
    }

    // UL
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(inlineMarkdown(lines[i].replace(/^\s*[-*+]\s+/, "")));
        i++;
      }
      html += `<ul style="list-style-type:disc;padding-left:20px;margin-bottom:16px">${items.map((it) => `<li style="margin-bottom:4px">${it}</li>`).join("")}</ul>`;
      continue;
    }

    // OL
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(inlineMarkdown(lines[i].replace(/^\s*\d+\.\s+/, "")));
        i++;
      }
      html += `<ol style="list-style-type:decimal;padding-left:20px;margin-bottom:16px">${items.map((it) => `<li style="margin-bottom:4px">${it}</li>`).join("")}</ol>`;
      continue;
    }

    // Table
    if (
      i + 1 < lines.length &&
      line.includes("|") &&
      /^\|?\s*-+/.test(lines[i + 1].trim())
    ) {
      const parseRow = (r: string) =>
        r
          .split("|")
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
      const headers = parseRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(parseRow(lines[i]));
        i++;
      }
      html += `<table style="width:100%;border-collapse:collapse;margin-bottom:16px"><thead><tr>${headers.map((h) => `<th style="background:#EBF2E6;color:#40531B;font-weight:600;border:1px solid #DDE5D6;padding:8px 12px;font-size:14px;text-align:left">${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td style="border:1px solid #DDE5D6;padding:8px 12px;font-size:14px">${inlineMarkdown(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
      continue;
    }

    // Paragraph
    html += `<p style="margin-bottom:16px">${inlineMarkdown(line)}</p>`;
    i++;
  }

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineMarkdown(text: string): string {
  let result = escapeHtml(text);
  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#2C3A1E;font-weight:600">$1</strong>');
  result = result.replace(/__(.+?)__/g, '<strong style="color:#2C3A1E;font-weight:600">$1</strong>');
  // Italic
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  result = result.replace(/_(.+?)_/g, "<em>$1</em>");
  // Inline code
  result = result.replace(
    /`([^`]+)`/g,
    '<code style="background:#EBF2E6;color:#40531B;border-radius:6px;padding:2px 6px;font-size:13px;font-family:\'Courier New\',monospace">$1</code>',
  );
  // Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color:#618B4A;text-decoration:underline">$1</a>',
  );
  return result;
}
