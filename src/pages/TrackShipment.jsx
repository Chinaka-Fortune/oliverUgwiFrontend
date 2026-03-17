import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiPackage, FiMapPin, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';

const TrackShipment = () => {
    const [trackingId, setTrackingId] = useState('');
    const [shipmentData, setShipmentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            setTrackingId(id);
            requestTracking(id);
        }
    }, []);

    const requestTracking = async (id) => {
        setLoading(true);
        setError('');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/shipments/track/${id}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || 'Tracking information not found. Please check your tracking ID.');
            }
            setShipmentData(data.shipment);
        } catch (err) {
            setError(err.message);
            setShipmentData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleTrack = (e) => {
        e.preventDefault();
        if (!trackingId.trim()) return;
        requestTracking(trackingId);
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'Pending': return 1;
            case 'In Transit': return 2;
            case 'Cleared': return 3;
            case 'Delivered': return 4;
            default: return 0;
        }
    };

    return (
        <div className="tracking-page min-h-screen bg-light">
            <SEO
                title="Track Your Shipment | Real-Time Cargo Tracking"
                description="Track your international cargo and domestic shipments with OLIVER-UGWI's real-time tracking system. Accurate status updates for maritime and air freight."
                keywords="Track shipment Nigeria, Cargo tracking Lagos, Real-time shipping status, International freight tracking"
            />
            <section className="standard-page-header">
                <div className="container text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Track Your Shipment</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        Real-time visibility into your cargo's journey, anywhere in the world.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="glass-card p-4 p-md-5 bg-white mb-5" style={{ borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                                <form onSubmit={handleTrack} className="tracking-form d-flex gap-3 flex-column flex-md-row">
                                    <div className="input-group flex-grow-1" style={{ position: 'relative' }}>
                                        <FiPackage style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '1.25rem', zIndex: 10 }} />
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Tracking ID (e.g. OUG-123456)"
                                            value={trackingId}
                                            onChange={(e) => setTrackingId(e.target.value)}
                                            style={{ padding: '1rem 1rem 1rem 3.5rem', borderRadius: '8px', fontSize: '1.1rem', border: '1px solid var(--border-light)' }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary px-5 d-flex align-items-center justify-content-center gap-2" disabled={loading} style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                        {loading ? 'Tracking...' : <><FiSearch /> Track Now</>}
                                    </button>
                                </form>

                                {error && (
                                    <div className="alert mt-4" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                                        {error}
                                    </div>
                                )}
                            </div>

                            {shipmentData && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="tracking-result-card bg-white p-4 p-md-5"
                                    style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                >
                                    <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
                                        <div>
                                            <h3 className="text-primary-navy mb-1">Tracking ID: {shipmentData.tracking_id}</h3>
                                            <p className="text-muted mb-0">Type: {shipmentData.type} Cargo</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="badge bg-primary-navy text-white px-3 py-2" style={{ borderRadius: '20px', fontSize: '0.9rem' }}>
                                                {shipmentData.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <div className="d-flex flex-column text-center text-md-left">
                                                <span className="text-muted font-sm text-uppercase mb-2"><FiMapPin className="mr-1" /> Origin</span>
                                                <h5 className="font-weight-bold">{shipmentData.origin}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-center text-md-right">
                                            <div className="d-flex flex-column">
                                                <span className="text-muted font-sm text-uppercase mb-2"><FiMapPin className="mr-1" /> Destination</span>
                                                <h5 className="font-weight-bold">{shipmentData.destination}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tracking Progress Bar */}
                                    <div className="tracking-progress mt-5 mb-5 position-relative">
                                        <div className="progress mx-auto" style={{ height: '4px', backgroundColor: '#e2e8f0', width: '90%' }}>
                                            <div className="progress-bar bg-accent" role="progressbar" style={{ width: `${(getStatusStep(shipmentData.status) - 1) * 33.33}%` }}></div>
                                        </div>

                                        <div className="d-flex justify-content-between position-relative" style={{ marginTop: '-14px' }}>
                                            {['Pending', 'In Transit', 'Cleared', 'Delivered'].map((step, index) => {
                                                const stepNum = index + 1;
                                                const currentStep = getStatusStep(shipmentData.status);
                                                const isCompleted = stepNum <= currentStep;
                                                const isCurrent = stepNum === currentStep;

                                                return (
                                                    <div key={step} className="text-center position-relative" style={{ width: '25%' }}>
                                                        <div
                                                            className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 ${isCompleted ? 'bg-accent text-navy' : 'bg-white border text-muted'}`}
                                                            style={{ 
                                                                width: '28px', 
                                                                height: '28px', 
                                                                border: isCompleted ? 'none' : '2px solid #e2e8f0',
                                                                zIndex: 2,
                                                                fontSize: '12px'
                                                            }}
                                                        >
                                                            {isCompleted ? <FiCheckCircle size={16} /> : stepNum}
                                                        </div>
                                                        <span 
                                                            className={`font-sm d-block ${isCurrent ? 'font-weight-bold text-primary-navy' : 'text-muted'}`} 
                                                            style={{ 
                                                                fontSize: '0.75rem',
                                                                lineHeight: '1.2'
                                                            }}
                                                        >
                                                            {step}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="bg-light p-4 mt-5 rounded">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="text-muted d-block font-sm">Current Location</span>
                                                <strong className="text-primary-navy font-lg">{shipmentData.current_location}</strong>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-muted d-block font-sm"><FiCalendar className="mr-1" /> Last Updated</span>
                                                <strong>{new Date(shipmentData.updated_at).toLocaleDateString()}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrackShipment;
