import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "../icons/ArrowRightIcon";

interface ButtonProps {
    navigate: string;
    text: string;
}

function Button({ navigate, text }: ButtonProps) {
    const navigateHook = useNavigate();

    return (
        <button
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white rounded-md transition-all duration-300 cursor-pointer group"
            style={{ backgroundColor: "var(--color-terracotta)" }}
            onClick={() => navigateHook(navigate)}
            onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                    "var(--color-terracotta-dark)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                    "var(--color-terracotta)")
            }
        >
            {text}
            <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
    );
}

export default Button;
