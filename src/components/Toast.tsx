import { useEffect } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

function Toast({ message, isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto-hide after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80">
            <span className="text-lg">⚠</span>
            <span className="flex-1">{message}</span>
            <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
            >
                ✕
            </button>
        </div>
    );
}

export default Toast;
