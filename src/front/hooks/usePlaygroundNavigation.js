// src/front/hooks/usePlaygroundNavigation.js
import { useCallback } from 'react';
import { useToast } from '../providers/ToastProvider';

export const usePlaygroundNavigation = () => {
  const { showPlaygroundWarning, showError } = useToast();

  /**
   * Navigate to playground with optional code example
   * Shows warning on first use, then remembers user preference
   */
  const navigateToPlayground = useCallback((navigateTo, codeExample = null, options = {}) => {
    const {
      forceWarning = false, // Force show warning even if seen before
      language = 'javascript', // Programming language for code example
      title = null // Optional title for the code example
    } = options;

    try {
      // Prepare code example data if provided
      if (codeExample) {
        const codeData = {
          code: codeExample,
          language,
          title: title || `Example ${language} code`,
          timestamp: Date.now()
        };
        
        // Store in sessionStorage for potential use in playground
        sessionStorage.setItem('suggested-code', JSON.stringify(codeData));
      }

      // Check if user has seen warning before (unless forced)
      const hasSeenWarning = !forceWarning && localStorage.getItem('playground-warning-seen');
      
      if (hasSeenWarning) {
        // Direct navigation
        navigateTo('playground');
        return;
      }

      // Show warning and handle user choice
      showPlaygroundWarning(
        (openInNewTab) => {
          if (openInNewTab) {
            // Open in new tab
            const url = new URL(window.location);
            url.hash = 'playground';
            
            const newWindow = window.open(url.toString(), '_blank', 'noopener,noreferrer');
            
            if (!newWindow) {
              // Popup blocked - show error and fallback
              showError('Popup blocked. Please allow popups for this site or use "Continue Here" option.');
              return;
            }
            
            // Focus the new window
            newWindow.focus();
          } else {
            // Navigate in current tab
            navigateTo('playground');
          }
        },
        () => {
          // User cancelled - clean up any stored code
          if (codeExample) {
            sessionStorage.removeItem('suggested-code');
          }
        }
      );
    } catch (error) {
      console.error('Error in playground navigation:', error);
      showError('Failed to navigate to playground. Please try again.');
    }
  }, [showPlaygroundWarning, showError]);

  /**
   * Reset the warning preference (for settings/preferences)
   */
  const resetWarningPreference = useCallback(() => {
    localStorage.removeItem('playground-warning-seen');
  }, []);

  /**
   * Check if user has seen the warning before
   */
  const hasSeenWarning = useCallback(() => {
    return !!localStorage.getItem('playground-warning-seen');
  }, []);

  /**
   * Navigate with code example from current context
   */
  const tryCodeInPlayground = useCallback((code, navigateTo, options = {}) => {
    navigateToPlayground(navigateTo, code, {
      language: 'javascript',
      title: 'Try this example',
      ...options
    });
  }, [navigateToPlayground]);

  /**
   * Open playground directly in new tab (bypasses warning)
   */
  const openPlaygroundInNewTab = useCallback((codeExample = null, options = {}) => {
    try {
      if (codeExample) {
        const codeData = {
          code: codeExample,
          language: options.language || 'javascript',
          title: options.title || 'Code example',
          timestamp: Date.now()
        };
        
        sessionStorage.setItem('suggested-code', JSON.stringify(codeData));
      }

      const url = new URL(window.location);
      url.hash = 'playground';
      
      const newWindow = window.open(url.toString(), '_blank', 'noopener,noreferrer');
      
      if (!newWindow) {
        showError('Popup blocked. Please allow popups for this site.');
        return false;
      }
      
      newWindow.focus();
      return true;
    } catch (error) {
      console.error('Error opening playground in new tab:', error);
      showError('Failed to open playground in new tab.');
      return false;
    }
  }, [showError]);

  const copyCodeToClipboard = useCallback(async (code, showFeedback = true) => {
    try {
      await navigator.clipboard.writeText(code);
      return true;
    } catch (error) {
      console.error('Failed to copy code:', error);
      
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        return false;
      }
    }
  }, []);

  // Helper to check if we should open in new tab
  const shouldOpenInNewTab = useCallback(() => {
    const currentPath = window.location.hash || window.location.pathname;
    return currentPath.includes('/guide') || 
           currentPath.includes('/documentation') || 
           currentPath.includes('/challenges');
  }, []);

  return {
    navigateToPlayground,
    tryCodeInPlayground,
    openPlaygroundInNewTab,
    resetWarningPreference,
    hasSeenWarning,
    copyCodeToClipboard,
    shouldOpenInNewTab
  };
};