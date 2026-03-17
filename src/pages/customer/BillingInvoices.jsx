import React, { useState, useEffect } from 'react';
import { FiDownload, FiCreditCard, FiGlobe, FiEye } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { generateBrandedPDF } from '../../utils/pdfGenerator';
import axios from 'axios';

const BillingInvoices = () => {
    const { user, token } = useAuth();
    const [currency, setCurrency] = useState('USD');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalOutstanding, setTotalOutstanding] = useState(0);

    // Currencies and their symbols
    const terminalCurrencies = {
        'USD': { symbol: '$', rate: 1 },
        'NGN': { symbol: '₦', rate: 1200 }, // Mock rate
        'GBP': { symbol: '£', rate: 0.82 },
        'EUR': { symbol: '€', rate: 0.94 }
    };

    useEffect(() => {
        if (user?.country === 'Nigeria') {
            setCurrency('NGN');
        } else if (user?.country === 'UK') {
            setCurrency('GBP');
        } else if (user?.country === 'Europe') {
            setCurrency('EUR');
        } else {
            setCurrency('USD');
        }
    }, [user]);

    useEffect(() => {
        const fetchRealInvoices = async () => {
            try {
                const authToken = token || localStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await axios.get(`${apiUrl}/billing/my-invoices`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                
                const fetchedInvoices = response.data.invoices;
                let outstanding = 0;
                
                const mappedInvoices = fetchedInvoices.map(inv => {
                    if (inv.status !== 'Paid' && inv.status !== 'Cancelled') {
                        outstanding += inv.amount;
                    }
                    return {
                        id: inv.invoice_id,
                        amount: inv.amount,
                        date: new Date(inv.created_at).toLocaleDateString(),
                        status: inv.status,
                        description: inv.description || `Invoice ${inv.invoice_id}`
                    };
                });

                setInvoices(mappedInvoices);
                setTotalOutstanding(outstanding);
            } catch (err) {
                console.error("Error fetching invoices:", err);
                setError('Failed to load billing data.');
            } finally {
                setLoading(false);
            }
        };

        fetchRealInvoices();
    }, [token]);

    const formatAmount = (amount) => {
        const numericAmount = parseFloat(amount);
        const converted = numericAmount * terminalCurrencies[currency].rate;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol'
        }).format(converted);
    };

    const handleDownload = (invoice) => {
        generateBrandedPDF({
            ...invoice,
            type: 'Invoice',
            currency: currency,
            user: {
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
                address: user?.address
            }
        }, `${invoice.id}.pdf`, 'download');
    };

    const handleView = (invoice) => {
        generateBrandedPDF({
            ...invoice,
            type: 'Invoice',
            currency: currency,
            user: {
                name: user?.name,
                email: user?.email,
                phone: user?.phone,
                address: user?.address
            }
        }, `${invoice.id}.pdf`, 'view');
    };

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
                <h2 className="text-primary-navy">Billing & Invoices</h2>
                <div className="d-flex gap-2">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-right-0"><FiGlobe /></span>
                        <select
                            className="form-control border-left-0"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            style={{ minWidth: '100px' }}
                        >
                            <option value="USD">USD ($)</option>
                            <option value="NGN">NGN (₦)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                    <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowPaymentModal(true)}>
                        <FiCreditCard /> Add Payment
                    </button>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    <div className="dashboard-card border-left-accent h-100 bg-white shadow-sm">
                        <h5 className="text-muted mb-2 font-sm text-uppercase">Total Outstanding</h5>
                        <h3 className="mb-0" style={{ color: '#dc3545' }}>{formatAmount(totalOutstanding)}</h3>
                        <p className="text-muted font-sm mt-1">Pending payments for active shipments.</p>
                        <button className="btn btn-sm btn-primary mt-2">Pay Outstanding</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="dashboard-card h-100 border-left-accent bg-white shadow-sm">
                        <h5 className="text-muted mb-2 font-sm text-uppercase">Active Payment Method</h5>
                        <div className="d-flex align-items-center gap-3">
                            <div className="avatar bg-light text-primary-navy shadow-sm">
                                <FiCreditCard />
                            </div>
                            <div>
                                <strong className="d-block">Visa ending in 4242</strong>
                                <span className="text-muted font-sm">Expires 12/25</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-card shadow-sm">
                <h4 className="mb-4">Invoice History</h4>
                
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.length > 0 ? invoices.map((invoice, index) => (
                                <tr key={`${invoice.id}-${index}`}>
                                    <td><strong>{invoice.id}</strong></td>
                                    <td>{invoice.description}</td>
                                    <td>{invoice.date}</td>
                                    <td>{formatAmount(invoice.amount)}</td>
                                    <td>
                                        <span className={`badge ${invoice.status === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-sm btn-outline"
                                                title="View Online"
                                                onClick={() => handleView(invoice)}
                                            >
                                                <FiEye />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline text-primary-navy border-primary-navy"
                                                title="Download PDF"
                                                onClick={() => handleDownload(invoice)}
                                            >
                                                <FiDownload />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-muted">No invoices found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Payment Method Modal */}
            {showPaymentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Add Payment Method</h3>
                            <button className="btn btn-sm" onClick={() => setShowPaymentModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); alert("Payment method added successfully!"); setShowPaymentModal(false); }}>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Cardholder Name</label>
                                <input type="text" className="form-control w-100 p-2 border rounded" required placeholder="John Doe" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Card Number</label>
                                <input type="text" className="form-control w-100 p-2 border rounded" required placeholder="4242 4242 4242 4242" />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Expiry</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" required placeholder="MM/YY" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">CVC</label>
                                        <input type="password" className="form-control w-100 p-2 border rounded" required placeholder="***" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-right mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingInvoices;
