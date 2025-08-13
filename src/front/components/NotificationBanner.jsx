// src/front/components/NotificationBanner.jsx
import React, { useState, useEffect } from 'react';
import { 
  InformationCircleIcon, 
  ExternalLinkIcon, 
  XIcon,
  LightbulbIcon 
} from './ui/Icons';

export const NotificationBanner = ({ 
  message, 
  type = 'info', 
  autoHide = true, 
  duration = 5000,
  onClose = null 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const typeStyles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      icon: InformationCircleIcon
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-700 dark:text-green-300',
      icon: InformationCircleIcon
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-700 dark:text-yellow-300',
      icon: LightbulbIcon
    },
    playground: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-700 dark:text-purple-300',
      icon: ExternalLinkIcon
    }
  };

  const style = typeStyles[type] || typeStyles.info;
  const IconComponent = style.icon;

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 mb-4 animate-slideDown`}>
      <div className="flex items-start space-x-3">
        <IconComponent className={`w-5 h-5 ${style.text} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className={`${style.text} text-sm`}>{message}</p>
        </div>
        <button
          onClick={handleClose}
          className={`${style.text} hover:opacity-70 transition-opacity`}
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Playground-specific notification component
export const PlaygroundNotification = ({ onClose }) => (
  <NotificationBanner
    type="playground"
    message="💡 Tip: The playground opened in a new tab! You can switch back and forth between this learning content and the playground to practice what you're learning."
    autoHide={true}
    duration={8000}
    onClose={onClose}
  />
);

// Context provider for global notifications
import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info', options = {}) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type,
      ...options
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after duration
    if (options.autoHide !== false) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, options.duration || 5000);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showPlaygroundTip = useCallback(() => {
    return showNotification(
      "💡 Playground opened in new tab! Switch between tabs to practice while learning.",
      "playground",
      { duration: 8000 }
    );
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      showNotification,
      removeNotification,
      showPlaygroundTip
    }}>
      {children}
      
      {/* Render notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-md">
        {notifications.map(notification => (
          <NotificationBanner
            key={notification.id}
            message={notification.message}
            type={notification.type}
            autoHide={notification.autoHide}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};