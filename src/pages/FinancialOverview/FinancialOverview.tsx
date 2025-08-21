import NavBar from "../../components/NavBar";
import InputForm from "../../components/InputForm";

function FinancialOverview() {
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
                                inputFields={[
                                    {
                                        icon: (
                                            <span className="text-lg">🏢</span>
                                        ),
                                        title: "Business Name",
                                        description:
                                            "Name of the business you are acquiring",
                                        placeholder: "Enter business name",
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
                                    },
                                ]}
                            />
                        </div>

                        {/* Financial Performance Form */}
                        <div>
                            <InputForm
                                title="Financial Performance"
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
                                },
                            ]}
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="max-w-4xl mx-auto mt-8">
                        <div className="flex justify-between">
                            <button
                                className="inline-flex items-center px-6 py-2 text-base font-medium rounded-md transition-all duration-300 hover:bg-gray-50"
                                style={{
                                    color: "var(--color-teal)",
                                }}
                                onClick={() =>
                                    (window.location.href = "/Landing")
                                }
                            >
                                <svg
                                    className="mr-2 w-4 h-4"
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
        </div>
    );
}

export default FinancialOverview;
