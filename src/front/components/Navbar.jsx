// src/front/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { 
  BrandIcon, 
  HomeIcon, 
  BookOpenIcon, 
  CodeIcon, 
  TrophyIcon, 
  CompassIcon, 
  SunIcon, 
  MoonIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon
} from './ui/Icons';

export const Navbar = ({ isDarkMode, toggleTheme, currentPage, navigateTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: HomeIcon,
      description: 'Welcome page'
    },
    { 
      id: 'documentation', 
      label: 'Documentation', 
      icon: BookOpenIcon,
      description: 'Learn JavaScript concepts'
    },
    { 
      id: 'playground', 
      label: 'Playground', 
      icon: CodeIcon,
      description: 'Interactive code editor'
    },
    { 
      id: 'challenges', 
      label: 'Challenges', 
      icon: TrophyIcon,
      description: 'Test your skills'
    },
    { 
      id: 'guide', 
      label: 'Guide', 
      icon: CompassIcon,
      description: 'Structured learning path'
    }
  ];

  const handleNavigation = (pageId) => {
    navigateTo(pageId);
    setIsMobileMenuOpen(false);
  };

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
            onClick={() => handleNavigation('home')}
            className="flex items-center space-x-3 group transition-all duration-200 hover:scale-105"
          >
            <BrandIcon className="w-8 h-8 group-hover:shadow-lg transition-shadow" />
            <span className="text-xl font-bold bg-gradient-to-r from-matcha-600 to-wood-600 bg-clip-text text-transparent">
              JS Master
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(1).map(({ id, label, icon: IconComponent }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-matcha-100 text-matcha-700 dark:bg-matcha-900/30 dark:text-matcha-300 shadow-sm'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-sm'
                }`}
                title={navItems.find(item => item.id === id)?.description}
              >
                <IconComponent className={`w-4 h-4 transition-colors ${
                  currentPage === id
                    ? 'text-matcha-600 dark:text-matcha-400'
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                }`} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}>
                  <SunIcon className="w-5 h-5 text-yellow-500 group-hover:text-yellow-600" />
                </div>
                {/* Moon Icon */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`}>
                  <MoonIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-500" />
                </div>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="w-5 h-5">
                  {isMobileMenuOpen ? (
                    <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <MenuIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {navItems.map(({ id, label, icon: IconComponent, description }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-matcha-100 text-matcha-700 dark:bg-matcha-900/30 dark:text-matcha-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${
                  currentPage === id
                    ? 'text-matcha-600 dark:text-matcha-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`} />
                <div className="flex-1 text-left">
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
          style={{ top: '64px' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};