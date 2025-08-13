// src/front/app.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeartIcon } from './components/ui/Icons';
import { ToastProvider } from './providers/ToastProvider'; // Add this import

// Direct imports instead of lazy loading to avoid path issues
import HomePage from './pages/Home';
import { Documentation } from './pages/Documentation';
import { Challenges } from './pages/Challenges';
import { Guide } from './pages/Guide';
import EnhancedPlayground from './components/playground/EnhancedPlayground';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <div className="text-gray-600 dark:text-gray-400">Loading...</div>
    </div>
  </div>
);

// Simple router component without external dependencies
const SimpleRouter = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme on component mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Determine initial theme
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      setIsDarkMode(shouldBeDark);
      
      // Apply theme to document immediately
      const htmlElement = document.documentElement;
      if (shouldBeDark) {
        htmlElement.classList.add('dark');
        htmlElement.style.colorScheme = 'dark';
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.style.colorScheme = 'light';
      }
    } catch (error) {
      console.warn('Failed to initialize theme:', error);
    }
    
    // Initialize page from URL hash
    const hash = window.location.hash.slice(1); // Remove #
    if (hash && ['home', 'documentation', 'playground', 'challenges', 'guide'].includes(hash)) {
      setCurrentPage(hash);
    }
    
    // Simulate loading time to ensure everything is ready
    setTimeout(() => setIsLoading(false), 100);
  }, []);

  // Listen for hash changes (ADD THIS)
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1); // Remove #
    if (hash && ['home', 'documentation', 'playground', 'challenges', 'guide'].includes(hash)) {
      setCurrentPage(hash);
    } else if (!hash) {
      setCurrentPage('home');
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);

  // Update URL hash when page changes
  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  // Theme toggle function
  const toggleTheme = () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      
      const htmlElement = document.documentElement;
      if (newDarkMode) {
        htmlElement.classList.add('dark');
        htmlElement.style.colorScheme = 'dark';
        localStorage.setItem('theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.style.colorScheme = 'light';
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.warn('Failed to toggle theme:', error);
    }
  };

  // Navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current page component with error handling
  const renderCurrentPage = () => {
    const pageProps = { navigateTo, isDarkMode };
    
    try {
      switch (currentPage) {
        case 'documentation':
          return <Documentation {...pageProps} />;
        case 'playground':
          return <EnhancedPlayground {...pageProps} />;
        case 'challenges':
          return <Challenges {...pageProps} />;
        case 'guide':
          return <Guide {...pageProps} />;
        default:
          return <HomePage {...pageProps} />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Page Load Error
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Failed to load the {currentPage} page.
            </p>
            <button 
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }
  };

  // Show loading spinner initially
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <ToastProvider> {/* Wrap everything with ToastProvider */}
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Navbar 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme}
            currentPage={currentPage}
            navigateTo={navigateTo}
          />
          
          <div className="transition-all duration-300">
            {renderCurrentPage()}
          </div>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">JS</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      JS Master
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    The interactive JavaScript learning platform built for developers.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Learn</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => navigateTo('documentation')}
                      className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      Documentation
                    </button>
                    <button 
                      onClick={() => navigateTo('guide')}
                      className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      Learning Path
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Practice</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => navigateTo('playground')}
                      className="block text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                    >
                      Code Playground
                    </button>
                    <button 
                      onClick={() => navigateTo('challenges')}
                      className="block text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                    >
                      Challenges
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Community</h3>
                  <div className="space-y-2">
                    <a href="https://github.com" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      GitHub
                    </a>
                    <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      Discord
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Built with <HeartIcon className="w-4 h-4 inline text-red-500" /> for JavaScript learners everywhere
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  © 2024 JS Master - Interactive JavaScript Learning Platform
                </p>
              </div>
            </div>
          </footer>
        </div>
      </ToastProvider> {/* Close ToastProvider */}
    </ErrorBoundary>
  );
};

// Export the router as the default
export default SimpleRouter;