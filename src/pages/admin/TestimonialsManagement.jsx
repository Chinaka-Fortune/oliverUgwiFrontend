import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const TestimonialsManagement = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '', text: '' });
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await axios.get(`${apiUrl}/testimonials/`);
            setTestimonials(response.data);
            setError('');
        } catch (err) {
            console.error("Failed to fetch testimonials", err);
            setError('Failed to load testimonials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddTestimonial = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('name', formData.name);
            data.append('role', formData.role);
            data.append('text', formData.text);
            if (imageFile) {
                data.append('image', imageFile);
            }

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.post(`${apiUrl}/testimonials/`, data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsAddModalOpen(false);
            setFormData({ name: '', role: '', text: '' });
            setImageFile(null);
            fetchTestimonials();
        } catch (err) {
            console.error("Failed to add testimonial", err);
            setError('Failed to add testimonial. Please check your inputs.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditModal = (testimonial) => {
        setCurrentTestimonial(testimonial);
        setFormData({ name: testimonial.name, role: testimonial.role, text: testimonial.text });
        setIsEditModalOpen(true);
    };

    const handleUpdateTestimonial = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('name', formData.name);
            data.append('role', formData.role);
            data.append('text', formData.text);
            if (imageFile) {
                data.append('image', imageFile);
            }

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.put(`${apiUrl}/testimonials/${currentTestimonial.id}/`, data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsEditModalOpen(false);
            setCurrentTestimonial(null);
            setFormData({ name: '', role: '', text: '' });
            setImageFile(null);
            fetchTestimonials();
        } catch (err) {
            console.error("Failed to update testimonial", err);
            setError('Failed to update testimonial.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTestimonial = async (id) => {
        if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
        
        try {
            const token = localStorage.getItem('token');
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.delete(`${apiUrl}/testimonials/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTestimonials();
        } catch (err) {
            console.error("Failed to delete testimonial", err);
            setError('Failed to delete testimonial.');
        }
    };

    return (
        <div className="admin-page-content">
            <div className="admin-header-actions mb-4 d-flex justify-content-between align-items-center">
                <h2>Testimonials Management</h2>
                <button className="btn btn-primary" onClick={() => { setFormData({name: '', role: '', text: ''}); setIsAddModalOpen(true); }}>
                    <FiPlus className="me-2" /> Add New Testimonial
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="admin-card">
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Client Name</th>
                                    <th>Role / Company</th>
                                    <th>Excerpt</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No testimonials found. Add your first client review!</td>
                                    </tr>
                                ) : (
                                    testimonials.map(testimonial => (
                                        <tr key={testimonial.id}>
                                            <td>#{testimonial.id}</td>
                                            <td>
                                                {testimonial.image_url ? (
                                                    <img src={testimonial.image_url.startsWith('http') ? testimonial.image_url : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${testimonial.image_url}`} alt={testimonial.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                                ) : (
                                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0b2447&color=d4af37&size=40`} alt={testimonial.name} style={{ borderRadius: '50%' }} />
                                                )}
                                            </td>
                                            <td className="fw-bold">{testimonial.name}</td>
                                            <td>{testimonial.role}</td>
                                            <td>{testimonial.text.substring(0, 50)}...</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button 
                                                        className="btn-icon text-primary" 
                                                        onClick={() => openEditModal(testimonial)}
                                                        title="Edit Testimonial"
                                                    >
                                                        <FiEdit2 />
                                                    </button>
                                                    <button 
                                                        className="btn-icon text-danger" 
                                                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                                                        title="Delete Testimonial"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add Testimonial Modal */}
            {isAddModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal glass-card">
                        <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>
                            <FiX />
                        </button>
                        <h3 className="mb-4">Add New Testimonial</h3>
                        <form onSubmit={handleAddTestimonial}>
                            <div className="form-group mb-3">
                                <label>Client Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Role & Company (e.g. CEO, Sagacity Global Projects)</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="role"
                                    value={formData.role} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Client Avatar Image (Optional)</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label>Testimonial Content</label>
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    name="text"
                                    value={formData.text} 
                                    onChange={handleInputChange} 
                                    required 
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn btn-outline" onClick={() => { setIsAddModalOpen(false); setImageFile(null); }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Adding...' : 'Add Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Testimonial Modal */}
            {isEditModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal glass-card">
                        <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>
                            <FiX />
                        </button>
                        <h3 className="mb-4">Edit Testimonial</h3>
                        <form onSubmit={handleUpdateTestimonial}>
                            <div className="form-group mb-3">
                                <label>Client Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Role & Company</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="role"
                                    value={formData.role} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Client Avatar Image (Leave blank to keep current)</label>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                />
                                {currentTestimonial?.image_url && (
                                    <div className="mt-2 text-muted small">
                                        Current image: <a href={currentTestimonial.image_url.startsWith('http') ? currentTestimonial.image_url : `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '')}${currentTestimonial.image_url}`} target="_blank" rel="noopener noreferrer">View Image</a>
                                    </div>
                                )}
                            </div>
                            <div className="form-group mb-4">
                                <label>Testimonial Content</label>
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    name="text"
                                    value={formData.text} 
                                    onChange={handleInputChange} 
                                    required 
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn btn-outline" onClick={() => { setIsEditModalOpen(false); setImageFile(null); }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestimonialsManagement;
