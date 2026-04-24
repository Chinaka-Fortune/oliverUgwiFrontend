import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiUser, FiMail, FiPhone, FiCheckCircle, FiTrash2, FiExternalLink, FiEdit3, FiCheckSquare } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ContactManagement = () => {
    const { token } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ status: '', notes: '' });
    const [selectedIds, setSelectedIds] = useState([]);

    // Email state
    const [isEmailing, setIsEmailing] = useState(false);
    const [emailData, setEmailData] = useState({ to: '', subject: 'Update from OLIVER-UGWI', body: '' });
    const [emailingStatus, setEmailingStatus] = useState('');

    // WhatsApp state
    const [isWhatsApping, setIsWhatsApping] = useState(false);
    const [whatsAppData, setWhatsAppData] = useState({ phone: '', name: '', message: '' });

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/admin/contacts`, {
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setContacts(data);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/admin/contacts/${selectedContact.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify(editData)
            });

            if (response.ok) {
                alert("Contact status updated!");
                setIsEditing(false);
                fetchContacts();
                setSelectedContact({ ...selectedContact, ...editData });
            }
        } catch (err) {
            console.error("Error updating contact:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/admin/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                alert("Deleted successfully");
                fetchContacts();
                if (selectedContact?.id === id) {
                    setSelectedContact(null);
                }
            }
        } catch (err) {
            console.error("Error deleting contact:", err);
        }
    };

    const cleanPhoneForWhatsApp = (phone) => {
        if (!phone) return '';
        // Remove all non-digit characters to start clean
        let digits = phone.replace(/\D/g, '');
        
        // Handle Nigerian format: 080... or 070... etc.
        if (digits.startsWith('0') && digits.length >= 10) {
            return '+234' + digits.substring(1);
        }
        
        // Handle format already starting with 234 (no leading zero)
        if (digits.startsWith('234') && digits.length >= 12) {
            return '+' + digits;
        }
        
        // Fallback: If it's a short 10-digit number, assume it's Nigerian
        if (digits.length === 10) {
            return '+234' + digits;
        }

        // Return with + prefix if digits exist
        return digits ? '+' + digits : '';
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Replied': return 'bg-success';
            case 'Read': return 'bg-info';
            default: return 'bg-warning text-dark';
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(contacts.map(c => c.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleBulkEmail = () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one contact to email.");
            return;
        }

        const selectedEmails = contacts
            .filter(c => selectedIds.includes(c.id) && c.email)
            .map(c => c.email)
            .join(',');
            
        if (!selectedEmails) {
            alert("No valid email addresses found in the selection.");
            return;
        }

        // Use bcc to hide emails from recipients if sending in bulk
        window.location.href = `mailto:?bcc=${selectedEmails}&subject=Update from OLIVER-UGWI`;
    };

    const handleOpenEmailModal = (contact = null) => {
        if (contact) {
            setEmailData({ to: contact.email, subject: `Regarding your inquiry to OLIVER-UGWI`, body: `Hello ${contact.firstName},\n\n` });
            setIsEmailing(true);
        } else if (selectedIds.length > 0) {
            const selectedEmails = contacts
                .filter(c => selectedIds.includes(c.id) && c.email)
                .map(c => c.email)
                .join(', ');
            
            if (!selectedEmails) {
                alert("No valid email addresses found in the selection.");
                return;
            }
            setEmailData({ to: selectedEmails, subject: 'Update from OLIVER-UGWI', body: '' });
            setIsEmailing(true);
        } else {
            alert("Please select at least one contact to email.");
        }
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setEmailingStatus('sending');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/admin/contacts/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    to_emails: emailData.to,
                    subject: emailData.subject,
                    body: emailData.body
                })
            });

            if (response.ok) {
                setEmailingStatus('success');
                setTimeout(() => {
                    setIsEmailing(false);
                    setEmailingStatus('');
                    // Auto-update status to replied if viewing a single contact
                    if (selectedContact && !selectedIds.length) {
                        setEditData({ status: 'Replied', notes: selectedContact.notes || '' });
                        // Call handleUpdate but avoid the event preventDefault since this is manual
                        submitUpdate('Replied', selectedContact.notes || '');
                    }
                }, 1500);
            } else {
                setEmailingStatus('error');
            }
        } catch (err) {
            console.error("Error sending email:", err);
            setEmailingStatus('error');
        }
    };

    const submitUpdate = async (status, notes) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/admin/contacts/${selectedContact.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status, notes })
            });
            if (response.ok) {
                fetchContacts();
                setSelectedContact({ ...selectedContact, status, notes });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenWhatsAppModal = (contact) => {
        setWhatsAppData({ 
            phone: cleanPhoneForWhatsApp(contact.phone), 
            name: contact.firstName,
            message: `Hello ${contact.firstName}, I am reaching out from OLIVER-UGWI regarding your inquiry.` 
        });
        setIsWhatsApping(true);
    };

    const handleSendWhatsApp = (e) => {
        e.preventDefault();
        // Clean the phone number for the URL (wa.me works best with just digits)
        const urlPhone = whatsAppData.phone.replace(/\+/g, '');
        window.open(`https://wa.me/${urlPhone}?text=${encodeURIComponent(whatsAppData.message)}`, '_blank', 'noreferrer');
        setIsWhatsApping(false);
        
        // Auto-update status to Replied
        if (selectedContact) {
            setEditData({ status: 'Replied', notes: selectedContact.notes || '' });
            submitUpdate('Replied', selectedContact.notes || '');
        }
    };

    return (
        <div className="contact-management">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>General Contact Inquiries</h2>
                <div className="d-flex gap-3 align-items-center">
                    <div className="stats-pills">
                        <span className="badge bg-primary">Total: {contacts.length}</span>
                        <span className="badge bg-warning text-dark ms-2">Pending: {contacts.filter(c => c.status === 'Pending').length}</span>
                    </div>
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
                            {/* Bulk Action Toolbar */}
                            {selectedIds.length > 0 && (
                                <div className="bg-light p-2 mb-3 rounded d-flex justify-content-between align-items-center">
                                    <span className="font-weight-bold">{selectedIds.length} item(s) selected</span>
                                    <button 
                                        className="btn btn-sm btn-primary d-flex align-items-center gap-2"
                                        onClick={() => handleOpenEmailModal()}
                                    >
                                        <FiMail /> Send Bulk Email
                                    </button>
                                </div>
                            )}

                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '40px' }}>
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        onChange={handleSelectAll}
                                                        checked={contacts.length > 0 && selectedIds.length === contacts.length}
                                                    />
                                                </div>
                                            </th>
                                            <th>Sender</th>
                                            <th>Service</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map(contact => (
                                            <tr 
                                                key={contact.id} 
                                                className={selectedContact?.id === contact.id ? 'table-active' : ''}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setSelectedContact(contact)}
                                            >
                                                <td onClick={(e) => e.stopPropagation()}>
                                                    <div className="form-check">
                                                        <input 
                                                            className="form-check-input" 
                                                            type="checkbox" 
                                                            checked={selectedIds.includes(contact.id)}
                                                            onChange={() => handleSelectRow(contact.id)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="font-weight-bold">{contact.firstName} {contact.lastName}</div>
                                                    <small className="text-muted">{contact.email}</small>
                                                </td>
                                                <td>{contact.service}</td>
                                                <td>
                                                    <span className={`badge ${getStatusBadgeClass(contact.status)}`}>
                                                        {contact.status}
                                                    </span>
                                                </td>
                                                <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                                                <td onClick={(e) => e.stopPropagation()}>
                                                    <div className="d-flex gap-2">
                                                        <button 
                                                            className="btn btn-sm btn-outline-primary" 
                                                            onClick={() => setSelectedContact(contact)}
                                                        >
                                                            View
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger" 
                                                            onClick={() => handleDelete(contact.id)}
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {contacts.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-muted">No inquiries found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        {selectedContact ? (
                            <div className="dashboard-card sticky-top" style={{ top: '20px' }}>
                                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                    <h4 className="mb-0">Inquiry Details</h4>
                                    <span className={`badge ${getStatusBadgeClass(selectedContact.status)}`}>{selectedContact.status}</span>
                                </div>

                                <div className="contact-details-box mb-4">
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Sender</label>
                                        <div className="d-flex align-items-center gap-2">
                                            <FiUser className="text-accent" /> <strong>{selectedContact.firstName} {selectedContact.lastName}</strong>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Email Address</label>
                                        <div className="d-flex align-items-center gap-2">
                                            <FiMail className="text-accent" /> {selectedContact.email}
                                        </div>
                                    </div>
                                    {selectedContact.phone && (
                                        <div className="mb-3">
                                            <label className="text-muted small d-block">Phone Number</label>
                                            <div className="d-flex align-items-center gap-2">
                                                <FiPhone className="text-accent" /> {selectedContact.phone}
                                            </div>
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Service Interested In</label>
                                        <strong>{selectedContact.service}</strong>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Message</label>
                                        <div className="bg-light p-3 rounded" style={{ whiteSpace: 'pre-wrap' }}>
                                            {selectedContact.message}
                                        </div>
                                    </div>
                                    {selectedContact.notes && (
                                        <div className="mb-3">
                                            <label className="text-muted small d-block">Internal Admin Notes</label>
                                            <div className="bg-warning-light p-2 rounded border border-warning small">
                                                {selectedContact.notes}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <hr />

                                <div className="action-buttons d-grid gap-2 mt-4">
                                    <button 
                                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                                        onClick={() => handleOpenEmailModal(selectedContact)}
                                    >
                                        <FiMail /> Reply via Email
                                    </button>
                                    {selectedContact.phone && (
                                        <button 
                                            className="btn btn-success d-flex align-items-center justify-content-center gap-2"
                                            onClick={() => handleOpenWhatsAppModal(selectedContact)}
                                        >
                                            <FiExternalLink /> Reply via WhatsApp
                                        </button>
                                    )}
                                    <button 
                                        className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                                        onClick={() => {
                                            setEditData({ status: selectedContact.status, notes: selectedContact.notes || '' });
                                            setIsEditing(true);
                                        }}
                                    >
                                        <FiEdit3 /> Edit Status/Notes
                                    </button>
                                </div>

                                {isEditing && (
                                    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                                        <div className="dashboard-card" style={{ width: '400px', maxWidth: '90%' }}>
                                            <h4>Update Inquiry</h4>
                                            <form onSubmit={handleUpdate}>
                                                <div className="mb-3">
                                                    <label className="small">Status</label>
                                                    <select className="form-control" value={editData.status} onChange={(e) => setEditData({...editData, status: e.target.value})}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Read">Read</option>
                                                        <option value="Replied">Replied</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small">Internal Notes</label>
                                                    <textarea className="form-control" rows="3" value={editData.notes} onChange={(e) => setEditData({...editData, notes: e.target.value})} placeholder="Add reminders or response details..."></textarea>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button type="submit" className="btn btn-primary flex-grow-1">Save</button>
                                                    <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={() => setIsEditing(false)}>Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="dashboard-card text-center py-5">
                                <FiMessageSquare size={48} className="text-muted-light mb-3" />
                                <p className="text-muted">Select an inquiry from the list to view details and respond.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isEmailing && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
                    <div className="dashboard-card" style={{ width: '600px', maxWidth: '95%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Compose Email</h4>
                            <button className="btn btn-sm btn-light" onClick={() => setIsEmailing(false)}>&times;</button>
                        </div>
                        
                        {emailingStatus === 'success' ? (
                            <div className="text-center py-4">
                                <FiCheckCircle size={48} className="text-success mb-3" />
                                <h5>Email Sent Successfully!</h5>
                            </div>
                        ) : (
                            <form onSubmit={handleSendEmail}>
                                <div className="mb-3">
                                    <label className="form-label small text-muted">To</label>
                                    <input 
                                        type="text" 
                                        className="form-control bg-light" 
                                        value={emailData.to} 
                                        disabled 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small text-muted">Subject</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={emailData.subject} 
                                        onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small text-muted">Message</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="8" 
                                        value={emailData.body} 
                                        onChange={(e) => setEmailData({...emailData, body: e.target.value})}
                                        required
                                    ></textarea>
                                </div>
                                
                                {emailingStatus === 'error' && (
                                    <div className="text-danger small mb-3">Failed to send email. Please try again.</div>
                                )}

                                <div className="d-flex justify-content-end gap-2">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setIsEmailing(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={emailingStatus === 'sending'}>
                                        {emailingStatus === 'sending' ? (
                                            <><span className="spinner-border spinner-border-sm"></span> Sending...</>
                                        ) : (
                                            <><FiMail /> Send Email</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {isWhatsApping && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
                    <div className="dashboard-card" style={{ width: '500px', maxWidth: '95%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0 text-success d-flex align-items-center gap-2"><FiPhone /> Compose WhatsApp Message</h4>
                            <button className="btn btn-sm btn-light" onClick={() => setIsWhatsApping(false)}>&times;</button>
                        </div>
                        
                        <div className="alert alert-info small border-0 bg-info-light text-dark mb-4">
                            Draft your message here. Clicking "Send" will open WhatsApp Web with your message ready to send and automatically update this inquiry's status to <strong>Replied</strong>.
                        </div>

                        <form onSubmit={handleSendWhatsApp}>
                            <div className="mb-3">
                                <label className="form-label small text-muted">Recipient Name</label>
                                <input 
                                    type="text" 
                                    className="form-control bg-light" 
                                    value={whatsAppData.name} 
                                    disabled 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small text-muted">WhatsApp Number <small>(Must include country code)</small></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={whatsAppData.phone} 
                                    onChange={(e) => setWhatsAppData({...whatsAppData, phone: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small text-muted">Message Content</label>
                                <textarea 
                                    className="form-control" 
                                    rows="6" 
                                    value={whatsAppData.message} 
                                    onChange={(e) => setWhatsAppData({...whatsAppData, message: e.target.value})}
                                    required
                                ></textarea>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setIsWhatsApping(false)}>Cancel</button>
                                <button type="submit" className="btn btn-success d-flex align-items-center gap-2">
                                    <FiExternalLink /> Open WhatsApp & Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactManagement;
