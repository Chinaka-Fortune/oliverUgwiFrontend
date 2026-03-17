import React, { useState } from 'react';
import { FiPlus, FiMinus, FiHelpCircle, FiSearch } from 'react-icons/fi';

const FAQs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const faqData = [
        {
            id: 1,
            category: "General",
            question: "How do I track my shipment?",
            answer: "You can track your shipment by entering your Tracking ID on the homepage or via the 'My Shipments' section in your dashboard. Real-time updates are provided for every stage of transit."
        },
        {
            id: 2,
            category: "Shipping",
            question: "What items are prohibited for air cargo?",
            answer: "Prohibited items include explosives, flammable liquids, pressurized gases, and certain lithium batteries. Please consult our full list of prohibited items or contact support for specific guidance."
        },
        {
            id: 3,
            category: "Billing",
            question: "When will I receive my invoice?",
            answer: "Invoices are typically generated once the shipment is processed. You can find and download all your invoices in the 'Billing & Invoices' section of your dashboard."
        },
        {
            id: 4,
            category: "Customs",
            question: "Do you handle customs clearance?",
            answer: "Yes, OLIVER-UGWI provides comprehensive customs clearance services. We handle all documentation and compliance requirements to ensure smooth passage through international ports."
        }
    ];

    const filteredFaqs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Frequently Asked Questions</h2>
            </div>

            <div className="dashboard-card mb-4">
                <div className="search-bar" style={{ maxWidth: '500px' }}>
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="form-control p-2 ps-5 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {filteredFaqs.map(faq => (
                        <div key={faq.id} className="dashboard-card mb-3 p-0 overflow-hidden">
                            <div
                                className="d-flex justify-content-between align-items-center p-4 cursor-pointer"
                                onClick={() => toggleExpand(faq.id)}
                                style={{ cursor: 'pointer', backgroundColor: expandedId === faq.id ? '#f8f9fa' : 'white' }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <FiHelpCircle className="text-primary-blue" style={{ fontSize: '1.2rem' }} />
                                    <span className="font-weight-600" style={{ color: 'var(--primary-navy)', fontSize: '1.05rem' }}>{faq.question}</span>
                                </div>
                                {expandedId === faq.id ? <FiMinus /> : <FiPlus />}
                            </div>

                            {expandedId === faq.id && (
                                <div className="p-4 pt-0 border-top bg-light">
                                    <div className="py-3 text-muted">
                                        <span className="badge bg-secondary mb-2 d-inline-block text-white" style={{ fontSize: '0.7rem' }}>{faq.category}</span>
                                        <p className="mb-0">{faq.answer}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-5 dashboard-card">
                            <h4 className="text-muted">No results found for "{searchTerm}"</h4>
                            <p>Try using different keywords or contact our support team.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
