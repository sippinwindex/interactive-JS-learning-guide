// src/front/pages/Documentation.jsx - Enhanced with animations using UI components
import React, { useState, useEffect } from 'react';
import { BasicsSection } from '../components/docs/BasicsSection';
import { ES6Section } from '../components/docs/ES6Section';
import { AdvancedSection } from '../components/docs/AdvancedSection';
import { AsyncSection } from '../components/docs/AsyncSection';
import {
  BookOpenIcon,
  RocketIcon,
  SparkleIcon,
  LightbulbIcon,
  CodeIcon,
  TrophyIcon,
  CompassIcon,
  ChevronRightIcon,
  PlayCircleIcon
} from '../components/ui/Icons';

export const Documentation = ({ navigateTo }) => {
  const [activeSection, setActiveSection] = useState('basics');
  const [runOutput, setRunOutput] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animations on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Section configuration with professional icons
  const sections = {
    basics: {
      title: 'JavaScript Basics',
      icon: SparkleIcon,
      component: BasicsSection,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    es6plus: {
      title: 'ES6+ Modern Features',
      icon: RocketIcon,
      component: ES6Section,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    advanced: {
      title: 'Advanced Concepts',
      icon: LightbulbIcon,
      component: AdvancedSection,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    async: {
      title: 'Async Programming',
      icon: RocketIcon,
      component: AsyncSection,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    }
  };

  // Fixed code execution utility
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

      // Execute code in try-catch
      const result = eval(code);
      
      // Restore console
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      
      // Format output
      if (logs.length === 0) {
        setRunOutput('Code executed successfully (no output)');
      } else {
        const formattedOutput = logs.map(([type, message]) => {
          const prefix = type === 'error' ? '❌ ' : type === 'warn' ? '⚠️ ' : '✓ ';
          return `${prefix}${message}`;
        }).join('\n');
        setRunOutput(formattedOutput);
      }
      
      // If code returns a value, include it
      if (result !== undefined) {
        const resultOutput = `\n→ Return value: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`;
        setRunOutput(prev => (prev || '') + resultOutput);
      }
    } catch (error) {
      setRunOutput(`❌ Error: ${error.message}\n\nStack trace:\n${error.stack}`);
    }
  };

  // Get current section component
  const CurrentSectionComponent = sections[activeSection]?.component;
  const currentSection = sections[activeSection];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Animated Header */}
        <div 
          className={`mb-8 text-center transition-all duration-1000 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="animate-bounce">
              <BookOpenIcon className="w-8 h-8 text-matcha-600 dark:text-matcha-400 mr-3" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Complete JavaScript Documentation
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Master JavaScript from fundamentals to advanced concepts with interactive examples, 
            best practices, and real-world patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Animated Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div 
              className={`bg-white dark:bg-gray-800 rounded-xl p-4 sticky top-24 shadow-lg transition-all duration-700 delay-200 transform ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                <CompassIcon className="w-4 h-4 mr-2" />
                JavaScript Guide
              </h5>
              
              {/* Animated Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Object.keys(sections).indexOf(activeSection) + 1} / {Object.keys(sections).length}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-matcha-500 to-wood-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${((Object.keys(sections).indexOf(activeSection) + 1) / Object.keys(sections).length) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Animated Section Navigation */}
              <nav className="space-y-2 mb-6">
                {Object.entries(sections).map(([key, section], index) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={key}
                      className={`w-full flex items-center space-x-3 text-left px-3 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        activeSection === key 
                          ? `${section.bgColor} ${section.color} shadow-md border border-opacity-20 scale-105` 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:-translate-y-0.5'
                      }`}
                      style={{
                        animationDelay: `${300 + index * 100}ms`
                      }}
                      onClick={() => {
                        setActiveSection(key);
                        setRunOutput(null);
                      }}
                    >
                      <div className="transform transition-transform duration-200 group-hover:scale-110">
                        <IconComponent className={`w-5 h-5 ${
                          activeSection === key ? section.color : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{section.title}</div>
                      </div>
                      {activeSection === key && (
                        <div className="transform transition-transform duration-200 animate-pulse">
                          <ChevronRightIcon className={`w-4 h-4 ${section.color}`} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </nav>
              
              {/* Animated Quick Actions */}
              <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                {[
                  { icon: CodeIcon, label: 'Try Playground', page: 'playground', color: 'bg-matcha-500 hover:bg-matcha-600' },
                  { icon: TrophyIcon, label: 'Try Challenges', page: 'challenges', color: 'bg-wood-500 hover:bg-wood-600' },
                  { icon: CompassIcon, label: 'Learning Path', page: 'guide', color: 'bg-blue-500 hover:bg-blue-600' }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigateTo(action.page)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 ${action.color} text-white rounded-lg transition-all duration-200 text-sm font-medium transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg`}
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Main Content */}
          <div className="lg:col-span-3">
            <div 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-700 delay-400 transform ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Animated Section Header */}
              <div className={`${currentSection?.bgColor || 'bg-gray-50 dark:bg-gray-700'} px-6 py-4 border-b border-gray-200 dark:border-gray-700`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {currentSection?.icon && (
                      <div className="transform transition-transform duration-200 hover:scale-110 hover:rotate-12">
                        <currentSection.icon className={`w-6 h-6 ${currentSection.color}`} />
                      </div>
                    )}
                    <h2 className={`text-2xl font-bold ${currentSection?.color || 'text-gray-800 dark:text-gray-200'}`}>
                      {currentSection?.title}
                    </h2>
                  </div>
                  
                  {/* Animated Section Navigation */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const keys = Object.keys(sections);
                        const currentIndex = keys.indexOf(activeSection);
                        if (currentIndex > 0) {
                          setActiveSection(keys[currentIndex - 1]);
                          setRunOutput(null);
                        }
                      }}
                      disabled={Object.keys(sections).indexOf(activeSection) === 0}
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-500 transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                      <ChevronRightIcon className="w-3 h-3 transform rotate-180" />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={() => {
                        const keys = Object.keys(sections);
                        const currentIndex = keys.indexOf(activeSection);
                        if (currentIndex < keys.length - 1) {
                          setActiveSection(keys[currentIndex + 1]);
                          setRunOutput(null);
                        }
                      }}
                      disabled={Object.keys(sections).indexOf(activeSection) === Object.keys(sections).length - 1}
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-500 transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                      <span>Next</span>
                      <ChevronRightIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated Section Content */}
              <div className="p-6">
                {CurrentSectionComponent ? (
                  <div className="animate-fadeIn">
                    <CurrentSectionComponent 
                      runCode={runCode} 
                      runOutput={runOutput}
                      navigateTo={navigateTo}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12 animate-pulse">
                    <div className="mb-4">
                      <LightbulbIcon className="w-16 h-16 text-gray-400 mx-auto animate-bounce" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Section Coming Soon
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This section is under development. Please check back later!
                    </p>
                  </div>
                )}
              </div>

              {/* Animated Footer Navigation */}
              <div className="bg-gradient-to-r from-matcha-100 to-wood-100 dark:from-matcha-900/20 dark:to-wood-900/20 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="animate-pulse">
                        <PlayCircleIcon className="w-5 h-5 text-matcha-600 dark:text-matcha-400" />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Ready to Practice?
                      </h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Apply what you've learned with hands-on exercises
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => navigateTo('playground')}
                      className="flex items-center space-x-2 px-4 py-2 bg-matcha-500 text-white rounded-lg hover:bg-matcha-600 transition-all duration-200 font-medium transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <CodeIcon className="w-4 h-4" />
                      <span>Code Now</span>
                    </button>
                    <button 
                      onClick={() => navigateTo('challenges')}
                      className="flex items-center space-x-2 px-4 py-2 bg-wood-500 text-white rounded-lg hover:bg-wood-600 transition-all duration-200 font-medium transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <TrophyIcon className="w-4 h-4" />
                      <span>Take Challenge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};