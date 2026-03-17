import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'customer', status: 'Active' });

    useEffect(() => {
        // Mock user fetch
        setTimeout(() => {
            setUsers([
                { id: 1, name: "Admin Setup", email: "admin@oliverugwi.com", role: "admin", status: "Active" },
                { id: 2, name: "John Doe", email: "john@acme.com", role: "customer", status: "Active" },
                { id: 3, name: "Jane Smith", email: "jane@logistics.com", role: "customer", status: "Inactive" },
            ]);
            setLoading(false);
        }, 500);
    }, [token]);

    const handleAddUser = (e) => {
        e.preventDefault();
        const createdUser = { ...newUser, id: users.length + 1 };
        setUsers([...users, createdUser]);
        alert(`User ${newUser.name} added successfully!`);
        setShowAddModal(false);
        setNewUser({ name: '', email: '', role: 'customer', status: 'Active' });
    };

    const handleDeleteUser = () => {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        alert(`User ${userToDelete.name} deleted.`);
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
        alert(`User ${selectedUser.name} updated successfully!`);
        setShowEditModal(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>User Management</h2>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add New User</button>
            </div>

            <div className="dashboard-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="search-bar" style={{ maxWidth: '300px' }}>
                        <FiSearch className="search-icon" />
                        <input type="text" placeholder="Search users by name or email..." />
                    </div>
                    <div className="d-flex gap-2">
                        <select className="form-control" style={{ width: 'auto' }}>
                            <option>All Roles</option>
                            <option>Admin</option>
                            <option>Customer</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">Loading users...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>#{user.id}</td>
                                        <td><strong>{user.name}</strong></td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'bg-primary-navy text-white' : 'bg-light text-navy'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline mr-2"
                                                title="View Details"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowDetailsModal(true);
                                                }}
                                            >
                                                <FiSearch />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline mr-2"
                                                title="Edit"
                                                onClick={() => {
                                                    setSelectedUser({ ...user });
                                                    setShowEditModal(true);
                                                }}
                                            ><FiEdit2 /></button>
                                            <button
                                                className="btn btn-sm"
                                                style={{ color: '#dc3545', border: '1px solid #dc3545' }}
                                                title="Delete"
                                                onClick={() => {
                                                    setUserToDelete(user);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Add New User</h3>
                            <button className="btn btn-sm" onClick={() => setShowAddModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <form onSubmit={handleAddUser}>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Role</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={newUser.role}
                                        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Status</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={newUser.status}
                                        onChange={e => setNewUser({ ...newUser, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-right mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && userToDelete && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                        <div className="mb-4">
                            <FiTrash2 style={{ fontSize: '3rem', color: '#dc3545' }} />
                        </div>
                        <h3 className="mb-2">Are you sure?</h3>
                        <p className="text-muted mb-4">You are about to delete <strong>{userToDelete.name}</strong>. This action cannot be undone.</p>
                        <div className="d-flex gap-2 justify-content-center">
                            <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="btn btn-danger" style={{ backgroundColor: '#dc3545', color: '#fff' }} onClick={handleDeleteUser}>Yes, Delete User</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '500px' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Edit User: {selectedUser.name}</h3>
                            <button className="btn btn-sm" onClick={() => setShowEditModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <form onSubmit={handleEditUser}>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={selectedUser.name}
                                    onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="d-block mb-1 font-weight-bold font-sm">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control w-100 p-2 border rounded"
                                    required
                                    value={selectedUser.email}
                                    onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Role</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={selectedUser.role}
                                        onChange={e => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="d-block mb-1 font-weight-bold font-sm">Status</label>
                                    <select
                                        className="form-control w-100 p-2 border rounded"
                                        value={selectedUser.status}
                                        onChange={e => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-right mt-4 pt-3 border-top">
                                <button type="button" className="btn btn-outline mr-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Update User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {showDetailsModal && selectedUser && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="dashboard-card" style={{ width: '100%', maxWidth: '600px' }}>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                            <h3 className="mb-0">Customer Profile & Details</h3>
                            <button className="btn btn-sm" onClick={() => setShowDetailsModal(false)} style={{ fontSize: '1.5rem', padding: 0, lineHeight: 1 }}>&times;</button>
                        </div>

                        <div className="row">
                            <div className="col-md-4 text-center border-right">
                                <div className="avatar bg-navy text-white mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <h5>{selectedUser.name}</h5>
                                <span className={`badge ${selectedUser.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{selectedUser.status}</span>
                            </div>
                            <div className="col-md-8">
                                <div className="mb-3">
                                    <label className="text-muted font-xs d-block mb-0">Email Address</label>
                                    <strong>{selectedUser.email}</strong>
                                </div>
                                <div className="mb-3">
                                    <label className="text-muted font-xs d-block mb-0">Account Role</label>
                                    <span className="text-capitalize">{selectedUser.role}</span>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label className="text-muted font-xs d-block mb-0">Total Shipments</label>
                                        <strong>12</strong>
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="text-muted font-xs d-block mb-0">Total Spend</label>
                                        <strong>$14,200</strong>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="text-muted font-xs d-block mb-0">Last Active</label>
                                    <span>Today at 14:24 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-top">
                            <h6 className="mb-3">Recent Activity Log</h6>
                            <div className="bg-light p-3 rounded" style={{ fontSize: '0.85rem' }}>
                                <div className="mb-2 pb-2 border-bottom d-flex justify-content-between">
                                    <span>Created new support ticket #TK-9283</span>
                                    <span className="text-muted">2 hours ago</span>
                                </div>
                                <div className="mb-2 pb-2 border-bottom d-flex justify-content-between">
                                    <span>Updated shipment status OUG-837492</span>
                                    <span className="text-muted">Yesterday</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Logged in from Ikeja, Lagos</span>
                                    <span className="text-muted">Yesterday</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right mt-4 pt-3 border-top">
                            <button className="btn btn-primary" onClick={() => setShowDetailsModal(false)}>Close Full View</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersManagement;
