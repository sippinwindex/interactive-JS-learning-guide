// src/front/pages/PlaygroundMonaco.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const PlaygroundMonaco = () => {
    return (
        <div className="playground-monaco-page" style={{ paddingTop: '80px' }}>
            <div className="container">
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>
                            <i className="bi bi-code-square text-success me-2"></i>
                            Monaco Editor Playground
                        </h2>
                        <Link to="/playground" className="btn btn-primary">
                            <i className="bi bi-arrow-right me-2"></i>
                            Go to Main Playground
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body text-center py-5">
                                <i className="bi bi-tools text-muted" style={{ fontSize: '4rem' }}></i>
                                <h4 className="mt-4">Monaco Editor Integration</h4>
                                <p className="text-muted mb-4">
                                    This page is reserved for the Monaco Editor implementation. 
                                    For now, please use the main playground.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <Link to="/playground" className="btn btn-success">
                                        <i className="bi bi-play-circle me-2"></i>
                                        Try Playground
                                    </Link>
                                    <Link to="/documentation" className="btn btn-outline-primary">
                                        <i className="bi bi-book me-2"></i>
                                        Documentation
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Future Monaco Editor Implementation */}
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="alert alert-info">
                            <i className="bi bi-info-circle me-2"></i>
                            <strong>Coming Soon:</strong> Advanced code editor with syntax highlighting, 
                            IntelliSense, and VS Code-like features powered by Monaco Editor.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};