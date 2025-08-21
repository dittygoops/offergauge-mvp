interface CardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function Card({ icon, title, description }: CardProps) {
    return (
        <div
            className="rounded-lg p-6 transition-shadow hover:shadow-lg text-center"
            style={{
                backgroundColor: "var(--color-light-beige)",
                border: "2px solid var(--color-terracotta-light)",
            }}
        >
            <div
                className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg mx-auto"
                style={{ backgroundColor: "var(--color-teal)" }}
            >
                {icon}
            </div>
            <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--color-teal)" }}
            >
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

export default Card;
