import React from 'react';
import { motion } from 'framer-motion';
import './Legal.css';

const CompanyPolicy = () => {
    return (
        <div className="legal-page">
            <header className="standard-page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Company Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        OLIVER-UGWI GLOBAL SERVICES LTD.
                    </motion.p>
                </div>
            </header>

            <main className="container">
                <div className="legal-content glass-card">
                    <section className="legal-section">
                        <h2>INTRODUCTION</h2>
                        <p>
                            OLIVER-UGWI GLOBAL SERVICES LTD. is committed to delivering exceptional and reliable services in the areas of maritime logistics, air cargo logistics, import and export facilitation, and general merchandise supply.
                        </p>
                        <p>
                            This Company Policy outlines the guiding principles, operational standards, and ethical framework that direct our daily activities. These policies ensure that all services provided by the company are executed with professionalism, efficiency, transparency, and integrity, while consistently delivering value to our clients and partners.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>CLIENT COMMITMENT</h2>
                        <p>At OLIVER-UGWI GLOBAL SERVICES LTD., our clients are at the center of everything we do. We are committed to building long-term relationships through trust, reliability, and service excellence.</p>
                        <p>We achieve this by:</p>

                        <h3>Understanding Client Needs</h3>
                        <p>We take the time to fully understand each client's unique requirements, operational challenges, and business goals in order to provide tailored solutions.</p>

                        <h3>Exceeding Expectations</h3>
                        <p>Our goal is not only to meet expectations but to consistently exceed them through proactive service delivery and innovative logistics solutions.</p>

                        <h3>Clear and Transparent Communication</h3>
                        <p>We maintain open and transparent communication with our clients at every stage of the service process. Clients are kept informed about progress, potential challenges, timelines, and cost implications.</p>

                        <h3>Competitive Rates and Flexible Solutions</h3>
                        <p>We strive to provide competitive pricing while offering flexible logistics solutions designed to meet the specific needs of each client.</p>
                    </section>

                    <section className="legal-section">
                        <h2>OUR SERVICES</h2>
                        <p>We provide a comprehensive range of logistics and trade support services designed to facilitate efficient movement of goods locally and internationally.</p>

                        <h3>Maritime Logistics</h3>
                        <ul>
                            <li><strong>Port Operations</strong> – Expertise in managing and optimizing port-related logistics activities.</li>
                            <li><strong>Cargo Handling</strong> – Safe, efficient, and professional handling of different cargo types.</li>
                            <li><strong>Customs Clearance</strong> – Efficient processing of customs documentation to facilitate seamless import and export operations.</li>
                            <li><strong>Freight Forwarding</strong> – End-to-end coordination of cargo transportation through international shipping networks.</li>
                            <li><strong>Haulage and Storage</strong> – Secure transportation and warehousing solutions.</li>
                            <li><strong>Marine Surveying</strong> – Professional cargo inspection and verification to ensure compliance with maritime standards.</li>
                        </ul>

                        <h3>Air Cargo Logistics</h3>
                        <p>Our air cargo services ensure speed, reliability, and efficiency in international cargo transportation. Services include:</p>
                        <ul>
                            <li><strong>Air Freight Forwarding</strong> – Fast and efficient international air cargo logistics solutions.</li>
                            <li><strong>Cargo Handling</strong> – Professional and careful handling of air freight shipments.</li>
                            <li><strong>Customs Clearance</strong> – Facilitating regulatory compliance for air cargo imports and exports.</li>
                            <li><strong>Airport Cargo Coordination</strong> – Efficient management of cargo movement within airport facilities.</li>
                            <li><strong>Specialized Logistics Solutions</strong> – Tailored logistics strategies designed to optimize air cargo transportation.</li>
                        </ul>

                        <h3>General Merchandise</h3>
                        <p>Our general merchandise services support procurement, distribution, and supply chain efficiency. Services include:</p>
                        <ul>
                            <li><strong>Product Sourcing</strong> – Procuring high-quality products from reliable local and international suppliers.</li>
                            <li><strong>Supply Chain Management</strong> – Managing the movement of goods from sourcing to final delivery.</li>
                            <li><strong>Distribution Services</strong> – Efficient distribution solutions that ensure timely delivery to clients and markets.</li>
                            <li><strong>Quality Assurance</strong> – Ensuring that all supplied products meet required quality and safety standards.</li>
                            <li><strong>Competitive Pricing</strong> – Providing cost-effective sourcing options across a wide range of merchandise categories.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>COMPLIANCE AND ETHICS</h2>
                        <p>OLIVER-UGWI GLOBAL SERVICES LTD. operates with strict adherence to legal and ethical standards. We are committed to:</p>
                        <ul>
                            <li>Complying with all applicable national and international trade regulations.</li>
                            <li>Conducting business with honesty, fairness, and transparency.</li>
                            <li>Maintaining zero tolerance for bribery, corruption, or unethical business practices.</li>
                            <li>Ensuring that all operations reflect the highest standards of professional conduct.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>BUSINESS PRACTICES</h2>

                        <h3>Confidentiality</h3>
                        <p>We maintain strict confidentiality regarding all client information. Client data is only accessed by authorized personnel and is used strictly for legitimate business purposes.</p>

                        <h3>Conflict of Interest</h3>
                        <p>We avoid situations that may create a conflict between our interests and those of our clients. Where potential conflicts arise, they are disclosed promptly and transparently to allow clients to make informed decisions.</p>

                        <h3>Subcontracting</h3>
                        <p>Where necessary, the company may engage qualified subcontractors or logistics partners. All subcontractors are carefully selected based on their:</p>
                        <ul>
                            <li>Professional qualifications</li>
                            <li>Operational capabilities</li>
                            <li>Compliance standards</li>
                            <li>Safety and performance history</li>
                        </ul>
                        <p>All partners are expected to uphold the same ethical and service standards maintained by OLIVER-UGWI GLOBAL SERVICES LTD.</p>
                    </section>

                    <section className="legal-section">
                        <h2>HUMAN RESOURCES</h2>
                        <p>Our employees are a vital part of our success. We are committed to:</p>
                        <ul>
                            <li>Providing a safe, professional, and respectful work environment.</li>
                            <li>Promoting fair treatment, diversity, and inclusion within the workplace.</li>
                            <li>Offering competitive compensation and benefits where applicable.</li>
                            <li>Investing in training, professional development, and continuous learning for our staff.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>QUALITY ASSURANCE</h2>
                        <p>We maintain a strong commitment to service excellence through continuous improvement. Our quality assurance approach includes:</p>
                        <ul>
                            <li>Established quality control procedures across all operational activities.</li>
                            <li>Monitoring service performance to maintain high standards.</li>
                            <li>Encouraging client feedback to identify opportunities for improvement.</li>
                            <li>Regular evaluation of operational processes to enhance efficiency and reliability.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>SUSTAINABILITY</h2>
                        <p>We recognize that logistics operations can impact the environment. As a responsible organization, we strive to minimize our environmental footprint by promoting sustainable logistics practices. Our sustainability initiatives include:</p>
                        <ul>
                            <li>Using eco-friendly packaging materials whenever possible.</li>
                            <li>Optimizing transportation routes to reduce fuel consumption and emissions.</li>
                            <li>Working with logistics partners that invest in environmentally responsible technologies.</li>
                            <li>Exploring alternative transport methods with lower environmental impact.</li>
                            <li>Where feasible, we offer “Green Logistics Solutions” to clients who prioritize environmentally responsible supply chains.</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>DISPUTE RESOLUTION</h2>
                        <p>OLIVER-UGWI GLOBAL SERVICES LTD. is committed to resolving client concerns promptly and fairly. Clients may contact our support team through the following channels:</p>
                        <div className="contact-info mt-3 pl-3" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
                            <p><strong>Email:</strong><br />
                                info@oliverugwi.com<br />
                                oliver.ugwi@outlook.com<br />
                                ugwioliver@gmail.com</p>
                            <p className="mt-2"><strong>Telephone:</strong><br />
                                +234 813 211 2909<br />
                                +234 818 267 8808</p>
                        </div>
                        <p className="mt-3">All complaints and disputes will be handled with professionalism, transparency, and a commitment to fair resolution.</p>
                    </section>

                    <section className="legal-section">
                        <h2>POLICY REVIEW</h2>
                        <p>This Company Policy will be reviewed periodically to ensure that it remains effective and aligned with industry best practices, regulatory requirements, and evolving business needs.</p>
                    </section>

                    <section className="legal-section">
                        <h2>CONCLUSION</h2>
                        <p>This Company Policy serves as the operational and ethical foundation of OLIVER-UGWI GLOBAL SERVICES LTD.</p>
                        <p>By adhering to these guiding principles, the company will continue to deliver exceptional logistics services, maintain strong client relationships, and uphold the highest standards of professionalism and integrity.</p>
                        <p className="text-accent mt-4 font-weight-bold" style={{ fontSize: '1.25rem' }}>... Think Import/ Export, Think Us!</p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default CompanyPolicy;
