import { useNavigate } from "react-router-dom";

const Logo = ({ size = 96, showName = false, disabled = false }) => {
    const navigate = useNavigate();

    const strokeWidth = 8;
    const radius = 8;

    const viewBoxSize = 24 + strokeWidth * 2;
    const rectSize = 24;
    const rectPosition = (viewBoxSize - rectSize) / 2;

    const outlineColor = "var(--color-teal-dark)";

    // Handle disabled state based on the PRD: "Lowered opacity".
    // Note: The `cursor-not-allowed` class is now applied conditionally.
    const disabledClasses = disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer";

    return (
        // The onClick handler is now on the parent div, which contains both the SVG and the text.
        // This ensures a click on either element triggers the navigation.
        <div
            onClick={() => {
                // Only navigate if the component is not disabled
                if (!disabled) {
                    navigate("/");
                }
            }}
            className={`
                flex items-center group
                transition-all duration-300 transform
                focus:outline-none focus:ring-0
                ${disabledClasses}
            `}
            style={{
                gap: `${size * 0.15}px`,
            }}
            tabIndex={disabled ? -1 : 0} // Disable keyboard focus if the component is disabled.
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                width={size}
                height={size}
                className={`
                    flex-shrink-0
                    transition-all duration-300
                    ${!disabled && "group-hover:scale-110 group-hover:drop-shadow-lg"}
                `}
            >
                <rect
                    x={rectPosition}
                    y={rectPosition}
                    width={rectSize}
                    height={rectSize}
                    rx={radius}
                    ry={radius}
                    stroke={outlineColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
            </svg>
            {showName && (
                <span
                    className={`
                        text-[var(--color-dark-charcoal)] font-sans font-bold
                        transition-transform duration-300 ease-in-out
                        text-base md:text-xl lg:text-2xl
                    `}
                    style={{
                        fontSize: `${size * 0.4}px`,
                    }}
                >
                    OfferGauge
                </span>
            )}
        </div>
    );
};

export default Logo;
