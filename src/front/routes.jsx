import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/Home';
import { Documentation } from './pages/Documentation';
import { Playground } from './pages/Playground';
import { Challenges } from './pages/Challenges';
import { Guide } from './pages/Guide';

// Simple router component without external dependencies
const SimpleRouter = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    
    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current page component
  const renderCurrentPage = () => {
    const pageProps = { navigateTo, isDarkMode };
    
    switch (currentPage) {
      case 'documentation':
        return <Documentation {...pageProps} />;
      case 'playground':
        return <Playground {...pageProps} />;
      case 'challenges':
        return <Challenges {...pageProps} />;
      case 'guide':
        return <Guide {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        currentPage={currentPage}
        navigateTo={navigateTo}
      />
      
      {renderCurrentPage()}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-matcha-500 to-wood-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">JS</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-matcha-600 to-wood-600 bg-clip-text text-transparent">
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
                  className="block text-gray-600 dark:text-gray-400 hover:text-matcha-500 dark:hover:text-matcha-400 transition-colors"
                >
                  Documentation
                </button>
                <button 
                  onClick={() => navigateTo('guide')}
                  className="block text-gray-600 dark:text-gray-400 hover:text-matcha-500 dark:hover:text-matcha-400 transition-colors"
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
                  className="block text-gray-600 dark:text-gray-400 hover:text-wood-500 dark:hover:text-wood-400 transition-colors"
                >
                  Code Playground
                </button>
                <button 
                  onClick={() => navigateTo('challenges')}
                  className="block text-gray-600 dark:text-gray-400 hover:text-wood-500 dark:hover:text-wood-400 transition-colors"
                >
                  Challenges
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Community</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-matcha-500 dark:hover:text-matcha-400 transition-colors">
                  GitHub
                </a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-matcha-500 dark:hover:text-matcha-400 transition-colors">
                  Discord
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Built with ❤️ for JavaScript learners everywhere
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              © 2024 JS Master - Interactive JavaScript Learning Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Export the router as the default
export default SimpleRouter;