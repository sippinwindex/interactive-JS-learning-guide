// src/front/pages/Documentation.jsx - Main Documentation Component
import React, { useState } from 'react';
import { BasicsSection } from '../components/docs/BasicsSection';
import { ES6Section } from '../components/docs/ES6Section';
import { AdvancedSection } from '../components/docs/AdvancedSection';
import { AsyncSection } from '../components/docs/AsyncSection';
import { ErrorHandlingSection } from '../components/docs/ErrorHandlingSection';
import { PerformanceSection } from '../components/docs/PerformanceSection';
import { TestingSection } from '../components/docs/TestingSection';
import { SecuritySection } from '../components/docs/SecuritySection';
import { PatternsSection } from '../components/docs/PatternsSection';
import { ModernAPIsSection } from '../components/docs/ModernAPIsSection';

export const Documentation = ({ navigateTo }) => {
  const [activeSection, setActiveSection] = useState('basics');
  const [runOutput, setRunOutput] = useState('');

  // Section configuration
  const sections = {
    basics: {
      title: 'JavaScript Basics',
      icon: '⭐',
      component: BasicsSection
    },
    es6plus: {
      title: 'ES6+ Modern Features',
      icon: '🚀',
      component: ES6Section
    },
    advanced: {
      title: 'Advanced Concepts',
      icon: '🧠',
      component: AdvancedSection
    },
    async: {
      title: 'Async Programming',
      icon: '⚡',
      component: AsyncSection
    },
    errorhandling: {
      title: 'Error Handling',
      icon: '🛡️',
      component: ErrorHandlingSection
    },
    performance: {
      title: 'Performance Optimization',
      icon: '⚡',
      component: PerformanceSection
    },
    testing: {
      title: 'Testing & Debugging',
      icon: '🧪',
      component: TestingSection
    },
    security: {
      title: 'Security Best Practices',
      icon: '🔒',
      component: SecuritySection
    },
    patterns: {
      title: 'Design Patterns',
      icon: '🏗️',
      component: PatternsSection
    },
    modern: {
      title: 'Modern JavaScript APIs',
      icon: '🌐',
      component: ModernAPIsSection
    }
  };

  // Code execution utility
  const runCode = (code) => {
    try {
      const logs = [];
      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;
      
      // Capture all console outputs
      console.log = (...args) => {
        logs.push(['log', args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')]);
      };
      
      console.warn = (...args) => {
        logs.push(['warn', args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')]);
      };
      
      console.error = (...args) => {
        logs.push(['error', args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')]);
      };

      // Execute code
      eval(code);
      
      // Restore console
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      
      // Format output
      if (logs.length === 0) {
        setRunOutput('Code executed successfully (no output)');
      } else {
        const formattedOutput = logs.map(([type, message]) => {
          const prefix = type === 'error' ? '❌ ' : type === 'warn' ? '⚠️ ' : '📝 ';
          return `${prefix}${message}`;
        }).join('\n');
        setRunOutput(formattedOutput);
      }
    } catch (error) {
      setRunOutput(`❌ Error: ${error.message}`);
    }
  };

  // Get current section component
  const CurrentSectionComponent = sections[activeSection]?.component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Complete JavaScript Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Master JavaScript from fundamentals to advanced concepts with interactive examples, 
            best practices, and real-world patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sticky top-24 shadow-lg">
              <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                JavaScript Guide
              </h5>
              
              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Object.keys(sections).indexOf(activeSection) + 1} / {Object.keys(sections).length}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((Object.keys(sections).indexOf(activeSection) + 1) / Object.keys(sections).length) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Section Navigation */}
              <nav className="space-y-2 mb-6">
                {Object.entries(sections).map(([key, section]) => (
                  <button
                    key={key}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      activeSection === key 
                        ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      setActiveSection(key);
                      setRunOutput(''); // Clear output when switching sections
                    }}
                  >
                    <span className="mr-2">{section.icon}</span>
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
              
              {/* Quick Actions */}
              <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                <button 
                  onClick={() => navigateTo('playground')}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  🎮 Try Playground
                </button>
                <button 
                  onClick={() => navigateTo('challenges')}
                  className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                >
                  🏆 Try Challenges
                </button>
                <button 
                  onClick={() => navigateTo('guide')}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  🧭 Learning Path
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{sections[activeSection]?.icon}</span>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {sections[activeSection]?.title}
                    </h2>
                  </div>
                  
                  {/* Section Navigation */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const keys = Object.keys(sections);
                        const currentIndex = keys.indexOf(activeSection);
                        if (currentIndex > 0) {
                          setActiveSection(keys[currentIndex - 1]);
                          setRunOutput('');
                        }
                      }}
                      disabled={Object.keys(sections).indexOf(activeSection) === 0}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => {
                        const keys = Object.keys(sections);
                        const currentIndex = keys.indexOf(activeSection);
                        if (currentIndex < keys.length - 1) {
                          setActiveSection(keys[currentIndex + 1]);
                          setRunOutput('');
                        }
                      }}
                      disabled={Object.keys(sections).indexOf(activeSection) === Object.keys(sections).length - 1}
                      className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                {CurrentSectionComponent ? (
                  <CurrentSectionComponent 
                    runCode={runCode} 
                    runOutput={runOutput}
                    navigateTo={navigateTo}
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Section Coming Soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This section is under development. Please check back later!
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Navigation */}
              <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      🎯 Ready to Practice?
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Apply what you've learned with hands-on exercises
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => navigateTo('playground')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Code Now
                    </button>
                    <button 
                      onClick={() => navigateTo('challenges')}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                    >
                      Take Challenge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};