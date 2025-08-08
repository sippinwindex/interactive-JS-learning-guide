// src/front/routes.jsx
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Documentation } from "./pages/Documentation";
import { Playground } from "./pages/Playground";
import { Challenges } from "./pages/Challenges";
import { Guide } from "./pages/Guide";
import { ChallengeDetail } from "./pages/ChallengeDetail";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route path="/" element={<Home />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/challenges/:challengeId" element={<ChallengeDetail />} />
            <Route path="/guide" element={<Guide />} />
        </Route>
    )
);

// Error Page Component
function ErrorPage() {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <h2 className="mb-4">Page Not Found</h2>
                <p className="text-muted mb-4">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <a href="/" className="btn btn-primary">
                    <i className="bi bi-house me-2"></i>
                    Back to Home
                </a>
            </div>
        </div>
    );
}