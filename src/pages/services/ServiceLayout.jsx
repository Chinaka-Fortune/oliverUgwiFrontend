import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiPhoneCall, FiX } from 'react-icons/fi';
import './ServiceLayout.css';

const ServiceLayout = ({ title, bgClass, description, overview, features, children }) => {
    const { pathname } = useLocation();
    const [showWidget, setShowWidget] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="service-page">
            <section className={`service-header ${bgClass}`}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="header-content glass-dark"
                    >
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 main-content">
                            <h2 className="mb-4">Service Overview</h2>
                            <p className="lead mb-4">{overview}</p>

                            <h3 className="mt-5 mb-4">Key Features</h3>
                            <div className="features-grid">
                                {features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <FiCheckCircle className="text-accent" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5">
                                {children}
                            </div>
                        </div>

                        <AnimatePresence>
                            {showWidget && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="col-lg-9 sidebar mt-5"
                                >
                                    <div className="contact-widget glass-card">
                                        <button className="widget-close" onClick={() => setShowWidget(false)}>
                                            <FiX />
                                        </button>
                                        <h3>Need Assistance?</h3>
                                        <p>Our logistics experts are ready to provide a tailored quote and solution for your business.</p>
                                        <a href="tel:+2348132112909" className="btn btn-primary d-block flex-center gap-2 mb-3">
                                            <FiPhoneCall /> Call +234 813 211 2909
                                        </a>
                                        <a href="/quote" className="btn btn-outline d-block text-center">Request Quote</a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceLayout;
