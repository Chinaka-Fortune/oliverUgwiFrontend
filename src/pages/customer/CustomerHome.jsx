import React, { useState, useEffect } from 'react';
import { FiBox, FiClock, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerHome = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        activeShipments: 0,
        pendingActions: 0,
        newDocuments: 0,
        completedShipments: 0
    });
    const [recentShipments, setRecentShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await axios.get(`${apiUrl}/customer/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(response.data.stats);
                setRecentShipments(response.data.recentShipments);
            } catch (err) {
                console.error("Error fetching customer dashboard data:", err);
                setError('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <div className="spinner-border text-primary-navy" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="mb-4 text-primary-navy">Overview</h2>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="dashboard-card border-left-accent">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1 font-sm text-uppercase">Active Shipments</p>
                                <h3 className="mb-0 text-primary-navy">{stats.activeShipments}</h3>
                            </div>
                            <div className="avatar bg-light text-accent">
                                <FiBox />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="dashboard-card border-left-accent">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1 font-sm text-uppercase">Pending Actions</p>
                                <h3 className="mb-0 text-primary-navy">{stats.pendingActions}</h3>
                            </div>
                            <div className="avatar bg-light text-accent">
                                <FiClock />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="dashboard-card border-left-accent">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1 font-sm text-uppercase">New Documents</p>
                                <h3 className="mb-0 text-primary-navy">{stats.newDocuments}</h3>
                            </div>
                            <div className="avatar bg-light text-accent">
                                <FiFileText />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="dashboard-card border-left-accent">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1 font-sm text-uppercase">Completed</p>
                                <h3 className="mb-0 text-primary-navy">{stats.completedShipments}</h3>
                            </div>
                            <div className="avatar bg-light text-accent">
                                <FiCheckCircle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-8 mb-4">
                    <div className="dashboard-card h-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Recent Shipments</h4>
                            <button className="btn btn-sm btn-outline" onClick={() => navigate('/dashboard/shipments')}>View All</button>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tracking ID</th>
                                        <th>Destination</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentShipments.length > 0 ? recentShipments.map(shipment => (
                                        <tr key={shipment.id}>
                                            <td><strong>{shipment.tracking_id}</strong></td>
                                            <td>{shipment.destination}</td>
                                            <td>
                                                <span className={`badge ${
                                                    shipment.status === 'Delivered' ? 'bg-success' : 
                                                    shipment.status === 'Pending' ? 'bg-warning' : 'bg-info'
                                                }`}>
                                                    {shipment.status}
                                                </span>
                                            </td>
                                            <td>{shipment.type}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-muted">No recent shipments found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="dashboard-card h-100 bg-navy text-white shadow-lg" style={{ backgroundImage: 'linear-gradient(135deg, rgba(8, 23, 48, 0.95) 0%, rgba(25, 55, 109, 0.9) 100%)', border: 'none' }}>
                        <h4 className="mb-4 text-white">Need Assistance?</h4>
                        <p className="mb-4 text-white" style={{ opacity: 0.9, lineHeight: '1.6' }}>Our support team is available 24/7 to help you with your logistics needs and shipment inquiries.</p>
                        <button
                            className="btn btn-accent w-100 mb-3 py-2 font-weight-bold"
                            onClick={() => navigate('/dashboard/support')}
                        >
                            Create Support Ticket
                        </button>
                        <button
                            className="btn btn-outline-light w-100 py-2"
                            style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', background: 'transparent' }}
                            onClick={() => navigate('/dashboard/faqs')}
                        >
                            View FAQs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerHome;
