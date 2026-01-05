import React, { useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

interface VHVFileInputProps {
  value?: File | File[] | null;
  onChange?: (files: File | File[] | null) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  showPreview?: boolean;
  variant?: 'outlined' | 'filled';
  className?: string;
}

export const VHVFileInput: React.FC<VHVFileInputProps> = ({
  value,
  onChange,
  accept,
  multiple = false,
  disabled = false,
  label,
  placeholder = 'Choose file(s)',
  error,
  helperText,
  showPreview = true,
  variant = 'outlined',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const files = value ? (Array.isArray(value) ? value : [value]) : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      onChange?.(null);
      return;
    }

    if (multiple) {
      onChange?.(Array.from(selectedFiles));
    } else {
      onChange?.(selectedFiles[0]);
    }
  };

  const handleRemove = (index?: number) => {
    if (multiple && index !== undefined) {
      const newFiles = files.filter((_, i) => i !== index);
      onChange?.(newFiles.length > 0 ? newFiles : null);
    } else {
      onChange?.(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const getFileName = (file: File) => {
    return file.name.length > 30 ? file.name.substring(0, 27) + '...' : file.name;
  };

  const getFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  const variantClasses = {
    outlined: `border-2 ${error ? 'border-red-600' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-900`,
    filled: `border-0 ${error ? 'ring-2 ring-red-600' : ''} bg-gray-100 dark:bg-gray-800`,
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-xl
          flex items-center gap-3
          transition-all duration-200
          ${variantClasses[variant]}
          ${disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer'
          }
        `}
      >
        <Upload size={20} className="text-gray-400 flex-shrink-0" />
        <span className={`flex-1 text-left ${files.length === 0 ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
          {files.length === 0
            ? placeholder
            : files.length === 1
            ? getFileName(files[0])
            : `${files.length} files selected`
          }
        </span>
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}

      {/* File Preview List */}
      {showPreview && files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <File size={20} className="text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getFileSize(file.size)}
                </p>
              </div>
              {!disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(multiple ? index : undefined);
                  }}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors flex-shrink-0"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
