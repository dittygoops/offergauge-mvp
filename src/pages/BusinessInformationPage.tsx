import { useState, useEffect } from "react";
import {
    ArrowRight,
    Briefcase,
    DollarSign,
    Building,
    User,
    Wrench,
    TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../contexts/FormDataContext";
import InputForm from "../components/InputForm";

export function BusinessInformationPage() {
    const navigate = useNavigate();
    const { formData, updateFormData } = useFormData();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (
        field: string,
        value: string | number | boolean,
    ) => {
        updateFormData(field as any, value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.businessName || formData.businessName.trim() === "") {
            newErrors.businessName = "Business name is required";
        }
        if (!formData.askingPrice || formData.askingPrice < 0) {
            newErrors.askingPrice = "Asking price is required";
        }
        if (!formData.annualRevenue || formData.annualRevenue < 0) {
            newErrors.annualRevenue = "Annual revenue is required";
        }
        if (!formData.annualNetIncome || formData.annualNetIncome < 0) {
            newErrors.annualNetIncome = "Annual net income is required";
        }
        if (!formData.buyerMinSalary || formData.buyerMinSalary < 0) {
            newErrors.buyerMinSalary = "Buyer minimum salary is required";
        }
        if (!formData.capexMaintenance || formData.capexMaintenance < 0) {
            newErrors.capexMaintenance = "CAPEX (Maintenance) is required";
        }
        if (!formData.capexNewInvestments || formData.capexNewInvestments < 0) {
            newErrors.capexNewInvestments =
                "CAPEX (New Investments) is required";
        }
        if (
            !formData.workingCapitalRequirement ||
            formData.workingCapitalRequirement < 0
        ) {
            newErrors.workingCapitalRequirement =
                "Working capital requirement is required";
        }

        // Conditional validations
        if (
            formData.ffeIncluded &&
            (!formData.ffeValue || formData.ffeValue < 0)
        ) {
            newErrors.ffeValue = "FFE value is required";
        }
        if (
            formData.inventoryIncluded &&
            (!formData.inventoryValue || formData.inventoryValue < 0)
        ) {
            newErrors.inventoryValue = "Inventory value is required";
        }
        if (formData.realEstateIncluded && formData.purchasingRealEstate) {
            if (
                formData.realEstateValue == null ||
                formData.realEstateValue < 0
            ) {
                newErrors.realEstateValue = "Real estate value is required";
            }
            if (formData.annualRent == null || formData.annualRent < 0) {
                newErrors.annualRent = "Annual rent is required";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Auto-scroll to first error when errors change
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            // Map error keys to field titles for scrolling
            const errorKeyToFieldTitle: Record<string, string> = {
                businessName: "Business Name",
                askingPrice: "Asking Price",
                annualRevenue: "Annual Revenue",
                annualNetIncome: "Annual Net Income",
                buyerMinSalary: "Buyer Min Salary",
                capexMaintenance: "CAPEX (Maintenance)",
                capexNewInvestments: "CAPEX (New Investments)",
                workingCapitalRequirement: "Working Capital Requirement",
                ffeValue: "FFE Value",
                inventoryValue: "Inventory Value",
                realEstateValue: "Real Estate Value",
                annualRent: "Annual Rent",
            };

            // Find the first field with an error
            const firstErrorField = Object.keys(errors)[0];
            const fieldTitle = errorKeyToFieldTitle[firstErrorField];

            if (fieldTitle) {
                // Find the element by data attribute using field title
                const errorElement = document.querySelector(
                    `[data-field="${fieldTitle}"]`,
                );

                if (errorElement) {
                    // Scroll to the element with smooth behavior
                    errorElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }
        }
    }, [errors]);

    const handleContinue = () => {
        if (validateForm()) {
            navigate("/financial-overview");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[var(--color-light-warm-beige)] py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-10 h-10 bg-[var(--color-teal)] rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <div className="text-left">
                                <h1 className="text-3xl font-bold text-[var(--color-teal)]">
                                    Business Information
                                </h1>
                                <p className="text-[var(--color-slate-gray)]">
                                    Tell us about the business you're acquiring
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Sections */}
                    <div className="space-y-8">
                        {/* Business Name */}
                        <InputForm
                            title="Business Information"
                            inputFields={[
                                {
                                    icon: (
                                        <Briefcase className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "Business Name",
                                    description:
                                        "Name of the business you are acquiring",
                                    placeholder: "Enter business name",
                                    type: "text",
                                    required: true,
                                },
                            ]}
                            layout="column"
                            gridCols={1}
                            fieldErrors={{
                                "Business Name": !!errors.businessName,
                            }}
                        />

                        {/* Financial Information */}
                        <InputForm
                            title="Financial Information"
                            inputFields={[
                                {
                                    icon: (
                                        <DollarSign className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "Asking Price",
                                    description:
                                        "The asking price for the business",
                                    placeholder: "Enter asking price",
                                    type: "number",
                                    required: true,
                                },
                                {
                                    icon: (
                                        <TrendingUp className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "Annual Revenue",
                                    description:
                                        "Annual revenue of the business",
                                    placeholder: "Enter annual revenue",
                                    type: "number",
                                    required: true,
                                },
                                {
                                    icon: (
                                        <TrendingUp className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "Annual Net Income",
                                    description:
                                        "Annual net income of the business",
                                    placeholder: "Enter annual net income",
                                    type: "number",
                                    required: true,
                                },
                            ]}
                            layout="row"
                            gridCols={3}
                            fieldErrors={{
                                "Asking Price": !!errors.askingPrice,
                                "Annual Revenue": !!errors.annualRevenue,
                                "Annual Net Income": !!errors.annualNetIncome,
                            }}
                        />

                        {/* Assets Included - Horizontal Card */}
                        <div className="bg-white rounded-xl shadow-lg border border-[var(--color-gray-light)] p-8">
                            <h3 className="text-xl font-semibold text-[var(--color-teal)] mb-6">
                                What is NOT Included in the Asking Price?
                            </h3>
                            <p className="text-[var(--color-slate-gray)] mb-6">
                                Check items that need to be purchased separately
                                (not included in the asking price)
                            </p>

                            <div className="space-y-6">
                                {/* Checkboxes Row */}
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="ffeIncluded"
                                            checked={formData.ffeIncluded}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "ffeIncluded",
                                                    e.target.checked,
                                                )
                                            }
                                            className="w-5 h-5 text-[var(--color-teal)] border-2 border-[var(--color-gray-light)] rounded focus:ring-[var(--color-teal)] focus:ring-2"
                                        />
                                        <label
                                            htmlFor="ffeIncluded"
                                            className="text-[var(--color-dark-charcoal)] font-medium cursor-pointer"
                                        >
                                            FFE (separate purchase)
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="inventoryIncluded"
                                            checked={formData.inventoryIncluded}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "inventoryIncluded",
                                                    e.target.checked,
                                                )
                                            }
                                            className="w-5 h-5 text-[var(--color-teal)] border-2 border-[var(--color-gray-light)] rounded focus:ring-[var(--color-teal)] focus:ring-2"
                                        />
                                        <label
                                            htmlFor="inventoryIncluded"
                                            className="text-[var(--color-dark-charcoal)] font-medium cursor-pointer"
                                        >
                                            Inventory
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id="realEstateIncluded"
                                            checked={
                                                formData.realEstateIncluded
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "realEstateIncluded",
                                                    e.target.checked,
                                                )
                                            }
                                            className="w-5 h-5 text-[var(--color-teal)] border-2 border-[var(--color-gray-light)] rounded focus:ring-[var(--color-teal)] focus:ring-2"
                                        />
                                        <label
                                            htmlFor="realEstateIncluded"
                                            className="text-[var(--color-dark-charcoal)] font-medium cursor-pointer"
                                        >
                                            Real Estate
                                        </label>
                                    </div>
                                </div>

                                {/* Conditional Input Fields */}
                                <div className="space-y-4">
                                    {/* FFE Value Input */}
                                    {formData.ffeIncluded && (
                                        <InputForm
                                            title="FFE Value"
                                            inputFields={[
                                                {
                                                    icon: (
                                                        <Building className="w-5 h-5 text-[var(--color-teal)]" />
                                                    ),
                                                    title: "FFE Value",
                                                    description:
                                                        "Value of Furniture, Fixtures & Equipment",
                                                    placeholder:
                                                        "Enter FFE value",
                                                    type: "number",
                                                    required: true,
                                                },
                                            ]}
                                            layout="column"
                                            gridCols={1}
                                            fieldErrors={{
                                                "FFE Value": !!errors.ffeValue,
                                            }}
                                        />
                                    )}

                                    {/* Inventory Value Input */}
                                    {formData.inventoryIncluded && (
                                        <InputForm
                                            title="Inventory Value"
                                            inputFields={[
                                                {
                                                    icon: (
                                                        <Building className="w-5 h-5 text-[var(--color-teal)]" />
                                                    ),
                                                    title: "Inventory Value",
                                                    description:
                                                        "Value of inventory included",
                                                    placeholder:
                                                        "Enter inventory value",
                                                    type: "number",
                                                    required: true,
                                                },
                                            ]}
                                            layout="column"
                                            gridCols={1}
                                            fieldErrors={{
                                                "Inventory Value":
                                                    !!errors.inventoryValue,
                                            }}
                                        />
                                    )}

                                    {/* Real Estate Logic */}
                                    {formData.realEstateIncluded && (
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    id="purchasingRealEstate"
                                                    checked={
                                                        formData.purchasingRealEstate
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "purchasingRealEstate",
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="w-5 h-5 text-[var(--color-teal)] border-2 border-[var(--color-gray-light)] rounded focus:ring-[var(--color-teal)] focus:ring-2"
                                                />
                                                <label
                                                    htmlFor="purchasingRealEstate"
                                                    className="text-[var(--color-dark-charcoal)] font-medium cursor-pointer"
                                                >
                                                    Purchasing Real Estate?
                                                </label>
                                            </div>

                                            {formData.purchasingRealEstate && (
                                                <InputForm
                                                    title="Real Estate Details"
                                                    inputFields={[
                                                        {
                                                            icon: (
                                                                <Building className="w-5 h-5 text-[var(--color-teal)]" />
                                                            ),
                                                            title: "Real Estate Value",
                                                            description:
                                                                "Value of the real estate",
                                                            placeholder:
                                                                "Enter real estate value",
                                                            type: "number",
                                                            required: true,
                                                        },
                                                        {
                                                            icon: (
                                                                <DollarSign className="w-5 h-5 text-[var(--color-teal)]" />
                                                            ),
                                                            title: "Annual Rent",
                                                            description:
                                                                "Annual rent for the property",
                                                            placeholder:
                                                                "Enter annual rent",
                                                            type: "number",
                                                            required: true,
                                                        },
                                                    ]}
                                                    layout="row"
                                                    gridCols={2}
                                                    fieldErrors={{
                                                        "Real Estate Value":
                                                            !!errors.realEstateValue,
                                                        "Annual Rent":
                                                            !!errors.annualRent,
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="text-sm text-[var(--color-gray)]">
                                    <p>
                                        FFE = Furniture, Fixtures & Equipment.
                                        Check items that require separate
                                        purchase beyond the asking price.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Working Capital */}
                        <InputForm
                            title="Working Capital"
                            inputFields={[
                                {
                                    icon: (
                                        <User className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "Buyer Min Salary",
                                    description:
                                        "Annual salary requirement for buyer",
                                    placeholder: "Enter minimum salary",
                                    type: "number",
                                    required: true,
                                },
                                {
                                    icon: (
                                        <Wrench className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "CAPEX (Maintenance)",
                                    description:
                                        "Annual maintenance/replacement costs",
                                    placeholder: "Enter maintenance CAPEX",
                                    type: "number",
                                    required: true,
                                },
                                {
                                    icon: (
                                        <DollarSign className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "Working Capital Requirement",
                                    description:
                                        "Capital needed for operations",
                                    placeholder:
                                        "Enter working capital requirement",
                                    type: "number",
                                    required: true,
                                },
                                {
                                    icon: (
                                        <Building className="w-5 h-5 text-[var(--color-teal)]" />
                                    ),
                                    title: "CAPEX (New Investments)",
                                    description:
                                        "Annual new investment/growth costs",
                                    placeholder: "Enter new investment CAPEX",
                                    type: "number",
                                    required: true,
                                },
                            ]}
                            layout="row"
                            gridCols={2}
                            fieldErrors={{
                                "Working Capital Requirement":
                                    !!errors.workingCapitalRequirement,
                                "Buyer Min Salary": !!errors.buyerMinSalary,
                                "CAPEX (Maintenance)":
                                    !!errors.capexMaintenance,
                                "CAPEX (New Investments)":
                                    !!errors.capexNewInvestments,
                            }}
                        />

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between pt-8 space-y-4 sm:space-y-0">
                            <button
                                onClick={() => navigate("/landing")}
                                className="text-[var(--color-teal)] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] rounded px-4 py-2"
                            >
                                ← Back to Home
                            </button>

                            <button
                                onClick={handleContinue}
                                className="bg-[var(--color-terracotta)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-terracotta-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[56px] w-full sm:w-auto"
                            >
                                <span>Continue</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
