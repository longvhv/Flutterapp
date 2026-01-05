import React, { createContext, useContext } from 'react';

interface VHVNotification {
  type: string;
  data?: any;
}

const NotificationContext = createContext<((notification: VHVNotification) => void) | null>(null);

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);
  return (notification: VHVNotification) => {
    dispatch?.(notification);
  };
};

interface VHVNotificationListenerProps {
  children: React.ReactNode;
  onNotification: (notification: VHVNotification) => boolean;
  className?: string;
}

export const VHVNotificationListener: React.FC<VHVNotificationListenerProps> = ({
  children,
  onNotification,
  className = '',
}) => {
  const parentDispatch = useContext(NotificationContext);

  const handleNotification = (notification: VHVNotification) => {
    const handled = onNotification(notification);
    if (!handled && parentDispatch) {
      parentDispatch(notification);
    }
  };

  return (
    <NotificationContext.Provider value={handleNotification}>
      <div className={className}>{children}</div>
    </NotificationContext.Provider>
  );
};
