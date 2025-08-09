import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/Home';
import { DocumentationPage } from './pages/Documentation';
import { PlaygroundPage } from './pages/Playground';
import { ChallengesPage } from './pages/Challenges';
import { GuidePage } from './pages/Guide';
import useGlobalReducer from './hooks/useGlobalReducer';

const App = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'documentation':
        return <DocumentationPage navigateTo={navigateTo} />;
      case 'playground':
        return <PlaygroundPage navigateTo={navigateTo} />;
      case 'challenges':
        return <ChallengesPage navigateTo={navigateTo} />;
      case 'guide':
        return <GuidePage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        currentPage={currentPage}
        navigateTo={navigateTo}
      />
      
      {renderCurrentPage()}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">JS</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
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
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-500"
                >
                  Documentation
                </button>
                <button 
                  onClick={() => navigateTo('guide')}
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-500"
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
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-500"
                >
                  Code Playground
                </button>
                <button 
                  onClick={() => navigateTo('challenges')}
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-500"
                >
                  Challenges
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Community</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500">
                  GitHub
                </a>
                <a href="#" className="block text-gray-600 dark:text-gray-400 hover:text-blue-500">
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

export default App;