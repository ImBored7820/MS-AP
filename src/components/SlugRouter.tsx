// src/components/SlugRouter.tsx
// Handles the catch-all /:slug route.
// 1. If the slug is already a canonical course slug → render CoursePage directly.
// 2. If it matches an alias (case-insensitive) → redirect to the canonical URL.
// 3. Otherwise → render NotFoundPage.
import { useParams, Navigate } from "react-router-dom";
import { SLUG_ALIASES } from "../data/slugAliases";
import { ALL_COURSES } from "../data/categories";
import CoursePage from "../pages/CoursePage";
import NotFoundPage from "../pages/NotFoundPage";

export default function SlugRouter() {
  const { slug = "" } = useParams<{ slug: string }>();
  const lower = slug.toLowerCase();

  // Already a canonical slug — render directly (no redirect needed)
  if (ALL_COURSES.some((c) => c.slug === slug)) {
    return <CoursePage />;
  }

  // Check alias map (case-insensitive)
  const canonical = SLUG_ALIASES[lower];
  if (canonical) {
    return <Navigate replace to={`/${canonical}`} />;
  }

  return <NotFoundPage />;
}
