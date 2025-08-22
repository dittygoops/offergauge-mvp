import { useState, useEffect } from "react";
import { useFormData } from "../contexts/FormDataContext";
import Toast from "./Toast";

interface InputField {
    icon: React.ReactNode;
    title: string;
    description: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
}

interface InputFormProps {
    title: string;
    inputFields: InputField[];
    layout?: "row" | "column";
    gridCols?: number;
    onValuesChange?: (values: { [key: string]: string }) => void;
    fieldErrors?: { [key: string]: boolean };
}

function InputForm({
    title,
    inputFields,
    layout = "column",
    gridCols = 2,
    onValuesChange,
    fieldErrors,
}: InputFormProps) {
    const { formData, updateFormData } = useFormData();
    const [values, setValues] = useState<{ [key: string]: string }>({});
    const [toast, setToast] = useState({ isVisible: false, message: "" });

    // Generate standardized keys from field titles
    const getFieldKey = (title: string): keyof typeof formData => {
        // Convert "Business Name" -> "business-name"
        const standardizedKey = title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '') as keyof typeof formData;
        
        return standardizedKey;
    };

    // Sync local values with global form data
    useEffect(() => {
        const newValues: { [key: string]: string } = {};
        inputFields.forEach((field, index) => {
            const fieldKey = getFieldKey(field.title);
            const globalValue = formData[fieldKey];
            if (globalValue !== undefined) {
                // Convert all values to strings for local state
                newValues[index] = String(globalValue || '');
            }
        });
        setValues(newValues);
    }, [formData, inputFields]);

    const validateAndFormatNumber = (value: string): number | null => {
        // Remove commas and spaces
        const cleanValue = value.replace(/[, ]/g, '');
        
        // Check if it's a valid number
        if (cleanValue === '' || cleanValue === '-') {
            return null;
        }
        
        const numValue = parseFloat(cleanValue);
        if (isNaN(numValue)) {
            return null;
        }
        
        return numValue;
    };

    const validateInput = (value: string, fieldTitle: string, type?: string): boolean => {
        if (type === "number") {
            // For numeric fields, validate it's a valid float
            const numValue = validateAndFormatNumber(value);
            if (numValue === null) {
                setToast({
                    isVisible: true,
                    message: `${fieldTitle} must be a valid number`,
                });
                return false;
            }
        } else {
            // For text fields (like business name), validate it's a non-empty string
            if (!value.trim()) {
                setToast({
                    isVisible: true,
                    message: `${fieldTitle} cannot be empty`,
                });
                return false;
            }
        }
        return true;
    };

    const handleInputChange = (index: number, value: string, type?: string) => {
        const fieldTitle = inputFields[index].title;
        
        let processedValue: string | number | null = value;

        if (type === "number") {
            // For numbers, validate and convert to float
            const numValue = validateAndFormatNumber(value);
            processedValue = numValue;
            
            // Update local state with formatted display value
            const displayValue = value === '' ? '' : value.replace(/[^0-9.,-]/g, '');
            setValues(prev => ({
                ...prev,
                [index]: displayValue
            }));
        } else {
            // For text fields (like business name), keep as string
            processedValue = value;
            setValues(prev => ({
                ...prev,
                [index]: value
            }));
        }
        
        // Update global form data
        const fieldKey = getFieldKey(fieldTitle);
        updateFormData(fieldKey, processedValue);
        
        if (onValuesChange) {
            // Convert all values to strings for the callback
            const stringValues: { [key: string]: string } = {};
            Object.keys(values).forEach(key => {
                stringValues[key] = String(values[key] || '');
            });
            onValuesChange(stringValues);
        }
    };

    const handleInputBlur = (index: number, value: string, type?: string) => {
        const fieldTitle = inputFields[index].title;
        
        // Validate input when user leaves the field
        if (value.trim()) { // Only validate if there's a value
            validateInput(value, fieldTitle, type);
        }
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
                                {field.required && (
                                    <span className="text-red-500 ml-1">*</span>
                                )}
                            </h4>
                        </div>

                        <div className="relative">
                            {field.type === "number" && (
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                    $
                                </span>
                            )}
                            <input
                                type="text"
                                placeholder={field.placeholder || ""}
                                value={values[index] || ""}
                                onKeyDown={(e) => {
                                    if (field.type === "number") {
                                        // Allow: backspace, delete, tab, escape, enter, numbers, comma, period, minus
                                        const allowedKeys = [
                                            'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                                            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
                                        ];
                                        const isNumber = /[0-9]/.test(e.key);
                                        const isAllowed = allowedKeys.includes(e.key) || isNumber || 
                                                         e.key === ',' || e.key === '.' || e.key === '-';
                                        
                                        if (!isAllowed) {
                                            e.preventDefault();
                                        }
                                    }
                                }}
                                onChange={(e) =>
                                    handleInputChange(
                                        index,
                                        e.target.value,
                                        field.type,
                                    )
                                }
                                onBlur={(e) =>
                                    handleInputBlur(
                                        index,
                                        e.target.value,
                                        field.type,
                                    )
                                }
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm ${
                                    field.required && fieldErrors && fieldErrors[field.title] 
                                        ? "border-red-500" 
                                        : "border-gray-300"
                                } ${field.type === "number" ? "pl-8" : ""}`}
                                style={{ backgroundColor: "var(--color-white)" }}
                            />
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed text-left">
                            {field.description}
                        </p>
                    </div>
                ))}
            </div>
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
}

export default InputForm;
