import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import FinancialOverview from "./pages/FinancialOverview/FinancialOverview";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route
                        path="/financial-overview"
                        element={<FinancialOverview />}
                    />

                    {/* Protected Routes */}
                    <Route path="/" element={<Home />} />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
