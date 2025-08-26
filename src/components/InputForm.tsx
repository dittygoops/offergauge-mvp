import { useState, useEffect, useRef } from "react";
import { useFormData } from "../contexts/FormDataContext";
import Toast from "./Toast";
import { DollarSign } from "lucide-react";

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
    const [fieldValidatonErrors, setFieldValidationErrors] = useState<{
        [key: number]: string;
    }>({});

    // Use ref to track if we're currently updating from user input
    const isUpdatingFromInput = useRef(false);
    const lastFormDataRef = useRef(formData);

    // Generate standardized keys from field titles
    const getFieldKey = (title: string): keyof typeof formData => {
        // Convert "Asking Price" -> "askingPrice"
        // Handle special cases for CAPEX fields
        if (title === "CAPEX (Maintenance)") {
            return "capexMaintenance" as keyof typeof formData;
        }
        if (title === "CAPEX (New Investments)") {
            return "capexNewInvestments" as keyof typeof formData;
        }

        const standardizedKey = title
            .toLowerCase()
            .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
            .replace(/[^a-zA-Z0-9]/g, "") as keyof typeof formData;

        return standardizedKey;
    };

    // Sync local values with global form data - only when formData changes from external sources
    useEffect(() => {
        // Skip if we're updating from user input
        if (isUpdatingFromInput.current) {
            isUpdatingFromInput.current = false;
            return;
        }

        // Check if formData actually changed
        if (lastFormDataRef.current === formData) {
            return;
        }

        const newValues: { [key: string]: string } = {};

        inputFields.forEach((field, index) => {
            const fieldKey = getFieldKey(field.title);
            const globalValue = formData[fieldKey];
            const currentLocalValue = values[index];

            if (globalValue !== undefined) {
                let formattedValue: string;

                // For number fields, format with commas for display
                if (
                    field.type === "number" &&
                    globalValue !== null &&
                    globalValue !== ""
                ) {
                    formattedValue = formatNumberWithCommas(
                        String(globalValue),
                    );
                } else {
                    // Convert all values to strings for local state
                    formattedValue = String(globalValue || "");
                }

                // Only update if the value is actually different
                if (currentLocalValue !== formattedValue) {
                    newValues[index] = formattedValue;
                } else {
                    // Keep existing local value
                    newValues[index] = currentLocalValue || "";
                }
            } else {
                // Keep existing local value if no global value
                newValues[index] = currentLocalValue || "";
            }
        });

        // Update state with new values
        setValues((prevValues) => ({ ...prevValues, ...newValues }));
        lastFormDataRef.current = formData;
    }, [formData, inputFields]); // Keep dependencies but add logic to prevent unnecessary updates

    // Initial sync - only run once when component mounts
    useEffect(() => {
        const initialValues: { [key: string]: string } = {};

        inputFields.forEach((field, index) => {
            const fieldKey = getFieldKey(field.title);
            const globalValue = formData[fieldKey];

            if (globalValue !== undefined) {
                if (
                    field.type === "number" &&
                    globalValue !== null &&
                    globalValue !== ""
                ) {
                    initialValues[index] = formatNumberWithCommas(
                        String(globalValue),
                    );
                } else {
                    initialValues[index] = String(globalValue || "");
                }
            } else {
                initialValues[index] = "";
            }
        });

        setValues(initialValues);
        lastFormDataRef.current = formData;
    }, []); // Empty dependency array - only run once

    const validateAndFormatNumber = (value: string): number | null => {
        // Remove commas and spaces
        const cleanValue = value.replace(/[, ]/g, "");

        // Check if it's a valid number (allow 0)
        if (cleanValue === "" || cleanValue === "-") {
            return null;
        }

        const numValue = parseFloat(cleanValue);
        if (isNaN(numValue)) {
            return null;
        }

        return numValue;
    };

    const formatNumberWithCommas = (value: string): string => {
        // Remove all non-numeric characters except decimal point
        const cleanValue = value.replace(/[^0-9.]/g, "");

        // Handle empty or invalid input
        if (!cleanValue) return "";

        // Check if the original value ended with a decimal point
        const endsWithDecimal = value.endsWith(".");

        // Handle multiple decimal points - keep only the first one
        const decimalIndex = cleanValue.indexOf(".");
        let processedValue = cleanValue;
        if (decimalIndex !== -1) {
            const beforeDecimal = cleanValue.substring(0, decimalIndex);
            const afterDecimal = cleanValue
                .substring(decimalIndex + 1)
                .replace(/\./g, "");
            processedValue = beforeDecimal + "." + afterDecimal;
        }

        // Split by decimal point
        const parts = processedValue.split(".");

        // Format the integer part with commas
        let integerPart = parts[0];
        if (integerPart.length > 3) {
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        // Return formatted number
        if (parts.length > 1) {
            // Has decimal part
            return `${integerPart}.${parts[1]}`;
        } else if (endsWithDecimal) {
            // User just typed a decimal point
            return `${integerPart}.`;
        } else {
            // No decimal
            return integerPart;
        }
    };

    const validateInput = (
        value: string,
        fieldTitle: string,
        type?: string,
        fieldIndex?: number,
    ): boolean => {
        if (type === "number") {
            // For numeric fields, validate it's a valid float (allow 0)
            const numValue = validateAndFormatNumber(value);
            if (value.trim() && numValue === null) {
                const errorMessage = `${fieldTitle} must be a valid number`;
                if (fieldIndex !== undefined) {
                    setFieldValidationErrors((prev) => ({
                        ...prev,
                        [fieldIndex]: errorMessage,
                    }));
                }
                setToast({
                    isVisible: true,
                    message: errorMessage,
                });
                return false;
            } else {
                // Clear error if validation passes (including for 0)
                if (fieldIndex !== undefined) {
                    setFieldValidationErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors[fieldIndex];
                        return newErrors;
                    });
                }
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
            // For numbers, store the numeric value without commas
            const numValue = validateAndFormatNumber(value);
            processedValue = numValue;

            // Keep the formatted display value in local state
            setValues((prev) => ({
                ...prev,
                [index]: value, // Keep the formatted value for display
            }));
        } else {
            // For text fields (like business name), keep as string
            processedValue = value;
            setValues((prev) => ({
                ...prev,
                [index]: value,
            }));
        }

        // Set flag to prevent useEffect from overwriting local formatting
        isUpdatingFromInput.current = true;

        // Update global form data with the processed value
        const fieldKey = getFieldKey(fieldTitle);
        updateFormData(fieldKey, processedValue);

        if (onValuesChange) {
            // Convert all values to strings for the callback
            const stringValues: { [key: string]: string } = {};
            Object.keys(values).forEach((key) => {
                stringValues[key] = String(values[key] || "");
            });
            onValuesChange(stringValues);
        }
    };

    const handleInputBlur = (index: number, value: string, type?: string) => {
        const fieldTitle = inputFields[index].title;

        // Clear the flag to allow useEffect to run again
        isUpdatingFromInput.current = false;

        // Validate input when user leaves the field
        if (value.trim()) {
            // Only validate if there's a value
            validateInput(value, fieldTitle, type, index);
        } else {
            // Clear validation error if field is empty
            setFieldValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[index];
                return newErrors;
            });
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

                        {field.type === "number" ? (
                            <div className={`space-y-2`}>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder={
                                                field.placeholder || ""
                                            }
                                            value={values[index] || ""}
                                            onChange={(e) => {
                                                const inputValue =
                                                    e.target.value;

                                                // Allow only numbers, commas, and decimal points
                                                const allowedChars =
                                                    /[^0-9.,]/g;
                                                const cleanedValue =
                                                    inputValue.replace(
                                                        allowedChars,
                                                        "",
                                                    );

                                                // Format the display value with commas
                                                const formattedValue =
                                                    formatNumberWithCommas(
                                                        cleanedValue,
                                                    );

                                                handleInputChange(
                                                    index,
                                                    formattedValue,
                                                    field.type,
                                                );
                                            }}
                                            onBlur={(e) =>
                                                handleInputBlur(
                                                    index,
                                                    e.target.value,
                                                    field.type,
                                                )
                                            }
                                            data-field={field.title}
                                            className={`w-full pl-10 pr-4 py-4 bg-white border-2 rounded-lg text-[var(--color-slate-gray)] placeholder-[var(--color-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:border-transparent transition-all duration-200 min-h-[56px] ${
                                                fieldValidatonErrors[index] ||
                                                (fieldErrors &&
                                                    fieldErrors[field.title])
                                                    ? "border-[var(--color-terracotta)]"
                                                    : "border-[var(--color-gray-light)]"
                                            }`}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                                            <DollarSign className="w-5 h-5 text-[var(--color-gray)]" />
                                        </div>
                                    </div>
                                    {(fieldValidatonErrors[index] ||
                                        (fieldErrors &&
                                            fieldErrors[field.title])) && (
                                        <p className="text-sm text-[var(--color-terracotta)] flex items-center space-x-1">
                                            <span>⚠</span>
                                            <span>
                                                {fieldValidatonErrors[index] ||
                                                    "This field is required"}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
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
                                    onBlur={(e) =>
                                        handleInputBlur(
                                            index,
                                            e.target.value,
                                            field.type,
                                        )
                                    }
                                    data-field={field.title}
                                    className={`w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors text-sm ${
                                        fieldValidatonErrors[index] ||
                                        (fieldErrors &&
                                            fieldErrors[field.title])
                                            ? "border-[var(--color-terracotta)]"
                                            : "border-[var(--color-gray-light)]"
                                    }`}
                                    style={{
                                        backgroundColor: "var(--color-white)",
                                    }}
                                />
                                {(fieldValidatonErrors[index] ||
                                    (fieldErrors &&
                                        fieldErrors[field.title])) && (
                                    <p className="text-sm text-[var(--color-terracotta)] flex items-center space-x-1">
                                        <span>⚠</span>
                                        <span>
                                            {fieldValidatonErrors[index] ||
                                                "This field is required"}
                                        </span>
                                    </p>
                                )}
                            </div>
                        )}

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
