import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SlugRouter from "./components/SlugRouter";

const HomePage = lazy(() => import("./pages/HomePage"));
const SchedulePage = lazy(() => import("./pages/SchedulePage"));
const PredictorPage = lazy(() => import("./pages/PredictorPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const UnitPage = lazy(() => import("./pages/UnitPage"));
const ModulePage = lazy(() => import("./pages/ModulePage"));

function Loading() {
  return (
    <div className="app-loading">
      <div className="app-loading-spinner" />
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
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/:courseSlug/:unitSlug/:moduleId" element={<ModulePage />} />
          <Route path="/:courseSlug/:unitSlug" element={<UnitPage />} />
          {/* /:slug must be last — handles canonical slugs, aliases, and 404s */}
          <Route path="/:slug" element={<SlugRouter />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
