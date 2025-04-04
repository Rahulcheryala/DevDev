import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea, Button, Textarea } from '@zeak/react'
import { Upload, X, Trash2 } from 'lucide-react'

export default function ExpandedCard() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment])
      setComment('')
    }
  }

  const handleDeleteComment = (index: number) => {
    const newComments = comments.filter((_, i) => i !== index)
    setComments(newComments)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
  }

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 400, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className='w-full bg-white rounded-zeak p-4'
    >
      <div className='flex gap-8'>
        {/* Left side - Comments */}
        <div className='flex-1 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[100px]"
            />
            <Button className='w-60' onClick={handleAddComment}>Add Comment</Button>
          </div>
          
          <ScrollArea className="h-[200px] border rounded-md p-4">
            <div className='flex flex-col gap-4'>
              {comments.map((comment, index) => (
                <div key={index} className='p-3 bg-gray-50 rounded-md flex justify-between items-start'>
                  <div className="flex-1 break-words">{comment}</div>
                  <button 
                    onClick={() => handleDeleteComment(index)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right side - File Upload */}
        <div className='w-[300px] flex flex-col gap-4'>
          <div className='flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 gap-4'>
            <Upload className='w-8 h-8 text-gray-400' />
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className='cursor-pointer text-blue-500 hover:text-blue-600'
            >
              Upload Files
            </label>
          </div>

          <ScrollArea className="flex-1 border rounded-md p-4">
            <div className="flex flex-col gap-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="truncate flex-1">{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="p-1 hover:bg-gray-200 rounded-full ml-2"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </motion.div>
  )
}
