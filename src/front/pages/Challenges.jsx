import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';

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
      icon: '⭐',
      color: 'green',
      challenges: [
        {
          id: 'hello-world',
          title: 'Hello World',
          description: 'Write a function that returns "Hello, World!"',
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
      icon: '📋',
      color: 'blue',
      challenges: [
        {
          id: 'array-sum',
          title: 'Array Sum',
          description: 'Write a function that returns the sum of all numbers in an array.',
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
        },
        {
          id: 'find-max',
          title: 'Find Maximum',
          description: 'Write a function that finds the largest number in an array.',
          starterCode: `function findMax(numbers) {
  // Your code here
  
}`,
          tests: [
            { input: [[1, 5, 3, 9, 2]], expected: 9, description: 'findMax([1,5,3,9,2]) should return 9' },
            { input: [[-1, -5, -3]], expected: -1, description: 'findMax([-1,-5,-3]) should return -1' },
            { input: [[42]], expected: 42, description: 'findMax([42]) should return 42' }
          ],
          solution: `function findMax(numbers) {
  return Math.max(...numbers);
}`,
          hint: 'You can use Math.max with the spread operator or loop through the array'
        },
        {
          id: 'filter-evens',
          title: 'Filter Even Numbers',
          description: 'Write a function that returns only the even numbers from an array.',
          starterCode: `function filterEvens(numbers) {
  // Your code here
  
}`,
          tests: [
            { input: [[1, 2, 3, 4, 5]], expected: [2, 4], description: 'filterEvens([1,2,3,4,5]) should return [2,4]' },
            { input: [[10, 15, 20, 25]], expected: [10, 20], description: 'filterEvens([10,15,20,25]) should return [10,20]' },
            { input: [[1, 3, 5]], expected: [], description: 'filterEvens([1,3,5]) should return []' }
          ],
          solution: `function filterEvens(numbers) {
  return numbers.filter(num => num % 2 === 0);
}`,
          hint: 'Use the filter method to keep only numbers divisible by 2'
        }
      ]
    },
    strings: {
      title: 'Strings',
      icon: '📝',
      color: 'purple',
      challenges: [
        {
          id: 'reverse-string',
          title: 'Reverse String',
          description: 'Write a function that reverses a string.',
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
        },
        {
          id: 'count-vowels',
          title: 'Count Vowels',
          description: 'Write a function that counts the number of vowels in a string.',
          starterCode: `function countVowels(str) {
  // Your code here
  
}`,
          tests: [
            { input: ['hello'], expected: 2, description: 'countVowels("hello") should return 2' },
            { input: ['JavaScript'], expected: 3, description: 'countVowels("JavaScript") should return 3' },
            { input: ['xyz'], expected: 0, description: 'countVowels("xyz") should return 0' }
          ],
          solution: `function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  return str.split('').filter(char => vowels.includes(char)).length;
}`,
          hint: 'Check each character to see if it matches a vowel (a, e, i, o, u)'
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              🏆 JavaScript Challenges
            </h1>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Progress: {completedChallenges.length} / {allChallenges.length}
              </div>
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {!selectedChallenge ? (
          /* Challenge Categories */
          <div className="space-y-8">
            {Object.entries(challenges).map(([key, category]) => (
              <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  <span className="mr-3">{category.icon}</span>
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.challenges.map(challenge => (
                    <div 
                      key={challenge.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer hover:border-blue-300"
                      onClick={() => selectChallenge(challenge)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {challenge.title}
                        </h3>
                        {completedChallenges.includes(challenge.id) && (
                          <span className="text-green-500">✅</span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {challenge.description}
                      </p>
                      <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                        Start Challenge →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Challenge Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge Description & Code */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedChallenge.title}
                  </h2>
                  <button 
                    onClick={() => setSelectedChallenge(null)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedChallenge.description}
                </p>
                
                <div className="flex gap-3 mb-4">
                  <button 
                    onClick={runTests}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    🧪 Run Tests
                  </button>
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    💡 Hint
                  </button>
                  <button 
                    onClick={() => setUserCode(selectedChallenge.solution)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    👁️ Solution
                  </button>
                </div>

                {showHint && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      💡 <strong>Hint:</strong> {selectedChallenge.hint}
                    </p>
                  </div>
                )}
              </div>

              {/* Code Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3">
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
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                🧪 Test Results
              </h3>
              
              {testResults.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                  Run tests to see results...
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
                        <span className={`mr-2 ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                          {result.passed ? '✅' : '❌'}
                        </span>
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
                      <div className="text-2xl mb-2">🎉</div>
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