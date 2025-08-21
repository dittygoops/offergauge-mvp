import Logo from "../components/Logo";
import SignOutButton from "./auth/SignOutButton";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - Logo and Brand */}
                    <div className="flex items-center space-x-3">
                        <Logo size={32} showName={false} disabled={false} />
                        <span className="text-xl font-semibold text-gray-900">
                            Offer Gauge
                        </span>
                    </div>

                    {/* Right side - Auth buttons */}
                    <div className="flex items-center space-x-4">
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                        ) : user ? (
                            // Show greeting and Sign Out button when user is logged in
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">
                                    Hello, {user.user_metadata?.full_name || user.email}
                                </span>
                                <SignOutButton />
                            </div>
                        ) : (
                            // Show Login and Sign Up buttons when user is not logged in
                            <>
                                <button
                                    className="px-3 py-2 text-sm font-medium transition-colors"
                                    style={{
                                        color: "var(--color-teal)",
                                    }}
                                    onMouseEnter={(e) =>
                                    (e.currentTarget.style.color =
                                        "var(--color-teal-dark)")
                                    }
                                    onMouseLeave={(e) =>
                                    (e.currentTarget.style.color =
                                        "var(--color-teal)")
                                    }
                                    onClick={() => navigate("/auth")}
                                >
                                    Login
                                </button>
                                <button
                                    className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    style={{
                                        backgroundColor: "var(--color-terracotta)",
                                    }}
                                    onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "var(--color-terracotta-dark)")
                                    }
                                    onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "var(--color-terracotta)")
                                    }
                                    onClick={() => navigate("/auth")}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
