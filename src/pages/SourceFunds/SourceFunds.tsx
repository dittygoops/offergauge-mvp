import NavBar from "../../components/NavBar";
import InputForm from "../../components/InputForm";
import Toast from "../../components/Toast";
import { useState } from "react";
import { useFormData } from "../../contexts/FormDataContext";

function SourceFunds() {
    const [toast, setToast] = useState({ isVisible: false, message: "" });
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});
    const { formData } = useFormData();
    


    const handleContinue = () => {
        // Get current values from global form data
        const buyerCash = formData["buyer-cash"];
        const loanAmount = formData["loan-amount"];
        const loanTerm = formData["loan-term"];
        const interestRate = formData["interest-rate"];
        const loanClosingCosts = formData["loan-closing-costs"];

        console.log("Field values:", { buyerCash, loanAmount, loanTerm, interestRate, loanClosingCosts });

        // Check if any required field is empty and set field errors
        const fieldErrors = {
            "Buyer Cash": buyerCash === null || buyerCash === undefined,
            "Loan Amount": loanAmount === null || loanAmount === undefined,
            "Loan Term (Years)": loanTerm === null || loanTerm === undefined,
            "Interest Rate (%)": interestRate === null || interestRate === undefined,
            "Loan Closing Costs": loanClosingCosts === null || loanClosingCosts === undefined,
        };

        const hasEmptyFields = Object.values(fieldErrors).some(error => error);
        setFieldErrors(fieldErrors);

        console.log("Has empty fields:", hasEmptyFields);

        if (hasEmptyFields) {
            console.log("Setting toast to visible");
            setToast({
                isVisible: true,
                message: "Missing required fields",
            });
        } else {
            // Clear field errors and proceed to next step
            setFieldErrors({});
            console.log("All required fields filled, proceeding...");
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
                        Source of Funds
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Tell us about your funding sources and loan details
                    </p>

                    {/* Forms Container */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Funding Sources Form */}
                        <div>
                            <InputForm
                                title="Funding Sources"
                                fieldErrors={fieldErrors}
                                inputFields={[
                                    {
                                        icon: <span className="text-lg">💵</span>,
                                        title: "Buyer Cash",
                                        description: "Amount of cash the buyer will contribute to the purchase",
                                        placeholder: "Enter buyer cash amount",
                                        type: "number",
                                        required: true,
                                    },
                                    {
                                        icon: <span className="text-lg">🤝</span>,
                                        title: "Seller Financing",
                                        description: "Amount the seller will finance",
                                        placeholder: "Enter seller financing amount",
                                        type: "number",
                                    },
                                ]}
                            />
                        </div>

                        {/* Term Debt/Loan Details Form */}
                        <div>
                            <InputForm
                                title="Term Debt/Loan Details"
                                fieldErrors={fieldErrors}
                                inputFields={[
                                    {
                                        icon: <span className="text-lg">🏦</span>,
                                        title: "Loan Amount",
                                        description: "Total amount to be borrowed",
                                        placeholder: "Enter loan amount",
                                        type: "number",
                                    },
                                    {
                                        icon: <span className="text-lg">⏰</span>,
                                        title: "Loan Term (Years)",
                                        description: "Length of loan in years",
                                        placeholder: "Enter loan term",
                                        type: "number",
                                    },
                                    {
                                        icon: <span className="text-lg">📊</span>,
                                        title: "Interest Rate (%)",
                                        description: "Annual interest rate percentage",
                                        placeholder: "Enter interest rate",
                                        type: "number",
                                    },
                                    {
                                        icon: <span className="text-lg">💰</span>,
                                        title: "Loan Closing Costs",
                                        description: "Fees and costs associated with loan closing",
                                        placeholder: "Enter closing costs",
                                        type: "number",
                                    },
                                ]}
                            />
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
                                    (window.location.href = "/financial-overview")
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
                                Back
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

export default SourceFunds;
