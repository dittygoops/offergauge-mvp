import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface FormData {
    // Business Information
    businessName: string;
    askingPrice: number | null;
    annualRevenue: number | null;
    annualNetIncome: number | null;

    // Inclusions
    ffeIncluded: boolean;
    inventoryIncluded: boolean;
    realEstateIncluded: boolean;

    // Conditional inputs
    ffeValue: number | null;
    inventoryValue: number | null;
    purchasingRealEstate: boolean;
    realEstateValue: number | null;
    annualRent: number | null;

    // Working Capital
    buyerMinSalary: number | null;
    workingCapitalRequirement: number | null;
    capexMaintenance: number | null;
    capexNewInvestments: number | null;

    // Use of Funds
    dueToSellerBusiness: number | null;
    dueToSellerRealEstate: number | null;
    totalDueToSeller: number | null;
    totalCashAtClosingToSeller: number | null;
    sellerFinancingPaidToSeller: number | null;
    workingCapitalRequired: number | null;
    loanClosingCosts: number | null;
    totalUseOfFunds: number | null;

    // Financing
    buyerCash: number | null;
    buyerCashPercent: number | null;
    sellerFinancing: number | null;
    sellerFinancingPercent: number | null;
    termLoan: number | null;
    loanClosingCostsPercent: number | null;

    // Lender's Analysis
    loanPayments: number | null;
    equipmentAssets: number | null;
    inventory: number | null;
    workingCapital: number | null;
    loanAmount: number | null;
    loanClosingCost: number | null;
    ebitda: number | null;
    loanTerm: number | null;
    interestRate: number | null;
}

interface FormDataContextType {
    formData: FormData;
    updateFormData: (
        field: keyof FormData,
        value: string | number | boolean | null,
    ) => void;
    updateMultipleFields: (updates: Partial<FormData>) => void;
    clearFormData: () => void;
}

const defaultFormData: FormData = {
    businessName: "",
    askingPrice: null,
    annualRevenue: null,
    annualNetIncome: null,
    ffeIncluded: false,
    inventoryIncluded: false,
    realEstateIncluded: false,
    ffeValue: null,
    inventoryValue: null,
    purchasingRealEstate: false,
    realEstateValue: null,
    annualRent: null,
    buyerMinSalary: null,
    workingCapitalRequirement: null,
    capexMaintenance: null,
    capexNewInvestments: null,
    dueToSellerBusiness: null,
    dueToSellerRealEstate: null,
    totalDueToSeller: null,
    totalCashAtClosingToSeller: null,
    sellerFinancingPaidToSeller: null,
    workingCapitalRequired: null,
    loanClosingCosts: null,
    totalUseOfFunds: null,
    buyerCash: null,
    buyerCashPercent: null,
    sellerFinancing: null,
    sellerFinancingPercent: null,
    termLoan: null,
    loanClosingCostsPercent: null,
    loanPayments: null,
    equipmentAssets: null,
    inventory: null,
    workingCapital: null,
    loanAmount: null,
    loanClosingCost: null,
    ebitda: null,
    loanTerm: null,
    interestRate: null,
};

const FormDataContext = createContext<FormDataContextType | undefined>(
    undefined,
);

export function FormDataProvider({ children }: { children: ReactNode }) {
    const [formData, setFormData] = useState<FormData>(() => {
        // Try to load from localStorage on initial render
        const saved = localStorage.getItem("formData");
        return saved ? JSON.parse(saved) : defaultFormData;
    });

    const updateFormData = (
        field: keyof FormData,
        value: string | number | boolean | null,
    ) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };
            // Save to localStorage
            localStorage.setItem("formData", JSON.stringify(newData));
            return newData;
        });
    };

    const updateMultipleFields = (updates: Partial<FormData>) => {
        setFormData((prev) => {
            const newData = { ...prev, ...updates };
            // Save to localStorage
            localStorage.setItem("formData", JSON.stringify(newData));
            return newData;
        });
    };

    const clearFormData = () => {
        setFormData(defaultFormData);
        localStorage.removeItem("formData");
    };

    return (
        <FormDataContext.Provider
            value={{
                formData,
                updateFormData,
                updateMultipleFields,
                clearFormData,
            }}
        >
            {children}
        </FormDataContext.Provider>
    );
}

export function useFormData() {
    const context = useContext(FormDataContext);
    if (context === undefined) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }
    return context;
}
