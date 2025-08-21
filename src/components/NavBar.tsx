import Logo from "../components/Logo";

import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    
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
                            onClick={() => navigate("/login")}
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
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
