import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FormDataProvider } from "./contexts/FormDataContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { FinancialOverviewPage } from "./pages/FinancialOverviewPage";
import { BusinessInformationPage } from "./pages/BusinessInformationPage";
import { ResultsDashboard } from "./pages/ResultsDashboard";

function App() {
    return (
        <AuthProvider>
            <FormDataProvider>
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/auth" element={<Auth />} />

                        {/* Protected Routes */}
                        <Route
                            path="/*"
                            element={
                                <ProtectedRoute>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="financial-overview"
                                            element={<FinancialOverviewPage />}
                                        />
                                        <Route
                                            path="business-information"
                                            element={
                                                <BusinessInformationPage />
                                            }
                                        />
                                        <Route
                                            path="results-dashboard"
                                            element={<ResultsDashboard />}
                                        />
                                    </Routes>
                                </ProtectedRoute>
                            }
                        />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </FormDataProvider>
        </AuthProvider>
    );
}

export default App;
