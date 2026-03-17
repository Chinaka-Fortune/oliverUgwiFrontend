import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiPlus, FiClock, FiSend, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const SupportTickets = () => {
    const { token, user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, [token]);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const authToken = token || localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.get(`${apiUrl}/tickets/`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setTickets(response.data.tickets);
        } catch (err) {
            console.error("Error fetching tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Open': return 'bg-warning text-dark';
            case 'Resolved': return 'bg-success text-white';
            case 'Closed': return 'bg-secondary text-white';
            default: return 'bg-light text-dark';
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        const subject = e.target.subject.value;
        const priority = e.target.priority.value;
        try {
            const authToken = token || localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.post(`${apiUrl}/tickets/`, 
                { subject, priority },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            setTickets([response.data.ticket, ...tickets]);
            alert("Support ticket created successfully!");
            setShowModal(false);
        } catch (err) {
            alert("Failed to create ticket");
        }
    };

    const handleDeleteTicket = async (id, displayId) => {
        if (window.confirm(`Are you sure you want to delete ticket ${displayId}?`)) {
            try {
                const authToken = token || localStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                await axios.delete(`${apiUrl}/tickets/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setTickets(prev => prev.filter(t => t.id !== id));
                alert("Ticket deleted successfully.");
            } catch (err) {
                alert("Failed to delete ticket");
            }
        }
    };

    const handleEditStatus = async (id, newStatus) => {
        try {
            const authToken = token || localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.put(`${apiUrl}/tickets/${id}/status`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            setTickets(tickets.map(t => t.id === id ? response.data.ticket : t));
            alert(`Ticket status updated to ${newStatus}`);
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const mockThread = [
        { id: 1, sender: 'System', message: 'Ticket created successfully.', time: 'Oct 20, 10:00 AM' },
        { id: 2, sender: 'Customer', message: 'Hi, my shipment OUG837492 seems to be delayed. Can I get an update?', time: 'Oct 20, 10:05 AM' },
        { id: 3, sender: 'Support Agent', message: 'Hello! I am looking into this for you. It appears there was a brief delay at the port, but it is moving now.', time: 'Oct 20, 11:30 AM' }
    ];

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <div className="spinner-border text-primary-navy" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary-navy">{user?.role === 'admin' ? 'Support Management' : 'My Support Tickets'}</h2>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
                    <FiPlus /> {user?.role === 'admin' ? 'Create for User' : 'New Ticket'}
                </button>
            </div>

            <div className="dashboard-card shadow-sm">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length > 0 ? tickets.map(ticket => (
                                <tr key={ticket.id}>
                                    <td><strong>{ticket.ticket_id}</strong></td>
                                    <td>{ticket.subject}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td>{ticket.priority}</td>
                                    <td><FiClock className="mr-1 text-muted" />{new Date(ticket.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline mr-2"
                                            onClick={() => setSelectedTicket(ticket)}
                                        >
                                            View {user?.role === 'admin' ? '& Reply' : 'Thread'}
                                        </button>
                                        {user?.role === 'admin' && (
                                            <>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ border: '1px solid #dc3545', color: '#dc3545' }}
                                                    onClick={() => handleDeleteTicket(ticket.id, ticket.ticket_id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-muted">No support tickets found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Ticket Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Create Support Ticket</h3>
                            <button className="btn btn-sm" onClick={() => setShowModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <form onSubmit={handleCreateTicket}>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Subject</label>
                                <input name="subject" type="text" className="form-control w-100 p-2 border rounded" required placeholder="e.g. Issue with shipment OUG-123456" />
                            </div>

                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Priority</label>
                                <select name="priority" className="form-control w-100 p-2 border rounded">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Urgent</option>
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Message</label>
                                <textarea name="message" className="form-control w-100 p-2 border rounded" rows="5" required placeholder="Describe your issue in detail..."></textarea>
                            </div>

                            <div className="text-right mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Submit Ticket</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Thread Modal */}
            {selectedTicket && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '700px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                            <div>
                                <h3 className="mb-0">{selectedTicket.ticket_id}: {selectedTicket.subject}</h3>
                                <span className={`badge ${getStatusBadge(selectedTicket.status)} mt-1`}>{selectedTicket.status}</span>
                            </div>
                            <button className="btn btn-sm" onClick={() => setSelectedTicket(null)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <div className="flex-grow-1 overflow-auto p-3 bg-light mb-3 rounded" style={{ minHeight: '300px' }}>
                            {mockThread.map((msg) => (
                                <div key={msg.id} className={`mb-4 d-flex ${msg.sender === 'Customer' ? 'justify-content-end' : 'justify-content-start'}`}>
                                    <div style={{ maxWidth: '80%' }}>
                                        <div className={`p-3 rounded shadow-sm ${msg.sender === 'Customer' ? 'bg-primary-navy text-white' : 'bg-white'}`} style={{ borderRadius: '15px' }}>
                                            <div className="d-flex align-items-center gap-2 mb-1" style={{ color: msg.sender === 'Customer' ? '#fff' : 'inherit' }}>
                                                <FiUser /> <small><strong>{msg.sender}</strong></small>
                                            </div>
                                            <p className="mb-0">{msg.message}</p>
                                        </div>
                                        <small className="text-muted mt-1 d-block">{msg.time}</small>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-top pt-3">
                            <form className="d-flex gap-2" onSubmit={(e) => { e.preventDefault(); alert("Reply sent!"); setNewMessage(''); }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your reply..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary d-flex align-items-center gap-2">
                                    <FiSend /> Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SupportTickets;
