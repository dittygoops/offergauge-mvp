import { useState } from "react";
import {
    ArrowRight,
    ArrowLeft,
    DollarSign,
    PieChart,
    Calculator,
    Percent,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../contexts/FormDataContext";

export function FinancialOverviewPage() {
    const navigate = useNavigate();
    const { formData, updateFormData } = useFormData();
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Calculate Use of Funds values
    const calculateUseOfFunds = () => {
        // Due to Seller (Business, FF&E, Inventory)
        // Formula: AskingPrice + IF(FFE NOT included, FFE Value, 0) + IF(Inventory NOT included, Inventory Value, 0)
        let dueToSellerBusiness = formData.askingPrice || 0;
        // If FFE is NOT included in asking price (checkbox checked), add it separately
        if (formData.ffeIncluded && formData.ffeValue) {
            dueToSellerBusiness += formData.ffeValue;
        }
        // If Inventory is NOT included in asking price (checkbox checked), add it separately
        if (formData.inventoryIncluded && formData.inventoryValue) {
            dueToSellerBusiness += formData.inventoryValue;
        }

        // Due to Seller (Real Estate)
        const dueToSellerRealEstate =
            formData.realEstateIncluded &&
            formData.purchasingRealEstate &&
            formData.realEstateValue
                ? formData.realEstateValue
                : 0;

        // Total Due to Seller
        const totalDueToSeller = dueToSellerBusiness + dueToSellerRealEstate;

        // Seller Financing Amount
        const sellerFinancingPercent = parseFloat(
            formData.sellerFinancingPercent?.toString() || "0",
        );
        const sellerFinancingAmount =
            totalDueToSeller * (sellerFinancingPercent / 100);
        // Total Cash @ Closing to Seller
        const totalCashAtClosing = totalDueToSeller - sellerFinancingAmount;

        // Working Capital Required
        const workingCapitalRequired = formData.workingCapitalRequirement || 0;

        // Loan Closing Costs
        const loanClosingCostsPercent = parseFloat(
            formData.loanClosingCostsPercent?.toString() || "0",
        );
        const loanClosingCosts =
            totalDueToSeller * (loanClosingCostsPercent / 100);

        // Total Use of Funds
        const totalUseOfFunds =
            totalCashAtClosing +
            sellerFinancingAmount +
            workingCapitalRequired +
            loanClosingCosts;

        return {
            dueToSellerBusiness,
            dueToSellerRealEstate,
            totalDueToSeller,
            sellerFinancingAmount,
            totalCashAtClosing,
            workingCapitalRequired,
            loanClosingCosts,
            totalUseOfFunds,
        };
    };

    const useOfFunds = calculateUseOfFunds();

    // Calculate Financing values
    const calculateFinancing = () => {
        // Buyer Cash (percentage of total use of funds)
        const buyerCashPercent = parseFloat(
            formData.buyerCashPercent?.toString() || "0",
        );
        const buyerCash = useOfFunds.totalUseOfFunds * (buyerCashPercent / 100);

        // Seller Financing (same as in use of funds)
        const sellerFinancing = useOfFunds.sellerFinancingAmount;
        // Term Loan = IF((totalUseOfFunds - buyerCash - sellerFinancing - workingCapital) < 0, 0, difference)
        const termLoanCalculation =
            useOfFunds.totalUseOfFunds -
            buyerCash -
            sellerFinancing -
            useOfFunds.workingCapitalRequired;
        const termLoan = termLoanCalculation < 0 ? 0 : termLoanCalculation;

        // Working Capital (same as in use of funds)
        const workingCapital = useOfFunds.workingCapitalRequired;

        // Total Financing (should equal total use of funds)
        const totalFinancing =
            buyerCash + sellerFinancing + termLoan + workingCapital;

        return {
            buyerCash,
            buyerCashPercent,
            sellerFinancing,
            termLoan,
            workingCapital,
            totalFinancing,
        };
    };

    const financing = calculateFinancing();

    // Format currency for display
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleInputChange = (field: string, value: string) => {
        updateFormData(field as any, value);

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (
            formData.buyerCashPercent == null ||
            formData.buyerCashPercent.toString().trim() === ""
        ) {
            newErrors.buyerCashPercent = "Buyer cash percentage is required";
        }
        if (
            formData.interestRate == null ||
            formData.interestRate.toString().trim() === ""
        ) {
            newErrors.interestRate = "Interest rate is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (validateForm()) {
            navigate("/results-dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-light-warm-beige)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-10 h-10 bg-[var(--color-teal)] rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">2</span>
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-[var(--color-teal)]">
                                Financial Overview
                            </h1>
                            <p className="text-[var(--color-slate-gray)]">
                                Structure your deal financing
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Use of Funds and Financing - Side by Side */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Use of Funds */}
                        <div className="bg-white rounded-xl shadow-lg border border-[var(--color-gray-light)] p-8 space-y-6">
                            <h3 className="text-xl font-semibold text-[var(--color-teal)] flex items-center space-x-2">
                                <Calculator className="w-5 h-5" />
                                <span>Use of Funds</span>
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)]">
                                    <span className="text-[var(--color-dark-charcoal)] font-medium">
                                        Due to Seller (Business, FF&E,
                                        Inventory)
                                    </span>
                                    <span className="text-[var(--color-slate-gray)] font-medium">
                                        {formatCurrency(
                                            useOfFunds.dueToSellerBusiness,
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)]">
                                    <span className="text-[var(--color-dark-charcoal)] font-medium">
                                        Due to Seller (Real Estate)
                                    </span>
                                    <span className="text-[var(--color-slate-gray)] font-medium">
                                        {formatCurrency(
                                            useOfFunds.dueToSellerRealEstate,
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)] bg-[var(--color-light-warm-beige)] px-4 mx-(-4) rounded-lg">
                                    <span className="text-[var(--color-dark-charcoal)] font-semibold">
                                        Total Due to Seller
                                    </span>
                                    <span className="text-[var(--color-teal)] font-bold">
                                        {formatCurrency(
                                            useOfFunds.totalDueToSeller,
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)]">
                                    <span className="text-[var(--color-dark-charcoal)] font-medium">
                                        Total Cash @ Closing to Seller
                                    </span>
                                    <span className="text-[var(--color-slate-gray)] font-medium">
                                        {formatCurrency(
                                            useOfFunds.totalCashAtClosing,
                                        )}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--color-dark-charcoal)] font-medium">
                                            Seller Financing (Paid to Seller in
                                            Future)
                                        </span>
                                        <span className="text-[var(--color-slate-gray)] font-medium">
                                            {formatCurrency(
                                                useOfFunds.sellerFinancingAmount,
                                            )}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gray)] w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="% of Deal"
                                            value={
                                                formData.sellerFinancingPercent ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "sellerFinancingPercent",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full pl-9 pr-3 py-2 bg-white border border-[var(--color-gray-light)] rounded-lg text-[var(--color-slate-gray)] placeholder-[var(--color-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:border-transparent transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)]">
                                    <span className="text-[var(--color-dark-charcoal)] font-medium">
                                        Working Capital Required
                                    </span>
                                    <span className="text-[var(--color-slate-gray)] font-medium">
                                        {formatCurrency(
                                            useOfFunds.workingCapitalRequired,
                                        )}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--color-dark-charcoal)] font-medium">
                                            Loan Closing Costs
                                        </span>
                                        <span className="text-[var(--color-slate-gray)] font-medium">
                                            {formatCurrency(
                                                useOfFunds.loanClosingCosts,
                                            )}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gray)] w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="% of Deal"
                                            value={
                                                formData.loanClosingCostsPercent ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "loanClosingCostsPercent",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full pl-9 pr-3 py-2 bg-white border border-[var(--color-gray-light)] rounded-lg text-[var(--color-slate-gray)] placeholder-[var(--color-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:border-transparent transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4 border-t-2 border-[var(--color-teal)] bg-[var(--color-light-warm-beige)] px-4 mx-(-4) rounded-lg mt-4">
                                    <span className="text-[var(--color-dark-charcoal)] font-bold text-lg">
                                        Total
                                    </span>
                                    <span className="text-[var(--color-teal)] font-bold text-lg">
                                        {formatCurrency(
                                            useOfFunds.totalUseOfFunds,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Financing */}
                        <div className="bg-white rounded-xl shadow-lg border border-[var(--color-gray-light)] p-8 space-y-6">
                            <h3 className="text-xl font-semibold text-[var(--color-teal)] flex items-center space-x-2">
                                <PieChart className="w-5 h-5" />
                                <span>Financing</span>
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[var(--color-dark-charcoal)] font-medium">
                                            Buyer Cash
                                        </span>
                                        <span className="text-[var(--color-slate-gray)] font-medium">
                                            {formatCurrency(
                                                financing.buyerCash,
                                            )}{" "}
                                            ({financing.buyerCashPercent}%)
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gray)] w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="% of Deal"
                                            value={
                                                formData.buyerCashPercent || ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "buyerCashPercent",
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-[var(--color-slate-gray)] placeholder-[var(--color-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:border-transparent transition-colors duration-200 ${
                                                errors.buyerCashPercent
                                                    ? "border-[var(--color-terracotta)]"
                                                    : "border-[var(--color-gray-light)]"
                                            }`}
                                        />
                                        {errors.buyerCashPercent && (
                                            <p className="mt-1 text-xs text-[var(--color-terracotta)]">
                                                {errors.buyerCashPercent}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)]">
                                    <span className="text-[var(--color-dark-charcoal)] font-medium">
                                        Seller Financing
                                    </span>
                                    <span className="text-[var(--color-slate-gray)] font-medium">
                                        {formatCurrency(
                                            financing.sellerFinancing,
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)]">
                                    <span className="text-[var(--color-dark-charcoal)] font-medium">
                                        Term Loan
                                    </span>
                                    <span className="text-[var(--color-slate-gray)] font-medium">
                                        {formatCurrency(financing.termLoan)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-[var(--color-gray-light)]">
                                    <span className="text-[var(--color-dark-charcoal)] font-medium">
                                        Working Capital
                                    </span>
                                    <span className="text-[var(--color-slate-gray)] font-medium">
                                        {formatCurrency(
                                            financing.workingCapital,
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-4 border-t-2 border-[var(--color-teal)] bg-[var(--color-light-warm-beige)] px-4 mx-(-4) rounded-lg mt-4">
                                    <span className="text-[var(--color-dark-charcoal)] font-bold text-lg">
                                        Total
                                    </span>
                                    <span className="text-[var(--color-teal)] font-bold text-lg">
                                        {formatCurrency(
                                            financing.totalFinancing,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lender's Analysis - Full Width */}
                    <div className="bg-white rounded-xl shadow-lg border border-[var(--color-gray-light)] p-8 space-y-6">
                        <h3 className="text-xl font-semibold text-[var(--color-teal)] flex items-center space-x-2">
                            <Calculator className="w-5 h-5" />
                            <span>Lender's Analysis</span>
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[var(--color-dark-charcoal)] font-medium">
                                    <DollarSign className="w-5 h-5 text-[var(--color-teal)]" />
                                    <span>Loan Payments (Years)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter loan term in years"
                                    value={formData.loanPayments || ""}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "loanPayments",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-4 bg-white border border-[var(--color-gray-light)] rounded-lg text-[var(--color-slate-gray)] placeholder-[var(--color-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:border-transparent transition-colors duration-200 min-h-[56px]"
                                />
                                <p className="text-sm text-[var(--color-gray)]">
                                    Loan term length in years
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[var(--color-dark-charcoal)] font-medium">
                                    <Percent className="w-5 h-5 text-[var(--color-teal)]" />
                                    <span>Interest Rate</span>
                                    <span className="text-[var(--color-terracotta)]">
                                        *
                                    </span>
                                </label>
                                <div className="relative">
                                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-gray)] w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Enter interest rate"
                                        value={formData.interestRate || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "interestRate",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full pl-10 pr-4 py-4 bg-white border rounded-lg text-[var(--color-slate-gray)] placeholder-[var(--color-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:border-transparent transition-colors duration-200 min-h-[56px] ${
                                            errors.interestRate
                                                ? "border-[var(--color-terracotta)]"
                                                : "border-[var(--color-gray-light)]"
                                        }`}
                                    />
                                    {errors.interestRate && (
                                        <p className="mt-2 text-sm text-[var(--color-terracotta)] flex items-center space-x-1">
                                            <span>⚠</span>
                                            <span>{errors.interestRate}</span>
                                        </p>
                                    )}
                                </div>
                                <p className="text-sm text-[var(--color-gray)]">
                                    Annual interest rate percentage
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between pt-8 space-y-4 sm:space-y-0">
                        <button
                            onClick={() => navigate("/business-information")}
                            className="flex items-center space-x-2 text-[var(--color-teal)] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] rounded px-4 py-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>

                        <button
                            onClick={handleContinue}
                            className="bg-[var(--color-terracotta)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-terracotta-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[56px] w-full sm:w-auto"
                        >
                            <span>Analyze Deal</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
