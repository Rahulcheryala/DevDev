import { useState } from 'react'

import { Upload, Button, type FileItem } from '@zeak/ui'

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

export default function UploadDocumentation() {
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [lastAction, setLastAction] = useState<string | null>(null)

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
    setLastAction(`Uploaded ${fileArray.length} file(s)`)
  }

  const handleFileDelete = (fileId: string) => {
    setFiles(prev => {
      const deletedFile = prev.find(file => file.id === fileId)
      const newFiles = prev.filter(file => file.id !== fileId)

      // Revoke object URL if it exists
      if (deletedFile?.url) {
        URL.revokeObjectURL(deletedFile.url)
      }

      setLastAction(`Deleted file: ${deletedFile?.name || fileId}`)
      return newFiles
    })
  }

  const handleFileView = (fileId: string) => {
    const file = files.find(f => f.id === fileId)
    if (file) {
      setLastAction(`Viewed file: ${file.name}`)
      if (file.url) {
        window.open(file.url, '_blank')
      }
    }
  }

  const resetFiles = () => {
    setFiles(initialFiles)
    setLastAction('Reset to initial files')
  }

  return (
    <div className="container mx-auto p-6">
      <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Upload Component</h1>
        <p className="text-gray-600 text-lg">
          A versatile file upload and management component with drag-and-drop functionality.
        </p>
      </header>

      <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
          <code>import {"{"} Upload, type FileItem {"}"} from '@zeak/ui';</code>
        </div>
      </section>

      <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
        <div className="flex flex-col gap-6 p-6 bg-[#F0F4FD] rounded-lg border border-gray-200">
          {lastAction && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800">
                <strong>Last Action:</strong> {lastAction}
              </p>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              onClick={resetFiles}
              variant="outline"
              className="mb-2"
            >
              Reset Files
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <Upload
              containerWidth="w-full"
              files={files}
              onFileUpload={handleFileUpload}
              onFileDelete={handleFileDelete}
              onFileView={handleFileView}
            />
          </div>
        </div>
      </section>

      <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
            <span>Drag and drop file uploads</span>
          </li>
          <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
            <span>File preview and management</span>
          </li>
          <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
            <span>Support for various file types</span>
          </li>
          <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
            <span>File size display and formatting</span>
          </li>
          <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
            <span>Customizable file actions (view, delete)</span>
          </li>
          <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
            <span>Upload date tracking</span>
          </li>
        </ul>
      </section>

      <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
            <div>Prop</div>
            <div>Type</div>
            <div>Required</div>
            <div>Default</div>
            <div>Description</div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">files</code></div>
            <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">FileItem[]</code></div>
            <div className="text-green-600 font-medium">Yes</div>
            <div>-</div>
            <div>Array of file objects to display</div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onFileUpload</code></div>
            <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(files: FileList) ={">"} void</code></div>
            <div className="text-green-600 font-medium">Yes</div>
            <div>-</div>
            <div>Function called when files are uploaded</div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onFileDelete</code></div>
            <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(fileId: string) ={">"} void</code></div>
            <div className="text-green-600 font-medium">Yes</div>
            <div>-</div>
            <div>Function called when a file is deleted</div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onFileView</code></div>
            <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(fileId: string) ={">"} void</code></div>
            <div className="text-green-600 font-medium">Yes</div>
            <div>-</div>
            <div>Function called when a file is viewed</div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">containerWidth</code></div>
            <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
            <div>No</div>
            <div>-</div>
            <div>CSS width class for the upload container (e.g., "w-full")</div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
            <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
            <div>No</div>
            <div>""</div>
            <div>Additional CSS classes for the component</div>
          </div>

          <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
            <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">dropzoneText</code></div>
            <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
            <div>No</div>
            <div>"Drag files here or click to upload"</div>
            <div>Custom text for the upload dropzone</div>
          </div>
        </div>
      </section>

      <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">FileItem Interface</h2>
        <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
          <pre>{`interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  url?: string;
}`}</pre>
        </div>
      </section>

      <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
        <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
          <pre>{`import { useState, useEffect } from 'react';
import { Upload, type FileItem } from '@zeak/ui';
import { Button } from '@zeak/react';
import { useToast } from '@zeak/react';

const DocumentUploadPage = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Simulate loading files from an API
  useEffect(() => {
    // In a real app, fetch existing files from an API
    const fetchFiles = async () => {
      try {
        // Simulated API response
        const response = [
          {
            id: 'doc-1',
            name: 'annual_report.pdf',
            size: '4.2 MB',
            type: 'PDF',
            uploadDate: 'Jan 15, 2023'
          },
          {
            id: 'doc-2',
            name: 'financial_statements.xlsx',
            size: '2.1 MB',
            type: 'Excel',
            uploadDate: 'Feb 3, 2023'
          }
        ];
        
        setFiles(response);
      } catch (error) {
        console.error('Error fetching files:', error);
        toast({
          title: 'Error',
          description: 'Failed to load existing files',
          variant: 'destructive'
        });
      }
    };
    
    fetchFiles();
  }, [toast]);

  const handleFileUpload = async (newFiles: FileList) => {
    setIsUploading(true);
    
    try {
      // Process files
      const fileArray = Array.from(newFiles).map((file, index) => ({
        id: \`upload-\${Date.now()}-\${index}\`,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.type),
        url: URL.createObjectURL(file),
        uploadDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }));
      
      // In a real app, you would upload files to a server here
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFiles(prev => [...prev, ...fileArray]);
      toast({
        title: 'Success',
        description: \`\${fileArray.length} file(s) uploaded successfully\`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload files',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      // In a real app, you would make an API call to delete the file
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFiles(prev => {
        const deletedFile = prev.find(file => file.id === fileId);
        const newFiles = prev.filter(file => file.id !== fileId);
        
        // Revoke object URL if it exists
        if (deletedFile?.url) {
          URL.revokeObjectURL(deletedFile.url);
        }
        
        toast({
          title: 'File Deleted',
          description: \`\${deletedFile?.name || 'File'} has been removed\`,
          variant: 'default'
        });
        
        return newFiles;
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete file',
        variant: 'destructive'
      });
    }
  };

  const handleFileView = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file?.url) {
      window.open(file.url, '_blank');
    } else if (file) {
      // In a real app, you might fetch the file from the server
      toast({
        title: 'View File',
        description: \`Viewing \${file.name}\`,
        variant: 'default'
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Management</h1>
      <p className="text-gray-600 mb-6">
        Upload, view, and manage your important documents.
      </p>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Company Documents</h2>
        
        <Upload
          files={files}
          onFileUpload={handleFileUpload}
          onFileDelete={handleFileDelete}
          onFileView={handleFileView}
          dropzoneText={isUploading ? "Uploading..." : "Drag files here or click to upload documents"}
          className={isUploading ? "opacity-70 pointer-events-none" : ""}
        />
        
        {files.length > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            {files.length} document(s) in total
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} \${sizes[i]}\`;
}

function getFileType(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'PDF';
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Excel';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PowerPoint';
  if (mimeType.includes('png')) return 'PNG';
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'JPEG';
  return 'Unknown';
}`}</pre>
        </div>
      </section>
    </div>
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