import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type VHVAlertVariant = 'success' | 'error' | 'warning' | 'info';
export type VHVAlertSeverity = 'filled' | 'outlined' | 'standard';

interface VHVAlertProps {
  variant: VHVAlertVariant;
  severity?: VHVAlertSeverity;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export const VHVAlert: React.FC<VHVAlertProps> = ({
  variant,
  severity = 'standard',
  title,
  children,
  icon,
  showIcon = true,
  closable = false,
  onClose,
  action,
  className = '',
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const variantClasses = {
    filled: {
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
      warning: 'bg-yellow-600 text-white',
      info: 'bg-blue-600 text-white',
    },
    outlined: {
      success: 'border-2 border-green-600 text-green-700 dark:text-green-400 bg-transparent',
      error: 'border-2 border-red-600 text-red-700 dark:text-red-400 bg-transparent',
      warning: 'border-2 border-yellow-600 text-yellow-700 dark:text-yellow-400 bg-transparent',
      info: 'border-2 border-blue-600 text-blue-700 dark:text-blue-400 bg-transparent',
    },
    standard: {
      success: 'bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300',
      error: 'bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300',
      warning: 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300',
      info: 'bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300',
    },
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 200);
  };

  const Icon = icon || (showIcon ? icons[variant] : null);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            rounded-xl p-4 flex items-start gap-3
            ${variantClasses[severity][variant]}
            ${className}
          `}
        >
          {Icon && (
            <div className="flex-shrink-0 mt-0.5">
              {typeof Icon === 'function' ? <Icon size={20} /> : Icon}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {title && (
              <div className="font-semibold mb-1">{title}</div>
            )}
            <div className="text-sm">{children}</div>
            {action && (
              <div className="mt-3">{action}</div>
            )}
          </div>

          {closable && (
            <button
              onClick={handleClose}
              className={`
                flex-shrink-0 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors
                ${severity === 'filled' ? 'text-white' : ''}
              `}
            >
              <X size={18} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
