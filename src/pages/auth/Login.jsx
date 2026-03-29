import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            login(data.user, data.access_token);

            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="auth-page bg-light">
            <div className="container d-flex flex-center min-h-screen pt-5 pb-5">
                <div className="auth-card glass-card">
                    <div className="text-center mb-4">
                        <h2 className="text-primary-navy">Client Portal</h2>
                        <p className="text-muted">Sign in to manage your shipments and track orders in real-time.</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger mb-4 d-flex gap-2 p-3" style={{ background: '#fee2e2', color: '#b91c1c', borderRadius: '6px' }}>
                            <FiAlertCircle className="mt-1" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-group">
                                <FiMail className="input-icon" />
                                <input
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="d-flex justify-content-between">
                                <span>Password</span>
                                <Link to="/forgot-password" className="font-sm text-muted hover-accent">Forgot?</Link>
                            </label>
                            <div className="input-group">
                                <FiLock className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                                {showPassword ? (
                                    <FiEyeOff className="password-toggle-icon" onClick={() => setShowPassword(false)} />
                                ) : (
                                    <FiEye className="password-toggle-icon" onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary d-block mt-4 mb-3 w-100 flex-center gap-2">
                            <FiLogIn /> Sign In
                        </button>

                        <p className="text-center text-muted font-sm">
                            Don't have an account? <Link to="/register" className="text-accent font-weight-bold">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
