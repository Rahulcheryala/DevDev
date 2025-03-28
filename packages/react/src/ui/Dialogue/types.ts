export type FileItem = {
    id: string
    name: string
    size: string
    type: string
    url?: string
    uploadDate: string
}

export type DialogueProps = {
    files?: FileItem[]
    onFileUpload?: (files: FileList) => void
    onFileDelete?: (fileId: string) => void
    onFileView?: (fileId: string) => void
    className?: string
}

export type FileError = {
    type: 'invalid-type' | 'invalid-size' | 'max-count'
    message: string
}