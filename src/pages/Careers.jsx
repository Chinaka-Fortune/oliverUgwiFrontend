import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiX, FiSend, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import './Careers.css';

const Careers = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const jobs = [
        {
            title: "Logistics Coordinator",
            location: "Lagos, Nigeria",
            type: "Full-time",
            dept: "Operations"
        },
        {
            title: "Customs Documentation Specialist",
            location: "Apapa, Lagos",
            type: "Full-time",
            dept: "Compliance"
        },
        {
            title: "Business Development Manager",
            location: "Remote / Lagos",
            type: "Commission-based",
            dept: "Sales"
        }
    ];

    const handleApply = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setSelectedJob(null);
        }, 3000);
    };

    return (
        <div className="careers-page">
            <SEO
                title="Careers | Join Our Logistics Team in Nigeria"
                description="Build your career with OLIVER-UGWI GLOBAL SERVICES LTD. Explore job opportunities in logistics, maritime operations, and supply chain management in Nigeria."
                keywords="Logistics jobs Nigeria, Careers in freight forwarding, Maritime industry jobs Lagos, Supply chain career Nigeria"
            />
            <section className="standard-page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Join Our Team
                    </motion.h1>
                    <p className="mt-3">Build your career with a leader in global logistics services.</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-lg-6">
                            <span className="subtitle">Working at OLIVER-UGWI</span>
                            <h2>Why Join Us?</h2>
                            <p className="mt-4">At OLIVER-UGWI GLOBAL SERVICES LTD, we value innovation, integrity, and dedication. We provide a dynamic environment where you can grow your expertise in international trade and logistics.</p>
                        </div>
                    </div>

                    <div className="job-listings">
                        <h3 className="mb-4">Open Positions</h3>
                        <div className="row">
                            {jobs.map((job, index) => (
                                <div key={index} className="col-md-6 col-lg-4 mb-4">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="glass-card p-4 h-100 d-flex flex-column"
                                    >
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="icon-box bg-primary-blue text-white mr-3 p-2 rounded">
                                                <FiBriefcase />
                                            </div>
                                            <span className="text-muted small">{job.dept}</span>
                                        </div>
                                        <h4 className="mb-3">{job.title}</h4>
                                        <div className="job-meta mt-auto">
                                            <p className="mb-2"><FiMapPin className="mr-2" /> {job.location}</p>
                                            <p className="mb-3"><FiClock className="mr-2" /> {job.type}</p>
                                            <button
                                                onClick={() => setSelectedJob(job)}
                                                className="btn btn-outline btn-sm w-100"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 text-center bg-light p-5 rounded">
                        <h3>Don't see a matching role?</h3>
                        <p className="mt-3">Send your CV and a brief cover letter to <strong>careers@oliverugwi.com</strong> and we'll keep you in mind for future openings.</p>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="job-modal-overlay"
                        onClick={() => setSelectedJob(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="job-modal"
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="close-modal" onClick={() => setSelectedJob(null)}><FiX /></button>

                            {isSubmitted ? (
                                <div className="text-center py-4">
                                    <FiCheckCircle size={60} className="text-success mb-3" style={{ color: '#27AE60' }} />
                                    <h3>Application Sent!</h3>
                                    <p>Thank you for your interest in the {selectedJob.title} position. Our HR team will review your application and get back to you soon.</p>
                                </div>
                            ) : (
                                <>
                                    <h2>Apply Position</h2>
                                    <p>Applying for: <strong>{selectedJob.title}</strong></p>

                                    <form onSubmit={handleApply}>
                                        <div className="form-group mb-3">
                                            <label>Full Name</label>
                                            <input type="text" className="form-control" required placeholder="John Doe" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="email" className="form-control" required placeholder="john@example.com" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label>Phone Number</label>
                                            <input type="tel" className="form-control" required placeholder="+234 ..." />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label>Upload CV (PDF)</label>
                                            <input type="file" className="form-control" accept=".pdf" />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 flex-center gap-2">
                                            <FiSend /> Submit Application
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Careers;
