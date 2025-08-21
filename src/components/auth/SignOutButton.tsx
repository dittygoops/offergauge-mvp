import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface SignOutButtonProps {
    className?: string;
}

const SignOutButton = ({ className = "" }: SignOutButtonProps) => {
    const [loading, setLoading] = useState(false);
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            setLoading(true);
            await signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={loading}
            className={`text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            style={{
                backgroundColor: "var(--color-terracotta)",
            }}
            onMouseEnter={(e) => {
                if (!loading) {
                    e.currentTarget.style.backgroundColor = "var(--color-terracotta-dark)";
                }
            }}
            onMouseLeave={(e) => {
                if (!loading) {
                    e.currentTarget.style.backgroundColor = "var(--color-terracotta)";
                }
            }}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin inline-block mr-2" />
                    Signing out...
                </>
            ) : (
                "Sign Out"
            )}
        </button>
    );
};

export default SignOutButton;
