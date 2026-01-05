import React, { forwardRef, TextareaHTMLAttributes } from 'react';

/**
 * VHVTextArea - Textarea component tương đồng với TextField multiline trong Flutter
 * 
 * Tương đương với TextField(maxLines: > 1) trong Flutter
 */

export interface VHVTextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  controller?: { value: string; setValue: (value: string) => void };
  onChanged?: (value: string) => void;
  maxLines?: number;
  minLines?: number;
  enabled?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  focusBorderColor?: string;
  textColor?: string;
  labelColor?: string;
  errorColor?: string;
}

export const VHVTextArea = forwardRef<HTMLTextAreaElement, VHVTextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      controller,
      onChanged,
      maxLines = 5,
      minLines = 3,
      enabled = true,
      backgroundColor = 'transparent',
      borderRadius = 8,
      borderColor = 'rgba(255, 255, 255, 0.2)',
      focusBorderColor = '#60A5FA',
      textColor,
      labelColor,
      errorColor = '#EF4444',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const value = controller?.value ?? props.value ?? '';
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      controller?.setValue(newValue);
      onChanged?.(newValue);
    };

    const baseStyle: React.CSSProperties = {
      width: '100%',
      padding: '12px 16px',
      backgroundColor,
      border: `1px solid ${error ? errorColor : borderColor}`,
      borderRadius: `${borderRadius}px`,
      color: textColor || 'inherit',
      fontSize: '14px',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: `${minLines * 24 + 24}px`,
      maxHeight: maxLines ? `${maxLines * 24 + 24}px` : 'none',
      transition: 'all 0.2s ease',
      opacity: enabled ? 1 : 0.5,
      cursor: enabled ? 'text' : 'not-allowed',
      ...style,
    };

    return (
      <div className={`vhv-textarea-container ${className}`}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: error ? errorColor : labelColor || 'inherit',
            }}
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          disabled={!enabled}
          style={baseStyle}
          onFocus={(e) => {
            if (enabled && !error) {
              e.currentTarget.style.borderColor = focusBorderColor;
            }
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = borderColor;
            }
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {(error || helperText) && (
          <div
            style={{
              marginTop: '4px',
              fontSize: '12px',
              color: error ? errorColor : 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

VHVTextArea.displayName = 'VHVTextArea';
