// src/front/pages/Challenges.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Challenges = () => {
    const { store, dispatch } = useGlobalReducer();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentChallenge, setCurrentChallenge] = useState(null);
    const [userCode, setUserCode] = useState('');
    const [output, setOutput] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [completedChallenges, setCompletedChallenges] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const categories = {
        basics: {
            title: 'JavaScript Basics',
            icon: 'bi-star',
            color: 'success',
            difficulty: 'Easy',
            challenges: [
                {
                    id: 'basics-1',
                    title: 'Hello World',
                    description: 'Write a function that returns "Hello, World!"',
                    starterCode: `function helloWorld() {
    // Your code here
    
}`,
                    tests: [
                        { input: [], expected: 'Hello, World!' }
                    ],
                    solution: `function helloWorld() {
    return "Hello, World!";
}`,
                    hint: 'Use the return statement to return the string "Hello, World!"'
                },
                {
                    id: 'basics-2',
                    title: 'Sum Two Numbers',
                    description: 'Write a function that takes two numbers and returns their sum.',
                    starterCode: `function sum(a, b) {
    // Your code here
    
}`,
                    tests: [
                        { input: [2, 3], expected: 5 },
                        { input: [10, 20], expected: 30 },
                        { input: [-5, 5], expected: 0 }
                    ],
                    solution: `function sum(a, b) {
    return a + b;
}`,
                    hint: 'Use the + operator to add the two parameters'
                }
            ]
        },
        arrays: {
            title: 'Arrays',
            icon: 'bi-list-ol',
            color: 'info',
            difficulty: 'Medium',
            challenges: [
                {
                    id: 'arrays-1',
                    title: 'Array Sum',
                    description: 'Write a function that returns the sum of all numbers in an array.',
                    starterCode: `function arraySum(numbers) {
    // Your code here
    
}`,
                    tests: [
                        { input: [[1, 2, 3, 4, 5]], expected: 15 },
                        { input: [[10, -5, 3]], expected: 8 },
                        { input: [[]], expected: 0 }
                    ],
                    solution: `function arraySum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}`,
                    hint: 'You can use the reduce method or a for loop to sum the array'
                },
                {
                    id: 'arrays-2',
                    title: 'Find Maximum',
                    description: 'Write a function that finds the maximum number in an array.',
                    starterCode: `function findMax(numbers) {
    // Your code here
    
}`,
                    tests: [
                        { input: [[1, 5, 3, 9, 2]], expected: 9 },
                        { input: [[-1, -5, -3]], expected: -1 },
                        { input: [[42]], expected: 42 }
                    ],
                    solution: `function findMax(numbers) {
    return Math.max(...numbers);
}`,
                    hint: 'Use Math.max with spread operator or iterate through the array'
                }
            ]
        },
        strings: {
            title: 'Strings',
            icon: 'bi-fonts',
            color: 'warning',
            difficulty: 'Easy',
            challenges: [
                {
                    id: 'strings-1',
                    title: 'Reverse String',
                    description: 'Write a function that reverses a string.',
                    starterCode: `function reverseString(str) {
    // Your code here
    
}`,
                    tests: [
                        { input: ['hello'], expected: 'olleh' },
                        { input: ['JavaScript'], expected: 'tpircSavaJ' },
                        { input: ['12345'], expected: '54321' }
                    ],
                    solution: `function reverseString(str) {
    return str.split('').reverse().join('');
}`,
                    hint: 'Split the string into an array, reverse it, then join it back'
                },
                {
                    id: 'strings-2',
                    title: 'Palindrome Check',
                    description: 'Write a function that checks if a string is a palindrome.',
                    starterCode: `function isPalindrome(str) {
    // Your code here
    
}`,
                    tests: [
                        { input: ['racecar'], expected: true },
                        { input: ['hello'], expected: false },
                        { input: ['A man a plan a canal Panama'], expected: true }
                    ],
                    solution: `function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}`,
                    hint: 'Compare the string with its reversed version (consider cleaning it first)'
                }
            ]
        },
        algorithms: {
            title: 'Algorithms',
            icon: 'bi-cpu',
            color: 'danger',
            difficulty: 'Hard',
            challenges: [
                {
                    id: 'algo-1',
                    title: 'FizzBuzz',
                    description: 'Write a function that returns an array with numbers from 1 to n, but replaces multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".',
                    starterCode: `function fizzBuzz(n) {
    // Your code here
    
}`,
                    tests: [
                        { input: [5], expected: [1, 2, 'Fizz', 4, 'Buzz'] },
                        { input: [15], expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'] }
                    ],
                    solution: `function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) result.push('FizzBuzz');
        else if (i % 3 === 0) result.push('Fizz');
        else if (i % 5 === 0) result.push('Buzz');
        else result.push(i);
    }
    return result;
}`,
                    hint: 'Check divisibility by 15 first (for both 3 and 5), then check 3 and 5 separately'
                },
                {
                    id: 'algo-2',
                    title: 'Fibonacci Sequence',
                    description: 'Write a function that returns the nth Fibonacci number.',
                    starterCode: `function fibonacci(n) {
    // Your code here
    
}`,
                    tests: [
                        { input: [1], expected: 1 },
                        { input: [2], expected: 1 },
                        { input: [5], expected: 5 },
                        { input: [10], expected: 55 }
                    ],
                    solution: `function fibonacci(n) {
    if (n <= 2) return 1;
    let a = 1, b = 1;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}`,
                    hint: 'The Fibonacci sequence starts with 1, 1, and each subsequent number is the sum of the previous two'
                }
            ]
        }
    };

    useEffect(() => {
        // Load progress from localStorage
        const saved = localStorage.getItem('completedChallenges');
        if (saved) {
            setCompletedChallenges(JSON.parse(saved));
        }
    }, []);

    const selectChallenge = (challenge, category) => {
        setCurrentChallenge(challenge);
        setSelectedCategory(category);
        setUserCode(challenge.starterCode);
        setOutput('');
        setShowHint(false);
        setShowSuccess(false);
    };

    const runTests = () => {
        if (!currentChallenge) return;

        try {
            // Create function from user code
            const func = eval(`(${userCode})`);
            
            let allPassed = true;
            let results = [];

            currentChallenge.tests.forEach((test, index) => {
                try {
                    const result = func(...test.input);
                    const passed = JSON.stringify(result) === JSON.stringify(test.expected);
                    
                    results.push({
                        testNum: index + 1,
                        input: test.input,
                        expected: test.expected,
                        actual: result,
                        passed
                    });

                    if (!passed) allPassed = false;
                } catch (error) {
                    results.push({
                        testNum: index + 1,
                        input: test.input,
                        expected: test.expected,
                        error: error.message,
                        passed: false
                    });
                    allPassed = false;
                }
            });

            // Format output
            let outputText = '🧪 Test Results:\n\n';
            results.forEach(r => {
                const status = r.passed ? '✅' : '❌';
                outputText += `Test ${r.testNum}: ${status}\n`;
                outputText += `  Input: ${JSON.stringify(r.input)}\n`;
                outputText += `  Expected: ${JSON.stringify(r.expected)}\n`;
                if (r.error) {
                    outputText += `  Error: ${r.error}\n`;
                } else {
                    outputText += `  Got: ${JSON.stringify(r.actual)}\n`;
                }
                outputText += '\n';
            });

            if (allPassed) {
                outputText += '🎉 All tests passed! Great job!';
                setShowSuccess(true);
                
                // Mark as completed
                if (!completedChallenges.includes(currentChallenge.id)) {
                    const updated = [...completedChallenges, currentChallenge.id];
                    setCompletedChallenges(updated);
                    localStorage.setItem('completedChallenges', JSON.stringify(updated));
                }
            } else {
                outputText += '⚠️ Some tests failed. Keep trying!';
            }

            setOutput(outputText);
        } catch (error) {
            setOutput(`❌ Error: ${error.message}`);
        }
    };

    const showSolution = () => {
        setUserCode(currentChallenge.solution);
        setOutput('📝 Solution loaded. Run the tests to verify it works!');
    };

    const getRandomChallenge = () => {
        const allChallenges = Object.values(categories).flatMap(cat => 
            cat.challenges.map(ch => ({ ...ch, category: cat }))
        );
        const random = allChallenges[Math.floor(Math.random() * allChallenges.length)];
        selectChallenge(random, random.category);
    };

    const totalChallenges = Object.values(categories).reduce(
        (sum, cat) => sum + cat.challenges.length, 0
    );
    const progressPercentage = (completedChallenges.length / totalChallenges) * 100;

    return (
        <div className="challenges-page" style={{ paddingTop: '80px' }}>
            <div className="container">
                {/* Header */}
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h2 className="mb-3">
                                <i className="bi bi-trophy text-warning me-2"></i>
                                JavaScript Challenges
                            </h2>
                            <p className="text-muted mb-0">
                                Test your skills with interactive coding challenges
                            </p>
                        </div>
                        <div className="col-md-4 text-end">
                            <button 
                                className="btn btn-outline-primary"
                                onClick={getRandomChallenge}
                            >
                                <i className="bi bi-shuffle me-2"></i>
                                Random Challenge
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Progress</span>
                            <span className="text-muted">
                                {completedChallenges.length} / {totalChallenges} completed
                            </span>
                        </div>
                        <div className="progress" style={{ height: '10px' }}>
                            <div 
                                className="progress-bar bg-success"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {!currentChallenge ? (
                    /* Challenge Categories */
                    <div className="row g-4">
                        {Object.entries(categories).map(([key, category]) => (
                            <div key={key} className="col-md-6 col-lg-3">
                                <div className="card h-100 shadow-sm hover-lift">
                                    <div className="card-body text-center">
                                        <div className={`text-${category.color} mb-3`}>
                                            <i className={`bi ${category.icon}`} style={{ fontSize: '3rem' }}></i>
                                        </div>
                                        <h5 className="card-title">{category.title}</h5>
                                        <span className={`badge bg-${category.color} mb-3`}>
                                            {category.difficulty}
                                        </span>
                                        <p className="text-muted small">
                                            {category.challenges.length} challenges
                                        </p>
                                        <div className="d-grid">
                                            <button 
                                                className={`btn btn-outline-${category.color}`}
                                                onClick={() => setSelectedCategory(category)}
                                            >
                                                Start
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Challenge Workspace */
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="bg-white rounded shadow-sm p-4 mb-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h4>{currentChallenge.title}</h4>
                                        {completedChallenges.includes(currentChallenge.id) && (
                                            <span className="badge bg-success">
                                                <i className="bi bi-check-circle me-1"></i>
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => {
                                            setCurrentChallenge(null);
                                            setSelectedCategory(null);
                                        }}
                                    >
                                        <i className="bi bi-x"></i>
                                    </button>
                                </div>
                                
                                <p className="text-muted">{currentChallenge.description}</p>
                                
                                <div className="d-flex gap-2 mb-3">
                                    <button 
                                        className="btn btn-success"
                                        onClick={runTests}
                                    >
                                        <i className="bi bi-play-fill me-2"></i>
                                        Run Tests
                                    </button>
                                    <button 
                                        className="btn btn-outline-warning"
                                        onClick={() => setShowHint(!showHint)}
                                    >
                                        <i className="bi bi-lightbulb me-2"></i>
                                        Hint
                                    </button>
                                    <button 
                                        className="btn btn-outline-info"
                                        onClick={showSolution}
                                    >
                                        <i className="bi bi-eye me-2"></i>
                                        Solution
                                    </button>
                                </div>

                                {showHint && (
                                    <div className="alert alert-warning">
                                        <i className="bi bi-lightbulb me-2"></i>
                                        {currentChallenge.hint}
                                    </div>
                                )}

                                {showSuccess && (
                                    <div className="alert alert-success">
                                        <i className="bi bi-trophy me-2"></i>
                                        Excellent work! Challenge completed!
                                    </div>
                                )}

                                <div style={{ height: '300px' }}>
                                    <CodeEditor
                                        language="javascript"
                                        value={userCode}
                                        onChange={setUserCode}
                                        theme="dracula"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="bg-white rounded shadow-sm p-4">
                                <h5 className="mb-3">
                                    <i className="bi bi-terminal me-2"></i>
                                    Output
                                </h5>
                                <pre className="bg-dark text-light p-3 rounded" style={{ minHeight: '400px', whiteSpace: 'pre-wrap' }}>
                                    {output || 'Run tests to see output...'}
                                </pre>
                            </div>

                            {/* Other Challenges in Category */}
                            {selectedCategory && (
                                <div className="bg-white rounded shadow-sm p-4 mt-4">
                                    <h6 className="mb-3">More Challenges</h6>
                                    <div className="list-group">
                                        {selectedCategory.challenges.map(ch => (
                                            <button
                                                key={ch.id}
                                                className={`list-group-item list-group-item-action ${
                                                    ch.id === currentChallenge.id ? 'active' : ''
                                                }`}
                                                onClick={() => selectChallenge(ch, selectedCategory)}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>{ch.title}</span>
                                                    {completedChallenges.includes(ch.id) && (
                                                        <i className="bi bi-check-circle text-success"></i>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Show category challenges */}
                {selectedCategory && !currentChallenge && (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3>{selectedCategory.title} Challenges</h3>
                            <button 
                                className="btn btn-outline-secondary"
                                onClick={() => setSelectedCategory(null)}
                            >
                                Back to Categories
                            </button>
                        </div>
                        <div className="row g-4">
                            {selectedCategory.challenges.map(challenge => (
                                <div key={challenge.id} className="col-md-6">
                                    <div 
                                        className="card h-100 shadow-sm hover-lift cursor-pointer"
                                        onClick={() => selectChallenge(challenge, selectedCategory)}
                                    >
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h5 className="card-title">{challenge.title}</h5>
                                                {completedChallenges.includes(challenge.id) && (
                                                    <i className="bi bi-check-circle text-success"></i>
                                                )}
                                            </div>
                                            <p className="card-text text-muted">{challenge.description}</p>
                                            <button className="btn btn-sm btn-primary">
                                                Start Challenge
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};