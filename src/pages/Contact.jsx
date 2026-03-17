import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: 'General Inquiry',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const response = await fetch(`${apiUrl}/comm/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const errData = await response.json();
                setError(errData.message || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error('Contact error:', err);
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const faqs = [
        {
            q: "How do I track my shipment?",
            a: "You can easily track your shipment using the tracking ID provided when your order is confirmed. Go to exclusively assigned tracking page and enter your ID (e.g., OUG-12345678) in the Quick Trace box."
        },
        {
            q: "What documents are required for customs clearance?",
            a: "Typical documents required include: Commercial Invoice, Packing List, Bill of Lading (B/L) or Air Waybill (AWB), Certificate of Origin, and export licenses depending on the product group."
        },
        {
            q: "What payment methods do you accept?",
            a: "We accept secure Bank Transfers for corporate accounts, Wire Transfers for international clients, and major credit cards via our secure online portal powered by Stripe/Paystack. Invoices are automatically generated and logged."
        },
        {
            q: "Are my goods insured during transit?",
            a: "Yes, we offer comprehensive cargo insurance options depending on the service level chosen. We highly recommend full coverage for high-value merchandise."
        },
        {
            q: "How do I request a quote?",
            a: "You can request a quote by clicking the 'Request Quote' button in the navigation bar, filling out the detailed form, and a representative will contact you with pricing within 24 hours."
        }
    ];

    return (
        <div className="contact-page">
            <SEO
                title="Contact Us | Logistics & Shipping Support Lagos"
                description="Get in touch with OLIVER-UGWI GLOBAL SERVICES LTD for reliable logistics solutions, freight forwarding quotes, and supply chain support in Lagos, Nigeria."
                keywords="Contact logistics company Lagos, Shipping support Nigeria, Freight forwarding office Lagos, Logistics services Ijesha Lagos"
            />
            <section className="standard-page-header contact-header">
                <div className="container text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Get In Touch</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        Have questions about our logistics services? We're here to help you 24/7.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container row">
                    {/* Contact Details & Map */}
                    <div className="col-md-5 mb-5 mb-md-0 pr-lg-5">
                        <span className="subtitle">Contact Information</span>
                        <h2 className="mb-4">Visit Our Headquarters</h2>

                        <div className="contact-info-card mb-4">
                            <div className="info-item">
                                <h4>Address</h4>
                                <p>14 Erekusu Estate,<br />Apapa-Oshodi Expressway,<br />Ijesha, Lagos State, Nigeria</p>
                            </div>
                            <div className="info-item">
                                <h4>Emails</h4>
                                <p>info@oliverugwi.com<br />oliver.ugwi@outlook.com<br />ugwioliver@gmail.com</p>
                            </div>
                            <div className="info-item">
                                <h4>Phone / WhatsApp</h4>
                                <p>+234 813 211 2909<br />+234 818 267 8808<br />+234 805 183 7518<br />+234 802 474 5252</p>
                            </div>
                        </div>

                        <div className="map-container">
                            {/* Embed Map Note: Using standard embed iframe */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15856.901691238497!2d3.303102399999999!3d6.49320265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8eefeaa337cd%3A0xcda65dfefaa8fcd9!2sApapa-Oshodi%20Expy%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                width="100%"
                                height="300"
                                style={{ border: 0, borderRadius: '8px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="OLIVER UGWI Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="col-md-7 pl-lg-5 border-left-lg">
                        <span className="subtitle">Message Us</span>
                        <h2 className="mb-4">Send a Quick Message</h2>
                        {submitted ? (
                            <div className="glass-card p-5 text-center">
                                <h3 className="text-accent mb-3">Message Sent!</h3>
                                <p>Thank you for reaching out. A team member will respond shortly.</p>
                                <button className="btn btn-primary mt-4" onClick={() => setSubmitted(false)}>Send Another Message</button>
                            </div>
                        ) : (
                            <form className="contact-form glass-card" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-sm-6 mb-3">
                                        <label>First Name</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" placeholder="John" required />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control" placeholder="Doe" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" placeholder="john@company.com" required />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control" placeholder="+1234567890" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Service Interested In</label>
                                    <select name="service" value={formData.service} onChange={handleInputChange} className="form-control">
                                        <option>Maritime Logistics</option>
                                        <option>Air Cargo Logistics</option>
                                        <option>General Merchandise</option>
                                        <option>General Inquiry</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label>Your Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleInputChange} className="form-control" rows="5" placeholder="How can we help you?" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg d-block">Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="faq-section section-padding bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="subtitle">Common Questions</span>
                        <h2>Frequently Asked Questions</h2>
                    </div>

                    <div className="faq-container mx-auto" style={{ maxWidth: '800px' }}>
                        {faqs.map((faq, index) => (
                            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                                <div className="faq-question" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                                    <h4>{faq.q}</h4>
                                    <FiChevronDown className="faq-icon" />
                                </div>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="faq-answer-wrapper"
                                        >
                                            <div className="faq-answer">
                                                <p>{faq.a}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
