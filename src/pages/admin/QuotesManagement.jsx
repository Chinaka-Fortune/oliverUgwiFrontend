import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiDownload, FiCheckCircle, FiSend, FiClock, FiUser, FiMail } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const QuotesManagement = () => {
    const { token } = useAuth();
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [replyData, setReplyData] = useState({
        estimated_cost: '',
        transit_time: '',
        validity_period: '',
        terms: '',
        reply: ''
    });
    const [isEditingQuote, setIsEditingQuote] = useState(false);
    const [editQuoteData, setEditQuoteData] = useState({});
    const [submittingReply, setSubmittingReply] = useState(false);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/quotes`, {
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
            console.error("Error fetching quotes:", err);
            setLoading(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        try {
            setSubmittingReply(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/quotes/${selectedQuote.id}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify(replyData)
            });

            if (response.ok) {
                alert("Reply saved successfully!");
                setReplyData({ estimated_cost: '', transit_time: '', validity_period: '', terms: '', reply: '' });
                setSelectedQuote(null);
                fetchQuotes();
            } else {
                const data = await response.json();
                alert(`Error: ${data.msg || "Failed to save reply"}`);
            }
        } catch (err) {
            console.error("Error replying to quote:", err);
            alert(`Connection error: ${err.message}. Please check your internet and try again.`);
        } finally {
            setSubmittingReply(false);
        }
    };

    const handleDeleteReply = async (quoteId) => {
        if (!window.confirm("Are you sure you want to delete this reply? Status will revert to Pending.")) return;
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/quotes/${quoteId}/reply`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                alert("Reply deleted successfully");
                fetchQuotes();
                setSelectedQuote(null);
            }
        } catch (err) {
            console.error("Error deleting reply:", err);
        }
    };

    const handleDeleteQuote = async (quoteId) => {
        if (!window.confirm("Are you sure you want to delete this quote request? This cannot be undone.")) return;
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/quotes/${quoteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                alert("Quote deleted successfully");
                fetchQuotes();
                setSelectedQuote(null);
            }
        } catch (err) {
            console.error("Error deleting quote:", err);
        }
    };

    const startEditQuote = (quote) => {
        setEditQuoteData({ ...quote });
        setIsEditingQuote(true);
    };

    const handleUpdateQuote = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/quotes/${editQuoteData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify(editQuoteData)
            });
            if (response.ok) {
                alert("Quote updated successfully");
                setIsEditingQuote(false);
                fetchQuotes();
                setSelectedQuote(null);
            }
        } catch (err) {
            console.error("Error updating quote:", err);
        }
    };

    return (
        <div className="quotes-management">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quote Requests Management</h2>
                <div className="stats-pills d-flex gap-2">
                    <span className="badge bg-primary">Total: {quotes.length}</span>
                    <span className="badge bg-warning text-dark">Pending: {quotes.filter(q => q.status === 'Pending').length}</span>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-accent" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-7">
                        <div className="dashboard-card">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Service</th>
                                            <th>Status</th>
                                            <th>Date</th>
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
                                                <td>
                                                    <div className="font-weight-bold">{quote.name}</div>
                                                    <small className="text-muted">{quote.email}</small>
                                                </td>
                                                <td>{quote.service}</td>
                                                <td>
                                                    <span className={`badge ${quote.status === 'Replied' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                        {quote.status}
                                                    </span>
                                                </td>
                                                <td>{new Date(quote.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedQuote(quote)}>View</button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDeleteQuote(quote.id); }} title="Delete Order">Delete</button>
                                                    </div>
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
                                <div className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
                                    <div>
                                        <h4 className="mb-1">Request Details</h4>
                                        <small className="text-muted">ID: #Q{selectedQuote.id}</small>
                                    </div>
                                    {selectedQuote.status === 'Replied' && (
                                        <span className="text-success d-flex align-items-center gap-1">
                                            <FiCheckCircle /> Replied
                                        </span>
                                    )}
                                </div>

                                <div className="quote-info-grid mb-4">
                                    <div className="info-item mb-3">
                                        <label className="text-muted small d-block uppercase tracking-wider">Client Information</label>
                                        <div className="d-flex align-items-center gap-2">
                                            <FiUser className="text-accent" /> <strong>{selectedQuote.name}</strong>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <FiMail className="text-accent" /> {selectedQuote.email}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <label className="text-muted small d-block">Logistics Route</label>
                                            <strong>{selectedQuote.origin} &rarr; {selectedQuote.destination}</strong>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label className="text-muted small d-block">Cargo Weight</label>
                                            <strong>{selectedQuote.weight ? `${selectedQuote.weight} kg` : 'N/A'}</strong>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Description</label>
                                        <p className="mb-0 bg-light p-2 rounded">{selectedQuote.description || 'No description provided'}</p>
                                    </div>

                                    {selectedQuote.instructions && (
                                        <div className="mb-3">
                                            <label className="text-muted small d-block">Instructions</label>
                                            <p className="mb-0 italic text-muted">"{selectedQuote.instructions}"</p>
                                        </div>
                                    )}

                                    {selectedQuote.file_url && (
                                        <div className="mb-3">
                                            <label className="text-muted small d-block">Attachment</label>
                                            <a 
                                                href={`${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${selectedQuote.file_url}`} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="btn btn-sm btn-accent d-inline-flex align-items-center gap-2 mt-1"
                                            >
                                                <FiDownload /> Download/View File
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <hr />

                                <div className="reply-section mt-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5>{selectedQuote.status === 'Replied' ? 'Review Reply' : 'Send Quote Reply'}</h5>
                                        {selectedQuote.status === 'Replied' && (
                                            <div className="d-flex gap-2">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => {
                                                        setReplyData({
                                                            estimated_cost: selectedQuote.estimated_cost || '',
                                                            transit_time: selectedQuote.transit_time || '',
                                                            validity_period: selectedQuote.validity_period || '',
                                                            terms: selectedQuote.terms || '',
                                                            reply: selectedQuote.admin_reply || ''
                                                        });
                                                        setSelectedQuote({...selectedQuote, status: 'Pending'});
                                                    }}
                                                >
                                                    Edit Reply
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDeleteReply(selectedQuote.id)}
                                                >
                                                    Delete Reply
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {selectedQuote.status === 'Replied' ? (
                                        <div className="bg-success-light p-3 rounded border border-success">
                                            <div className="row mb-2">
                                                <div className="col-6"><small className="text-muted">Estimated Cost:</small><br/><strong>{selectedQuote.estimated_cost}</strong></div>
                                                <div className="col-6"><small className="text-muted">Transit Time:</small><br/><strong>{selectedQuote.transit_time}</strong></div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-12"><small className="text-muted">Validity:</small><br/><strong>{selectedQuote.validity_period}</strong></div>
                                            </div>
                                            <div className="mb-2">
                                                <small className="text-muted">Terms:</small>
                                                <p className="mb-1 small">{selectedQuote.terms}</p>
                                            </div>
                                            <hr className="my-2"/>
                                            <small className="text-muted">Additional Comments:</small>
                                            <p className="mb-0">{selectedQuote.admin_reply}</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleReply}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label className="small font-weight-bold">Estimated Cost</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm" 
                                                        placeholder="e.g. $1,200.00"
                                                        value={replyData.estimated_cost}
                                                        onChange={(e) => setReplyData({...replyData, estimated_cost: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="small font-weight-bold">Transit Time</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm" 
                                                        placeholder="e.g. 5-7 Business Days"
                                                        value={replyData.transit_time}
                                                        onChange={(e) => setReplyData({...replyData, transit_time: e.target.value})}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="small font-weight-bold">Validity Period</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-sm" 
                                                    placeholder="e.g. Valid until Oct 25, 2026"
                                                    value={replyData.validity_period}
                                                    onChange={(e) => setReplyData({...replyData, validity_period: e.target.value})}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="small font-weight-bold">Terms & Conditions (Optional)</label>
                                                <textarea 
                                                    className="form-control form-control-sm" 
                                                    rows="2"
                                                    placeholder="Specific terms for this quote..."
                                                    value={replyData.terms}
                                                    onChange={(e) => setReplyData({...replyData, terms: e.target.value})}
                                                ></textarea>
                                            </div>

                                            <div className="mb-3">
                                                <label className="small font-weight-bold">Comments/Instructions</label>
                                                <textarea 
                                                    className="form-control" 
                                                    rows="3" 
                                                    placeholder="General message to the client..."
                                                    value={replyData.reply}
                                                    onChange={(e) => setReplyData({...replyData, reply: e.target.value})}
                                                    required
                                                ></textarea>
                                            </div>

                                            <button 
                                                type="submit" 
                                                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                                                disabled={submittingReply}
                                            >
                                                {submittingReply ? 'Sending...' : <><FiSend /> Send Quotation</>}
                                            </button>
                                        </form>
                                    )}
                                </div>

                                {isEditingQuote && (
                                    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                                        <div className="dashboard-card" style={{ width: '500px', maxWidth: '90%' }}>
                                            <h4>Edit Quote Request</h4>
                                            <form onSubmit={handleUpdateQuote}>
                                                <div className="row mb-3">
                                                    <div className="col-6">
                                                        <label className="small">Origin</label>
                                                        <input type="text" className="form-control" value={editQuoteData.origin} onChange={(e) => setEditQuoteData({...editQuoteData, origin: e.target.value})} required />
                                                    </div>
                                                    <div className="col-6">
                                                        <label className="small">Destination</label>
                                                        <input type="text" className="form-control" value={editQuoteData.destination} onChange={(e) => setEditQuoteData({...editQuoteData, destination: e.target.value})} required />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small">Weight (kg)</label>
                                                    <input type="number" className="form-control" value={editQuoteData.weight || ''} onChange={(e) => setEditQuoteData({...editQuoteData, weight: e.target.value})} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small">Description</label>
                                                    <textarea className="form-control" rows="3" value={editQuoteData.description} onChange={(e) => setEditQuoteData({...editQuoteData, description: e.target.value})}></textarea>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button type="submit" className="btn btn-primary flex-grow-1">Save Changes</button>
                                                    <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={() => setIsEditingQuote(false)}>Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                
                                <button className="btn btn-link btn-sm text-info mt-3 p-0" onClick={() => startEditQuote(selectedQuote)}>Edit Original Request Details</button>
                            </div>
                        ) : (
                            <div className="dashboard-card text-center py-5">
                                <FiMessageSquare size={48} className="text-muted-light mb-3" />
                                <p className="text-muted">Select a quote request from the list to view details and reply.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuotesManagement;
