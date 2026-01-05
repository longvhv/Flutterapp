import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export type VHVSnackbarVariant = 'success' | 'error' | 'warning' | 'info';

interface SnackbarData {
  id: string;
  message: string;
  variant: VHVSnackbarVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface VHVSnackbarContextType {
  showSnackbar: (message: string, variant?: VHVSnackbarVariant, duration?: number, action?: SnackbarData['action']) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const VHVSnackbarContext = createContext<VHVSnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(VHVSnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within VHVSnackbarProvider');
  }
  return context;
};

export const VHVSnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarData[]>([]);

  const showSnackbar = useCallback((
    message: string,
    variant: VHVSnackbarVariant = 'info',
    duration: number = 4000,
    action?: SnackbarData['action']
  ) => {
    const id = Math.random().toString(36).substring(7);
    const newSnackbar: SnackbarData = { id, message, variant, duration, action };
    
    setSnackbars((prev) => [...prev, newSnackbar]);

    if (duration > 0) {
      setTimeout(() => {
        removeSnackbar(id);
      }, duration);
    }
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    showSnackbar(message, 'success', duration);
  }, [showSnackbar]);

  const showError = useCallback((message: string, duration?: number) => {
    showSnackbar(message, 'error', duration);
  }, [showSnackbar]);

  const showWarning = useCallback((message: string, duration?: number) => {
    showSnackbar(message, 'warning', duration);
  }, [showSnackbar]);

  const showInfo = useCallback((message: string, duration?: number) => {
    showSnackbar(message, 'info', duration);
  }, [showSnackbar]);

  const removeSnackbar = (id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  };

  return (
    <VHVSnackbarContext.Provider value={{ showSnackbar, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <VHVSnackbarContainer snackbars={snackbars} onRemove={removeSnackbar} />
    </VHVSnackbarContext.Provider>
  );
};

interface VHVSnackbarContainerProps {
  snackbars: SnackbarData[];
  onRemove: (id: string) => void;
}

const VHVSnackbarContainer: React.FC<VHVSnackbarContainerProps> = ({ snackbars, onRemove }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const variantClasses = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-600 text-white',
    info: 'bg-blue-600 text-white',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence>
        {snackbars.map((snackbar) => {
          const Icon = icons[snackbar.variant];
          return (
            <motion.div
              key={snackbar.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className={`
                ${variantClasses[snackbar.variant]}
                rounded-xl shadow-2xl p-4 flex items-center gap-3
                min-w-[300px]
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="flex-1 text-sm font-medium">{snackbar.message}</span>
              
              {snackbar.action && (
                <button
                  onClick={snackbar.action.onClick}
                  className="px-3 py-1 text-sm font-semibold hover:bg-white/20 rounded-lg transition-colors"
                >
                  {snackbar.action.label}
                </button>
              )}
              
              <button
                onClick={() => onRemove(snackbar.id)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
