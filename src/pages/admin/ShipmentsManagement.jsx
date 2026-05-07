import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSearch, FiPlus, FiAlertCircle, FiCheckCircle, FiTruck, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ShipmentsManagement = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user } = useAuth();

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [editingShipment, setEditingShipment] = useState(null);
    const [formData, setFormData] = useState({
        origin: '', destination: '', current_location: '', type: 'Maritime Logistics', status: 'Pending',
        bl_awb_no: '', consignment: '', vessel_airline: '', pol: '', ets: '', pod: '', eta: ''
    });
    const [updateFormData, setUpdateFormData] = useState({
        status: '', current_location: '', bl_awb_no: '', consignment: '', vessel_airline: '', pol: '', ets: '', pod: '', eta: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchShipments();
    }, [token]);

    const fetchShipments = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/shipments/my-shipments`, {
                headers: {
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setShipments(data.shipments);
            } else {
                setError(data.msg || "Failed to fetch shipments");
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Connection to server failed");
            setLoading(false);
        }
    };

    const handleCreateShipment = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/shipments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || 'MOCK_TOKEN'}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Server returned an error while creating shipment');
            }

            setSuccess(`Shipment created with Tracking ID: ${data.shipment.tracking_id}`);
            setShipments([data.shipment, ...shipments]);
            setFormData({ 
                origin: '', destination: '', current_location: '', type: 'Maritime Logistics', status: 'Pending',
                bl_awb_no: '', consignment: '', vessel_airline: '', pol: '', ets: '', pod: '', eta: ''
            });

            setTimeout(() => {
                setShowModal(false);
                setSuccess('');
            }, 3000);

        } catch (err) {
            console.error("Create Shipment Error:", err);
            setError(`Connection error: ${err.message}. Please check your internet and try again.`);
        }
    };

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/shipments/${editingShipment.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    status: updateFormData.status,
                    current_location: updateFormData.current_location,
                    bl_awb_no: updateFormData.bl_awb_no,
                    consignment: updateFormData.consignment,
                    vessel_airline: updateFormData.vessel_airline,
                    pol: updateFormData.pol,
                    ets: updateFormData.ets,
                    pod: updateFormData.pod,
                    eta: updateFormData.eta
                })
            });

            const data = await response.json();
            if (response.ok) {
                const updated = shipments.map(s =>
                    s.id === editingShipment.id
                        ? { 
                            ...s, 
                            status: updateFormData.status, 
                            current_location: updateFormData.current_location, 
                            bl_awb_no: updateFormData.bl_awb_no,
                            consignment: updateFormData.consignment,
                            vessel_airline: updateFormData.vessel_airline,
                            pol: updateFormData.pol,
                            ets: updateFormData.ets,
                            pod: updateFormData.pod,
                            eta: updateFormData.eta,
                            updated_at: new Date().toISOString() 
                          }
                        : s
                );
                setShipments(updated);
                alert(`Shipment ${editingShipment.tracking_id} updated successfully!`);
                setShowUpdateModal(false);
                setEditingShipment(null);
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (err) {
            console.error("Update Shipment Error:", err);
            alert("Failed to update shipment. Server connection error.");
        }
    };

    const handleDeleteShipment = async (id) => {
        if (!id) {
            alert("Cannot delete shipment: Missing ID");
            return;
        }
        if (window.confirm("Are you sure you want to delete this shipment record? This cannot be undone.")) {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/shipments/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token || localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setShipments(prev => prev.filter(s => s.id !== id));
                    alert("Shipment deleted successfully.");
                } else {
                    alert(`Error: ${data.msg}`);
                }
            } catch (err) {
                alert("Failed to delete shipment. Server connection error.");
            }
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return 'bg-secondary text-white';
            case 'In Transit': return 'bg-warning text-dark';
            case 'Arrived POD': return 'bg-primary text-white';
            case 'Cleared': return 'bg-info text-white';
            case 'Delivered': return 'bg-success text-white';
            default: return 'bg-secondary text-white';
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{user?.role === 'admin' ? 'Shipments Management' : 'My Shipments'}</h2>
                {user?.role === 'admin' && (
                    <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
                        <FiPlus /> New Shipment
                    </button>
                )}
            </div>

            <div className="dashboard-card position-relative">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div className="search-bar" style={{ maxWidth: '300px', flex: '1 1 300px' }}>
                        <FiSearch className="search-icon" />
                        <input type="text" placeholder="Search by Tracking ID or location..." />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">Loading shipments...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tracking ID</th>
                                    <th>Type</th>
                                    <th>Origin &rarr; Destination</th>
                                    <th>Current Location</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                    {user?.role === 'admin' && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {shipments.map(shipment => (
                                    <tr key={shipment.id || shipment.tracking_id}>
                                        <td><strong>{shipment.tracking_id}</strong></td>
                                        <td>{shipment.type}</td>
                                        <td>{shipment.origin} &rarr; {shipment.destination}</td>
                                        <td>{shipment.current_location}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(shipment.status)}`}>
                                                {shipment.status}
                                            </span>
                                        </td>
                                        <td>{new Date(shipment.updated_at).toLocaleDateString()}</td>
                                        {user?.role === 'admin' && (
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline mr-2"
                                                    title="Update Status"
                                                    onClick={() => {
                                                        setEditingShipment(shipment);
                                                        setUpdateFormData({ 
                                                            status: shipment.status, 
                                                            current_location: shipment.current_location,
                                                            bl_awb_no: shipment.bl_awb_no || '',
                                                            consignment: shipment.consignment || '',
                                                            vessel_airline: shipment.vessel_airline || '',
                                                            pol: shipment.pol || '',
                                                            ets: shipment.ets || '',
                                                            pod: shipment.pod || '',
                                                            eta: shipment.eta || ''
                                                        });
                                                        setShowUpdateModal(true);
                                                    }}
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ border: '1px solid #dc3545', color: '#dc3545' }}
                                                    onClick={() => handleDeleteShipment(shipment.id || shipment.tracking_id)}
                                                    title="Delete"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Create Shipment Modal */}
                {showModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="dashboard-card" style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                                <h3 className="mb-0">Create New Shipment</h3>
                                <button className="btn btn-sm" onClick={() => setShowModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                            </div>

                            <form onSubmit={handleCreateShipment}>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Origin *</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" required value={formData.origin} onChange={e => setFormData({ ...formData, origin: e.target.value })} placeholder="e.g. London, UK" />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Destination *</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" required value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} placeholder="e.g. Lagos, Nigeria" />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Type</label>
                                        <select className="form-control w-100 p-2 border rounded" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                            <option>Maritime Logistics</option>
                                            <option>Air Cargo Logistics</option>
                                            <option>General Merchandise</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Initial Status</label>
                                        <select className="form-control w-100 p-2 border rounded" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                            <option>Pending</option>
                                            <option>In Transit</option>
                                            <option>Arrived POD</option>
                                            <option>Cleared</option>
                                            <option>Delivered</option>
                                        </select>
                                    </div>
                                </div>

                                <h6 className="mt-4 mb-3 pb-2 border-bottom text-muted">Tracking Details (Optional)</h6>
                                
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">BL/ AWB No</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={formData.bl_awb_no} onChange={e => setFormData({ ...formData, bl_awb_no: e.target.value })} placeholder="Bill of Lading / Airway Bill" />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Consignment</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={formData.consignment} onChange={e => setFormData({ ...formData, consignment: e.target.value })} placeholder="Item description" />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-12 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Vessel/ Airline</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={formData.vessel_airline} onChange={e => setFormData({ ...formData, vessel_airline: e.target.value })} placeholder="Carrier name" />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">POL (Port of Loading)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={formData.pol} onChange={e => setFormData({ ...formData, pol: e.target.value })} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">ETS (Est. Time of Shipment)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" placeholder="e.g. 2026-05-15" value={formData.ets} onChange={e => setFormData({ ...formData, ets: e.target.value })} />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">POD (Port of Discharge)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={formData.pod} onChange={e => setFormData({ ...formData, pod: e.target.value })} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">ETA (Est. Time of Arrival)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" placeholder="e.g. 2026-06-01" value={formData.eta} onChange={e => setFormData({ ...formData, eta: e.target.value })} />
                                    </div>
                                </div>

                                <div className="text-right mt-4 pt-3 border-top">
                                    <button type="button" className="btn btn-outline mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Create Shipment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Update Status Modal */}
                {showUpdateModal && editingShipment && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="dashboard-card" style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                                <h3 className="mb-0">Update Shipment: {editingShipment.tracking_id}</h3>
                                <button className="btn btn-sm" onClick={() => setShowUpdateModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                            </div>

                            <form onSubmit={handleUpdateStatus}>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm d-flex align-items-center gap-2">
                                            <FiTruck className="text-primary-navy" /> New Status
                                        </label>
                                        <select
                                            className="form-control w-100 p-2 border rounded"
                                            value={updateFormData.status}
                                            onChange={e => setUpdateFormData({ ...updateFormData, status: e.target.value })}
                                        >
                                            <option>Pending</option>
                                            <option>In Transit</option>
                                            <option>Arrived POD</option>
                                            <option>Cleared</option>
                                            <option>Delivered</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm d-flex align-items-center gap-2">
                                            <FiMapPin className="text-primary-navy" /> Current Location
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control w-100 p-2 border rounded"
                                            required
                                            value={updateFormData.current_location}
                                            onChange={e => setUpdateFormData({ ...updateFormData, current_location: e.target.value })}
                                            placeholder="e.g. Lagos Port, Nigeria"
                                        />
                                    </div>
                                </div>

                                {/* Additional Details Section */}
                                <h6 className="mt-4 mb-3 pb-2 border-bottom text-muted">Additional Tracking Details</h6>
                                
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">BL/ AWB No</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={updateFormData.bl_awb_no} onChange={e => setUpdateFormData({ ...updateFormData, bl_awb_no: e.target.value })} placeholder="Bill of Lading / Airway Bill" />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Consignment</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={updateFormData.consignment} onChange={e => setUpdateFormData({ ...updateFormData, consignment: e.target.value })} placeholder="Item description" />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-12 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">Vessel/ Airline</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={updateFormData.vessel_airline} onChange={e => setUpdateFormData({ ...updateFormData, vessel_airline: e.target.value })} placeholder="Carrier name" />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">POL (Port of Loading)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={updateFormData.pol} onChange={e => setUpdateFormData({ ...updateFormData, pol: e.target.value })} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">ETS (Est. Time of Shipment)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={updateFormData.ets} onChange={e => setUpdateFormData({ ...updateFormData, ets: e.target.value })} placeholder="e.g. 2026-05-15" />
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">POD (Port of Discharge)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={updateFormData.pod} onChange={e => setUpdateFormData({ ...updateFormData, pod: e.target.value })} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="d-block mb-1 font-weight-bold font-sm">ETA (Est. Time of Arrival)</label>
                                        <input type="text" className="form-control w-100 p-2 border rounded" value={updateFormData.eta} onChange={e => setUpdateFormData({ ...updateFormData, eta: e.target.value })} placeholder="e.g. 2026-06-01" />
                                    </div>
                                </div>

                                <div className="text-right mt-4 pt-3 border-top">
                                    <button type="button" className="btn btn-outline mr-2" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Update Shipment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShipmentsManagement;
