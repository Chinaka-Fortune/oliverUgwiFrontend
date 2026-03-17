import React from 'react';
import { motion } from 'framer-motion';
import './Legal.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page">
            <header className="standard-page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Privacy Policy
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
                        <p>
                            OLIVER-UGWI GLOBAL SERVICES LTD (“Company,” “we,” “us,” or “our”) is committed to protecting and respecting your privacy in compliance with the Nigeria Data Protection Act, 2023 (NDPA) and other applicable data protection laws.
                        </p>
                        <p>This Privacy Policy explains how we collect, process, store, disclose, and safeguard your personal data when you:</p>
                        <ul>
                            <li>Visit our website (www.oliverugwi.com)</li>
                            <li>Engage our logistics, freight forwarding, clearing, maritime, or related services</li>
                            <li>Communicate with us through electronic, physical, or digital platforms</li>
                        </ul>
                        <p>By using our Website or services, you consent to the data practices described in this Policy.</p>
                    </section>

                    <section className="legal-section">
                        <h2>2. DATA CONTROLLER INFORMATION</h2>
                        <p>OLIVER-UGWI GLOBAL SERVICES LTD acts as a Data Controller for personal data collected through its website and service engagements.</p>
                        <div className="contact-info mt-3">
                            <p><strong>Registered Office:</strong> 14 Erekusu Estate, Apapa-Oshodi Expressway, Ijesha, Lagos State, Nigeria.</p>
                            <p><strong>Email:</strong> info@oliverugwi.com</p>
                            <p><strong>Phone:</strong> +2348132112909</p>
                            <p><strong>Data Protection Contact:</strong> privacy@oliverugwi.com</p>
                        </div>
                    </section>

                    <section className="legal-section">
                        <h2>3. TYPES OF PERSONAL DATA WE COLLECT</h2>
                        <h3>3.1 Information You Provide Directly</h3>
                        <p>We may collect:</p>
                        <ul>
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Company/Organization name</li>
                            <li>Job title</li>
                            <li>Business address</li>
                            <li>Shipping or cargo information</li>
                            <li>Identification details (where required for customs/logistics documentation)</li>
                            <li>Any other information submitted via forms, emails, or correspondence</li>
                        </ul>
                        <h3>3.2 Automatically Collected Data</h3>
                        <p>When you visit our Website, we may automatically collect:</p>
                        <ul>
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Device type</li>
                            <li>Pages visited</li>
                            <li>Date and time of visit</li>
                            <li>Referral source</li>
                        </ul>
                        <h3>3.3 Sensitive Personal Data</h3>
                        <p>We do not intentionally collect sensitive personal data (such as health, religion, or biometric data) unless required by law or regulatory authorities in the course of providing maritime or logistics services. Where such data becomes necessary, we will obtain explicit consent or rely on lawful regulatory grounds.</p>
                    </section>

                    <section className="legal-section">
                        <h2>4. LEGAL BASIS FOR PROCESSING (NDPA COMPLIANCE)</h2>
                        <p>We process your personal data based on one or more of the following lawful bases:</p>
                        <ul>
                            <li><strong>Consent</strong> – Where you voluntarily provide information.</li>
                            <li><strong>Contractual Necessity</strong> – To fulfill logistics, freight, maritime, or clearing service agreements.</li>
                            <li><strong>Legal Obligation</strong> – To comply with Nigerian Customs Service regulations, maritime authorities, tax laws, or court orders.</li>
                            <li><strong>Legitimate Business Interest</strong> – To improve services, prevent fraud, and manage client relationships.</li>
                            <li><strong>Public Interest</strong> – Where required by regulatory or governmental directives.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>5. PURPOSE OF DATA PROCESSING</h2>
                        <p>We use personal data to:</p>
                        <ul>
                            <li>Provide freight forwarding, clearing, maritime, and logistics services</li>
                            <li>Process shipping documentation and customs requirements</li>
                            <li>Communicate regarding cargo, contracts, and transactions</li>
                            <li>Respond to inquiries and service requests</li>
                            <li>Improve website functionality and user experience</li>
                            <li>Send business communications (where consent is provided)</li>
                            <li>Comply with regulatory and statutory obligations</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>6. COOKIES AND TRACKING TECHNOLOGIES</h2>
                        <p>Our Website uses cookies and similar technologies to enhance user experience, analyze website traffic, and improve site performance. You may disable cookies via your browser settings; however, this may affect certain website functionalities.</p>
                    </section>

                    <section className="legal-section">
                        <h2>7. DATA SHARING AND DISCLOSURE</h2>
                        <p>We may share personal data with:</p>
                        <ul>
                            <li>Nigerian Customs Service and other regulatory authorities</li>
                            <li>Shipping lines and maritime agencies</li>
                            <li>Port authorities</li>
                            <li>Banks and payment processors</li>
                            <li>IT service providers and hosting providers</li>
                            <li>Legal and compliance advisors</li>
                        </ul>
                        <p>All third parties are required to maintain confidentiality and implement appropriate security measures. We do not sell or rent personal data.</p>
                    </section>

                    <section className="legal-section">
                        <h2>8. INTERNATIONAL DATA TRANSFERS</h2>
                        <p>Where personal data is transferred outside Nigeria (e.g., international shipping partners), we ensure adequate data protection safeguards, contractual data protection clauses, and compliance with NDPA cross-border transfer requirements.</p>
                    </section>

                    <section className="legal-section">
                        <h2>9. DATA RETENTION POLICY</h2>
                        <p>We retain personal data for the duration of contractual engagement, as required by maritime, customs, tax, and corporate regulations, or for a minimum statutory period as required under Nigerian law. After this period, data will be securely deleted or anonymized.</p>
                    </section>

                    <section className="legal-section">
                        <h2>10. DATA SECURITY MEASURES</h2>
                        <p>We implement appropriate administrative, technical (SSL encryption, secure servers, firewalls), and physical safeguards. However, no digital transmission is 100% secure. We encourage users to take reasonable precautions when transmitting information online.</p>
                    </section>

                    <section className="legal-section">
                        <h2>11. YOUR DATA PROTECTION RIGHTS (UNDER NDPA 2023)</h2>
                        <p>You have the right to request access to your personal data, request correction of inaccurate data, request erasure (where legally permissible), withdraw consent at any time, object to processing, request restriction of processing, request data portability, and lodge a complaint with the Nigeria Data Protection Commission (NDPC).</p>
                        <p>Requests should be directed to: <strong>privacy@oliverugwi.com</strong></p>
                    </section>

                    <section className="legal-section">
                        <h2>12. CHILDREN’S PRIVACY</h2>
                        <p>Our services and Website are not directed at individuals under 18 years of age. We do not knowingly collect personal data from minors.</p>
                    </section>

                    <section className="legal-section">
                        <h2>13. DATA BREACH NOTIFICATION</h2>
                        <p>In the event of a data breach that poses risk to your rights and freedoms, we will notify affected individuals and the Nigeria Data Protection Commission (NDPC), and take immediate remedial actions in accordance with the NDPA 2023.</p>
                    </section>

                    <section className="legal-section">
                        <h2>14. POLICY UPDATES</h2>
                        <p>We may update this Privacy Policy periodically to reflect changes in legal, regulatory, or operational requirements. Updates will be posted on this page with a revised effective date.</p>
                    </section>

                    <section className="legal-section">
                        <h2>15. CONTACT INFORMATION</h2>
                        <div className="contact-info">
                            <p><strong>OLIVER-UGWI GLOBAL SERVICES LTD</strong></p>
                            <p>14 Erekusu Estate, Apapa-Oshodi Expressway, Ijesha, Lagos State, Nigeria</p>
                            <p><strong>Email:</strong> privacy@oliverugwi.com</p>
                            <p><strong>Website:</strong> www.oliverugwi.com</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
