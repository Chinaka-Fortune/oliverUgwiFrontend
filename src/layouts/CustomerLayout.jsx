import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiFileText, FiCreditCard, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX, FiSend } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './DashboardLayout.css';

import logo from '../assets/oliver-ugwi-logo.jpeg';

const CustomerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
    const location = useLocation();
    const { user, logout } = useAuth();

    const navItems = [
        { path: '/dashboard', icon: <FiHome />, label: 'Overview' },
        { path: '/dashboard/shipments', icon: <FiBox />, label: 'My Shipments' },
        { path: '/dashboard/quotes', icon: <FiSend />, label: 'My Quotes' },
        { path: '/dashboard/documents', icon: <FiFileText />, label: 'Documents' },
        { path: '/dashboard/billing', icon: <FiCreditCard />, label: 'Billing & Invoices' },
        { path: '/dashboard/support', icon: <FiMessageSquare />, label: 'Support Tickets' },
        { path: '/dashboard/settings', icon: <FiSettings />, label: 'Account Settings' }
    ];

    return (
        <div className="dashboard-wrapper">
            {/* Sidebar - using same styles as AdminLayout but navy color scheme */}
            <aside className={`sidebar bg-navy ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header text-center py-4">
                    <button className="mobile-close d-lg-none" onClick={() => setSidebarOpen(false)}>
                        <FiX />
                    </button>
                    <Link to="/" className="d-block mb-2">
                        <img src={logo} alt="OLIVER-UGWI Logo" style={{ height: '60px', borderRadius: '4px' }} />
                    </Link>
                    <span style={{ color: 'var(--accent-gold)', display: 'block', fontSize: '0.8rem', letterSpacing: '1px' }}>Client Portal</span>
                </div>

                <div className="user-info text-center py-4 border-bottom border-light-alpha">
                    <div className="avatar bg-white text-navy mx-auto mb-2">
                        {user?.name?.charAt(0) || 'C'}
                    </div>
                    <h5 className="text-white mb-0">{user?.name || 'Customer Name'}</h5>
                    <span className="text-muted-light font-sm">{user?.email || 'customer@email.com'}</span>
                </div>

                <nav className="sidebar-nav mt-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.icon} <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="btn-logout" onClick={logout}>
                        <FiLogOut /> <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header bg-white border-bottom pl-4 pr-4">
                    <button className="mobile-toggle d-lg-none" onClick={() => setSidebarOpen(true)}>
                        <FiMenu />
                    </button>

                    <div className="header-actions ml-auto">
                        <Link to="/" className="btn btn-outline btn-sm">Back to Website</Link>
                    </div>
                </header>

                <div className="dashboard-content bg-light p-4 min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default CustomerLayout;
