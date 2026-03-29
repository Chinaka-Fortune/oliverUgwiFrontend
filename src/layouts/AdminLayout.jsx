import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBox, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX, FiBriefcase, FiTag, FiPlay, FiStar, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './DashboardLayout.css';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle state
    const location = useLocation();
    const { user, logout } = useAuth();
    const textGold = { color: '#BC9A28' }; // Theme Gold for labels

    const navItems = [
        { path: '/admin', icon: <FiHome />, label: 'Dashboard' },
        { path: '/admin/shipments', icon: <FiBox />, label: 'Shipments' },
        { path: '/admin/users', icon: <FiUsers />, label: 'Users & Clients' },
        { path: '/admin/services', icon: <FiBriefcase />, label: 'Services' },
        { path: '/admin/tickets', icon: <FiMessageSquare />, label: 'Support Tickets' },
        { path: '/admin/blogs', icon: <FiTag />, label: 'Blog & Insights' },
        { path: '/admin/videos', icon: <FiPlay />, label: 'Hero Videos' },
        { path: '/admin/testimonials', icon: <FiStar />, label: 'Testimonials' },
        { path: '/admin/quotes', icon: <FiMessageSquare />, label: 'Quote Requests' },
        { path: '/admin/contacts', icon: <FiMessageSquare />, label: 'Contact Messages' },
        { path: '/admin/billing', icon: <FiDollarSign />, label: 'Billing & Invoices' },
        { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' }
    ];

    return (
        <div className="dashboard-wrapper">
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header text-center py-4">
                    <button className="mobile-close d-lg-none" onClick={() => setSidebarOpen(false)}>
                        <FiX />
                    </button>
                    <img src="/oliver-ugwi-logo.jpeg" alt="OLIVER-UGWI" className="sidebar-logo mb-3" style={{ maxWidth: '160px', borderRadius: '8px', display: 'block', margin: '0 auto' }} />
                    <div style={{ ...textGold, fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        ADMIN DASHBOARD
                    </div>
                </div>

                <div className="user-info text-center py-4 border-bottom border-light-alpha">
                    <div className="avatar bg-accent text-navy mx-auto mb-2">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <h5 className="text-white mb-0">{user?.name || 'Administrator'}</h5>
                    <span className="text-muted-light font-sm">{user?.email || 'Admin'}</span>
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

            <main className="dashboard-main">
                <header className="dashboard-header bg-white border-bottom pl-4 pr-4">
                    <button className="mobile-toggle d-lg-none" onClick={() => setSidebarOpen(true)}>
                        <FiMenu />
                    </button>
                    <div className="header-actions ml-auto">
                        <span className="text-muted mr-3">Welcome back Admin ({user?.email || 'admin@oliver-ugwi.com'})</span>
                        <Link to="/" className="btn btn-outline btn-sm">View Live Site</Link>
                    </div>
                </header>

                <div className="dashboard-content bg-light p-4 min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
