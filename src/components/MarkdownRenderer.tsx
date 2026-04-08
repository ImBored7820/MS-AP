import React, { useMemo } from "react";
import { C } from "../lib/colors";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface MarkdownRendererProps {
  content: string;
}

// Inline markup: bold, italic, code, links, images
function renderInline(text: string): (string | React.ReactNode)[] {
  const parts: (string | React.ReactNode)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Image: ![alt](src)
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      parts.push(
        <img
          key={key++}
          src={imgMatch[2]}
          alt={imgMatch[1]}
          style={{ borderRadius: 12, maxWidth: "100%", margin: "16px 0" }}
        />,
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: C.sage, textDecoration: "none", transition: "all 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {linkMatch[1]}
        </a>,
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code
          key={key++}
          style={{
            background: C.sagePale,
            color: C.forest,
            borderRadius: 6,
            padding: "2px 6px",
            fontSize: 13,
            fontFamily: "'Courier New', Courier, monospace",
          }}
        >
          {codeMatch[1]}
        </code>,
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Bold+Italic: ***text*** or ___text___
    const biMatch = remaining.match(/^(\*\*\*|___)(.+?)\1/);
    if (biMatch) {
      parts.push(
        <strong key={key++} style={{ color: C.text, fontWeight: 600, fontStyle: "italic" }}>
          {biMatch[2]}
        </strong>,
      );
      remaining = remaining.slice(biMatch[0].length);
      continue;
    }

    // Bold: **text** or __text__
    const boldMatch = remaining.match(/^(\*\*|__)(.+?)\1/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} style={{ color: C.text, fontWeight: 600 }}>
          {boldMatch[2]}
        </strong>,
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic: *text* or _text_
    const italicMatch = remaining.match(/^(\*|_)(.+?)\1/);
    if (italicMatch) {
      parts.push(<em key={key++}>{italicMatch[2]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Plain text: consume up to the next special character
    const nextSpecial = remaining.slice(1).search(/[*_`!\[]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    }
    parts.push(remaining.slice(0, nextSpecial + 1));
    remaining = remaining.slice(nextSpecial + 1);
  }

  return parts;
}

type Block =
  | { type: "h1"; text: string; id: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; lines: string[] }
  | { type: "code"; lang: string; content: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "hr" }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; alt: string; src: string };

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", lang, content: codeLines.join("\n") });
      continue;
    }

    // Headings
    const h3 = line.match(/^###\s+(.+)/);
    if (h3) {
      blocks.push({ type: "h3", text: h3[1].trim(), id: slugify(h3[1]) });
      i++;
      continue;
    }
    const h2 = line.match(/^##\s+(.+)/);
    if (h2) {
      blocks.push({ type: "h2", text: h2[1].trim(), id: slugify(h2[1]) });
      i++;
      continue;
    }
    const h1 = line.match(/^#\s+(.+)/);
    if (h1) {
      blocks.push({ type: "h1", text: h1[1].trim(), id: slugify(h1[1]) });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Image on its own line
    const imgLine = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgLine) {
      blocks.push({ type: "image", alt: imgLine[1], src: imgLine[2] });
      i++;
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
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(parseRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    // Blockquote
    if (line.trimStart().startsWith("> ")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("> ")) {
        bqLines.push(lines[i].trimStart().slice(2));
        i++;
      }
      blocks.push({ type: "blockquote", lines: bqLines });
      continue;
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,3}\s/.test(lines[i]) &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trimStart().startsWith("> ") &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i].trim()) &&
      !lines[i].includes("|")
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", text: paraLines.join(" ") });
  }

  return blocks;
}

const headingScroll: React.CSSProperties = { scrollMarginTop: 80 };

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = useMemo(() => parseBlocks(content), [content]);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", color: C.textMid, fontSize: 15, lineHeight: 1.75 }}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h1":
            return (
              <h1
                key={idx}
                id={block.id}
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: C.forest,
                  fontSize: 32,
                  fontWeight: 500,
                  marginBottom: 16,
                  marginTop: 0,
                  ...headingScroll,
                }}
              >
                {block.text}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={idx}
                id={block.id}
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: C.forest,
                  fontSize: 22,
                  fontWeight: 500,
                  marginBottom: 12,
                  marginTop: 32,
                  paddingBottom: 8,
                  borderBottom: `1px solid ${C.border}`,
                  ...headingScroll,
                }}
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                id={block.id}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: C.forest,
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 8,
                  marginTop: 24,
                  ...headingScroll,
                }}
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={idx} style={{ marginBottom: 16 }}>
                {renderInline(block.text)}
              </p>
            );
          case "blockquote":
            return (
              <blockquote
                key={idx}
                style={{
                  borderLeft: `3px solid ${C.sageLight}`,
                  paddingLeft: 16,
                  color: C.textMid,
                  fontStyle: "italic",
                  margin: "16px 0",
                }}
              >
                {block.lines.map((l, j) => (
                  <p key={j} style={{ marginBottom: j < block.lines.length - 1 ? 8 : 0 }}>
                    {renderInline(l)}
                  </p>
                ))}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={idx}
                style={{
                  background: C.bgWarm,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: 16,
                  fontSize: 13,
                  fontFamily: "'Courier New', Courier, monospace",
                  overflowX: "auto",
                  margin: "16px 0",
                  lineHeight: 1.6,
                }}
              >
                <code>{block.content}</code>
              </pre>
            );
          case "ul":
            return (
              <ul
                key={idx}
                style={{
                  listStyleType: "disc",
                  paddingLeft: 20,
                  marginBottom: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={idx}
                style={{
                  listStyleType: "decimal",
                  paddingLeft: 20,
                  marginBottom: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={idx} style={{ overflowX: "auto", marginBottom: 16 }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          style={{
                            background: C.sagePale,
                            color: C.forest,
                            fontWeight: 600,
                            border: `1px solid ${C.border}`,
                            padding: "8px 12px",
                            fontSize: 14,
                            textAlign: "left",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            style={{
                              border: `1px solid ${C.border}`,
                              padding: "8px 12px",
                              fontSize: 14,
                            }}
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "hr":
            return (
              <hr
                key={idx}
                style={{
                  border: "none",
                  borderTop: `1px solid ${C.border}`,
                  margin: "32px 0",
                }}
              />
            );
          case "image":
            return (
              <img
                key={idx}
                src={block.src}
                alt={block.alt}
                style={{
                  borderRadius: 12,
                  maxWidth: "100%",
                  margin: "16px 0",
                  display: "block",
                }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
