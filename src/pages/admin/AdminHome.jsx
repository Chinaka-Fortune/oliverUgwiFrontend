import React, { useState, useEffect } from 'react';
import { FiUsers, FiBox, FiMessageSquare, FiDollarSign, FiStar, FiTag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminHome = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        activeShipments: 0,
        totalUsers: 0,
        openTickets: 0,
        monthlyRevenue: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await axios.get(`${apiUrl}/admin/stats`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStats(response.data.stats);
                setRecentActivity(response.data.recentActivity);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                const message = err.response?.data?.msg || err.message || "Failed to load dashboard statistics.";
                setError(message);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            <h2 className="mb-4">Dashboard Overview</h2>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="dashboard-card border-left-accent">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1 font-sm text-uppercase">Total Active Shipments</p>
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
                                <p className="text-muted mb-1 font-sm text-uppercase">Total Users</p>
                                <h3 className="mb-0 text-primary-navy">{stats.totalUsers}</h3>
                            </div>
                            <div className="avatar bg-light text-accent">
                                <FiUsers />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="dashboard-card border-left-accent">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1 font-sm text-uppercase">Open Support Tickets</p>
                                <h3 className="mb-0 text-primary-navy">{stats.openTickets}</h3>
                            </div>
                            <div className="avatar bg-light text-accent">
                                <FiMessageSquare />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="dashboard-card border-left-accent">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="text-muted mb-1 font-sm text-uppercase">Monthly Revenue</p>
                                <h3 className="mb-0 text-primary-navy">${stats.monthlyRevenue.toLocaleString()}</h3>
                            </div>
                            <div className="avatar bg-light text-accent">
                                <FiDollarSign />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-8 mb-4">
                    <div className="dashboard-card h-100">
                        <h4 className="mb-4">Recent Shipments Activity</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Tracking ID</th>
                                        <th>Origin</th>
                                        <th>Destination</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivity.length > 0 ? (
                                        recentActivity.map((shipment) => (
                                            <tr key={shipment.id}>
                                                <td><strong>{shipment.tracking_id}</strong></td>
                                                <td>{shipment.origin}</td>
                                                <td>{shipment.destination}</td>
                                                <td>
                                                    <span className={`badge bg-${
                                                        shipment.status === 'Delivered' ? 'success' : 
                                                        shipment.status === 'In Transit' ? 'warning' : 
                                                        shipment.status === 'Pending' ? 'secondary' : 'info'
                                                    }`}>
                                                        {shipment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <>
                                            <tr style={{ opacity: 0.5 }}>
                                                <td><strong>OUG-XXXXXX</strong></td>
                                                <td>Example Origin</td>
                                                <td>Example Destination</td>
                                                <td><span className="badge bg-secondary">Placeholder</span></td>
                                            </tr>
                                            <tr style={{ opacity: 0.5 }}>
                                                <td><strong>OUG-XXXXXX</strong></td>
                                                <td>Example Origin</td>
                                                <td>Example Destination</td>
                                                <td><span className="badge bg-secondary">Placeholder</span></td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="dashboard-card h-100">
                        <h4 className="mb-4">Quick Actions</h4>
                        <button
                            className="btn btn-primary w-100 mb-3 text-left pl-3"
                            onClick={() => navigate('/admin/shipments')}
                        >
                            <FiBox className="mr-2" /> Create New Shipment
                        </button>
                        <button
                            className="btn btn-outline w-100 mb-3 text-left pl-3"
                            onClick={() => navigate('/admin/users')}
                        >
                            <FiUsers className="mr-2" /> Invite New Client
                        </button>
                        <button
                            className="btn btn-outline w-100 mb-3 text-left pl-3"
                            onClick={() => navigate('/admin/testimonials')}
                        >
                            <FiStar className="mr-2" /> Manage Testimonials
                        </button>
                        <button
                            className="btn btn-outline w-100 mb-3 text-left pl-3"
                            onClick={() => navigate('/admin/blogs')}
                        >
                            <FiTag className="mr-2" /> Manage Blog Posts
                        </button>
                        <button
                            className="btn btn-outline w-100 mb-3 text-left pl-3"
                            onClick={() => navigate('/admin/billing')}
                        >
                            <FiDollarSign className="mr-2" /> Manage Billing
                        </button>
                        <button
                            className="btn btn-outline w-100 text-left pl-3"
                            onClick={() => navigate('/admin/tickets')}
                        >
                            <FiMessageSquare className="mr-2" /> View Unread Tickets
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
