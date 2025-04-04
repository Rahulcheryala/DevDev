import { Save } from "lucide-react"
import { ui } from "@zeak/react"

interface SaveButtonProps {
    onSave: () => void;
    isLoading?: boolean;
    className?: string;
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "sm" | "lg" | "icon";
    children?: React.ReactNode;
}

const SaveButton = ({
    onSave,
    isLoading = false,
    className = "text-white bg-[#1677FF] hover:bg-[#1677FF]/90 hover:text-white text-sm",
    variant = "ghost",
    size = "default",
    children
}: SaveButtonProps) => {
    return (
        <ui.Button
            disabled={isLoading}
            variant={variant}
            size={size}
            onClick={onSave}
            className={className}
        >
            <Save className="h-5 w-5" />
            {children || "Save"}
        </ui.Button>
    );
};

export default SaveButton;