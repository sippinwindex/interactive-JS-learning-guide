// src/front/components/ui/Toast.jsx
import React, { useState, useEffect } from 'react';
import { XIcon, InfoIcon, ExclamationTriangleIcon, CheckCircleIcon } from './ui/Icons';

export const Toast = ({ 
  show, 
  onClose, 
  type = 'info', 
  title, 
  message, 
  actions,
  persistent = false,
  duration = 8000 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50); // Small delay for smooth animation
      
      if (!persistent) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }
  }, [show, persistent, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300); // Match animation duration
  };

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-yellow-500',
          titleColor: 'text-yellow-800 dark:text-yellow-200'
        };
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
          icon: CheckCircleIcon,
          iconColor: 'text-green-500',
          titleColor: 'text-green-800 dark:text-green-200'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-red-500',
          titleColor: 'text-red-800 dark:text-red-200'
        };
      default: // info
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
          icon: InfoIcon,
          iconColor: 'text-blue-500',
          titleColor: 'text-blue-800 dark:text-blue-200'
        };
    }
  };

  const typeStyles = getTypeStyles();
  const IconComponent = typeStyles.icon;

  return (
    <div 
      className={`fixed top-20 right-4 z-50 transition-all duration-300 transform ${
        isAnimating 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={`
        max-w-md w-80 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        ${typeStyles.bg}
      `}>
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <IconComponent className={`w-5 h-5 ${typeStyles.iconColor}`} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`text-sm font-semibold mb-1 ${typeStyles.titleColor}`}>
                {title}
              </h4>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {message}
            </p>
            
            {/* Action buttons */}
            {actions && actions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      if (action.closeOnClick !== false) {
                        handleClose();
                      }
                    }}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${action.variant === 'primary' 
                        ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500' 
                        : action.variant === 'danger'
                        ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Dismiss notification"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress bar for non-persistent toasts */}
        {!persistent && (
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-full transition-all ease-linear ${typeStyles.iconColor.replace('text-', 'bg-')}`}
              style={{
                width: '100%',
                animation: `shrink ${duration}ms linear`
              }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};