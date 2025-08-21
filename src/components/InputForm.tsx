import { useState } from "react";

interface InputField {
    icon: React.ReactNode;
    title: string;
    description: string;
    placeholder?: string;
    type?: string;
}

interface InputFormProps {
    title: string;
    inputFields: InputField[];
    layout?: "row" | "column";
    gridCols?: number;
}

function InputForm({
    title,
    inputFields,
    layout = "column",
    gridCols = 2,
}: InputFormProps) {
    const [values, setValues] = useState<{ [key: string]: string }>({});

    const formatNumber = (value: string): string => {
        // Remove all non-digit characters
        const numericValue = value.replace(/\D/g, "");
        // Add commas for thousands
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleInputChange = (index: number, value: string, type?: string) => {
        let formattedValue = value;

        if (type === "number") {
            formattedValue = formatNumber(value);
        }

        setValues((prev) => ({
            ...prev,
            [index]: formattedValue,
        }));
    };

    return (
        <div
            className="rounded-lg p-6 transition-shadow hover:shadow-lg"
            style={{
                backgroundColor: "var(--color-white)",
                border: "2px solid var(--color-gray-light)",
            }}
        >
            <h3
                className="text-xl font-semibold mb-4 text-left"
                style={{ color: "var(--color-teal)" }}
            >
                {title}
            </h3>

            <div
                className={`space-y-4 ${layout === "row" ? `grid grid-cols-1 md:grid-cols-${gridCols} gap-4` : ""}`}
            >
                {inputFields.map((field, index) => (
                    <div
                        key={index}
                        className={`space-y-2 ${layout === "row" ? "min-w-0" : ""}`}
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6">
                                {field.icon}
                            </div>
                            <h4 className="text-base font-medium text-gray-900">
                                {field.title}
                            </h4>
                        </div>

                        <input
                            type="text"
                            placeholder={field.placeholder || ""}
                            value={values[index] || ""}
                            onChange={(e) =>
                                handleInputChange(
                                    index,
                                    e.target.value,
                                    field.type,
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm"
                            style={{ backgroundColor: "var(--color-white)" }}
                        />

                        <p className="text-xs text-gray-600 leading-relaxed text-left">
                            {field.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InputForm;
