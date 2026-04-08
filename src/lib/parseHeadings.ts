export type Heading = {
  level: 2 | 3;
  text: string;
  id: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function parseHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const m3 = line.match(/^###\s+(.+)/);
    if (m3) {
      headings.push({ level: 3, text: m3[1].trim(), id: slugify(m3[1]) });
      continue;
    }
    const m2 = line.match(/^##\s+(.+)/);
    if (m2) {
      headings.push({ level: 2, text: m2[1].trim(), id: slugify(m2[1]) });
    }
  }
  return headings;
}
