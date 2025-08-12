// src/front/pages/Challenges.jsx - Updated with Professional Icons
import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import {
  TrophyIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightbulbIcon,
  PlayCircleIcon,
  ChevronRightIcon,
  SparkleIcon,
  DocumentTextIcon,
  CodeIcon,
  XIcon
} from '../components/ui/Icons';

export const Challenges = ({ navigateTo }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [showHint, setShowHint] = useState(false);

  // Load completed challenges from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedChallenges');
    if (saved) {
      setCompletedChallenges(JSON.parse(saved));
    }
  }, []);

  // Save completed challenges to localStorage
  useEffect(() => {
    localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
  }, [completedChallenges]);

  const challenges = {
    basics: {
      title: 'JavaScript Basics',
      icon: SparkleIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      challenges: [
        {
          id: 'hello-world',
          title: 'Hello World',
          description: 'Write a function that returns "Hello, World!"',
          difficulty: 'Easy',
          starterCode: `function helloWorld() {
  // Your code here
  
}`,
          tests: [
            { input: [], expected: 'Hello, World!', description: 'should return "Hello, World!"' }
          ],
          solution: `function helloWorld() {
  return "Hello, World!";
}`,
          hint: 'Use the return statement to return the string "Hello, World!"'
        },
        {
          id: 'sum-numbers',
          title: 'Sum Two Numbers',
          description: 'Write a function that takes two numbers and returns their sum.',
          difficulty: 'Easy',
          starterCode: `function sum(a, b) {
  // Your code here
  
}`,
          tests: [
            { input: [2, 3], expected: 5, description: 'sum(2, 3) should return 5' },
            { input: [10, 20], expected: 30, description: 'sum(10, 20) should return 30' },
            { input: [-5, 5], expected: 0, description: 'sum(-5, 5) should return 0' }
          ],
          solution: `function sum(a, b) {
  return a + b;
}`,
          hint: 'Use the + operator to add the two parameters'
        },
        {
          id: 'even-odd',
          title: 'Even or Odd',
          description: 'Write a function that returns "even" if a number is even, "odd" if odd.',
          difficulty: 'Easy',
          starterCode: `function evenOrOdd(number) {
  // Your code here
  
}`,
          tests: [
            { input: [2], expected: 'even', description: 'evenOrOdd(2) should return "even"' },
            { input: [3], expected: 'odd', description: 'evenOrOdd(3) should return "odd"' },
            { input: [0], expected: 'even', description: 'evenOrOdd(0) should return "even"' }
          ],
          solution: `function evenOrOdd(number) {
  return number % 2 === 0 ? 'even' : 'odd';
}`,
          hint: 'Use the modulo operator (%) to check if a number is divisible by 2'
        }
      ]
    },
    arrays: {
      title: 'Arrays',
      icon: DocumentTextIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      challenges: [
        {
          id: 'array-sum',
          title: 'Array Sum',
          description: 'Write a function that returns the sum of all numbers in an array.',
          difficulty: 'Medium',
          starterCode: `function arraySum(numbers) {
  // Your code here
  
}`,
          tests: [
            { input: [[1, 2, 3, 4, 5]], expected: 15, description: 'arraySum([1,2,3,4,5]) should return 15' },
            { input: [[10, -5, 3]], expected: 8, description: 'arraySum([10,-5,3]) should return 8' },
            { input: [[]], expected: 0, description: 'arraySum([]) should return 0' }
          ],
          solution: `function arraySum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}`,
          hint: 'You can use the reduce method or a for loop to sum the array'
        }
      ]
    },
    strings: {
      title: 'Strings',
      icon: CodeIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      challenges: [
        {
          id: 'reverse-string',
          title: 'Reverse String',
          description: 'Write a function that reverses a string.',
          difficulty: 'Medium',
          starterCode: `function reverseString(str) {
  // Your code here
  
}`,
          tests: [
            { input: ['hello'], expected: 'olleh', description: 'reverseString("hello") should return "olleh"' },
            { input: ['JavaScript'], expected: 'tpircSavaJ', description: 'reverseString("JavaScript") should return "tpircSavaJ"' },
            { input: [''], expected: '', description: 'reverseString("") should return ""' }
          ],
          solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
          hint: 'Split the string into an array, reverse it, then join it back'
        }
      ]
    }
  };

  const runTests = () => {
    if (!selectedChallenge) return;

    try {
      const func = eval(`(${userCode})`);
      const results = [];

      selectedChallenge.tests.forEach((test, index) => {
        try {
          const result = func(...test.input);
          const passed = JSON.stringify(result) === JSON.stringify(test.expected);
          
          results.push({
            testNum: index + 1,
            description: test.description,
            input: test.input,
            expected: test.expected,
            actual: result,
            passed
          });
        } catch (error) {
          results.push({
            testNum: index + 1,
            description: test.description,
            input: test.input,
            expected: test.expected,
            error: error.message,
            passed: false
          });
        }
      });

      setTestResults(results);

      const allPassed = results.every(r => r.passed);
      if (allPassed && !completedChallenges.includes(selectedChallenge.id)) {
        setCompletedChallenges([...completedChallenges, selectedChallenge.id]);
      }
    } catch (error) {
      setTestResults([{
        testNum: 1,
        description: 'Code execution',
        error: error.message,
        passed: false
      }]);
    }
  };

  const selectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setUserCode(challenge.starterCode);
    setTestResults([]);
    setShowHint(false);
  };

  const allChallenges = Object.values(challenges).flatMap(cat => cat.challenges);
  const progressPercentage = (completedChallenges.length / allChallenges.length) * 100;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <TrophyIcon className="w-8 h-8 text-yellow-600" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                JavaScript Challenges
              </h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Progress: {completedChallenges.length} / {allChallenges.length}
              </div>
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {!selectedChallenge ? (
          /* Challenge Categories */
          <div className="space-y-8">
            {Object.entries(challenges).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className={`w-6 h-6 ${category.color}`} />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {category.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.challenges.map(challenge => (
                      <div 
                        key={challenge.id}
                        className={`border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-105 ${category.borderColor} dark:border-gray-700`}
                        onClick={() => selectChallenge(challenge)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {completedChallenges.includes(challenge.id) && (
                              <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            )}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {challenge.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <button className={`flex items-center space-x-1 ${category.color} hover:underline text-sm font-medium`}>
                            <span>Start Challenge</span>
                            <ChevronRightIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Challenge Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge Description & Code */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {selectedChallenge.title}
                    </h2>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                      {selectedChallenge.difficulty}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedChallenge(null)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedChallenge.description}
                </p>
                
                <div className="flex gap-3 mb-4">
                  <button 
                    onClick={runTests}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <PlayCircleIcon className="w-4 h-4" />
                    <span>Run Tests</span>
                  </button>
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    <LightbulbIcon className="w-4 h-4" />
                    <span>Hint</span>
                  </button>
                  <button 
                    onClick={() => setUserCode(selectedChallenge.solution)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <CodeIcon className="w-4 h-4" />
                    <span>Solution</span>
                  </button>
                </div>

                {showHint && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <LightbulbIcon className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-yellow-800 dark:text-yellow-200 font-medium">Hint:</p>
                        <p className="text-yellow-700 dark:text-yellow-300">{selectedChallenge.hint}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Code Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">Your Solution</h3>
                </div>
                <div style={{ height: '300px' }}>
                  <CodeEditor
                    language="javascript"
                    value={userCode}
                    onChange={setUserCode}
                    theme="dark"
                  />
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <PlayCircleIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Test Results
                </h3>
              </div>
              
              {testResults.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                  <PlayCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p>Run tests to see results...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${
                        result.passed 
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {result.passed ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                        ) : (
                          <XCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                        )}
                        <span className="font-medium">Test {result.testNum}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {result.description}
                      </p>
                      {result.error ? (
                        <p className="text-red-600 dark:text-red-400 text-sm font-mono">
                          Error: {result.error}
                        </p>
                      ) : (
                        <div className="text-sm">
                          <div>Expected: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{JSON.stringify(result.expected)}</code></div>
                          <div>Got: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{JSON.stringify(result.actual)}</code></div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {testResults.every(r => r.passed) && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4 text-center">
                      <TrophyIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <h4 className="font-bold text-green-800 dark:text-green-200">Congratulations!</h4>
                      <p className="text-green-700 dark:text-green-300">All tests passed!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};