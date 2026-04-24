import React, { useState, useEffect } from 'react';
import { FiDownload, FiEye, FiUploadCloud, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const DocumentsManagement = () => {
    const { user, token } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [formData, setFormData] = useState({ title: '', file: null });

    useEffect(() => {
        fetchDocuments();
    }, [token]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.get(`${apiUrl}/documents`, {
                headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` }
            });
            setDocuments(response.data.documents);
        } catch (err) {
            console.error("Error fetching documents:", err);
            setError('Failed to load documents.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!formData.file) {
            alert('Please select a file.');
            return;
        }
        
        setUploading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const data = new FormData();
        data.append('file', formData.file);
        data.append('title', formData.title || formData.file.name);

        try {
            const response = await axios.post(`${apiUrl}/documents/upload`, data, {
                headers: { 
                    Authorization: `Bearer ${token || localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setDocuments([response.data.document, ...documents]);
            setShowUploadModal(false);
            setFormData({ title: '', file: null });
        } catch (err) {
            console.error("Upload error:", err);
            alert(err.response?.data?.msg || 'Failed to upload document.');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        try {
            const response = await axios.put(`${apiUrl}/documents/${selectedDoc.id}`, 
                { title: formData.title },
                { headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` } }
            );
            setDocuments(documents.map(d => d.id === selectedDoc.id ? response.data.document : d));
            setShowEditModal(false);
            setSelectedDoc(null);
        } catch (err) {
            console.error("Edit error:", err);
            alert('Failed to update document.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        try {
            await axios.delete(`${apiUrl}/documents/${id}`, {
                headers: { Authorization: `Bearer ${token || localStorage.getItem('token')}` }
            });
            setDocuments(documents.filter(d => d.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            alert('Failed to delete document.');
        }
    };

    const openEditModal = (doc) => {
        setSelectedDoc(doc);
        setFormData({ title: doc.title, file: null });
        setShowEditModal(true);
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
                <h2 className="text-primary-navy">Document Management</h2>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowUploadModal(true)}>
                    <FiUploadCloud /> Upload Document
                </button>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="dashboard-card position-relative">
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Document Name</th>
                                        <th>Uploaded By</th>
                                        <th>Type</th>
                                        <th>Size</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc) => (
                                        <tr key={doc.id}>
                                            <td><strong>{doc.title}</strong></td>
                                            <td>
                                                <div>{doc.user_name}</div>
                                                <small className="text-muted">{doc.user_email}</small>
                                            </td>
                                            <td><span className="badge bg-light text-dark">{doc.file_type}</span></td>
                                            <td>{doc.size}</td>
                                            <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline" title="View/Download">
                                                        <FiEye />
                                                    </a>
                                                    <button className="btn btn-sm btn-outline" title="Edit Title" onClick={() => openEditModal(doc)}>
                                                        <FiEdit2 />
                                                    </button>
                                                    <button className="btn btn-sm" style={{ border: '1px solid #dc3545', color: '#dc3545' }} title="Delete" onClick={() => handleDelete(doc.id)}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {documents.length === 0 && !error && (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">No documents uploaded yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Upload Modal */}
                        {showUploadModal && (
                            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px' }}>
                                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                                        <h3 className="mb-0">Upload Document</h3>
                                        <button className="btn btn-sm" onClick={() => setShowUploadModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                                    </div>
                                    <form onSubmit={handleUpload}>
                                        <div className="form-group mb-3">
                                            <label className="d-block mb-1 font-weight-bold font-sm">Document Title (Optional)</label>
                                            <input type="text" className="form-control w-100 p-2 border rounded" placeholder="Leave blank to use filename" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="d-block mb-1 font-weight-bold font-sm">Select File</label>
                                            <input type="file" className="form-control-file" required onChange={e => setFormData({ ...formData, file: e.target.files[0] })} />
                                        </div>
                                        <div className="text-right pt-3 border-top">
                                            <button type="button" className="btn btn-outline mr-2" onClick={() => setShowUploadModal(false)} disabled={uploading}>Cancel</button>
                                            <button type="submit" className="btn btn-primary" disabled={uploading}>
                                                {uploading ? 'Uploading...' : 'Upload'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Edit Modal */}
                        {showEditModal && selectedDoc && (
                            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px' }}>
                                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                                        <h3 className="mb-0">Edit Document</h3>
                                        <button className="btn btn-sm" onClick={() => setShowEditModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                                    </div>
                                    <form onSubmit={handleEdit}>
                                        <div className="form-group mb-4">
                                            <label className="d-block mb-1 font-weight-bold font-sm">Document Title</label>
                                            <input type="text" className="form-control w-100 p-2 border rounded" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                        </div>
                                        <div className="text-right pt-3 border-top">
                                            <button type="button" className="btn btn-outline mr-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsManagement;
