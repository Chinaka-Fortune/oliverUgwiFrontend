import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiInfo, FiDownload, FiBox, FiMapPin } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const CustomerQuotes = () => {
    const { token } = useAuth();
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        fetchMyQuotes();
    }, []);

    const fetchMyQuotes = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/my-quotes`, {
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setQuotes(data);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching my quotes:", err);
            setLoading(false);
        }
    };

    return (
        <div className="customer-quotes">
            <h2 className="mb-4">My Quote Requests</h2>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : quotes.length === 0 ? (
                <div className="dashboard-card text-center py-5">
                    <FiBox size={48} className="text-muted mb-3" />
                    <p className="text-muted">You haven't requested any quotes yet.</p>
                    <button className="btn btn-primary" onClick={() => window.location.href = '/quote'}>Request a Quote</button>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-7">
                        <div className="dashboard-card">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Service</th>
                                            <th>Route</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotes.map(quote => (
                                            <tr 
                                                key={quote.id} 
                                                onClick={() => setSelectedQuote(quote)}
                                                className={`cursor-pointer ${selectedQuote?.id === quote.id ? 'table-active' : ''}`}
                                            >
                                                <td>#Q{quote.id}</td>
                                                <td>{quote.service}</td>
                                                <td><small>{quote.origin} &rarr; {quote.destination}</small></td>
                                                <td>
                                                    <span className={`badge ${quote.status === 'Replied' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                        {quote.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedQuote(quote)}>Details</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        {selectedQuote ? (
                            <div className="dashboard-card sticky-top" style={{ top: '20px' }}>
                                <div className="border-bottom pb-3 mb-3">
                                    <h4 className="mb-1">Quote Details</h4>
                                    <div className="d-flex align-items-center gap-2 text-muted small">
                                        <FiClock /> Requested on {new Date(selectedQuote.created_at).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-muted small d-block mb-1">Logistics Route</label>
                                    <div className="d-flex align-items-center gap-2">
                                        <FiMapPin className="text-primary" />
                                        <strong>{selectedQuote.origin} &rarr; {selectedQuote.destination}</strong>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label className="text-muted small d-block mb-1">Service Type</label>
                                        <strong>{selectedQuote.service}</strong>
                                    </div>
                                    <div className="col-6">
                                        <label className="text-muted small d-block mb-1">Weight</label>
                                        <strong>{selectedQuote.weight ? `${selectedQuote.weight} kg` : 'N/A'}</strong>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-muted small d-block mb-1">Cargo Description</label>
                                    <p className="mb-0 bg-light p-2 rounded small">{selectedQuote.description || 'No description provided'}</p>
                                </div>

                                {selectedQuote.status === 'Replied' ? (
                                    <div className="admin-reply-box bg-primary-light p-4 rounded border border-primary">
                                        <h5 className="text-primary d-flex align-items-center gap-2 mb-3">
                                            <FiCheckCircle /> Official Quotation
                                        </h5>
                                        
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <small className="text-muted d-block uppercase font-weight-bold">Estimated Cost</small>
                                                <h4 className="text-primary-navy mb-0">{selectedQuote.estimated_cost}</h4>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted d-block uppercase font-weight-bold">Transit Time</small>
                                                <h4 className="text-primary-navy mb-0">{selectedQuote.transit_time}</h4>
                                            </div>
                                        </div>

                                        <div className="mb-3 p-2 bg-white rounded border">
                                            <small className="text-muted d-block mb-1">Validity Period:</small>
                                            <strong>{selectedQuote.validity_period}</strong>
                                        </div>

                                        {selectedQuote.terms && (
                                            <div className="mb-3">
                                                <small className="text-muted d-block mb-1">Terms & Conditions:</small>
                                                <p className="small italic text-muted mb-0">{selectedQuote.terms}</p>
                                            </div>
                                        )}

                                        {selectedQuote.admin_reply && (
                                            <div className="mt-3 pt-3 border-top">
                                                <small className="text-muted d-block mb-1">Admin Comments:</small>
                                                <p className="mb-0">{selectedQuote.admin_reply}</p>
                                            </div>
                                        )}
                                        
                                        <div className="mt-4">
                                            <button className="btn btn-primary btn-sm w-100" onClick={() => window.print()}>
                                                <FiDownload className="mr-2" /> Print/Save as PDF
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-warning-light p-4 rounded border border-warning text-center">
                                        <FiClock size={32} className="text-warning mb-2" />
                                        <h5 className="text-warning">Awaiting Admin Response</h5>
                                        <p className="small text-muted mb-0">Our team is reviewing your logistics requirements and will provide a detailed quotation shortly.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="dashboard-card text-center py-5">
                                <FiInfo size={48} className="text-muted-light mb-3" />
                                <p className="text-muted">Select a quote request more details.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerQuotes;
