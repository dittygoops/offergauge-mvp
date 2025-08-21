import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Auth from "./pages/Auth/Auth";
import FinancialOverview from "./pages/FinancialOverview/FinancialOverview";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route
                        path="/financial-overview"
                        element={<FinancialOverview />}
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
