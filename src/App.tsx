import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SlugRouter from "./components/SlugRouter";

const HomePage = lazy(() => import("./pages/HomePage"));
const SchedulePage = lazy(() => import("./pages/SchedulePage"));
const PredictorPage = lazy(() => import("./pages/PredictorPage"));

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-sage border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/predictor" element={<PredictorPage />} />
          {/* /:slug must be last — handles canonical slugs, aliases, and 404s */}
          <Route path="/:slug" element={<SlugRouter />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
