import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPackage, FiMapPin, FiClock, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Contact.css'; // Reusing some contact styles

const RequestQuote = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        service: '',
        origin: '',
        destination: '',
        weight: '',
        description: '',
        instructions: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name,
                email: user.email
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (file) {
            data.append('file', file);
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/quotes`, {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to submit quote request");
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("Connection error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="section-padding container text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="mb-4">
                        <FiPackage size={64} className="text-accent mb-3" />
                    </div>
                    <h2 className="text-accent">Quote Request Received!</h2>
                    <p className="mt-3">Our logistics experts will review your details and contact you within 24 hours.</p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button onClick={() => setSubmitted(false)} className="btn btn-outline">New Quote Request</button>
                        {user && (
                            <button onClick={() => navigate('/dashboard/quotes')} className="btn btn-primary">
                                Return to My Quotes
                            </button>
                        )}
                        {!user && (
                            <button onClick={() => navigate('/')} className="btn btn-primary">Return Home</button>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="request-quote-page">
            <section className="standard-page-header">
                <div className="container">
                    <h1>Request a Logistics Quote</h1>
                    <p>Accurate, transparent pricing for your global shipping needs.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <form className="glass-card p-5" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Full Name</label>
                                <input name="name" type="text" className="form-control" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Email Address</label>
                                <input name="email" type="email" className="form-control" placeholder="john@company.com" value={formData.email} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <label className="form-label">Service Type</label>
                                <select name="service" className="form-control" value={formData.service} onChange={handleInputChange} required>
                                    <option value="">Select Service</option>
                                    <option value="Maritime Logistics">Maritime Logistics</option>
                                    <option value="Air Cargo Logistics">Air Cargo Logistics</option>
                                    <option value="General Merchandise">General Merchandise</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-4">
                                <label className="form-label">Origin Country</label>
                                <input name="origin" type="text" className="form-control" placeholder="China" value={formData.origin} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-4 mb-4">
                                <label className="form-label">Destination (e.g. Nigeria)</label>
                                <input name="destination" type="text" className="form-control" placeholder="Lagos Port" value={formData.destination} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Cargo Weight (kg)</label>
                                <input name="weight" type="number" className="form-control" placeholder="500" value={formData.weight} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Cargo Type / Description</label>
                                <input name="description" type="text" className="form-control" placeholder="Electronics, Textiles, etc." value={formData.description} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Additional Instructions</label>
                            <textarea name="instructions" className="form-control" rows="4" placeholder="Mention any special handling or timing requirements here..." value={formData.instructions} onChange={handleInputChange}></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Attachment (Optional - Bill of Lading, Air Waybill, Invoice, Packing List, etc)</label>
                            <input type="file" className="form-control" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                            <small className="text-muted">Max file size: 10MB. Supported: PDF, Images, Word</small>
                        </div>

                        <div className="mt-4 d-flex gap-3">
                            {user && (
                                <button type="button" onClick={() => navigate('/dashboard/quotes')} className="btn btn-outline">
                                    <FiArrowLeft className="mr-2" /> Cancel
                                </button>
                            )}
                            <button type="submit" className="btn btn-accent flex-grow-1" disabled={loading}>
                                <FiSend className="mr-2" /> {loading ? 'Submitting...' : 'Submit Quote Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RequestQuote;
