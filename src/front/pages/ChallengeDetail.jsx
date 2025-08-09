// src/front/pages/ChallengeDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const ChallengeDetail = () => {
    const { challengeId } = useParams();

    return (
        <div className="challenge-detail-page" style={{ paddingTop: '80px' }}>
            <div className="container">
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>
                            <i className="bi bi-trophy text-warning me-2"></i>
                            Challenge Details
                        </h2>
                        <Link to="/challenges" className="btn btn-outline-secondary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Challenges
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h4>Challenge: {challengeId}</h4>
                                <p className="text-muted">
                                    This is a placeholder for the challenge detail page. 
                                    The challenge ID is: <strong>{challengeId}</strong>
                                </p>
                                <div className="alert alert-info">
                                    <i className="bi bi-info-circle me-2"></i>
                                    This page is under development. For now, please use the main challenges page to practice coding.
                                </div>
                                <Link to="/challenges" className="btn btn-primary">
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Go to Challenges
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Quick Links</h6>
                                <div className="d-grid gap-2">
                                    <Link to="/playground" className="btn btn-outline-success btn-sm">
                                        <i className="bi bi-code me-2"></i>
                                        Playground
                                    </Link>
                                    <Link to="/documentation" className="btn btn-outline-info btn-sm">
                                        <i className="bi bi-book me-2"></i>
                                        Documentation
                                    </Link>
                                    <Link to="/guide" className="btn btn-outline-warning btn-sm">
                                        <i className="bi bi-compass me-2"></i>
                                        Learning Guide
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};