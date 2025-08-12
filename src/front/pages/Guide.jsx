
// src/front/pages/Guide.jsx - Enhanced with animations using UI components
import React, { useState, useEffect } from 'react';
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
  DocumentTextIcon,
  ArrowsExpandIcon
} from '../components/ui/Icons';
export const Guide = ({ navigateTo }) => {
  const [activeModule, setActiveModule] = useState('beginner');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);
  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);
  const learningPath = {
    beginner: {
      title: 'Beginner Path',
      icon: SparkleIcon,
      description: 'Start your JavaScript journey from scratch',
      estimatedTime: '2-3 weeks',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      lessons: [
        {
          id: 'intro',
          title: 'What is JavaScript?',
          duration: '15 min',
          content: {
            overview: 'JavaScript is a programming language that powers the web. It runs in your browser and makes websites interactive.',
            keyPoints: [
              'Created in 1995 by Brendan Eich',
              'Most popular programming language in the world',
              'Runs in browsers and servers (Node.js)',
              'Used for web development, mobile apps, and more'
            ],
            example: `// Your first JavaScript code
console.log("Hello, World!");
// Variables
let message = "JavaScript is awesome!";
console.log(message);
// Functions
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Developer"));`
          }
        },
        {
          id: 'variables',
          title: 'Variables and Data Types',
          duration: '25 min',
          content: {
            overview: 'Learn how to store and manipulate data in JavaScript.',
            keyPoints: [
              'let, const, and var keywords',
              'Primitive data types (string, number, boolean)',
              'Type conversion and checking',
              'Variable naming conventions'
            ],
            example: `// Variable declarations
let age = 25; // Number
const name = "Alice"; // String (immutable)
let isStudent = true; // Boolean
// Type checking
console.log(typeof age); // "number"
console.log(typeof name); // "string"
// Type conversion
let strNumber = "42";
let number = Number(strNumber); // Convert to number
let str = String(123); // Convert to string
// Template literals (ES6)
const message = \`Hello, \${name}! You are \${age} years old.\`;
console.log(message);`
          }
        }
      ]
    },
    intermediate: {
      title: 'Intermediate Path',
      icon: BookOpenIcon,
      description: 'Level up your JavaScript skills',
      estimatedTime: '3-4 weeks',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      lessons: [
        {
          id: 'functions',
          title: 'Functions Deep Dive',
          duration: '30 min',
          content: {
            overview: 'Master different ways to create and use functions in JavaScript.',
            keyPoints: [
              'Function declarations vs expressions',
              'Arrow functions and their benefits',
              'Parameters, default values, and rest parameters',
              'Scope, closures, and the this keyword'
            ],
            example: `// Different function types
function declaration(name) {
    return \`Hello, \${name}!\`;
}
const expression = function(a, b) {
    return a + b;
};
const arrow = (x, y) => x * y;
// Default parameters
function greet(name = "World") {
    return \`Hello, \${name}!\`;
}
console.log(greet()); // "Hello, World!"`
          }
        }
      ]
    },
    advanced: {
      title: 'Advanced Path',
      icon: RocketIcon,
      description: 'Master advanced JavaScript concepts',
      estimatedTime: '4-6 weeks',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      lessons: [
        {
          id: 'async',
          title: 'Asynchronous JavaScript',
          duration: '45 min',
          content: {
            overview: 'Learn to handle asynchronous operations with Promises and async/await.',
            keyPoints: [
              'Understanding asynchronous programming',
              'Promises: creation, chaining, and error handling',
              'Async/await syntax and best practices',
              'Handling multiple async operations'
            ],
            example: `// Async/await example
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}`
          }
        }
      ]
    }
  };
  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };
  const totalLessons = Object.values(learningPath).reduce(
    (sum, path) => sum + path.lessons.length, 0
  );
  const progressPercentage = (completedLessons.length / totalLessons) * 100;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Animated Header */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-all duration-1000 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="animate-spin-slow">
                  <CompassIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  JavaScript Learning Path
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Follow our structured curriculum to master JavaScript
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Overall Progress: {completedLessons.length} / {totalLessons}
              </div>
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Animated Path Selection */}
        <div
          className={`flex space-x-1 mb-6 bg-white dark:bg-gray-800 rounded-lg p-1 transition-all duration-700 delay-200 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {Object.entries(learningPath).map(([key, path], index) => {
            const IconComponent = path.icon;
            return (
              <button
                key={key}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeModule === key
                    ? `${path.bgColor} ${path.color} shadow-md`
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveModule(key)}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <IconComponent className="w-5 h-5" />
                  <span>{path.title}</span>
                </div>
              </button>
            );
          })}
        </div>
        {/* Current Path Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Animated Path Overview */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24 transition-all duration-700 delay-400 transform ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                {(() => {
                  const PathIcon = learningPath[activeModule].icon;
                  return <PathIcon className={`w-8 h-8 ${learningPath[activeModule].color}`} />;
                })()}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {learningPath[activeModule].title}
                </h3>
              </div>
             
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {learningPath[activeModule].description}
              </p>
             
              <div className="mb-4 flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Estimated Time: {learningPath[activeModule].estimatedTime}
                </span>
              </div>
             
              <div className="space-y-3 mb-6">
                {learningPath[activeModule].lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-md ${
                      currentLesson?.id === lesson.id
                        ? `${learningPath[activeModule].bgColor} border-current`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setCurrentLesson(lesson)}
                    style={{
                      animationDelay: `${600 + index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                      {completedLessons.includes(lesson.id) && (
                        <div className="animate-bounce">
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Quick Actions */}
              <div className="space-y-2">
                {[
                  { icon: CodeIcon, label: 'Open Playground', page: 'playground', color: 'bg-green-500 hover:bg-green-600' },
                  { icon: TrophyIcon, label: 'Try Challenges', page: 'challenges', color: 'bg-purple-500 hover:bg-purple-600' }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigateTo(action.page)}
                    className={`w-full px-4 py-2 ${action.color} text-white rounded-lg transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <action.icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Animated Lesson Content */}
          <div className="lg:col-span-2">
            {currentLesson ? (
              <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-500 delay-600 transform ${
                  currentLesson ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <ClockIcon className="w-4 h-4" />
                      <span>{currentLesson.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentLesson(null)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 transform hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
                <div className="mb-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentLesson.content.overview}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Key Points
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {currentLesson.content.keyPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start animate-slideInLeft"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-blue-500 mr-3 mt-1 transform transition-transform duration-200 hover:scale-110">
                          {'>'}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CodeIcon className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Example Code
                    </h3>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                      <span className="text-gray-400 text-sm flex items-center">
                        <CodeIcon className="w-3 h-3 mr-1" />
                        JavaScript
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(currentLesson.content.example)}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 transform hover:scale-110"
                      >
                        <DocumentTextIcon className="w-4 h-4 inline mr-1" />
                        Copy
                      </button>
                    </div>
                    <pre className="p-4 text-gray-300 overflow-x-auto">
                      <code>{currentLesson.content.example}</code>
                    </pre>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => markLessonComplete(currentLesson.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg ${
                      completedLessons.includes(currentLesson.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {completedLessons.includes(currentLesson.id) ? (
                        <>
                          <CheckCircleIcon className="w-4 h-4" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <BookOpenIcon className="w-4 h-4" />
                          <span>Mark as Complete</span>
                        </>
                      )}
                    </div>
                  </button>
                 
                  <button
                    onClick={() => navigateTo('playground')}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <PlayCircleIcon className="w-4 h-4" />
                      <span>Try in Playground</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center transition-all duration-700 delay-600 transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="animate-bounce mb-4">
                  <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Select a Lesson
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a lesson from the sidebar to start learning
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Animated Progress Summary */}
        <div
          className={`mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-700 delay-800 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center space-x-2 mb-4">
            <ArrowsExpandIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Your Learning Progress
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(learningPath).map(([key, path], index) => {
              const pathCompleted = path.lessons.filter(lesson =>
                completedLessons.includes(lesson.id)
              ).length;
              const pathTotal = path.lessons.length;
              const pathProgress = (pathCompleted / pathTotal) * 100;
              const IconComponent = path.icon;
             
              return (
                <div
                  key={key}
                  className="text-center transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${1000 + index * 200}ms` }}
                >
                  <div className="animate-pulse mb-2">
                    <IconComponent className={`w-12 h-12 mx-auto ${path.color}`} />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {path.title}
                  </h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${pathProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pathCompleted} / {pathTotal} lessons
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Animated Learning Tips */}
        <div
          className={`mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 transition-all duration-700 delay-1000 transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center space-x-2 mb-4">
            <LightbulbIcon className="w-5 h-5 text-blue-600 animate-pulse" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
              Learning Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <BookOpenIcon className="w-4 h-4" />
                <h4 className="font-medium">Study Effectively</h4>
              </div>
              <ul className="space-y-1">
                <li>{'•'} Complete lessons in order</li>
                <li>{'•'} Practice code examples</li>
                <li>{'•'} Take notes on key concepts</li>
                <li>{'•'} Review previous lessons regularly</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <RocketIcon className="w-4 h-4" />
                <h4 className="font-medium">Stay Motivated</h4>
              </div>
              <ul className="space-y-1">
                <li>{'•'} Set daily learning goals</li>
                <li>{'•'} Celebrate small wins</li>
                <li>{'•'} Build real projects</li>
                <li>{'•'} Join the community</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
       
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
       
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
       
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};
