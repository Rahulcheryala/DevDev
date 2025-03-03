import React from "react";
import { X } from "lucide-react"
interface AlertModalProps {
    isOpen: boolean;
    message?: string;
    onClose: () => void;
    title?: string;
    buttonText?: string;
}

const AlertModal = ({
    isOpen,
    message = "The file size exceeds 1 MB.",
    onClose,
    title = "Error",
    buttonText = "OK"
}: AlertModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[#BAEAE9CC] bg-opacity-50 z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-white px-6 py-10 rounded-[12px] shadow-lg text-center w-[560px]">
                <div className="flex justify-center ">
                    <div className="w-14 h-14 flex items-center justify-center bg-red-600 rounded-full">
                        <X className="text-white h-10 w-10" />
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-5">{title}</h2>
                <p className="text-gray-600 mt-2">
                    {message}
                </p>
                <button
                    className="mt-4 bg-[#0D0844] h-[56px] w-[120px] text-white px-6 py-2 rounded-lg hover:bg-[#0D0844] transition-colors"
                    onClick={onClose}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default AlertModal;
