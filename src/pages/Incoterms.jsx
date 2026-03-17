import React from 'react';
import { motion } from 'framer-motion';
import './Legal.css';

const Incoterms = () => {
    return (
        <div className="legal-page">
            <header className="standard-page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Incoterms® 2020
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        INTERNATIONAL COMMERCIAL TERMS
                    </motion.p>
                </div>
            </header>

            <main className="container">
                <div className="legal-content glass-card">
                    <section className="legal-section">
                        <p><strong>Incoterms® (International Commercial Terms)</strong> are a globally recognized set of standardized trade rules used in international commerce to define the responsibilities of buyers and sellers in cross-border transactions.</p>
                        <p>They clarify who is responsible for transportation, insurance, customs clearance, costs, and risks during the shipment of goods.</p>
                        <p>The International Chamber of Commerce (ICC) first introduced Incoterms in 1936 to create clarity and consistency in international trade contracts. Since then, the rules have been periodically updated to reflect evolving global trade practices.</p>
                        <p>The current version, <strong>Incoterms® 2020</strong>, is the most widely used framework for interpreting international trade terms.</p>
                    </section>

                    <section className="legal-section">
                        <h2 className="mb-4 text-accent">The 11 Incoterms® 2020</h2>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">1. EXW – Ex Works</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller makes the goods available at their premises or another named location (factory, warehouse, etc.).</p>
                                <p>The buyer bears all costs and risks involved in loading the goods and transporting them to the final destination.</p>
                                <p className="mb-0 text-accent"><em>This term places maximum responsibility on the buyer.</em></p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">2. FCA – Free Carrier</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller delivers the goods to a carrier or another party nominated by the buyer at the seller’s premises or another named location.</p>
                                <p>Risk transfers from the seller to the buyer once the goods are handed over to the carrier.</p>
                                <p className="mb-0"><em>FCA is commonly used for containerized cargo and multimodal transport.</em></p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">3. FAS – Free Alongside Ship</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller delivers the goods alongside the vessel nominated by the buyer at the named port of shipment.</p>
                                <p>Risk transfers to the buyer once the goods are placed alongside the ship.</p>
                                <p className="mb-0"><em>This term is commonly used for bulk cargo or non-containerized shipments.</em></p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">4. FOB – Free On Board</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller delivers the goods on board the vessel nominated by the buyer at the named port of shipment.</p>
                                <p>Risk transfers from the seller to the buyer once the goods are loaded onto the ship.</p>
                                <p className="mb-0"><em>FOB is widely used for sea freight shipments.</em></p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">5. CFR – Cost and Freight</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller delivers the goods on board the vessel and pays the cost of transporting the goods to the named port of destination.</p>
                                <p className="mb-0">However, risk transfers to the buyer once the goods are loaded onto the vessel, even though the seller pays for freight.</p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">6. CIF – Cost, Insurance, and Freight</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>Similar to CFR, but the seller must also procure marine insurance to cover the buyer’s risk during transportation.</p>
                                <p>The seller pays for:</p>
                                <ul>
                                    <li>Freight to the destination port</li>
                                    <li>Minimum insurance coverage</li>
                                </ul>
                                <p className="mb-0">Risk transfers to the buyer once the goods are loaded on board the vessel.</p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">7. CPT – Carriage Paid To</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller delivers the goods to a carrier selected by the seller and pays the cost of transport to the named destination.</p>
                                <p className="mb-0">Risk transfers to the buyer when the goods are handed over to the first carrier, not when they reach the destination.</p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">8. CIP – Carriage and Insurance Paid To</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>This term is similar to CPT, but the seller must also purchase insurance coverage for the goods during transit.</p>
                                <p>The seller pays for:</p>
                                <ul>
                                    <li>Transportation to the named destination</li>
                                    <li>Insurance coverage</li>
                                </ul>
                                <p className="mb-0">Risk transfers to the buyer when the goods are handed over to the first carrier.</p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">9. DPU – Delivered at Place Unloaded</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller is responsible for delivering and unloading the goods at the named place of destination.</p>
                                <p>Risk transfers to the buyer after the goods have been unloaded.</p>
                                <p className="mb-0"><em>DPU is the only Incoterm where the seller is responsible for unloading the cargo.</em></p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">10. DAP – Delivered at Place</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>The seller delivers the goods when they are placed at the buyer’s disposal on the arriving means of transport, ready for unloading at the named place of destination.</p>
                                <p className="mb-0">The buyer is responsible for unloading the goods and handling import clearance.</p>
                            </div>
                        </div>

                        <div className="incoterm-item mb-4">
                            <h3 className="h5 bg-navy text-white p-2 pl-3 rounded m-0">11. DDP – Delivered Duty Paid</h3>
                            <div className="p-3 border border-top-0 rounded-bottom" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <p>This term places maximum responsibility on the seller.</p>
                                <p>The seller is responsible for:</p>
                                <ul>
                                    <li>Transportation</li>
                                    <li>Export clearance</li>
                                    <li>Import clearance</li>
                                    <li>Payment of duties and taxes</li>
                                </ul>
                                <p className="mb-0">The seller delivers the goods ready for unloading at the buyer’s destination.</p>
                            </div>
                        </div>
                    </section>

                    <section className="legal-section">
                        <h2>KEY INCOTERMS CATEGORIES</h2>

                        <div className="row mt-4">
                            <div className="col-md-4 mb-4">
                                <div className="card h-100 p-3 bg-light border-0">
                                    <h4 className="h6 text-accent mb-3">Terms Where Seller Makes Goods Available to Carrier</h4>
                                    <p className="small text-muted mb-2">These terms transfer responsibility earlier in the logistics process:</p>
                                    <ul className="mb-0">
                                        <li>EXW</li>
                                        <li>FCA</li>
                                        <li>FAS</li>
                                        <li>FOB</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card h-100 p-3 bg-light border-0">
                                    <h4 className="h6 text-accent mb-3">Terms Where Seller Pays for Main Carriage</h4>
                                    <p className="small text-muted mb-2">Under these terms, the seller pays for transportation, but risk transfers earlier:</p>
                                    <ul className="mb-0">
                                        <li>CFR</li>
                                        <li>CIF</li>
                                        <li>CPT</li>
                                        <li>CIP</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card h-100 p-3 bg-light border-0">
                                    <h4 className="h6 text-accent mb-3">Terms Where Seller Delivers to Destination</h4>
                                    <p className="small text-muted mb-2">Under these terms, the seller takes responsibility until the goods arrive at the destination:</p>
                                    <ul className="mb-0">
                                        <li>DPU</li>
                                        <li>DAP</li>
                                        <li>DDP</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="legal-section">
                        <h2>IMPORTANCE OF INCOTERMS IN INTERNATIONAL TRADE</h2>
                        <p>Incoterms play a critical role in global commerce because they:</p>
                        <ul>
                            <li>Clearly define buyer and seller responsibilities</li>
                            <li>Reduce misunderstandings in international transactions</li>
                            <li>Clarify cost allocation and risk transfer</li>
                            <li>Facilitate efficient logistics and supply chain management</li>
                            <li>Minimize trade disputes between parties</li>
                        </ul>
                        <p className="mt-4">By using standardized trade terms, businesses can conduct international transactions with greater clarity, confidence, and efficiency.</p>
                        <p className="text-muted small mt-4 border-top pt-3"><em>The full official Incoterms® 2020 rules are published by the International Chamber of Commerce (ICC) and are available through their official website.</em></p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Incoterms;
