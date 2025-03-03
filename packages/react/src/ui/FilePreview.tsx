import { Eye, X } from "lucide-react"
import { Button } from "../Button"
import { cn } from "../utils/cn"

interface FilePreviewProps {
    filename: string
    filesize: string
    fileType?: string
    fileColor?: string
    onView?: () => void
    onClose?: () => void
    className?: string
    iconClassName?: string
    buttonClassName?: string
}

export default function FilePreview({
    filename,
    filesize,
    fileType = "FILE",
    fileColor = "#099250",
    onView,
    onClose,
    className,
    iconClassName,
    buttonClassName
}: FilePreviewProps) {
    return (
        <div className={cn(
            "flex items-center gap-3 max-w-md bg-white rounded-zeak  px-3 py-2 shadow-sm",
            className
        )}>
            <div className={cn(
                "flex items-center justify-center w-6 h-6",
                iconClassName
            )}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill={fileColor} />
                    <text x="12" y="16" fill="white" fontSize="8" fontWeight="600" textAnchor="middle">
                        {fileType}
                    </text>
                </svg>
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#475467] truncate">{filename}</p>
                <p className="text-xs text-[#677281]">{filesize}</p>
            </div>

            <div className="flex items-center gap-2">
                {onView && (
                    <Button
                        variant="ghost"
                        className={cn(
                            "h-8 w-8 text-[#0f91d2] hover:text-[#0f91d2]/90 hover:bg-[#0f91d2]/10",
                            buttonClassName
                        )}
                        onClick={onView}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View file</span>
                    </Button>
                )}

                {onClose && (
                    <button

                        className={cn(
                            "h-8 w-8 text-[#475467] hover:text-[#475467]/90 hover:bg-[#475467]/10",
                            buttonClassName
                        )}
                        onClick={onClose}
                    >
                        <X className="h-4 w-4 text-black" />
                        <span className="sr-only">Remove file</span>
                    </button>
                )}
            </div>
        </div>
    )
}
