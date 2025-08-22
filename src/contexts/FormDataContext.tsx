import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface FormData {
    // Financial Overview
    "business-name": string;
    "asking-price": number | null;
    "annual-revenue": number | null;
    "ebitda": number | null;
    "equipment-assets": number | null;
    "inventory": number | null;
    "working-capital": number | null;
    
    // Source Funds
    "buyer-cash": number | null;
    "seller-financing": number | null;
    "loan-amount": number | null;
    "loan-term": number | null;
    "interest-rate": number | null;
    "loan-closing-costs": number | null;
}

interface FormDataContextType {
    formData: FormData;
    updateFormData: (field: keyof FormData, value: string | number | null) => void;
    updateMultipleFields: (updates: Partial<FormData>) => void;
    clearFormData: () => void;
}

const defaultFormData: FormData = {
    "business-name": '',
    "asking-price": null,
    "annual-revenue": null,
    "ebitda": null,
    "equipment-assets": null,
    "inventory": null,
    "working-capital": null,
    "buyer-cash": null,
    "seller-financing": null,
    "loan-amount": null,
    "loan-term": null,
    "interest-rate": null,
    "loan-closing-costs": null,
};

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);

export function FormDataProvider({ children }: { children: ReactNode }) {
    const [formData, setFormData] = useState<FormData>(() => {
        // Try to load from localStorage on initial render
        const saved = localStorage.getItem('formData');
        return saved ? JSON.parse(saved) : defaultFormData;
    });

    const updateFormData = (field: keyof FormData, value: string | number | null) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };
            // Save to localStorage
            localStorage.setItem('formData', JSON.stringify(newData));
            return newData;
        });
    };

    const updateMultipleFields = (updates: Partial<FormData>) => {
        setFormData(prev => {
            const newData = { ...prev, ...updates };
            // Save to localStorage
            localStorage.setItem('formData', JSON.stringify(newData));
            return newData;
        });
    };

    const clearFormData = () => {
        setFormData(defaultFormData);
        localStorage.removeItem('formData');
    };

    return (
        <FormDataContext.Provider value={{
            formData,
            updateFormData,
            updateMultipleFields,
            clearFormData,
        }}>
            {children}
        </FormDataContext.Provider>
    );
}

export function useFormData() {
    const context = useContext(FormDataContext);
    if (context === undefined) {
        throw new Error('useFormData must be used within a FormDataProvider');
    }
    return context;
}
