import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiPlus, FiTrash2, FiEdit2, FiInfo, FiSearch, FiCalendar, FiDownload } from 'react-icons/fi';
import axios from 'axios';
import { generateBrandedPDF } from '../../utils/pdfGenerator';

const BillingManagement = () => {
    const [invoices, setInvoices] = useState([]);
    const [users, setUsers] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [newInvoice, setNewInvoice] = useState({
        user_id: '',
        shipment_id: '',
        amount: '',
        currency: 'USD',
        status: 'Unpaid',
        due_date: '',
        description: ''
    });

    const token = localStorage.getItem('token');
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [invoicesRes, usersRes, shipmentsRes] = await Promise.all([
                axios.get(`${apiBase}/billing`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${apiBase}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${apiBase}/shipments/my-shipments`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            setInvoices(invoicesRes.data.invoices);
            setUsers(usersRes.data.users);
            setShipments(shipmentsRes.data.shipments);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load billing data.");
            setLoading(false);
        }
    };

    const handleCreateInvoice = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiBase}/billing/`, newInvoice, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowAddModal(false);
            setNewInvoice({
                user_id: '',
                shipment_id: '',
                amount: '',
                currency: 'USD',
                status: 'Unpaid',
                due_date: '',
                description: ''
            });
            fetchData();
        } catch (err) {
            alert(err.response?.data?.msg || "Error creating invoice");
        }
    };

    const handleUpdateInvoice = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${apiBase}/billing/${selectedInvoice.id}`, selectedInvoice, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowEditModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.msg || "Error updating invoice");
        }
    };

    const handleDeleteInvoice = async () => {
        try {
            await axios.delete(`${apiBase}/billing/${selectedInvoice.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowDeleteModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.msg || "Error deleting invoice");
        }
    };

    const handleDownloadPDF = (inv) => {
        const fullUser = users.find(u => u.id === inv.user_id) || {};
        const userData = {
            name: inv.user_name,
            email: fullUser.email || 'customer@oliverugwi.com',
            phone: fullUser.phone,
            address: fullUser.address
        };

        generateBrandedPDF({
            ...inv,
            type: 'Invoice',
            user: userData,
            currency: inv.currency
        }, `${inv.invoice_id}.pdf`, 'download');
    };

    if (loading) return <div className="text-center py-5">Loading billing records...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Billing & Invoices Management</h2>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <FiPlus className="mr-2" /> Create Invoice
                </button>
            </div>

            <div className="dashboard-card">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Customer</th>
                                <th>Shipment</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Due Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.length > 0 ? (
                                invoices.map(inv => (
                                    <tr key={inv.id}>
                                        <td><strong>{inv.invoice_id}</strong></td>
                                        <td>{inv.user_name}</td>
                                        <td>{inv.tracking_id || 'N/A'}</td>
                                        <td>{inv.currency} {inv.amount.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge bg-${
                                                inv.status === 'Paid' ? 'success' : 
                                                inv.status === 'Unpaid' ? 'warning' : 
                                                inv.status === 'Overdue' ? 'danger' : 'secondary'
                                            }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td>{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : 'N/A'}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline mr-2" title="Download PDF" onClick={() => handleDownloadPDF(inv)}>
                                                <FiDownload />
                                            </button>
                                            <button className="btn btn-sm btn-outline mr-2" onClick={() => { setSelectedInvoice(inv); setShowEditModal(true); }}>
                                                <FiEdit2 />
                                            </button>
                                            <button className="btn btn-sm btn-danger-outline" style={{ color: '#dc3545', border: '1px solid #dc3545' }} onClick={() => { setSelectedInvoice(inv); setShowDeleteModal(true); }}>
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">No invoices found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between mb-4 border-bottom pb-2">
                            <h3>Create New Invoice</h3>
                            <button className="btn btn-sm" onClick={() => setShowAddModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleCreateInvoice}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Customer</label>
                                    <select className="form-control" required value={newInvoice.user_id} onChange={e => setNewInvoice({...newInvoice, user_id: e.target.value})}>
                                        <option value="">Select Customer</option>
                                        {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Related Shipment (Optional)</label>
                                    <select className="form-control" value={newInvoice.shipment_id} onChange={e => setNewInvoice({...newInvoice, shipment_id: e.target.value})}>
                                        <option value="">None</option>
                                        {shipments.map(s => <option key={s.id} value={s.id}>{s.tracking_id} - {s.origin} to {s.destination}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label>Amount</label>
                                    <input type="number" className="form-control" required value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Currency</label>
                                    <select className="form-control" value={newInvoice.currency} onChange={e => setNewInvoice({...newInvoice, currency: e.target.value})}>
                                        <option value="USD">USD</option>
                                        <option value="NGN">NGN</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Due Date</label>
                                    <input type="date" className="form-control" required value={newInvoice.due_date} onChange={e => setNewInvoice({...newInvoice, due_date: e.target.value})} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <textarea className="form-control" rows="3" value={newInvoice.description} onChange={e => setNewInvoice({...newInvoice, description: e.target.value})}></textarea>
                            </div>
                            <div className="text-right mt-4">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Invoice</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedInvoice && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between mb-4 border-bottom pb-2">
                            <h3>Edit Invoice: {selectedInvoice.invoice_id}</h3>
                            <button className="btn btn-sm" onClick={() => setShowEditModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpdateInvoice}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Status</label>
                                    <select className="form-control" required value={selectedInvoice.status} onChange={e => setSelectedInvoice({...selectedInvoice, status: e.target.value})}>
                                        <option value="Unpaid">Unpaid</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Overdue">Overdue</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Amount ({selectedInvoice.currency})</label>
                                    <input type="number" className="form-control" required value={selectedInvoice.amount} onChange={e => setSelectedInvoice({...selectedInvoice, amount: e.target.value})} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <textarea className="form-control" rows="3" value={selectedInvoice.description} onChange={e => setSelectedInvoice({...selectedInvoice, description: e.target.value})}></textarea>
                            </div>
                            <div className="text-right mt-4">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Update Invoice</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedInvoice && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="dashboard-card text-center" style={{ width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <FiTrash2 className="text-danger mb-4" style={{ fontSize: '3rem' }} />
                        <h3>Delete Invoice?</h3>
                        <p className="text-muted mb-4">Are you sure you want to delete invoice <strong>{selectedInvoice.invoice_id}</strong>? This action cannot be undone.</p>
                        <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn btn-danger" style={{ backgroundColor: '#dc3545', color: '#fff' }} onClick={handleDeleteInvoice}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingManagement;
