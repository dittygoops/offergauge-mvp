import NavBar from "../../components/NavBar";
import InputForm from "../../components/InputForm";
import Toast from "../../components/Toast";
import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";

function FinancialOverview() {
    const [toast, setToast] = useState({ isVisible: false, message: "" });
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>(
        {},
    );
    const { formData, updateMultipleFields } = useFormData();

    const handleContinue = () => {
        // Get current values from global form data
        const businessName = formData["business-name"] || "";
        const askingPrice = formData["asking-price"];
        const annualRevenue = formData["annual-revenue"];
        const ebitda = formData.ebitda;
        const workingCapital = formData["working-capital"];
        const equipmentAssets = formData["equipment-assets"];
        const inventory = formData.inventory;

        console.log("Field values:", {
            "business-name": businessName,
            "asking-price": askingPrice,
            "annual-revenue": annualRevenue,
            ebitda: ebitda,
            "working-capital": workingCapital,
            "equipment-assets": equipmentAssets,
            inventory: inventory,
        });

        // Check if any required field is empty and set field errors
        const fieldErrors = {
            "Business Name": !businessName.trim(),
            "Asking Price": askingPrice === null || askingPrice === undefined,
            "Annual Revenue":
                annualRevenue === null || annualRevenue === undefined,
            EBITDA: ebitda === null || ebitda === undefined,
            "Working Capital":
                workingCapital === null || workingCapital === undefined,
        };

        const hasEmptyFields = Object.values(fieldErrors).some(
            (error) => error,
        );
        setFieldErrors(fieldErrors);

        console.log("Has empty fields:", hasEmptyFields);

        if (hasEmptyFields) {
            console.log("Setting toast to visible");
            setToast({
                isVisible: true,
                message: "Missing required fields",
            });
        } else {
            // Clear field errors and update context with all current data
            setFieldErrors({});
            const updates = {
                "business-name": businessName,
                "asking-price": askingPrice,
                "annual-revenue": annualRevenue,
                ebitda: ebitda,
                "equipment-assets": equipmentAssets,
                inventory: inventory,
                "working-capital": workingCapital,
                "price-ebitda-multiple":
                    ebitda && askingPrice ? askingPrice / ebitda : null,
            };

            updateMultipleFields(updates);
            console.log("Form data context:", formData);
            console.log("Updates:", updates);
            console.log(
                "Price/EBITDA Multiple:",
                updates["price-ebitda-multiple"],
            );

            console.log("All required fields filled, proceeding...");
            window.location.href = "/source-funds";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <NavBar />

            {/* Hero Section */}
            <div
                className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
                style={{ backgroundColor: "var(--color-light-beige)" }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h1
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
                        style={{ color: "var(--color-teal)" }}
                    >
                        Financial Overview
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Tell us about the business financials
                    </p>

                    {/* Forms Container */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Business Information Form */}
                        <div>
                            <InputForm
                                title="Business Information"
                                fieldErrors={fieldErrors}
                                inputFields={[
                                    {
                                        icon: (
                                            <span className="text-lg">🏢</span>
                                        ),
                                        title: "Business Name",
                                        description:
                                            "Name of the business you are acquiring",
                                        placeholder: "Enter business name",
                                        required: true,
                                    },
                                    {
                                        icon: (
                                            <span className="text-lg">💰</span>
                                        ),
                                        title: "Asking Price",
                                        description:
                                            "The total purchase price for the business",
                                        placeholder: "Enter asking price",
                                        type: "number",
                                        required: true,
                                    },
                                ]}
                            />
                        </div>

                        {/* Financial Performance Form */}
                        <div>
                            <InputForm
                                title="Financial Performance"
                                fieldErrors={fieldErrors}
                                inputFields={[
                                    {
                                        icon: (
                                            <span className="text-lg">📊</span>
                                        ),
                                        title: "Annual Revenue",
                                        description:
                                            "Total annual revenue of the business",
                                        placeholder: "Enter annual revenue",
                                        type: "number",
                                        required: true,
                                    },
                                    {
                                        icon: (
                                            <span className="text-lg">💵</span>
                                        ),
                                        title: "EBITDA",
                                        description:
                                            "Earnings before interest, taxes, depreciation, and amortization",
                                        placeholder: "Enter EBITDA",
                                        type: "number",
                                        required: true,
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Assets & Working Capital Form */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <InputForm
                            title="Assets & Working Capital"
                            layout="row"
                            gridCols={3}
                            fieldErrors={fieldErrors}
                            inputFields={[
                                {
                                    icon: <span className="text-lg">🏭</span>,
                                    title: "Equipment & Assets",
                                    description:
                                        "Machinery, equipment, and real estate value",
                                    placeholder:
                                        "Enter equipment & assets value",
                                    type: "number",
                                },
                                {
                                    icon: <span className="text-lg">📦</span>,
                                    title: "Inventory",
                                    description: "Current inventory value",
                                    placeholder: "Enter inventory value",
                                    type: "number",
                                },
                                {
                                    icon: <span className="text-lg">💼</span>,
                                    title: "Working Capital",
                                    description:
                                        "Current assets minus current liabilities",
                                    placeholder: "Enter working capital",
                                    type: "number",
                                    required: true,
                                },
                            ]}
                        />
                    </div>

                    {/* Summary Section */}
                    <div className="max-w-4xl mx-auto mt-8">
                        <div
                            className="rounded-lg border p-4"
                            style={{
                                backgroundColor:
                                    "var(--color-light-warm-beige)",
                                borderColor: "var(--color-terracotta-light)",
                            }}
                        >
                            <h3
                                className="text-lg font-semibold mb-4 text-left"
                                style={{
                                    color: "var(--color-teal)",
                                }}
                            >
                                Summary
                            </h3>

                            <div className="space-y-1">
                                {/* Asking Price */}
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-sm"
                                        style={{ color: "var(--color-gray)" }}
                                    >
                                        Asking Price:
                                    </span>
                                    <span
                                        className="font-medium"
                                        style={{
                                            color: "var(--color-dark-charcoal)",
                                        }}
                                    >
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(
                                            formData["asking-price"] || 0,
                                        )}
                                    </span>
                                </div>

                                {/* Annual Revenue */}
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-sm"
                                        style={{ color: "var(--color-gray)" }}
                                    >
                                        Annual Revenue:
                                    </span>
                                    <span
                                        className="font-medium"
                                        style={{
                                            color: "var(--color-dark-charcoal)",
                                        }}
                                    >
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(
                                            formData["annual-revenue"] || 0,
                                        )}
                                    </span>
                                </div>

                                {/* EBITDA */}
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-sm"
                                        style={{ color: "var(--color-gray)" }}
                                    >
                                        EBITDA:
                                    </span>
                                    <span
                                        className="font-medium"
                                        style={{
                                            color: "var(--color-dark-charcoal)",
                                        }}
                                    >
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(formData.ebitda || 0)}
                                    </span>
                                </div>

                                {/* Price/EBITDA Multiple */}
                                <div
                                    className="flex justify-between items-center pt-2 border-t"
                                    style={{
                                        borderColor: "var(--color-gray-light)",
                                    }}
                                >
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: "var(--color-gray)" }}
                                    >
                                        Price/EBITDA Multiple:
                                    </span>
                                    <span
                                        className="font-semibold"
                                        style={{
                                            color: "var(--color-dark-charcoal)",
                                        }}
                                    >
                                        {formData.ebitda && formData.ebitda > 0
                                            ? (
                                                  (formData["asking-price"] ||
                                                      0) / formData.ebitda
                                              ).toFixed(2)
                                            : "0.00"}
                                        x
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="max-w-4xl mx-auto mt-8">
                        <div className="flex justify-between">
                            <button
                                className="inline-flex items-center px-6 py-2 text-base font-medium rounded-md transition-all duration-300 group"
                                style={{
                                    color: "var(--color-teal)",
                                }}
                                onClick={() =>
                                    (window.location.href = "/Landing")
                                }
                            >
                                <svg
                                    className="mr-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Back to Home
                            </button>
                            <button
                                className="inline-flex items-center px-6 py-2 text-base font-medium text-white rounded-md transition-all duration-300 cursor-pointer group"
                                style={{
                                    backgroundColor: "var(--color-terracotta)",
                                }}
                                onClick={handleContinue}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "var(--color-terracotta-dark)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "var(--color-terracotta)")
                                }
                            >
                                Continue
                                <svg
                                    className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() =>
                    setToast((prev) => ({ ...prev, isVisible: false }))
                }
            />
        </div>
    );
}

export default FinancialOverview;
