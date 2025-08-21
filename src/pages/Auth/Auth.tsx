import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ContinueWithGoogleButton from "../../components/auth/ContinueWithGoogleButton";
import Logo from "../../components/Logo";

function Auth() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            navigate("/");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center bg-white p-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-8">
                            <Logo showName={true} size={64} />
                        </div>

                        <h1
                            className="text-3xl font-bold mb-4"
                            style={{ color: "var(--color-dark-charcoal)" }}
                        >
                            Welcome
                        </h1>
                        <p
                            className="text-lg leading-relaxed mb-8"
                            style={{ color: "var(--color-gray)" }}
                        >
                            Authenticate with Google so we can save your
                            analysis and send you insights about your deal
                            evaluation.
                        </p>
                    </div>

                    <div className="mt-8">
                        <ContinueWithGoogleButton
                            redirectTo={window.location.origin}
                        />
                    </div>
                </div>
            </div>

            {/* Right Side - Teal Gradient with Graphics */}
            <div
                className="flex-1 relative overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, var(--color-teal-gradient-start) 0%, var(--color-teal-gradient-end) 100%)`,
                }}
            >
                {/* Desktop Graphics */}
                <div className="hidden lg:flex flex-col items-center justify-center h-full text-white p-12">
                    {/* Line Chart Icon */}
                    <div className="mb-8">
                        <div
                            className="w-24 h-24 rounded-full bg-opacity-20 flex items-center justify-center mb-6"
                            style={{
                                background: `var(--color-teal-dark)`,
                            }}
                        >
                            <svg
                                className="w-12 h-12"
                                style={{
                                    color: `var(--color-white)`,
                                }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M7 17l4-4 4 4 6-6"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17 7h4v4"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title and Description */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-6">
                            Smart Deal Analysis
                        </h2>
                        <p
                            className="text-xl text-opacity-90 leading-relaxed max-w-md"
                            style={{
                                color: `var(--color-light-beige)`,
                            }}
                        >
                            Get instant insights into deal viability, financing
                            optimization, and risk assessment with our
                            AI-powered platform.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                        <div
                            className="bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center"
                            style={{
                                background: `var(--color-teal)`,
                            }}
                        >
                            <div className="text-3xl font-bold">500+</div>
                            <div className="text-sm text-white text-opacity-80">
                                Deals Analyzed
                            </div>
                        </div>
                        <div
                            className=" bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center"
                            style={{
                                background: `var(--color-teal)`,
                            }}
                        >
                            <div className="text-3xl font-bold">95%</div>
                            <div className="text-sm text-white text-opacity-80">
                                Accuracy Rate
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile - Single Icon Below Form */}
                <div className="lg:hidden flex justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
