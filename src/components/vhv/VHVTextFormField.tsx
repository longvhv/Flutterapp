import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface VHVInputDecoration {
  labelText?: string;
  hintText?: string;
  helperText?: string;
  errorText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  border?: 'outline' | 'underline' | 'none';
  filled?: boolean;
  fillColor?: string;
}

interface VHVTextFormFieldProps {
  initialValue?: string;
  decoration?: VHVInputDecoration;
  validator?: (value?: string) => string | null;
  onSaved?: (value?: string) => void;
  onChanged?: (value: string) => void;
  keyboardType?: 'text' | 'email' | 'number' | 'tel' | 'url';
  obscureText?: boolean;
  maxLines?: number;
  minLines?: number;
  maxLength?: number;
  enabled?: boolean;
  autofocus?: boolean;
  autovalidateMode?: 'always' | 'onUserInteraction' | 'disabled';
  className?: string;
}

export interface VHVTextFormFieldRef {
  validate: () => boolean;
  save: () => void;
  reset: () => void;
}

export const VHVTextFormField = forwardRef<VHVTextFormFieldRef, VHVTextFormFieldProps>(({
  initialValue = '',
  decoration = {},
  validator,
  onSaved,
  onChanged,
  keyboardType = 'text',
  obscureText = false,
  maxLines = 1,
  minLines,
  maxLength,
  enabled = true,
  autofocus = false,
  autovalidateMode = 'disabled',
  className = '',
}, ref) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (validator) {
        const errorMsg = validator(value);
        setError(errorMsg);
        return errorMsg === null;
      }
      return true;
    },
    save: () => {
      onSaved?.(value);
    },
    reset: () => {
      setValue(initialValue);
      setError(null);
      setTouched(false);
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChanged?.(newValue);

    if (autovalidateMode === 'always' || (autovalidateMode === 'onUserInteraction' && touched)) {
      if (validator) {
        const errorMsg = validator(newValue);
        setError(errorMsg);
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (autovalidateMode === 'onUserInteraction' && validator) {
      const errorMsg = validator(value);
      setError(errorMsg);
    }
  };

  const showError = decoration.errorText || error;
  const borderClass = decoration.border === 'underline' 
    ? 'border-b-2 rounded-none'
    : decoration.border === 'none'
    ? 'border-0'
    : 'border rounded-lg';

  const InputComponent = maxLines > 1 ? 'textarea' : 'input';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {decoration.labelText && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {decoration.labelText}
        </label>
      )}
      
      <div className="relative">
        {decoration.prefixIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {decoration.prefixIcon}
          </div>
        )}
        
        <InputComponent
          type={obscureText ? 'password' : keyboardType}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={decoration.hintText}
          disabled={!enabled}
          autoFocus={autofocus}
          maxLength={maxLength}
          rows={maxLines > 1 ? maxLines : undefined}
          style={{
            backgroundColor: decoration.filled ? decoration.fillColor || '#F3F4F6' : undefined,
            minHeight: minLines ? `${minLines * 1.5}em` : undefined,
          }}
          className={`
            w-full px-4 py-2
            ${decoration.prefixIcon ? 'pl-10' : ''}
            ${decoration.suffixIcon ? 'pr-10' : ''}
            ${borderClass}
            ${showError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            dark:bg-gray-800 dark:text-white
            ${maxLines > 1 ? 'resize-y' : ''}
          `}
        />
        
        {decoration.suffixIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {decoration.suffixIcon}
          </div>
        )}
      </div>

      {showError && (
        <span className="text-xs text-red-500">{showError}</span>
      )}
      {!showError && decoration.helperText && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{decoration.helperText}</span>
      )}
    </div>
  );
});

VHVTextFormField.displayName = 'VHVTextFormField';
