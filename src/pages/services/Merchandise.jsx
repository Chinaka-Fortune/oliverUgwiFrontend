import ServiceLayout from './ServiceLayout';
import SEO from '../../components/SEO';

const Merchandise = () => {
    const features = [
        "Product Sourcing",
        "Supply Chain Management",
        "Distribution",
        "Quality Assurance",
        "Competitive Pricing"
    ];

    return (
        <>
            <SEO
                title="General Merchandise & Product Sourcing Nigeria"
                description="End-to-end product sourcing, quality distribution, and reliable supply chain management in Nigeria. Connecting you to global merchandise networks."
                keywords="Product sourcing Nigeria, Merchandise sourcing services, International product sourcing, Bulk product procurement Nigeria, Merchandise supply services"
            />
            <ServiceLayout
                title="General Merchandise"
                bgClass="merch-bg"
                description="End-to-end product sourcing, procurement, and distribution to fuel your business growth."
                overview="Beyond traditional transit, OLIVER-UGWI GLOBAL SERVICES LTD acts as your comprehensive trading partner. Our General Merchandise division expertly manages the sourcing, procurement, and end-to-end supply chain of commercial goods. By leveraging our deep international network, we identify high-quality suppliers, negotiate competitive pricing, and ensure rigorous quality assurance before distribution."
                features={features}
            >
                <div className="bg-light p-5 rounded-lg mt-4 border-l-4" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
                    <h3 className="mb-3">Strategic Sourcing Advantage</h3>
                    <p className="lead">
                        "We don't just move products; we help you find the right products at the right price, building resilient supply chains that give you a competitive edge in your local market."
                    </p>
                </div>

                <h3 className="mt-5 mb-4">Industries We Serve</h3>
                <ul className="row list-unstyled">
                    <li className="col-md-6 mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <div className="timeline-dot" style={{ position: 'relative', top: 0, left: 0, right: 0, height: '12px', width: '12px' }}></div>
                            <strong>Manufacturing & Raw Materials</strong>
                        </div>
                    </li>
                    <li className="col-md-6 mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <div className="timeline-dot" style={{ position: 'relative', top: 0, left: 0, right: 0, height: '12px', width: '12px' }}></div>
                            <strong>Agricultural Products</strong>
                        </div>
                    </li>
                    <li className="col-md-6 mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <div className="timeline-dot" style={{ position: 'relative', top: 0, left: 0, right: 0, height: '12px', width: '12px' }}></div>
                            <strong>Consumer Electronics</strong>
                        </div>
                    </li>
                    <li className="col-md-6 mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <div className="timeline-dot" style={{ position: 'relative', top: 0, left: 0, right: 0, height: '12px', width: '12px' }}></div>
                            <strong>Fast-Moving Consumer Goods (FMCG)</strong>
                        </div>
                    </li>
                </ul>
            </ServiceLayout>
        </>
    );
};

export default Merchandise;
