// src/front/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [stats, setStats] = useState({
        lessonsCompleted: 0,
        challengesSolved: 0,
        hoursLearned: 0
    });

    useEffect(() => {
        // Load user stats from localStorage or backend
        const savedStats = localStorage.getItem('userStats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, []);

    const features = [
        {
            icon: "bi-book",
            title: "Interactive Documentation",
            description: "Learn JavaScript with live code examples and instant feedback",
            link: "/documentation",
            color: "text-blue-600"
        },
        {
            icon: "bi-code-square",
            title: "Live Playground",
            description: "Write HTML, CSS, and JavaScript with real-time preview",
            link: "/playground",
            color: "text-green-600"
        },
        {
            icon: "bi-trophy",
            title: "Coding Challenges",
            description: "Test your skills with progressive challenges and earn badges",
            link: "/challenges",
            color: "text-purple-600"
        },
        {
            icon: "bi-compass",
            title: "Learning Guide",
            description: "Structured path from beginner to advanced JavaScript",
            link: "/guide",
            color: "text-orange-600"
        }
    ];

    const topics = [
        "Variables & Types", "Functions", "Arrays", "Objects",
        "DOM Manipulation", "Async/Await", "ES6+", "APIs"
    ];

    return (
        <div className="min-vh-100">
            {/* Hero Section */}
            <section className="hero-section position-relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                paddingTop: '120px',
                paddingBottom: '80px'
            }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold text-white mb-4">
                                Master JavaScript
                                <span className="d-block text-warning">Interactively</span>
                            </h1>
                            <p className="lead text-white-50 mb-4">
                                Learn JavaScript through hands-on coding, real-time feedback, 
                                and progressive challenges. Built for developers, by developers.
                            </p>
                            <div className="d-flex gap-3 flex-wrap">
                                <Link to="/documentation" className="btn btn-warning btn-lg px-4">
                                    <i className="bi bi-play-fill me-2"></i>
                                    Start Learning
                                </Link>
                                <Link to="/playground" className="btn btn-outline-light btn-lg px-4">
                                    <i className="bi bi-code me-2"></i>
                                    Try Playground
                                </Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="row mt-5">
                                <div className="col-4">
                                    <h3 className="text-white mb-0">{stats.lessonsCompleted}</h3>
                                    <small className="text-white-50">Lessons</small>
                                </div>
                                <div className="col-4">
                                    <h3 className="text-white mb-0">{stats.challengesSolved}</h3>
                                    <small className="text-white-50">Challenges</small>
                                </div>
                                <div className="col-4">
                                    <h3 className="text-white mb-0">{stats.hoursLearned}h</h3>
                                    <small className="text-white-50">Learning</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="code-animation p-4 bg-dark rounded-3 shadow-lg">
                                <pre className="text-white mb-0">
                                    <code>{`// Welcome to JS Master
const skills = ['JavaScript', 'React', 'Node.js'];

skills.forEach(skill => {
    console.log(\`Learning \${skill}\`);
});

// Start your journey today! 🚀`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated Background Elements */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
                    opacity: 0.1,
                    pointerEvents: 'none' 
                }}>
                    <div className="floating-element"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Everything You Need to Master JavaScript</h2>
                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <Link to={feature.link} className="text-decoration-none">
                                    <div className="card h-100 border-0 shadow-sm hover-lift">
                                        <div className="card-body text-center">
                                            <div className={`${feature.color} mb-3`}>
                                                <i className={`bi ${feature.icon}`} style={{ fontSize: '3rem' }}></i>
                                            </div>
                                            <h5 className="card-title">{feature.title}</h5>
                                            <p className="card-text text-muted">{feature.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Topics Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">What You'll Learn</h2>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {topics.map((topic, index) => (
                            <span key={index} className="badge bg-gradient text-white px-3 py-2" style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                fontSize: '1rem'
                            }}>
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 bg-gradient text-white" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <div className="container text-center">
                    <h2 className="mb-4">Ready to Start Your JavaScript Journey?</h2>
                    <p className="lead mb-4">Join thousands of developers learning JavaScript the interactive way</p>
                    <Link to="/documentation" className="btn btn-warning btn-lg px-5">
                        Get Started Free
                    </Link>
                </div>
            </section>
        </div>
    );
};