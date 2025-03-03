"use client"

import { useState, useRef } from "react"
import { Paperclip, Eye, X, ChevronDown } from "lucide-react"
import { cn } from "../utils/cn"
import FilePreview from "./FilePreview"
interface FileItem {
    name: string
    size: string
    type: string
    file: File
}

interface FileUploadProps {
    maxFiles?: number
    maxSizeInMB?: number
    allowedTypes?: string[]
    onFilesChange?: (files: File[]) => void
    title?: string
    className?: string
}

export default function FileUpload({
    maxFiles = 5,
    maxSizeInMB = 10,
    allowedTypes,
    onFilesChange,
    title = "Attachments",
    className
}: FileUploadProps) {
    const [files, setFiles] = useState<FileItem[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const validateFile = (file: File) => {
        if (maxSizeInMB && file.size > maxSizeInMB * 1024 * 1024) {
            alert(`File size should not exceed ${maxSizeInMB}MB`)
            return false
        }

        if (allowedTypes && !allowedTypes.includes(file.type)) {
            alert(`File type ${file.type} is not allowed`)
            return false
        }

        return true
    }

    const handleFiles = (newFiles: File[]) => {
        if (files.length + newFiles.length > maxFiles) {
            alert(`Maximum ${maxFiles} files allowed`)
            return
        }

        const validFiles = newFiles.filter(validateFile)
        const fileItems = validFiles.map((file) => ({
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)}KB`,
            type: file.type,
            file
        }))

        setFiles((prev) => {
            const updatedFiles = [...prev, ...fileItems]
            onFilesChange?.(updatedFiles.map(f => f.file))
            return updatedFiles
        })
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFiles = Array.from(e.dataTransfer.files)
        handleFiles(droppedFiles)
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles) {
            handleFiles(Array.from(selectedFiles))
        }
    }

    const removeFile = (index: number) => {
        setFiles((prev) => {
            const updatedFiles = prev.filter((_, i) => i !== index)
            onFilesChange?.(updatedFiles.map(f => f.file))
            return updatedFiles
        })
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={cn("w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm", className)}>
            <div className="flex items-center justify-between px-4 py-3 bg-[#F5F7FB] rounded-t-xl">
                <h1 className="text-[15px] font-semibold text-[#0d0844]">{title}</h1>
                <button className="p-1 hover:bg-white/50 rounded-full transition-colors">
                    <ChevronDown className="w-5 h-5 text-[#475467]" />
                </button>
            </div>

            <div className="p-6 bg-[#F7F7F8]">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"

                    multiple
                    onChange={handleFileInput}
                    accept={allowedTypes?.join(',')}
                />
                <div
                    className={cn(
                        "border-2 border-dashed rounded-lg p-8 bg-white transition-colors cursor-pointer",
                        isDragging ? "border-[#0f91d2] " : "border-[#e4e7ec]",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleBrowseClick}
                >
                    <div className="flex flex-col items-center justify-center text-center bg-white">
                        <div className="w-12 h-12 rounded-full bg-[#e4e7ec] flex items-center justify-center mb-4">
                            <Paperclip className="w-6 h-6 text-[#475467]" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#0d0844] mb-2">Upload</h2>
                        <p className="text-[#475467] mb-1">Drag/Drop files here or click to browse</p>
                        <p className="text-sm text-[#a0a0a0]">(Max {maxFiles} files, {maxSizeInMB}MB each)</p>
                    </div>
                </div>

                <div className="mt-6 space-y-4 flex gap-3 overflow-x-auto">
                    {files.map((file, index) => (
                        <FilePreview
                            key={index}
                            filename={file.name}
                            filesize={file.size}
                            fileType={file.type}

                            onClose={() => {
                                removeFile(index)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
