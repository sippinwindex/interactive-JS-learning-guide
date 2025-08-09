import React, { useState, useEffect } from 'react';

export const Navbar = ({ isDarkMode, toggleTheme, currentPage, navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'documentation', label: 'Docs', icon: '📚' },
    { id: 'playground', label: 'Playground', icon: '🎮' },
    { id: 'challenges', label: 'Challenges', icon: '🏆' },
    { id: 'guide', label: 'Guide', icon: '🧭' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-matcha-500 to-wood-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold">JS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-matcha-600 to-wood-600 bg-clip-text text-transparent">
              JS Master
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.slice(1).map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => navigateTo(id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-matcha-100 text-matcha-700 dark:bg-matcha-900 dark:text-matcha-300 shadow-sm'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}>
                  <span className="text-yellow-500 text-lg">☀️</span>
                </div>
                {/* Moon Icon */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}>
                  <span className="text-blue-400 text-lg">🌙</span>
                </div>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <div className="relative">
                <button 
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    // Simple mobile menu toggle - you can expand this
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu) {
                      mobileMenu.classList.toggle('hidden');
                    }
                  }}
                >
                  <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                    <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                    <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                    <div className="w-full h-0.5 bg-gray-600 dark:bg-gray-300"></div>
                  </div>
                </button>
                
                {/* Mobile Dropdown */}
                <div 
                  id="mobile-menu"
                  className="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                >
                  {navItems.map(({ id, label, icon }) => (
                    <button
                      key={id}
                      onClick={() => {
                        navigateTo(id);
                        document.getElementById('mobile-menu')?.classList.add('hidden');
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        currentPage === id
                          ? 'text-matcha-600 dark:text-matcha-400 bg-matcha-50 dark:bg-matcha-900/20'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="mr-3">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};