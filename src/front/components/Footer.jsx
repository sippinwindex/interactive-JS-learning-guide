// src/front/components/Footer.jsx
import React from 'react';
import { HeartIcon, GitHubIcon, BrandIcon } from './ui/Icons';

export const Footer = ({ navigateTo }) => {
  const handleGitHubClick = () => {
    window.open("https://github.com/sippinwindex", "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <BrandIcon className="w-8 h-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-matcha-400 to-wood-400 bg-clip-text text-transparent">
                JS Master
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The interactive JavaScript learning platform built for developers who want to 
              master the language through hands-on practice.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by Jandry Fernandez</span>
            </div>
          </div>
          
          {/* Learn Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Learn</h3>
            <div className="space-y-2">
              {[
                { label: 'Documentation', page: 'documentation' },
                { label: 'Learning Guide', page: 'guide' },
                { label: 'JavaScript Basics', page: 'documentation' },
                { label: 'Advanced Topics', page: 'documentation' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigateTo && navigateTo(item.page)}
                  className="block text-gray-400 hover:text-matcha-400 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Practice Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Practice</h3>
            <div className="space-y-2">
              {[
                { label: 'Code Playground', page: 'playground' },
                { label: 'Coding Challenges', page: 'challenges' },
                { label: 'Interactive Examples', page: 'playground' },
                { label: 'Project Ideas', page: 'challenges' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigateTo && navigateTo(item.page)}
                  className="block text-gray-400 hover:text-wood-400 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Community Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Community</h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 group"
              >
                <span>Discord Server</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 group"
              >
                <span>Stack Overflow</span>
              </a>
              <a 
                href="#" 
                className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors duration-200 group"
              >
                <span>Reddit Community</span>
              </a>
              <button
                onClick={handleGitHubClick}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <GitHubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 JS Master - Interactive JavaScript Learning Platform</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors text-sm">
                Terms of Service
              </a>
              <button
                onClick={handleGitHubClick}
                className="group p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200"
                aria-label="Visit GitHub Profile"
              >
                <GitHubIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors group-hover:scale-110 transform" />
              </button>
            </div>
          </div>
          
          {/* Terminal-style Footer */}
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
              <span className="text-green-400">$</span>
              <span>npm install javascript-knowledge</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};