import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <Navbar />
            <main className="main-content" style={{ minHeight: 'calc(100vh - 400px)' }}>
                {children}
            </main>
            <WhatsAppWidget />
            <Footer />
        </div>
    );
};

export default Layout;
