import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
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
          <Route path="/courses/:slug" element={<CoursePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/predictor" element={<PredictorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
