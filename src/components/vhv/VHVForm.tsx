import React, { createContext, useContext, useRef, forwardRef, useImperativeHandle } from 'react';

interface VHVFormFieldRef {
  validate: () => boolean;
  save: () => void;
  reset: () => void;
}

interface VHVFormContextValue {
  registerField: (ref: React.RefObject<VHVFormFieldRef>) => void;
  unregisterField: (ref: React.RefObject<VHVFormFieldRef>) => void;
}

const VHVFormContext = createContext<VHVFormContextValue | null>(null);

export const useVHVForm = () => {
  const context = useContext(VHVFormContext);
  return context;
};

export interface VHVFormRef {
  validate: () => boolean;
  save: () => void;
  reset: () => void;
}

interface VHVFormProps {
  children: React.ReactNode;
  onChanged?: () => void;
  autovalidateMode?: 'always' | 'onUserInteraction' | 'disabled';
  className?: string;
}

export const VHVForm = forwardRef<VHVFormRef, VHVFormProps>(({
  children,
  onChanged,
  autovalidateMode = 'disabled',
  className = '',
}, ref) => {
  const fieldsRef = useRef<Set<React.RefObject<VHVFormFieldRef>>>(new Set());

  useImperativeHandle(ref, () => ({
    validate: () => {
      let isValid = true;
      fieldsRef.current.forEach(fieldRef => {
        if (fieldRef.current && !fieldRef.current.validate()) {
          isValid = false;
        }
      });
      return isValid;
    },
    save: () => {
      fieldsRef.current.forEach(fieldRef => {
        fieldRef.current?.save();
      });
    },
    reset: () => {
      fieldsRef.current.forEach(fieldRef => {
        fieldRef.current?.reset();
      });
    },
  }));

  const registerField = (ref: React.RefObject<VHVFormFieldRef>) => {
    fieldsRef.current.add(ref);
  };

  const unregisterField = (ref: React.RefObject<VHVFormFieldRef>) => {
    fieldsRef.current.delete(ref);
  };

  return (
    <VHVFormContext.Provider value={{ registerField, unregisterField }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onChange={onChanged}
        className={className}
      >
        {children}
      </form>
    </VHVFormContext.Provider>
  );
});

VHVForm.displayName = 'VHVForm';
