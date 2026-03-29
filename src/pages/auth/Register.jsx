import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Registration failed');
            }

            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="auth-page bg-light">
            <div className="container d-flex flex-center min-h-screen">
                <div className="auth-card glass-card">
                    <div className="text-center mb-4">
                        <h2 className="text-primary-navy">Create Account</h2>
                        <p className="text-muted">Join OLIVER-UGWI's Logistics Platform</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger mb-4 p-3" style={{ background: '#fee2e2', color: '#b91c1c', borderRadius: '6px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-group">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

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
                            <label>Password</label>
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
                            Sign Up <FiArrowRight />
                        </button>

                        <p className="text-center text-muted font-sm">
                            Already have an account? <Link to="/login" className="text-accent font-weight-bold">Log in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
