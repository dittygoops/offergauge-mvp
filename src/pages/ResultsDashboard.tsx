import { ArrowLeft, RefreshCw, TrendingUp, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../contexts/FormDataContext";

export function ResultsDashboard() {
    const navigate = useNavigate();
    const { formData } = useFormData();

    // Calculate all financial metrics
    const calculateFinancialMetrics = () => {
        // Use of Funds calculations (same as FinancialOverviewPage)
        let dueToSellerBusiness = formData.askingPrice || 0;

        if (formData.ffeIncluded && formData.ffeValue) {
            dueToSellerBusiness += formData.ffeValue;
        }

        if (formData.inventoryIncluded && formData.inventoryValue) {
            dueToSellerBusiness += formData.inventoryValue;
        }

        const dueToSellerRealEstate =
            formData.realEstateIncluded &&
            formData.purchasingRealEstate &&
            formData.realEstateValue
                ? formData.realEstateValue
                : 0;

        const totalDueToSeller = dueToSellerBusiness + dueToSellerRealEstate;

        const sellerFinancingPercent = parseFloat(
            formData.sellerFinancingPercent?.toString() || "0",
        );
        const sellerFinancingAmount =
            totalDueToSeller * (sellerFinancingPercent / 100);

        const totalCashAtClosing = totalDueToSeller - sellerFinancingAmount;
        const workingCapitalRequired = formData.workingCapitalRequirement || 0;

        const loanClosingCostsPercent = parseFloat(
            formData.loanClosingCostsPercent?.toString() || "0",
        );
        const loanClosingCosts =
            totalDueToSeller * (loanClosingCostsPercent / 100);

        const totalUseOfFunds =
            totalCashAtClosing +
            sellerFinancingAmount +
            workingCapitalRequired +
            loanClosingCosts;

        // Financing calculations
        const buyerCashPercent = parseFloat(
            formData.buyerCashPercent?.toString() || "0",
        );
        const buyerCash = totalUseOfFunds * (buyerCashPercent / 100);

        const termLoanCalculation =
            totalUseOfFunds -
            buyerCash -
            sellerFinancingAmount -
            workingCapitalRequired;
        const termLoan = termLoanCalculation < 0 ? 0 : termLoanCalculation;

        // Cash Flow Analysis
        const annualNetIncome = formData.annualNetIncome || 0;
        const buyerMinSalary = formData.buyerMinSalary || 0;
        const capexMaintenance = formData.capexMaintenance || 0;
        const capexNewInvestments = formData.capexNewInvestments || 0;
        const totalCapex = capexMaintenance + capexNewInvestments;

        // Rent paid to owner logic: IF purchasing real estate = YES, then 0, else annual rent
        const rentPaidToOwner = formData.purchasingRealEstate
            ? 0
            : formData.annualRent || 0;

        const businessCashFlow = annualNetIncome;
        const remainingCashFlow =
            businessCashFlow - buyerMinSalary - totalCapex + rentPaidToOwner;

        // Debt Service calculation
        const interestRate =
            parseFloat(formData.interestRate?.toString() || "0") / 100;
        const loanTerm = parseFloat(formData.loanPayments?.toString() || "10");

        let annualDebtService = 0;

        // Calculate debt service for term loan + working capital requirement
        const totalLoanPrincipal = termLoan + workingCapitalRequired;
        if (totalLoanPrincipal > 0 && interestRate > 0 && loanTerm > 0) {
            const monthlyRate = interestRate / 12;
            const numPayments = loanTerm * 12;
            const monthlyPayment =
                (totalLoanPrincipal *
                    monthlyRate *
                    (1 + monthlyRate) ** numPayments) /
                ((1 + monthlyRate) ** numPayments - 1);
            annualDebtService = monthlyPayment * 12;
        }

        const netCashFlow = remainingCashFlow - annualDebtService;
        const dscr =
            annualDebtService > 0
                ? remainingCashFlow / annualDebtService
                : null;

        return {
            termLoan,
            sellerFinancingAmount,
            businessCashFlow,
            buyerMinSalary,
            totalCapex,
            rentPaidToOwner,
            remainingCashFlow,
            annualDebtService,
            netCashFlow,
            dscr,
            workingCapitalRequired,
            monthlyBusinessCashFlow: businessCashFlow / 12,
            monthlyBuyerSalary: buyerMinSalary / 12,
            monthlyCapex: totalCapex / 12,
            monthlyRentPaidToOwner: rentPaidToOwner / 12,
            monthlyRemainingCashFlow: remainingCashFlow / 12,
            monthlyDebtService: annualDebtService / 12,
            monthlyNetCashFlow: netCashFlow / 12,
        };
    };

    const metrics = calculateFinancialMetrics();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatPercent = (value: number, decimals: number = 2) => {
        return value.toFixed(decimals);
    };

    const CashFlowMetric = ({
        label,
        value,
        isHighlighted = false,
        isPositive = null,
    }: {
        label: string;
        value: string;
        isHighlighted?: boolean;
        isPositive?: boolean | null;
    }) => (
        <div
            className={`flex justify-between items-center py-3 ${isHighlighted ? "bg-[var(--color-light-warm-beige)] px-4 rounded-lg border border-[var(--color-terracotta)]" : "border-b border-[var(--color-gray-light)]"}`}
        >
            <span
                className={`font-medium ${isHighlighted ? "text-[var(--color-teal)] font-semibold" : "text-[var(--color-dark-charcoal)]"}`}
            >
                {label}
            </span>
            <span
                className={`font-bold ${
                    isHighlighted
                        ? "text-[var(--color-teal)] text-lg"
                        : isPositive === true
                          ? "text-[var(--color-teal)]"
                          : isPositive === false
                            ? "text-[var(--color-terracotta)]"
                            : "text-[var(--color-slate-gray)]"
                }`}
            >
                {value}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--color-light-warm-beige)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-10 h-10 bg-[var(--color-teal)] rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">3</span>
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-[var(--color-teal)]">
                                Deal Analysis Results
                            </h1>
                            <p className="text-[var(--color-slate-gray)]">
                                Cash flow analysis and debt service coverage
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cash Flow Analysis */}
                <div className="bg-white rounded-xl shadow-lg border border-[var(--color-gray-light)] p-8">
                    <h2 className="text-2xl font-bold text-[var(--color-teal)] mb-8 flex items-center space-x-2">
                        <Calculator className="w-6 h-6" />
                        <span>Cash Flow Analysis</span>
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Year Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-[var(--color-teal)] border-b-2 border-[var(--color-teal)] pb-2">
                                Annual
                            </h3>

                            <div className="space-y-1">
                                <CashFlowMetric
                                    label="Total Borrowings"
                                    value={formatCurrency(
                                        metrics.termLoan +
                                            metrics.workingCapitalRequired,
                                    )}
                                    isHighlighted
                                />

                                <div className="pt-4">
                                    <CashFlowMetric
                                        label="Business Cash Flow (Net Income)"
                                        value={formatCurrency(
                                            metrics.businessCashFlow,
                                        )}
                                    />
                                    <CashFlowMetric
                                        label="Less: Buyer's Minimum Salary"
                                        value={formatCurrency(
                                            -metrics.buyerMinSalary,
                                        )}
                                    />
                                    <CashFlowMetric
                                        label="Less: Capital Expenditures (CAPEX)"
                                        value={formatCurrency(
                                            -metrics.totalCapex,
                                        )}
                                    />
                                    <CashFlowMetric
                                        label="Plus: Rent paid to owner"
                                        value={formatCurrency(
                                            metrics.rentPaidToOwner,
                                        )}
                                    />
                                </div>

                                <div className="pt-4">
                                    <CashFlowMetric
                                        label="Remaining Cash Flow"
                                        value={formatCurrency(
                                            metrics.remainingCashFlow,
                                        )}
                                        isHighlighted
                                        isPositive={
                                            metrics.remainingCashFlow > 0
                                        }
                                    />
                                    <CashFlowMetric
                                        label="Less: Debt Service"
                                        value={formatCurrency(
                                            -metrics.annualDebtService,
                                        )}
                                    />
                                </div>

                                <div className="pt-4 space-y-4">
                                    <CashFlowMetric
                                        label="Net Cash Flow"
                                        value={formatCurrency(
                                            metrics.netCashFlow,
                                        )}
                                        isHighlighted
                                        isPositive={metrics.netCashFlow > 0}
                                    />
                                    <CashFlowMetric
                                        label="DSCR"
                                        value={
                                            metrics.dscr !== null
                                                ? formatPercent(metrics.dscr)
                                                : "N/A"
                                        }
                                        isHighlighted
                                        isPositive={
                                            metrics.dscr !== null &&
                                            metrics.dscr >= 1.25
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Month Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-[var(--color-teal)] border-b-2 border-[var(--color-teal)] pb-2">
                                Monthly
                            </h3>

                            <div className="space-y-1">
                                <CashFlowMetric
                                    label="Total Borrowings"
                                    value={formatCurrency(
                                        (metrics.termLoan +
                                            metrics.workingCapitalRequired) /
                                            12,
                                    )}
                                    isHighlighted
                                />

                                <div className="pt-4">
                                    <CashFlowMetric
                                        label="Business Cash Flow (Net Income)"
                                        value={formatCurrency(
                                            metrics.monthlyBusinessCashFlow,
                                        )}
                                    />
                                    <CashFlowMetric
                                        label="Less: Buyer's Minimum Salary"
                                        value={formatCurrency(
                                            -metrics.monthlyBuyerSalary,
                                        )}
                                    />
                                    <CashFlowMetric
                                        label="Less: Capital Expenditures (CAPEX)"
                                        value={formatCurrency(
                                            -metrics.monthlyCapex,
                                        )}
                                    />
                                    <CashFlowMetric
                                        label="Plus: Rent paid to owner"
                                        value={formatCurrency(
                                            metrics.monthlyRentPaidToOwner,
                                        )}
                                    />
                                </div>

                                <div className="pt-4">
                                    <CashFlowMetric
                                        label="Remaining Cash Flow"
                                        value={formatCurrency(
                                            metrics.monthlyRemainingCashFlow,
                                        )}
                                        isHighlighted
                                        isPositive={
                                            metrics.monthlyRemainingCashFlow > 0
                                        }
                                    />
                                    <CashFlowMetric
                                        label="Less: Debt Service"
                                        value={formatCurrency(
                                            -metrics.monthlyDebtService,
                                        )}
                                    />
                                </div>

                                <div className="pt-4 space-y-4">
                                    <CashFlowMetric
                                        label="Net Cash Flow"
                                        value={formatCurrency(
                                            metrics.monthlyNetCashFlow,
                                        )}
                                        isHighlighted
                                        isPositive={
                                            metrics.monthlyNetCashFlow > 0
                                        }
                                    />
                                    <CashFlowMetric
                                        label="DSCR"
                                        value={
                                            metrics.dscr !== null
                                                ? formatPercent(metrics.dscr)
                                                : "N/A"
                                        }
                                        isHighlighted
                                        isPositive={
                                            metrics.dscr !== null &&
                                            metrics.dscr >= 1.25
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Insights */}
                    <div className="mt-8 pt-8 border-t border-[var(--color-gray-light)]">
                        <h3 className="text-lg font-semibold text-[var(--color-teal)] mb-4">
                            Key Insights
                        </h3>
                        <div className="bg-[var(--color-light-warm-beige)] rounded-lg p-6 border border-[var(--color-terracotta)]">
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div className="text-center">
                                    <div
                                        className={`text-lg font-bold mb-1 ${
                                            metrics.dscr !== null &&
                                            metrics.dscr >= 1.25
                                                ? "text-[var(--color-teal)]"
                                                : metrics.dscr !== null &&
                                                    metrics.dscr >= 1.0
                                                  ? "text-orange-500"
                                                  : "text-[var(--color-terracotta)]"
                                        }`}
                                    >
                                        {metrics.dscr !== null
                                            ? formatPercent(metrics.dscr)
                                            : "N/A"}
                                    </div>
                                    <div className="text-[var(--color-slate-gray)]">
                                        DSCR Ratio
                                    </div>
                                    <div className="text-xs text-[var(--color-gray)] mt-1">
                                        {metrics.dscr !== null
                                            ? metrics.dscr >= 1.25
                                                ? "Excellent"
                                                : metrics.dscr >= 1.0
                                                  ? "Acceptable"
                                                  : "Poor"
                                            : "N/A"}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div
                                        className={`text-lg font-bold mb-1 ${
                                            metrics.netCashFlow > 0
                                                ? "text-[var(--color-teal)]"
                                                : "text-[var(--color-terracotta)]"
                                        }`}
                                    >
                                        {formatCurrency(metrics.netCashFlow)}
                                    </div>
                                    <div className="text-[var(--color-slate-gray)]">
                                        Annual Net Cash
                                    </div>
                                    <div className="text-xs text-[var(--color-gray)] mt-1">
                                        After debt service
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div
                                        className={`text-lg font-bold mb-1 ${
                                            metrics.monthlyNetCashFlow > 0
                                                ? "text-[var(--color-teal)]"
                                                : "text-[var(--color-terracotta)]"
                                        }`}
                                    >
                                        {formatCurrency(
                                            metrics.monthlyNetCashFlow,
                                        )}
                                    </div>
                                    <div className="text-[var(--color-slate-gray)]">
                                        Monthly Net Cash
                                    </div>
                                    <div className="text-xs text-[var(--color-gray)] mt-1">
                                        Available for owner
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between pt-8 space-y-4 sm:space-y-0">
                    <button
                        onClick={() => navigate("/financial-overview")}
                        className="flex items-center space-x-2 text-[var(--color-teal)] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] rounded px-4 py-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Financing</span>
                    </button>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate("/business-information")}
                            className="bg-[var(--color-terracotta)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-terracotta-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)] focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[56px]"
                        >
                            <TrendingUp className="w-5 h-5" />
                            <span>New Analysis</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
