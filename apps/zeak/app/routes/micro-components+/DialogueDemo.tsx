import { useState } from 'react'

import type { FileItem } from '@zeak/react';
import { Dialogue } from '@zeak/react'

const initialFiles = [
    {
        id: '1',
        name: 'company_profile.pdf',
        size: '2.4 MB',
        type: 'PDF',
        uploadDate: 'Dec 12, 2023'
    },
    {
        id: '2',
        name: 'financial_report_2023.xlsx',
        size: '1.8 MB',
        type: 'Excel',
        uploadDate: 'Dec 15, 2023'
    },
    {
        id: '3',
        name: 'presentation.pptx',
        size: '5.2 MB',
        type: 'PowerPoint',
        uploadDate: 'Dec 18, 2023'
    },
    {
        id: '4',
        name: 'very_long_filename_for_testing_truncation.pdf',
        size: '3.7 MB',
        type: 'PDF',
        uploadDate: 'Dec 19, 2023'
    }
]

function DialogueDemo() {
    const [files, setFiles] = useState<FileItem[]>(initialFiles)

    const handleFileUpload = (newFiles: FileList) => {
        const fileArray = Array.from(newFiles).map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            name: file.name,
            size: formatFileSize(file.size),
            type: getFileType(file.type),
            url: URL.createObjectURL(file),
            uploadDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        }))
        setFiles(prev => [...prev, ...fileArray])
    }

    const handleFileDelete = (fileId: string) => {
        setFiles(prev => {
            const newFiles = prev.filter(file => file.id !== fileId)
            // Revoke object URL if it exists
            const deletedFile = prev.find(file => file.id === fileId)
            if (deletedFile?.url) {
                URL.revokeObjectURL(deletedFile.url)
            }
            return newFiles
        })
    }

    const handleFileView = (fileId: string) => {
        const file = files.find(f => f.id === fileId)
        if (file?.url) {
            window.open(file.url, '_blank')
        }
    }

    return (
        <Dialogue
            files={files}
            onFileUpload={handleFileUpload}
            onFileDelete={handleFileDelete}
            onFileView={handleFileView}
        />
    )
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function getFileType(mimeType: string): string {
    if (mimeType.includes('pdf')) return 'PDF'
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Excel'
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PowerPoint'
    if (mimeType.includes('png')) return 'PNG'
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'JPEG'
    return 'Unknown'
}

export default DialogueDemo