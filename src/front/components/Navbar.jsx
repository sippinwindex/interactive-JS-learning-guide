// src/front/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }

        // Handle scroll effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar navbar-expand-lg fixed-top transition-all ${
            isScrolled ? 'shadow-lg backdrop-blur-md bg-white/90 dark:bg-gray-900/90' : 'bg-transparent'
        }`}>
            <div className="container-fluid px-4">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <i className="bi bi-code-slash text-success me-2" style={{ fontSize: '1.5rem' }}></i>
                    <span className="fw-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
                        JS Master
                    </span>
                </Link>

                <button 
                    className="navbar-toggler border-0 shadow-none" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link 
                                to="/documentation" 
                                className={`nav-link px-3 py-2 rounded-lg transition-all ${
                                    isActive('/documentation') 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <i className="bi bi-book me-2"></i>
                                Documentation
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/playground" 
                                className={`nav-link px-3 py-2 rounded-lg transition-all ${
                                    isActive('/playground') 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <i className="bi bi-play-circle me-2"></i>
                                Playground
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/challenges" 
                                className={`nav-link px-3 py-2 rounded-lg transition-all ${
                                    isActive('/challenges') 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <i className="bi bi-trophy me-2"></i>
                                Challenges
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/guide" 
                                className={`nav-link px-3 py-2 rounded-lg transition-all ${
                                    isActive('/guide') 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <i className="bi bi-compass me-2"></i>
                                Guide
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {/* GitHub Link */}
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary rounded-circle p-2"
                        >
                            <i className="bi bi-github"></i>
                        </a>

                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className="btn btn-sm btn-outline-secondary rounded-circle p-2"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? (
                                <i className="bi bi-sun-fill text-yellow-500"></i>
                            ) : (
                                <i className="bi bi-moon-fill text-blue-600"></i>
                            )}
                        </button>

                        {/* User Profile (if needed) */}
                        <div className="dropdown">
                            <button 
                                className="btn btn-sm btn-success rounded-circle p-2" 
                                type="button" 
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-person-fill"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow-lg">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};