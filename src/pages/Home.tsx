import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Dashboard
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Welcome to your dashboard!
                    </p>

                    <button
                        onClick={() => navigate("/business-information")}
                        className="font-medium py-2 px-4 rounded-lg transition-colors"
                        style={{
                            backgroundColor: "var(--color-teal)",
                            color: "var(--color-white)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-teal-dark)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-teal)";
                        }}
                    >
                        Get Started with Deal Analysis
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Home;
