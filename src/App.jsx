import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Maritime from './pages/services/Maritime';
import AirCargo from './pages/services/AirCargo';
import Merchandise from './pages/services/Merchandise';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TrackShipment from './pages/TrackShipment';
import RequestQuote from './pages/RequestQuote';
import BlogArticle from './pages/BlogArticle';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CompanyPolicy from './pages/CompanyPolicy';
import Incoterms from './pages/Incoterms';
import NigeriaImportGuide from './pages/NigeriaImportGuide';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import UsersManagement from './pages/admin/UsersManagement';
import ShipmentsManagement from './pages/admin/ShipmentsManagement';
import ServicesManagement from './pages/admin/ServicesManagement';
import BlogManagement from './pages/admin/BlogManagement';
import VideoManagement from './pages/admin/VideoManagement';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/customer/Profile';
import TestimonialsManagement from './pages/admin/TestimonialsManagement';
import BillingManagement from './pages/admin/BillingManagement';
import QuotesManagement from './pages/admin/QuotesManagement';
import ContactManagement from './pages/admin/ContactManagement';

// Customer Pages
import CustomerLayout from './layouts/CustomerLayout';
import CustomerHome from './pages/customer/CustomerHome';
import DocumentManagement from './pages/customer/DocumentManagement';
import SupportTickets from './pages/customer/SupportTickets';
import BillingInvoices from './pages/customer/BillingInvoices';
import FAQs from './pages/customer/FAQs';
import CustomerQuotes from './pages/customer/CustomerQuotes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="shipments" element={<ShipmentsManagement />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="tickets" element={<SupportTickets />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="videos" element={<VideoManagement />} />
            <Route path="testimonials" element={<TestimonialsManagement />} />
            <Route path="billing" element={<BillingManagement />} />
            <Route path="quotes" element={<QuotesManagement />} />
            <Route path="contacts" element={<ContactManagement />} />
            <Route path="settings" element={<Profile />} />
          </Route>
        </Route>

        {/* Customer Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={['customer', 'admin']} />}>
          <Route path="/dashboard" element={<CustomerLayout />}>
            <Route index element={<CustomerHome />} />
            <Route path="shipments" element={<ShipmentsManagement />} />
            <Route path="quotes" element={<CustomerQuotes />} />
            <Route path="documents" element={<DocumentManagement />} />
            <Route path="billing" element={<BillingInvoices />} />
            <Route path="support" element={<SupportTickets />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="settings" element={<Profile />} />
          </Route>
        </Route>

        {/* Public Routes with standard Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/about/nigeria-import-guide" element={<Layout><NigeriaImportGuide /></Layout>} />
        <Route path="/services/maritime" element={<Layout><Maritime /></Layout>} />
        <Route path="/services/air-cargo" element={<Layout><AirCargo /></Layout>} />
        <Route path="/services/merchandise" element={<Layout><Merchandise /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:id" element={<Layout><BlogArticle /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/tracking" element={<Layout><TrackShipment /></Layout>} />
        <Route path="/quote" element={<Layout><RequestQuote /></Layout>} />
        <Route path="/careers" element={<Layout><Careers /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
        <Route path="/company-policy" element={<Layout><CompanyPolicy /></Layout>} />
        <Route path="/incoterms" element={<Layout><Incoterms /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
