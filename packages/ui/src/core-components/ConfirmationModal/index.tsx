import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../utils";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalVariants = cva(
    "fixed inset-0 flex items-center justify-center z-[9999]",
    {
        variants: {
            overlay: {
                default: "bg-[#BAEAE9CC] bg-opacity-50",
                dark: "bg-black/50",
                light: "bg-white/50",
            },
        },
        defaultVariants: {
            overlay: "default",
        },
    }
);

const contentVariants = cva(
    "w-[562px] bg-white rounded-zeak shadow-lg space-y-6 relative"
);

interface ConfirmationModalProps extends VariantProps<typeof modalVariants> {
    /** Controls whether the modal is displayed */
    isOpen: boolean;
    /** Function to call when the modal is closed */
    onClose?: () => void;
    /** Function to call when the right button is clicked */
    onRightButtonClick?: () => void;
    /** Function to call when the left button is clicked */
    onLeftButtonClick?: () => void;
    /** Class name for the right button */
    rightButtonClassName?: string;
    /** Class name for the left button */
    leftButtonClassName?: string;
    /** Title text for the modal */
    title?: string;
    /** Content to display in the modal body */
    message?: string | string[];
    /** Text for the confirm button */
    rightButtonText?: string;
    /** Text for the cancel button */
    leftButtonText?: string;
    /** Type of modal that determines the color scheme */
    type?: "warning" | "danger" | "info" | "success" | "custom";
    /** Custom children for the modal */
    children?: React.ReactNode;
    /** Custom gradient color for the modal */
    formColor?: string;
    /** Custom gradient color for the modal */
    toColor?: string;
    /** Optional container element for portal rendering */
    container?: HTMLElement;
}

const ConfirmationModal = ({
    isOpen,
    onClose,
    onRightButtonClick,
    onLeftButtonClick,
    title = "Warning",
    message,
    rightButtonText = "Yes, Discard Changes",
    leftButtonText = "No, Save Changes",
    type = "warning",
    overlay = "default",
    rightButtonClassName,
    leftButtonClassName,
    children,
    formColor,
    toColor,
    container
}: ConfirmationModalProps) => {
    // Lock scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            // Prevent scrolling
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.overflow = 'hidden';
            
            return () => {
                // Restore scrolling when component unmounts
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const gradientColors = {
        warning: "from-[#FFCC00] to-[#F56B1E]",
        danger: "from-[#FF4A5F] to-[#6B0404]",
        info: "to-[#0D0844] from-[#66D4CF]",
        success: "from-[#00CC66] to-[#009933]",
        custom: ``
    };

    const defaultMessage = (
        <>
            <p className="text-[#475467] text-[16px]">You're about to leave the record you are currently editing. Any unsaved changes will be lost.</p>
            <p className="text-[#475467] text-[16px]">Are you sure you want to continue?</p>
        </>
    );

    const renderMessage = () => {
        if (!message) return defaultMessage;

        if (Array.isArray(message)) {
            return (
                <>
                    {message.map((item, index) => (
                        <div key={index} className="text-[#475467] text-[16px]">
                            {item}
                        </div>
                    ))}
                </>
            );
        }

        return message;
    };

    // Function to handle left button click with stopPropagation
    const handleLeftButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onLeftButtonClick && onLeftButtonClick();
    };

    // Function to handle right button click with stopPropagation
    const handleRightButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onRightButtonClick && onRightButtonClick();
    };

    // Function to handle close button click with stopPropagation
    const handleCloseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClose && onClose();
    };

    const modalContent = (
        <div
            className={modalVariants({ overlay })}
            onClick={(e) => {
                e.stopPropagation();
                if (e.target === e.currentTarget) {
                    onClose && onClose();
                }
            }}
            data-modal-root="true"
            style={{ pointerEvents: 'auto' }}
        >
            <div className="bg-[#f7f7f9] rounded-zeak flex items-center justify-center z-[10000] relative" 
                 style={{ pointerEvents: 'auto' }} 
                 onClick={(e) => e.stopPropagation()}>
                <div className={contentVariants()} style={{ pointerEvents: 'auto' }}>
                    <div className="rounded-t-zeak p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 style={{
                                background: `linear-gradient(to right, ${formColor}, ${toColor})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }} className={cn(`text-[26px] font-[450] tracking-[0px] bg-gradient-to-r bg-clip-text text-transparent inline-block`, gradientColors[type])}>
                                {title}
                            </h2>
                            <button 
                                onClick={handleCloseClick} 
                                className="z-[10001] relative cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="text-[#475467] text-[16px] space-y-6">
                            {renderMessage()}
                        </div>

                        {children && children}

                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-b-zeak p-6 bg-[#EEF3F8]">
                        <button
                            onClick={handleLeftButtonClick}
                            className={cn("flex p-[12px] flex-col font-medium text-[#677281] text-[16px] justify-center items-center gap-[8px] flex-[1_0_0] self-stretch rounded-[8px] bg-[#FFF] px-6 z-[10001] relative cursor-pointer", leftButtonClassName)}
                            style={{ pointerEvents: 'auto' }}
                        >
                            {leftButtonText}
                        </button>
                        <button
                            onClick={handleRightButtonClick}
                            className={cn("flex font-medium h-[56px] min-w-[160px] max-w-[600px] p-[12px] justify-center items-center flex-[1_0_0] rounded-[8px] bg-[#0D0844] text-white px-6 z-[10001] relative cursor-pointer", rightButtonClassName)}
                            style={{ pointerEvents: 'auto' }}
                        >
                            {rightButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Use createPortal to render the modal at the document body level
    return createPortal(
        modalContent,
        container || document.body
    );
};

export default ConfirmationModal;