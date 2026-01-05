import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

interface VHVDropzoneProps {
  onFilesSelected?: (files: File[]) => void;
  onFileRemove?: (id: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  showPreview?: boolean;
  className?: string;
}

export const VHVDropzone: React.FC<VHVDropzoneProps> = ({
  onFilesSelected,
  onFileRemove,
  accept,
  maxSize = 10,
  maxFiles = 5,
  multiple = true,
  disabled = false,
  showPreview = true,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB`;
    }
    return null;
  };

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const newUploadedFiles: UploadedFile[] = [];

    fileArray.slice(0, maxFiles - uploadedFiles.length).forEach((file) => {
      const error = validateFile(file);
      const id = Math.random().toString(36).substring(7);
      
      const uploadedFile: UploadedFile = {
        id,
        file,
        error: error || undefined,
        progress: error ? undefined : 100,
      };

      if (file.type.startsWith('image/')) {
        uploadedFile.preview = URL.createObjectURL(file);
      }

      newUploadedFiles.push(uploadedFile);
      if (!error) {
        validFiles.push(file);
      }
    });

    setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
    
    if (validFiles.length > 0) {
      onFilesSelected?.(validFiles);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    processFiles(e.dataTransfer.files);
  }, [disabled, uploadedFiles, maxFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = ''; // Reset input
  };

  const handleRemoveFile = (id: string) => {
    const file = uploadedFiles.find((f) => f.id === id);
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
    onFileRemove?.(id);
  };

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8
          transition-all duration-200
          ${isDragging
            ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <input
          type="file"
          onChange={handleFileInput}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-3 text-center">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-600' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <Upload size={32} className={isDragging ? 'text-white' : 'text-gray-400'} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              {isDragging ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              or click to browse • Max {maxSize}MB • {maxFiles} files
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {showPreview && uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <AnimatePresence>
            {uploadedFiles.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                {uploadedFile.preview ? (
                  <img
                    src={uploadedFile.preview}
                    alt={uploadedFile.file.name}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                    <File size={24} className="text-gray-400" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {uploadedFile.error && (
                    <p className="text-xs text-red-500 mt-1">{uploadedFile.error}</p>
                  )}
                </div>

                {uploadedFile.progress === 100 && !uploadedFile.error && (
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                )}

                <button
                  onClick={() => handleRemoveFile(uploadedFile.id)}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors flex-shrink-0"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
