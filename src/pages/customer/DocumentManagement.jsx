import React, { useState, useEffect } from 'react';
import { FiDownload, FiEye, FiUploadCloud } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { generateBrandedPDF } from '../../utils/pdfGenerator';
import axios from 'axios';

const DocumentManagement = () => {
    const { user, token } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchShipmentsAndGenerateDocs = async () => {
            try {
                const authToken = token || localStorage.getItem('token');
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await axios.get(`${apiUrl}/shipments/my-shipments`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                
                const shipments = response.data.shipments;
                const generatedDocs = [];

                shipments.forEach(s => {
                    // Generate a Commercial Invoice for each shipment
                    generatedDocs.push({
                        id: `INV-${s.tracking_id}`,
                        name: "Commercial Invoice",
                        type: "PDF",
                        date: new Date(s.created_at).toLocaleDateString(),
                        size: "1.2 MB",
                        description: `Official commercial invoice for shipment ${s.tracking_id}`
                    });
                    // Generate a Bill of Lading for each shipment
                    generatedDocs.push({
                        id: `BOL-${s.tracking_id}`,
                        name: "Bill of Lading",
                        type: "PDF",
                        date: new Date(s.created_at).toLocaleDateString(),
                        size: "2.4 MB",
                        description: `Master Bill of Lading for ${s.tracking_id}`
                    });
                });

                setDocuments(generatedDocs);
            } catch (err) {
                console.error("Error fetching shipments for documents:", err);
                setError('Failed to load documents.');
            } finally {
                setLoading(false);
            }
        };

        fetchShipmentsAndGenerateDocs();
    }, [token]);

    const handleView = (doc) => {
        generateBrandedPDF({
            ...doc,
            user: user
        }, `${doc.id}.pdf`, 'view');
    };

    const handleDownload = (doc) => {
        generateBrandedPDF({
            ...doc,
            user: user
        }, `${doc.id}.pdf`, 'download');
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
                <h2 className="text-primary-navy">Document Center</h2>
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <FiUploadCloud /> Upload Document
                </button>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="dashboard-card">
                        <h4 className="mb-4">Recent Documents</h4>
                        
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Document Name</th>
                                        <th>Type</th>
                                        <th>Date Added</th>
                                        <th>Size</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc, index) => (
                                        <tr key={`${doc.id}-${index}`}>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="avatar bg-light text-danger" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}>
                                                        {doc.type}
                                                    </div>
                                                    <div>
                                                        <strong className="d-block">{doc.name}</strong>
                                                        <small className="text-muted">{doc.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{doc.type}</td>
                                            <td>{doc.date}</td>
                                            <td>{doc.size}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-outline" title="View Online" onClick={() => handleView(doc)}><FiEye /></button>
                                                    <button className="btn btn-sm btn-outline text-primary-navy border-primary-navy" title="Download PDF" onClick={() => handleDownload(doc)}><FiDownload /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {documents.length === 0 && !error && (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-muted">No documents found. New documents will appear once your shipments are processed.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentManagement;
