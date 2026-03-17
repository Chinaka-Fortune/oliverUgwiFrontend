import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './Legal.css'; 

const NigeriaImportGuide = () => {
    return (
        <div className="legal-page">
            <SEO 
                title="Nigeria Import/Export Guide | OLIVER-UGWI"
                description="A quick guide through key agencies and authorities for navigating Nigeria's import and export landscape."
            />
            <header className="standard-page-header" style={{ backgroundImage: "linear-gradient(rgba(8, 23, 48, 0.8), rgba(8, 23, 48, 0.7)), url('/navigating-nigeria-import.jpeg')", backgroundPosition: "center", backgroundSize: "cover" }}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Navigating Nigeria's Import and Export Landscape
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-accent"
                        style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "1rem" }}
                    >
                        A Quick Guide through Key Agencies and Authorities.
                    </motion.p>
                </div>
            </header>

            <main className="container section-padding">
                <div className="legal-content glass-card p-5">
                    <div className="row">
                        <div className="col-12 mb-5 text-center">
                            <p className="lead text-muted">
                                These 20 agencies collectively contribute to the regulation, promotion, and facilitation of import and export activities in Nigeria.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                id: 1,
                                abbr: "NCS",
                                name: "Nigerian Customs Service",
                                duty: "Responsible for collecting customs duties, ensuring compliance with trade regulations, and facilitating the movement of goods across the Nigerian border."
                            },
                            {
                                id: 2,
                                abbr: "NPA",
                                name: "Nigerian Ports Authority",
                                duty: "Manages and operates the ports in Nigeria, ensuring efficient handling of imports and exports."
                            },
                            {
                                id: 3,
                                abbr: "NEPC",
                                name: "Nigerian Export Promotion Council",
                                duty: "Promotes and facilitates export activities, provides export information, and supports Nigerian exporters."
                            },
                            {
                                id: 4,
                                abbr: "NSC",
                                name: "Nigerian Shippers' Council",
                                duty: "Regulates and facilitates the shipping industry to ensure fair practice and cost-effective services for importers and exporters."
                            },
                            {
                                id: 5,
                                abbr: "SON",
                                name: "Standards Organization of Nigeria",
                                duty: "Sets and enforces quality and safety standards for products, including those for import and export."
                            },
                            {
                                id: 6,
                                abbr: "NESREA",
                                name: "National Environmental Standards and Regulations Enforcement Agency",
                                duty: "Regulates and enforces environmental standards, which can impact import and export activities."
                            },
                            {
                                id: 7,
                                abbr: "NACCIMA",
                                name: "Nigerian Association of Chambers of Commerce, Industry, Mines, and Agriculture",
                                duty: "Represents the interests of Nigerian businesses engaged in import and export and promotes them."
                            },
                            {
                                id: 8,
                                abbr: "FIRS",
                                name: "Federal Inland Revenue Service",
                                duty: "Collects taxes and duties related to imports and exports, contributing to government revenue."
                            },
                            {
                                id: 9,
                                abbr: "NAFDAC",
                                name: "National Agency for Food and Drug Administration and Control",
                                duty: "Regulates the safety and quality of food, drugs, and other products, including those involved in import and export."
                            },
                            {
                                id: 10,
                                abbr: "NAQS",
                                name: "Nigerian Agricultural Quarantine Service",
                                duty: "Ensures that agricultural and Agro-allied Products meet international phytosanitary standards for export."
                            },
                            {
                                id: 11,
                                abbr: "NEXIM",
                                name: "Nigerian Export-Import Bank",
                                duty: "Provides financial support and credit facilities to Nigerian exporters and importers."
                            },
                            {
                                id: 12,
                                abbr: "CBN",
                                name: "Central Bank of Nigeria",
                                duty: "Regulates the financial sector, including foreign exchange controls that affect import and export transactions."
                            },
                            {
                                id: 13,
                                abbr: "FMOTI",
                                name: "Federal Ministry of Trade and Investment",
                                duty: "Develops and implements trade and investment policies and strategies to promote import and export."
                            },
                            {
                                id: 14,
                                abbr: "NIP",
                                name: "Nigerian Institute of Packaging",
                                duty: "Supports the packaging industry, which is essential for export to meet international packaging standards."
                            },
                            {
                                id: 15,
                                abbr: "NIPC",
                                name: "Nigerian Investment Promotion Commission",
                                duty: "Promotes and facilitates foreign direct investment (FDI) in Nigeria, which can impact import and export."
                            },
                            {
                                id: 16,
                                abbr: "RMRDC",
                                name: "Nigerian Raw Materials Research and Development Council",
                                duty: "Supports the development of locally available raw materials for use in export-oriented industries."
                            },
                            {
                                id: 17,
                                abbr: "NOTN",
                                name: "Nigerian Office for Trade Negotiations",
                                duty: "Engages in trade negotiations on behalf of Nigeria to secure favorable trade agreements."
                            },
                            {
                                id: 18,
                                abbr: "NOTAP",
                                name: "National Office for Technology Acquisition and Promotion",
                                duty: "Facilitates the transfer of foreign technology, which can impact imports and exports."
                            },
                            {
                                id: 19,
                                abbr: "NAICOM",
                                name: "National Insurance Commission",
                                duty: "Regulates the insurance industry, which plays a role in mitigating risks associated with import and export."
                            },
                            {
                                id: 20,
                                abbr: "NEPZA",
                                name: "Nigerian Export Processing Zones Authority",
                                duty: "Manages export processing zones, providing a conducive environment for export-oriented industries."
                            }
                        ].map((agency) => (
                            <div key={agency.id} className="col-lg-6 mb-4">
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="p-4 rounded h-100"
                                    style={{ border: '1px solid var(--border-light)', background: 'var(--bg-main)', position: 'relative', overflow: 'hidden' }}
                                >
                                    <div style={{ position: 'absolute', top: '-15px', right: '-15px', fontSize: '100px', fontWeight: '800', opacity: '0.04', color: 'var(--primary-navy)' }}>
                                        {agency.id}
                                    </div>
                                    <h4 className="mb-3" style={{ color: 'var(--primary-navy)', paddingRight: '40px' }}>
                                        {agency.name} <span className="text-accent h6">({agency.abbr})</span>
                                    </h4>
                                    <p className="text-muted mb-0" style={{ position: 'relative', zIndex: '1' }}>
                                        {agency.duty}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5 pt-4 border-top">
                        <h3 className="h4 text-accent mb-4">"... Think Import/ Export, Think Us!"</h3>
                        <Link to="/contact" className="btn btn-primary btn-lg">Contact Us for Assistance</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NigeriaImportGuide;
