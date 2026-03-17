import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhoneCall, FiMail } from 'react-icons/fi';
import './Navbar.css';

import logo from '../assets/oliver-ugwi-logo.jpeg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="top-bar-info">
                        <span><FiPhoneCall className="icon-sm" /> +234 813 211 2909</span>
                        <span><FiMail className="icon-sm" /> INFO@OLIVERUGWI.COM</span>
                    </div>
                    <div className="top-bar-links">
                        <Link to="/careers">Careers</Link>
                        <Link to="/login">Client Portal</Link>
                    </div>
                </div>
            </div>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <Link to="/" className="nav-logo">
                        <img src={logo} alt="OLIVER-UGWI Logo" className="logo-img" />
                    </Link>

                    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <div className="dropdown">
                            <span className={`dropdown-title ${location.pathname.startsWith('/about') ? 'active' : ''}`}>About</span>
                            <div className="dropdown-content glass">
                                <Link to="/about">Company Overview</Link>
                                <Link to="/about/nigeria-import-guide">Nigeria Import Guide</Link>
                            </div>
                        </div>
                        <div className="dropdown">
                            <span className="dropdown-title">Services</span>
                            <div className="dropdown-content glass">
                                <Link to="/services/maritime">Maritime Logistics</Link>
                                <Link to="/services/air-cargo">Air Cargo Logistics</Link>
                                <Link to="/services/merchandise">General Merchandise</Link>
                            </div>
                        </div>
                        <Link to="/tracking" className={location.pathname === '/tracking' ? 'active' : ''}>Track Shipment</Link>
                        <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Insights</Link>
                        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                        <div className="mobile-only-links">
                            <Link to="/careers" className="nav-login-link">Careers</Link>
                            <Link to="/login" className="nav-login-link">Client Portal</Link>
                        </div>
                        <Link to="/quote" className="btn btn-accent nav-cta">Request Quote</Link>
                    </div>

                    <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
