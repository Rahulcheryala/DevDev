import { useState, useRef } from 'react'
import { cn } from '../../utils/cn'
import { AttachmentIcon, ChevronDownIconBold, CloseIcon, EyeIcon, FileIcon } from './icons'
import type { DialogueProps, FileItem, FileError } from './types'
import { ChevronDown, ChevronUp } from 'lucide-react'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
const MAX_FILES = 5
const FILE_TRUNCATE_SIZE = 12
const ALLOWED_TYPES = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/png',
    'image/jpeg'
]

function truncateFileName(fileName: string): { name: string, extension: string } {
    const lastDotIndex = fileName.lastIndexOf('.')
    if (lastDotIndex === -1) return { name: fileName, extension: '' }

    const name = fileName.substring(0, lastDotIndex)
    const extension = fileName.substring(lastDotIndex)

    if (name.length <= FILE_TRUNCATE_SIZE) return { name, extension }
    return { name: name.substring(0, FILE_TRUNCATE_SIZE) + '...', extension }
}

// interface DialogueProps {
//     files?: FileItem[]
//     onFileUpload?: (files: FileList) => void
//     onFileDelete?: (fileId: string) => void
//     onFileView?: (fileId: string) => void
//     className?: string
//     containerWidth?: string // New prop for container width
// }

export function Dialogue({
    files = [],
    onFileUpload,
    onFileDelete,
    onFileView,
    className,
    containerWidth = "min-w-[1174px]" // Default value
}: DialogueProps) {
    const [isOpen, setIsOpen] = useState(true)
    const [error, setError] = useState<FileError | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFiles = (fileList: FileList): FileError | null => {
        // Check max files limit
        if (files.length + fileList.length > MAX_FILES) {
            return {
                type: 'max-count',
                message: `Maximum ${MAX_FILES} files allowed`
            }
        }

        // Check each file
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i]

            // Check file type
            if (!ALLOWED_TYPES.includes(file.type)) {
                return {
                    type: 'invalid-type',
                    message: 'Only PDF, Excel, PowerPoint, PNG, and JPEG files are allowed'
                }
            }

            // Check file size
            if (file.size > MAX_FILE_SIZE) {
                return {
                    type: 'invalid-size',
                    message: 'File size should not exceed 10MB'
                }
            }
        }

        return null
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files
        if (!fileList) return

        const validationError = validateFiles(fileList)
        if (validationError) {
            setError(validationError)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
            return
        }

        setError(null)
        if (onFileUpload) {
            onFileUpload(fileList)
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        event.stopPropagation()

        const fileList = event.dataTransfer.files
        if (!fileList) return

        const validationError = validateFiles(fileList)
        if (validationError) {
            setError(validationError)
            return
        }

        setError(null)
        if (onFileUpload) {
            onFileUpload(fileList)
        }
    }

    const handleDelete = (fileId: string) => {
        setError(null) // Clear error when a file is deleted
        onFileDelete?.(fileId)
    }

    return (
        <div className="flex flex-col">
            <div className={cn(containerWidth, className)}>
                {/* Accordion Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-[#E5EAF2] rounded-t-xl"
                >
                    <span className="font-['Suisse_Int\\'l'] text-[#0D0C22] text-lg font-['Suisse Int\'l'] font-medium">
                        Attachments
                    </span>
                    {/* <ChevronDownIconBold
                        className={cn(
                            "transition-transform duration-200 stroke-2",
                            isOpen && "transform rotate-180"
                        )}
                    /> */}

                    {isOpen ? (
                        <ChevronDown className="w-6 h-6" />
                    ) : (
                        <ChevronUp className="w-6 h-6" />
                    )}
                </button>

                {/* Accordion Content */}
                {isOpen && (
                    <div className="flex flex-col p-6 bg-[#F7F7F8] rounded-b-xl gap-10">
                        {/* Upload Section */}
                        <div
                            className="w-full h-[224px] p-10 bg-white rounded-xl border border-dashed border-[#E4E7EC]"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center gap-6">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="cursor-pointer w-[40px] h-[40px] bg-[#A0A0A0] rounded-full flex items-center justify-center"
                                >
                                    <AttachmentIcon />
                                </button>
                                <div className="flex flex-col items-center">
                                    <span className="font-['Suisse_Int\\'l'] text-[20px] font-medium leading-7 tracking-[0.2px] text-[#0D0C22] text-center text-underline-position-from-font text-decoration-skip-ink-none mb-1">
                                        Upload
                                    </span>
                                    <div className="flex flex-col items-center">
                                        <span className="font-['Suisse_Int\\'l'] text-sm font-[450] leading-[19.6px] text-[#9BA2AC] text-center">
                                            Drag/ Drop files here.
                                        </span>
                                        <span className="font-['Suisse_Int\\'l'] text-sm font-[450] leading-[19.6px] text-[#9BA2AC] text-center">
                                            (Max 5 files, 10MB each)
                                        </span>
                                    </div>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    accept=".pdf,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"
                                />
                            </div>
                        </div>

                        {/* Files List */}
                        {files.length > 0 && (
                            <div className="grid grid-cols-3 md:grid-cols-2 gap-8 md:gap-x-24">
                                {files.map((file) => {
                                    const { name, extension } = truncateFileName(file.name)
                                    return (
                                        <div
                                            key={file.id}
                                            className="relative w-[359.33px] h-[56px] bg-white rounded-xl flex items-center justify-between px-4 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileIcon className="w-6 h-6 flex-shrink-0" />
                                                <div className="flex items-center gap-2">
                                                    <div className="relative group/tooltip">
                                                        <span className="font-['Suisse_Int\\'l'] text-base font-medium text-[#677281] leading-none">
                                                            {name}{extension}
                                                        </span>
                                                        {/* Tooltip */}
                                                        <div className="absolute invisible group-hover/tooltip:visible z-[60] bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2">
                                                            <div className="relative bg-[#101828] text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                                                                {file.name}
                                                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#101828]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="font-['Suisse_Int\\'l'] text-sm text-[#9BA2AC] leading-none">
                                                        {file.size}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => onFileView?.(file.id)}
                                                    className="text-[#475467] hover:text-[#101828] p-1"
                                                >
                                                    <EyeIcon />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(file.id)}
                                                    className="text-[#475467] hover:text-[#101828] p-1"
                                                >
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Error message outside the component */}
            {error && (
                <div className="text-red-500 text-sm mt-2">
                    {error.message}
                </div>
            )}
        </div>
    )
}

export * from './types'