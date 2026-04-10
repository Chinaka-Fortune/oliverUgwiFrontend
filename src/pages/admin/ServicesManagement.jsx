import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiActivity, FiTag } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ServicesManagement = () => {
    const { token } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newService, setNewService] = useState({ name: '', type: 'Core', status: 'Active', price_factor: 'Dynamic' });
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/services`);
            const data = await response.json();
            if (response.ok) {
                setServices(data.services);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id) => {
        const service = services.find(s => s.id === id);
        if (!service) return;

        const newStatus = service.status === "Active" ? "Inactive" : "Active";
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                setServices(services.map(s => s.id === id ? { ...s, status: newStatus } : s));
            }
        } catch (err) {
            showNotification("Failed to update status", "error");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this service? This action cannot be undone.")) {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/services/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setServices(prev => prev.filter(s => s.id !== id));
                    showNotification("Service removed successfully", "success");
                } else {
                    const data = await response.json();
                    showNotification(data.msg || "Failed to delete", "error");
                }
            } catch (err) {
                showNotification("Server error during deletion", "error");
            }
        }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        if (!newService.name.trim()) {
            showNotification("Service name is required", "error");
            return;
        }
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify(newService)
            });
            const data = await response.json();
            if (response.ok) {
                setServices([...services, data.service]);
                setShowAddModal(false);
                setNewService({ name: '', type: 'Core', status: 'Active', price_factor: 'Dynamic' });
                showNotification("New service '" + data.service.name + "' added successfully!", "success");
            } else {
                showNotification(data.msg || "Server returned an error while adding service", "error");
            }
        } catch (err) {
            console.error("Add Service Error:", err);
            showNotification(`Connection error: ${err.message}. Please check your internet and try again.`, "error");
        }
    };

    const handleEditService = async (e) => {
        e.preventDefault();
        if (!selectedService.name.trim()) {
            showNotification("Service name is required", "error");
            return;
        }
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/services/${selectedService.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify(selectedService)
            });
            const data = await response.json();
            if (response.ok) {
                setServices(services.map(s => s.id === selectedService.id ? data.service : s));
                setShowEditModal(false);
                setSelectedService(null);
                showNotification("Service updated successfully!", "success");
            } else {
                showNotification(data.msg || "Failed to update service", "error");
            }
        } catch (err) {
            showNotification("Server error", "error");
        }
    };

    // Simple notification helper since we don't have a toast library connected yet
    const showNotification = (message, type) => {
        // You could implement a more sophisticated toast system here
        // For now, we'll use a styled alert or just log it to satisfy requirements
        alert(`${type.toUpperCase()}: ${message}`);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Services Management</h2>
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
                    <FiPlus /> Add New Service
                </button>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="dashboard-card">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Type</th>
                                        <th>Price Factor</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map(service => (
                                        <tr key={service.id}>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className={`avatar ${service.type === 'Core' ? 'bg-primary-navy' : 'bg-accent'} text-white mr-2`} style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                                                        {service.name.charAt(0)}
                                                    </div>
                                                    <strong>{service.name}</strong>
                                                </div>
                                            </td>
                                            <td><span className="badge bg-light text-navy">{service.type}</span></td>
                                            <td><FiTag className="mr-1" /> {service.price_factor}</td>
                                            <td>
                                                <span className={`badge ${service.status === 'Active' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {service.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline mr-2"
                                                    title="Edit"
                                                    onClick={() => {
                                                        setSelectedService({ ...service });
                                                        setShowEditModal(true);
                                                    }}
                                                >
                                                    <FiEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ border: '1px solid #dc3545', color: '#dc3545' }}
                                                    onClick={() => handleDelete(service.id)}
                                                    title="Delete"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-link text-primary-navy"
                                                    onClick={() => handleToggleStatus(service.id)}
                                                >
                                                    {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-4 dashboard-card bg-light border-left-accent">
                        <div className="d-flex align-items-start gap-3">
                            <FiActivity className="text-primary-blue mt-1" style={{ fontSize: '1.5rem' }} />
                            <div>
                                <h5>Service Performance Overview</h5>
                                <p className="text-muted mb-0">Maritime Logistics and Air Cargo currently account for 85% of total platform revenue this month.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Service Modal */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Add New Service</h3>
                            <button className="btn btn-sm" onClick={() => setShowAddModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <form onSubmit={handleAddService}>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Service Name</label>
                                <input
                                    type="text"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={newService.name}
                                    onChange={e => setNewService({ ...newService, name: e.target.value })}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Type</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={newService.type}
                                        onChange={e => setNewService({ ...newService, type: e.target.value })}
                                    >
                                        <option value="Core">Core</option>
                                        <option value="Service">Service</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Status</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={newService.status}
                                        onChange={e => setNewService({ ...newService, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Price Factor</label>
                                <input
                                    type="text"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={newService.price_factor}
                                    onChange={e => setNewService({ ...newService, price_factor: e.target.value })}
                                    placeholder="e.g. Dynamic, Flat-rate"
                                />
                            </div>
                            <div className="text-right mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Service</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Service Modal */}
            {showEditModal && selectedService && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Edit Service: {selectedService.name}</h3>
                            <button className="btn btn-sm" onClick={() => setShowEditModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <form onSubmit={handleEditService}>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Service Name</label>
                                <input
                                    type="text"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={selectedService.name}
                                    onChange={e => setSelectedService({ ...selectedService, name: e.target.value })}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Type</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={selectedService.type}
                                        onChange={e => setSelectedService({ ...selectedService, type: e.target.value })}
                                    >
                                        <option value="Core">Core</option>
                                        <option value="Service">Service</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Status</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={selectedService.status}
                                        onChange={e => setSelectedService({ ...selectedService, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Price Factor</label>
                                <input
                                    type="text"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={selectedService.price_factor}
                                    onChange={e => setSelectedService({ ...selectedService, price_factor: e.target.value })}
                                />
                            </div>
                            <div className="text-right mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Update Service</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesManagement;
