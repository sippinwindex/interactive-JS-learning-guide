// src/front/providers/ToastProvider.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from '../components/ui/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random(); // Ensure unique IDs
    const newToast = { 
      id,
      persistent: false,
      duration: 8000,
      ...toast 
    };
    
    setToasts(prev => {
      // Limit to 3 toasts max to prevent overflow
      const filtered = prev.slice(-2);
      return [...filtered, newToast];
    });
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Specialized toast methods
  const showSuccess = useCallback((message, options = {}) => {
    return addToast({
      type: 'success',
      title: 'Success',
      message,
      ...options
    });
  }, [addToast]);

  const showError = useCallback((message, options = {}) => {
    return addToast({
      type: 'error',
      title: 'Error',
      message,
      persistent: true, // Errors should be persistent by default
      ...options
    });
  }, [addToast]);

  const showWarning = useCallback((message, options = {}) => {
    return addToast({
      type: 'warning',
      title: 'Warning',
      message,
      ...options
    });
  }, [addToast]);

  const showInfo = useCallback((message, options = {}) => {
    return addToast({
      type: 'info',
      title: 'Info',
      message,
      ...options
    });
  }, [addToast]);

  // Specialized playground warning
  const showPlaygroundWarning = useCallback((onConfirm, onCancel) => {
    const hasSeenWarning = localStorage.getItem('playground-warning-seen');
    
    if (hasSeenWarning) {
      // If user has seen warning before, just confirm directly
      onConfirm(false); // Default to same tab
      return null;
    }

    return addToast({
      type: 'warning',
      title: '🚀 Opening Code Playground',
      message: 'The playground starts with a fresh environment and won\'t include your current learning progress. We recommend opening it in a new tab so you can easily copy code examples and switch between the documentation and playground.',
      persistent: true,
      actions: [
        {
          label: '🔗 Open in New Tab',
          variant: 'primary',
          onClick: () => {
            localStorage.setItem('playground-warning-seen', 'true');
            onConfirm(true);
          }
        },
        {
          label: '➡️ Continue Here',
          variant: 'secondary',
          onClick: () => {
            localStorage.setItem('playground-warning-seen', 'true');
            onConfirm(false);
          }
        },
        {
          label: 'Cancel',
          variant: 'secondary',
          onClick: () => {
            onCancel && onCancel();
          }
        }
      ]
    });
  }, [addToast]);

  // Code copy success toast
  const showCodeCopied = useCallback((language = 'code') => {
    return addToast({
      type: 'success',
      title: '📋 Copied!',
      message: `${language} code copied to clipboard`,
      duration: 3000
    });
  }, [addToast]);

  // Module completion toast
  const showModuleCompleted = useCallback((moduleName) => {
    return addToast({
      type: 'success',
      title: '🎉 Module Completed!',
      message: `Great job finishing "${moduleName}". Ready for the next challenge?`,
      duration: 5000
    });
  }, [addToast]);

  // Network error toast
  const showNetworkError = useCallback(() => {
    return addToast({
      type: 'error',
      title: '🌐 Connection Issue',
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      persistent: true,
      actions: [
        {
          label: 'Retry',
          variant: 'primary',
          onClick: () => {
            window.location.reload();
          }
        }
      ]
    });
  }, [addToast]);

  const contextValue = {
    // Core methods
    addToast,
    removeToast,
    clearAllToasts,
    
    // Convenience methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Specialized methods
    showPlaygroundWarning,
    showCodeCopied,
    showModuleCompleted,
    showNetworkError,
    
    // State
    toasts
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Render toasts container */}
      <div className="fixed top-20 right-4 z-50 space-y-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              show={true}
              onClose={() => removeToast(toast.id)}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              actions={toast.actions}
              persistent={toast.persistent}
              duration={toast.duration}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};