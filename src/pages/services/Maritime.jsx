import ServiceLayout from './ServiceLayout';
import SEO from '../../components/SEO';

const Maritime = () => {
    const features = [
        "Port Operations",
        "Cargo Handling",
        "Customs Clearance",
        "Freight Forwarding",
        "Haulage and Storage",
        "Marine Surveying"
    ];

    return (
        <>
            <SEO
                title="Maritime Logistics & Sea Freight Nigeria"
                description="Expert maritime logistics, port operations, and ocean freight forwarding services in Nigeria. Secure and efficient cargo handling at Lagos ports."
                keywords="Maritime logistics services, Port logistics services Nigeria, Sea freight forwarding Nigeria, Ocean freight logistics Nigeria, Cargo shipping services Nigeria"
            />
            <ServiceLayout
                title="Maritime Logistics"
                bgClass="maritime-bg"
                description="Expert port operations, cargo handling, and freight forwarding ensuring secure ocean transit globally."
                overview="At OLIVER-UGWI GLOBAL SERVICES LTD, our maritime logistics division is the backbone of our international operations. We leverage years of extensive experience and a robust global network of shipping lines to provide unparalleled ocean freight solutions. From navigating complex customs regulations to securing optimal transit routes, our dedicated team ensures your cargo remains secure, economical, and on schedule."
                features={features}
            >
                <h3>The Maritime Process</h3>
                <p className="mt-3 mb-4">Our approach guarantees that your cargo is rigorously tracked and professionally handled from the port of origin to the final destination.</p>

                <div className="process-steps">
                    <div className="step">
                        <div className="step-num">1</div>
                        <div className="step-content">
                            <h4>Booking & Pick-up</h4>
                            <p>Scheduling and pre-carriage coordination from factory or warehouse.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-num">2</div>
                        <div className="step-content">
                            <h4>Customs Processing (Origin)</h4>
                            <p>Managing all necessary export documentation and compliance checks.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-num">3</div>
                        <div className="step-content">
                            <h4>Ocean Transit</h4>
                            <p>Secure vessel loading and continuous monitoring across the ocean.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-num">4</div>
                        <div className="step-content">
                            <h4>Clearance & Delivery</h4>
                            <p>Seamless destination port clearance and final mile haulage.</p>
                        </div>
                    </div>
                </div>
            </ServiceLayout>
        </>
    );
};

export default Maritime;
