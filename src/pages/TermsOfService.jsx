import React from 'react';
import { motion } from 'framer-motion';
import './Legal.css';

const TermsOfService = () => {
    return (
        <div className="legal-page">
            <header className="standard-page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Terms of Service
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        OLIVER-UGWI GLOBAL SERVICES LTD
                    </motion.p>
                </div>
            </header>

            <main className="container">
                <div className="legal-content glass-card">
                    <div className="policy-meta mb-4">
                        <span className="d-block"><strong>Website:</strong> www.oliverugwi.com</span>
                        <span className="d-block"><strong>Effective Date:</strong> March 6, 2026</span>
                        <span className="d-block"><strong>Last Updated:</strong> March 6, 2026</span>
                    </div>

                    <section className="legal-section">
                        <h2>1. INTRODUCTION</h2>
                        <p>Welcome to the website of OLIVER-UGWI GLOBAL SERVICES LTD (“Company,” “we,” “us,” or “our”).</p>
                        <p>These Terms of Service (“Terms”) govern your access to and use of our website and services relating to:</p>
                        <ul>
                            <li>Maritime Logistics</li>
                            <li>Air Cargo Logistics</li>
                            <li>General Merchandise Trading</li>
                        </ul>
                        <p>By accessing or using this Website, you agree to comply with these Terms. If you do not agree, you must discontinue use immediately.</p>
                    </section>

                    <section className="legal-section">
                        <h2>2. COMPANY INFORMATION</h2>
                        <p><strong>Registered Name:</strong> OLIVER-UGWI GLOBAL SERVICES LTD</p>
                        <p><strong>Registered Office:</strong> 14 Erekusu Estate, Apapa-Oshodi Expressway, Ijesha, Lagos State, Nigeria</p>
                        <p><strong>Industry:</strong> Maritime Logistics, Air Cargo Logistics & General Merchandise</p>
                    </section>

                    <section className="legal-section">
                        <h2>3. SCOPE OF SERVICES</h2>
                        <p>The Website provides information regarding our services, which may include:</p>
                        <h3>A. Maritime Logistics</h3>
                        <ul>
                            <li>Sea freight forwarding</li>
                            <li>Import and export coordination</li>
                            <li>Port handling and documentation</li>
                            <li>Cargo consolidation</li>
                            <li>International shipping support</li>
                        </ul>
                        <h3>B. Air Cargo Logistics</h3>
                        <ul>
                            <li>Air freight coordination</li>
                            <li>Airport cargo handling</li>
                            <li>Time-sensitive shipment management</li>
                            <li>Documentation and compliance processing</li>
                        </ul>
                        <h3>C. General Merchandise</h3>
                        <ul>
                            <li>Trading and supply of approved goods</li>
                            <li>Procurement and distribution</li>
                            <li>International sourcing and export</li>
                        </ul>
                        <p>All services are subject to written contracts, quotations, or service agreements. Information provided on the Website does not constitute a binding contractual offer.</p>
                    </section>

                    <section className="legal-section">
                        <h2>4. USE OF THE WEBSITE</h2>
                        <p>You agree to use this Website in compliance with Nigerian and international trade laws, for legitimate commercial inquiries only, and without engaging in fraudulent, misleading, or unlawful cargo declarations.</p>
                        <p>You shall not attempt unauthorized system access, upload malicious software, provide false shipping or merchandise information, or use the Website to transact prohibited goods. We reserve the right to restrict access for violations.</p>
                    </section>

                    <section className="legal-section">
                        <h2>5. SERVICE LIMITATIONS & DISCLAIMERS</h2>
                        <h3>5.1 No Guaranteed Delivery Times</h3>
                        <p>Delivery timelines for maritime and air cargo services are subject to shipping line schedules, airline schedules, customs clearance processes, weather conditions, government regulations, and force majeure events. We do not guarantee exact delivery dates unless expressly agreed in writing.</p>
                        <h3>5.2 Cargo Responsibility</h3>
                        <p>Clients are responsible for accurate cargo declarations, compliance with import/export regulations, providing valid documentation, and ensuring goods are lawful and not prohibited. We reserve the right to refuse transport or handling of restricted goods.</p>
                        <h3>5.3 Merchandise Sales Disclaimer</h3>
                        <p>For general merchandise transactions, product specifications are subject to availability, prices may change without notice, and returns and warranties are governed by separate sales agreements.</p>
                    </section>

                    <section className="legal-section">
                        <h2>6. INTELLECTUAL PROPERTY</h2>
                        <p>All Website content, including logos, text, service descriptions, graphics, and trade names, are the intellectual property of OLIVER-UGWI GLOBAL SERVICES LTD and may not be copied or reproduced without written consent.</p>
                    </section>

                    <section className="legal-section">
                        <h2>7. LIMITATION OF LIABILITY</h2>
                        <p>To the fullest extent permitted by Nigerian law, OLIVER-UGWI GLOBAL SERVICES LTD shall not be liable for indirect or consequential losses, loss of profits, delays caused by airlines, shipping lines, customs, or regulators, confiscation of goods due to inaccurate client documentation, or acts of third-party carriers. Liability shall be limited to amounts specified in formal service contracts or applicable international transport conventions.</p>
                    </section>

                    <section className="legal-section">
                        <h2>8. FORCE MAJEURE</h2>
                        <p>We shall not be liable for failure or delay resulting from natural disasters, war or civil unrest, airport or port shutdowns, government restrictions, airline or shipping disruptions, or industrial strikes.</p>
                    </section>

                    <section className="legal-section">
                        <h2>9. INDEMNIFICATION</h2>
                        <p>You agree to indemnify and hold harmless OLIVER-UGWI GLOBAL SERVICES LTD from claims arising from false cargo declarations, regulatory violations, shipment of prohibited goods, or breach of these Terms.</p>
                    </section>

                    <section className="legal-section">
                        <h2>10. THIRD-PARTY CARRIERS</h2>
                        <p>Maritime and air cargo services may involve shipping lines, airlines, customs authorities, and freight handlers. We are not responsible for the independent actions or delays of such third parties.</p>
                    </section>

                    <section className="legal-section">
                        <h2>11. PRIVACY</h2>
                        <p>Your use of this Website is subject to our Privacy Policy, which complies with the Nigeria Data Protection Act, 2023.</p>
                    </section>

                    <section className="legal-section">
                        <h2>12. GOVERNING LAW</h2>
                        <p>These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any disputes shall fall under the exclusive jurisdiction of the courts of Lagos State, Nigeria.</p>
                    </section>

                    <section className="legal-section">
                        <h2>13. DISPUTE RESOLUTION</h2>
                        <p>Parties agree to attempt amicable resolution through negotiation, mediation, or arbitration (where agreed) before resorting to litigation.</p>
                    </section>

                    <section className="legal-section">
                        <h2>14. TERMINATION</h2>
                        <p>We reserve the right to suspend or terminate Website access or service engagements where these Terms are violated, false documentation is provided, or illegal goods are involved.</p>
                    </section>

                    <section className="legal-section">
                        <h2>15. AMENDMENTS</h2>
                        <p>We may revise these Terms at any time. Continued use of the Website constitutes acceptance of updated Terms.</p>
                    </section>

                    <section className="legal-section">
                        <h2>16. CONTACT INFORMATION</h2>
                        <div className="contact-info">
                            <p><strong>OLIVER-UGWI GLOBAL SERVICES LTD</strong></p>
                            <p>14 Erekusu Estate, Apapa-Oshodi Expressway, Ijesha, Lagos State, Nigeria</p>
                            <p><strong>Email:</strong> info@oliverugwi.com</p>
                            <p><strong>Website:</strong> www.oliverugwi.com</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TermsOfService;
