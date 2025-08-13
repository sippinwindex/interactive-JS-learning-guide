// src/front/pages/Guide.jsx - Updated with playground integration
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { learningPaths, moduleContentMap, getPathProgress, getAllModules } from '../data/learningContent';
import { CodeBlock, JavaScriptExample, InteractiveExample } from '../components/CodeBlock';
import {
  CompassIcon,
  BookOpenIcon,
  CodeIcon,
  TrophyIcon,
  SparkleIcon,
  RocketIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  LightbulbIcon,
  ClockIcon,
  CogIcon,
  ArrowsExpandIcon,
  ChevronRightIcon
} from '../components/ui/Icons';

// Icon mapping for dynamic icons
const iconMap = {
  SparkleIcon,
  BookOpenIcon,
  CodeIcon,
  TrophyIcon,
  RocketIcon,
  LightbulbIcon,
  ClockIcon,
  CogIcon
};

export const Guide = ({ navigateTo }) => {
  const [activeModule, setActiveModule] = useState('fundamentals');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentLessonContent, setCurrentLessonContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('js-master-completed-lessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (completedLessons.length > 0) {
      localStorage.setItem('js-master-completed-lessons', JSON.stringify(completedLessons));
    }
  }, [completedLessons]);

  // Load lesson content dynamically
  const loadLessonContent = async (lessonId) => {
    if (!moduleContentMap[lessonId]) {
      console.warn(`No content found for lesson: ${lessonId}`);
      return;
    }

    setIsLoadingLesson(true);
    try {
      const module = await moduleContentMap[lessonId]();
      setCurrentLessonContent(module.default || module);
    } catch (error) {
      console.error('Failed to load lesson content:', error);
      setCurrentLessonContent({
        title: 'Content Loading Error',
        overview: 'Failed to load lesson content. Please try again.',
        keyPoints: ['Content temporarily unavailable'],
        example: '// Content loading error\nconsole.log("Please try again later");',
        duration: '0 min'
      });
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const selectLesson = async (lessonId) => {
    setSelectedLesson(lessonId);
    await loadLessonContent(lessonId);
  };

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const totalLessons = getAllModules().length;
  const progressPercentage = (completedLessons.length / totalLessons) * 100;
  const currentPath = learningPaths[activeModule];
  const currentPathProgress = getPathProgress(activeModule, completedLessons);

  // Helper to format lesson title
  const formatLessonTitle = (moduleId) => {
    return moduleId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header - Same as before */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-all duration-1000 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <CompassIcon className="w-8 h-8 text-blue-600 animate-pulse" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Complete JavaScript Mastery
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive curriculum covering all JavaScript concepts
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Overall Progress: {completedLessons.length} / {totalLessons}
              </div>
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Path Navigation - Same as before */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 transition-all duration-700 delay-200 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {Object.entries(learningPaths).map(([key, path], index) => {
            const IconComponent = iconMap[path.icon] || SparkleIcon;
            const pathProgress = getPathProgress(key, completedLessons);
            const isActive = activeModule === key;
            
            return (
              <button
                key={key}
                className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  isActive
                    ? `${path.bgColor} ${path.color} shadow-lg border-2 border-current`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => {
                  setActiveModule(key);
                  setSelectedLesson(null);
                  setCurrentLessonContent(null);
                }}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <IconComponent className={`w-6 h-6 ${isActive ? path.color : 'text-gray-500'}`} />
                  <h3 className="font-semibold text-sm">{path.title}</h3>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pathProgress}%` }}
                  />
                </div>
                <div className="text-xs opacity-75">
                  {Math.round(pathProgress)}% Complete
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module List - Same as before */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24 h-fit transition-all duration-700 delay-400 transform ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              {(() => {
                const IconComponent = iconMap[currentPath.icon] || SparkleIcon;
                return <IconComponent className={`w-6 h-6 ${currentPath.color}`} />;
              })()}
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {currentPath.title}
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {currentPath.description}
            </p>
            
            <div className="mb-4 flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {currentPath.estimatedTime}
              </span>
            </div>

            <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
              {currentPath.modules?.map((moduleId, index) => {
                const isCompleted = completedLessons.includes(moduleId);
                const isSelected = selectedLesson === moduleId;
                const displayName = formatLessonTitle(moduleId);
                
                return (
                  <button
                    key={moduleId}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                      isSelected
                        ? `${currentPath.bgColor} border-current shadow-md`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                    }`}
                    onClick={() => selectLesson(moduleId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                          {displayName}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1">
                          Module {index + 1}
                        </div>
                      </div>
                      {isCompleted && (
                        <CheckCircleIcon className="w-5 h-5 text-green-500 animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <button
                onClick={() => navigateTo('playground')}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <CodeIcon className="w-4 h-4" />
                  <span>Open Playground</span>
                </div>
              </button>
              <button
                onClick={() => navigateTo('challenges')}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center justify-center space-x-2">
                  <TrophyIcon className="w-4 h-4" />
                  <span>Practice Challenges</span>
                </div>
              </button>
            </div>
          </div>

          {/* 🔥 ENHANCED Lesson Content with CodeBlock Integration */}
          <div className="lg:col-span-2">
            {selectedLesson && currentLessonContent ? (
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-500 transform ${
                currentLessonContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {isLoadingLesson ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                          {currentLessonContent.title}
                        </h2>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <ClockIcon className="w-4 h-4" />
                          <span>{currentLessonContent.duration}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedLesson(null);
                          setCurrentLessonContent(null);
                        }}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                      <div className="mb-6">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          {currentLessonContent.overview}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                          <LightbulbIcon className="w-5 h-5 text-blue-600 mr-2" />
                          Key Concepts
                        </h3>
                        <ul className="space-y-2">
                          {currentLessonContent.keyPoints?.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRightIcon className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 🔥 ENHANCED: Interactive Code Example */}
                      {currentLessonContent.example && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                            <CodeIcon className="w-5 h-5 text-green-600 mr-2" />
                            Interactive Example
                          </h3>
                          
                          {/* Use the enhanced CodeBlock with playground integration */}
                          <JavaScriptExample
                            code={currentLessonContent.example}
                            title={`${currentLessonContent.title} - Example`}
                            navigateTo={navigateTo}
                            enablePlayground={true}
                          />
                          
                          {/* Helpful tip */}
                          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <LightbulbIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>💡 Pro Tip:</strong> Click "Try it" to practice this example in the interactive playground while keeping this lesson open in another tab!
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 🔥 ENHANCED: Additional Interactive Examples (if module provides them) */}
                      {currentLessonContent.additionalExamples?.map((example, index) => (
                        <div key={index} className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            {example.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {example.description}
                          </p>
                          
                          <InteractiveExample
                            code={example.code}
                            title={example.title}
                            navigateTo={navigateTo}
                          >
                            {example.hint && (
                              <p><strong>Hint:</strong> {example.hint}</p>
                            )}
                          </InteractiveExample>
                        </div>
                      ))}

                      {/* 🔥 ENHANCED: Practice Exercise (if module provides it) */}
                      {currentLessonContent.practiceExercise && (
                        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                          <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center">
                            <TrophyIcon className="w-5 h-5 mr-2" />
                            Practice Exercise
                          </h3>
                          <p className="text-purple-700 dark:text-purple-300 mb-4">
                            {currentLessonContent.practiceExercise.description}
                          </p>
                          
                          <CodeBlock
                            code={currentLessonContent.practiceExercise.starterCode}
                            title="Practice Exercise - Starter Code"
                            navigateTo={navigateTo}
                            enablePlayground={true}
                          />
                          
                          <div className="mt-4 text-sm text-purple-600 dark:text-purple-400">
                            <strong>Goal:</strong> {currentLessonContent.practiceExercise.goal}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => markLessonComplete(selectedLesson)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                            completedLessons.includes(selectedLesson)
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {completedLessons.includes(selectedLesson) ? (
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4" />
                              <span>Completed</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <BookOpenIcon className="w-4 h-4" />
                              <span>Mark Complete</span>
                            </div>
                          )}
                        </button>

                        <button
                          onClick={() => navigateTo('playground')}
                          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                        >
                          <div className="flex items-center space-x-2">
                            <PlayCircleIcon className="w-4 h-4" />
                            <span>Open Playground</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center transition-all duration-700 delay-600 transform ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Select a Module to Begin
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Choose from {currentPath.modules?.length || 0} modules in {currentPath.title}
                </p>
                <div className="text-sm text-gray-500">
                  Progress: {Math.round(currentPathProgress)}% complete
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Overview - Same as before */}
        <div className={`mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-700 delay-800 transform ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center space-x-2 mb-6">
            <ArrowsExpandIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Learning Progress Overview
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(learningPaths).map(([key, path], index) => {
              const pathProgress = getPathProgress(key, completedLessons);
              const pathCompleted = Math.round(pathProgress);
              const IconComponent = iconMap[path.icon] || SparkleIcon;
              
              return (
                <div
                  key={key}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${1000 + index * 200}ms` }}
                >
                  <IconComponent className={`w-12 h-12 mx-auto ${path.color} mb-3`} />
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2 text-sm">
                    {path.title}
                  </h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${pathProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pathCompleted}% Complete
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};